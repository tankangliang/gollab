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
	serverPort := flag.Int("server", 8080, "port to run grpc server on")
	appPort := flag.Int("app", 80, "port to run webapp on")
	runApp := flag.Bool("production", true, "run in production with static file host")
	flag.Parse()

	roomServer := services.NewRoomServer(services.NewRooms())
	grpcServer := grpc.NewServer()
	pb.RegisterRoomServiceServer(grpcServer, roomServer)
	reflection.Register(grpcServer)
	wrappedGrpc := grpcweb.WrapServer(grpcServer,
		grpcweb.WithAllowedRequestHeaders([]string{"*"}),
		grpcweb.WithOriginFunc(func(origin string) bool {
			return true
		}))
	fmt.Println(*runApp)
	if *runApp {
		go func() {
			fs := http.FileServer(http.Dir("./public"))
			http.Handle("/", fs)
			appAddress := fmt.Sprintf(":%d", *appPort)
			log.Println("Serving static on port ", *appPort)
			err := http.ListenAndServe(appAddress, nil)
			if err != nil {
				log.Fatal(err)
			}
		}()

	}

	serverAddress := fmt.Sprintf(":%d", *serverPort)
	log.Printf("Starting server on port %d\n", *serverPort)
	err := http.ListenAndServe(serverAddress, wrappedGrpc)
	if err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}

}
