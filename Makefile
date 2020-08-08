# Generates proto files for Go
gen:
	protoc --proto_path=. proto/*.proto --go_out=plugins=grpc:.

# Generates proto files for Typescript
webgen:
	protoc \
--plugin=protoc-gen-ts=./webapp/node_modules/.bin/protoc-gen-ts \
--js_out=import_style=commonjs,binary:./webapp/src \
--ts_out=service=grpc-web:./webapp/src \
proto/*.proto

# Removes proto files for go
clean:
	rm pb/*.go

# Runs the server in development
run:
	go run main.go --server 8080 --production=false

# Runs the webapp in development
webrun:
	cd webapp && yarn start

# Run tests for server
test:
	go test -cover -race ./...

# Builds production version of React and copies to root folder
build:
	rm -rf ./public
	cd webapp && yarn build
	cp -r ./webapp/build ./public

