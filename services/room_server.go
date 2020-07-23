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
		return nil, status.Errorf(codes.InvalidArgument, "No room ID was received")
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
