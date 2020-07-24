gen:
	protoc --proto_path=proto proto/*.proto --go_out=plugins=grpc:pb

clean:
	rm pb/*.go

run:
	go run main.go -port 8080

test:
	go test -cover -race ./...