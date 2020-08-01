package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"

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
	wrappedGrpc := grpcweb.WrapServer(grpcServer,
		grpcweb.WithAllowedRequestHeaders([]string{"*"}),
		grpcweb.WithOriginFunc(func(origin string) bool {
			return true
		}))

	serverAddress := fmt.Sprintf(":%d", *port)
	//http.HandleFunc("/grpc", grpcHandler)
	err := http.ListenAndServe(serverAddress, wrappedGrpc)
	if err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}
	/*

		listener, err := net.Listen("tcp", serverAddress)
		if err != nil {
			log.Fatal("Failed to start server", err)
		}

		err = grpcServer.Serve(listener)
		if err != nil {
			log.Fatal("Failed to start server", err)
		}
	*/
}
