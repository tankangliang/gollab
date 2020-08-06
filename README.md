# Gollab

Gollab is an online collaborative code editor inspired by the original Go Playground. The goal is to enable users to create a room with ease and work on code like how the Go playground would be used.

Current demo can be found at http://18.188.191.0/

Algorithm for the CRDT can be found [here](https://hal.archives-ouvertes.fr/hal-01552799/document)

## Technologies used

1. Golang
2. React
3. gRPC

## Setting up the application

```bash
cd webapp/
yarn install
```

## Running the application

```bash
make run # Runs the backend service
make webrun # Runs the frontend

```

Currently, two separate terminals are required to run the application.

More details can be found in the `main.go` file.

## Docker

There is a docker image I am currently using to run the application on AWS EC2. You can find it at https://hub.docker.com/repository/docker/tankangliang/gollab

Run the following commands to view it locally

```bash
docker pull tankangliang/gollab:latest
docker run --rm -p 3000:3000 -p 8080:8080 tankangliang/gollab:latest --app=3000
```

## Todo

- [x] Ability to run the file
- [x] Display for file execution output
- [x] Disconnect client when pages closes
- [x] Syncs up users on first load
- [ ] Handling tabs
- [ ] Handling multiple key presses like copy paste
