package services

import (
	"bytes"
	"context"
	"errors"
	"io/ioutil"
	"log"
	"os"
	"os/exec"

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
	log.Printf("Got connect request from %s for room %s", userID, roomID)
	if len(userID) < 1 {
		log.Println("Invalid userID")
		return status.Error(codes.InvalidArgument, "Invalid userID")
	}

	u := &user{
		id:     userID,
		stream: stream,
		err:    make(chan error),
	}

	err := server.Rooms.AddUser(u, roomID)

	if err != nil {
		log.Printf("Failed to add user: %s", err)
		return err
	}
	defer server.Rooms.RemoveUser(u, roomID)
	log.Printf("User %s is connected to room %s", userID, roomID)
	stream.Send(&pb.Message{
		Type:   "success",
		Data:   &pb.Message_Identifier{},
		RoomID: roomID,
	})

	return <-u.err
}

// Broadcast handles users sending messages to be broadcast to other users
func (server *RoomServer) Broadcast(ctx context.Context, message *pb.Message) (*pb.Close, error) {

	go server.Rooms.Broadcast(message)
	return &pb.Close{}, nil
}

// Run writes the input into a file and executes with "go run {filename}" and returns the output
func (server *RoomServer) Run(ctx context.Context, req *pb.RunRequest) (*pb.RunResponse, error) {
	file := req.GetFile()
	room := req.GetRoom()
	filename := "./tmp/" + room + ".go"
	err := ioutil.WriteFile(filename, []byte(file), 0644)
	if err != nil {
		log.Println("Failed to write to file for room ", room, err)
		return nil, status.Error(codes.Internal, "Failed to write to file")
	}
	defer os.Remove(filename)

	cmd := exec.Command("go", "run", filename)
	var out, outerr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &outerr

	err = cmd.Run()
	if err != nil {
		log.Printf("Failed to run file  %s\n", err)

		return nil, status.Error(codes.Internal, outerr.String()[25:])

		//return nil, status.Error(codes.Internal, "Failed to run file")
	} else {
		return &pb.RunResponse{
			Output: out.String(),
		}, nil
	}

}
