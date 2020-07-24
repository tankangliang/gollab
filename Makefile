gen:
	protoc --proto_path=. proto/*.proto --go_out=plugins=grpc:.

clean:
	rm pb/*.go

run:
	go run main.go -port 8080

test:
	go test -cover -race ./...

webgen:
	protoc \
--plugin=protoc-gen-ts=./webapp/node_modules/.bin/protoc-gen-ts \
--js_out=import_style=commonjs,binary:./webapp/src \
--ts_out=service=grpc-web:./webapp/src \
proto/*.proto

