package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc/reflection"

	"github.com/tankangliang/gollab/pb"
	"google.golang.org/grpc"

	"github.com/tankangliang/gollab/services"
)

func main() {
	port := flag.Int("port", 80, "port to run application on")
	flag.Parse()
	log.Printf("Starting server on port %d\n", *port)

	roomServer := services.NewRoomServer(services.NewRooms())
	grpcServer := grpc.NewServer()
	pb.RegisterRoomServiceServer(grpcServer, roomServer)
	reflection.Register(grpcServer)

	serverAddress := fmt.Sprintf("localhost:%d", *port)
	listener, err := net.Listen("tcp", serverAddress)
	if err != nil {
		log.Fatal("Failed to start server", err)
	}

	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal("Failed to start server", err)
	}
}
