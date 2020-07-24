package services

import (
	"context"
	"errors"
	"log"

	"github.com/tankangliang/gollab/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// RoomServer is an implementation of the GRPC server
type RoomServer struct {
	Rooms RoomStore
}

// NewRoomServer creates a room server
func NewRoomServer(rooms RoomStore) *RoomServer {
	return &RoomServer{
		Rooms: rooms,
	}
}

// CreateRoom accepts a grpc request and attempts to create a room in the store
func (server *RoomServer) CreateRoom(ctx context.Context, req *pb.CreateRoomRequest) (*pb.CreateRoomResponse, error) {
	roomID := req.GetId()

	if len(roomID) < 1 {
		return nil, status.Error(codes.InvalidArgument, "No room ID was received")
	}

	err := server.Rooms.Create(roomID)
	if err != nil {
		code := codes.Internal
		if errors.Is(err, ErrRoomAlreadyExists) {
			code = codes.AlreadyExists
		}

		return nil, status.Errorf(code, "Failed to create a new room: %s", err)
	}

	log.Printf("Created a room with id: %s", roomID)

	res := &pb.CreateRoomResponse{
		Accepted: true,
	}

	return res, nil
}

// Connect adds the user's stream to a list of users given the specified room ID
func (server *RoomServer) Connect(req *pb.ConnectRequest, stream pb.RoomService_ConnectServer) error {
	userID := req.GetUser()
	roomID := req.GetRoomID()

	if len(userID) < 1 {
		return status.Error(codes.InvalidArgument, "Invalid userID")
	}

	room, err := server.Rooms.GetRoom(roomID)
	if err != nil {
		return status.Errorf(codes.InvalidArgument, "No such room found: %s", err)
	}

	u := &user{
		id:     userID,
		stream: stream,
		err:    make(chan error),
	}
	room.users = append(room.users, u)
	return <-u.err
}

// Broadcast handles users sending messages to be broadcast to other users
func (server *RoomServer) Broadcast(ctx context.Context, message *pb.Message) (*pb.Close, error) {
	roomID := message.GetRoomID()

	room, err := server.Rooms.GetRoom(roomID)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "No such room found: %s", err)
	}

	for _, user := range room.users {
		err := user.stream.Send(message)
		if err != nil {
			status.Errorf(codes.Internal, "Error sending message %s", err)
			user.err <- err
		}
	}

	return &pb.Close{}, nil
}
