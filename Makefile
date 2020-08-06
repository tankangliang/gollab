gen:
	protoc --proto_path=. proto/*.proto --go_out=plugins=grpc:.

clean:
	rm pb/*.go

run:
	go run main.go --server 8080 --production=false

test:
	go test -cover -race ./...

webrun:
	cd webapp && yarn start
	
build:
	cd webapp && yarn build
	cp -r ./webapp/build ./public

webgen:
	protoc \
--plugin=protoc-gen-ts=./webapp/node_modules/.bin/protoc-gen-ts \
--js_out=import_style=commonjs,binary:./webapp/src \
--ts_out=service=grpc-web:./webapp/src \
proto/*.proto

