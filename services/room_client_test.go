package services_test

import (
	"context"
	"net"
	"testing"

	"github.com/tankangliang/gollab/sample"

	"github.com/stretchr/testify/require"

	"github.com/tankangliang/gollab/pb"

	"google.golang.org/grpc"

	"github.com/tankangliang/gollab/services"
)

func TestClientCreateRoom(t *testing.T) {
	t.Parallel()

	roomServer, addr := startTestRoomServer(t)
	roomClient := newTestRoomClient(t, addr)

	roomReq := sample.NewRoomRequest()

	res, err := roomClient.CreateRoom(context.Background(), roomReq)
	require.NoError(t, err)
	require.NotNil(t, res)
	require.True(t, res.Accepted)

	room, err := roomServer.Rooms.GetRoom(roomReq.GetId())

	require.NotNil(t, room)
	require.Nil(t, err)
}

func startTestRoomServer(t *testing.T) (*services.RoomServer, string) {
	roomServer := services.NewRoomServer(services.NewRooms())

	grpcServer := grpc.NewServer()
	pb.RegisterRoomServiceServer(grpcServer, roomServer)

	listener, err := net.Listen("tcp", ":0")
	require.NoError(t, err)

	go grpcServer.Serve(listener)

	return roomServer, listener.Addr().String()
}

func newTestRoomClient(t *testing.T, addr string) pb.RoomServiceClient {
	conn, err := grpc.Dial(addr, grpc.WithInsecure())
	require.NoError(t, err)
	return pb.NewRoomServiceClient(conn)
}
