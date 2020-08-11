# Gollab

Gollab is an online collaborative code editor inspired by the original Go Playground. The goal is to enable users to create a room with ease and work on code like how the Go playground would be used.

**UNSTABLE** Current demo can be found at http://18.188.191.0/

Algorithm for the CRDT can be found [here](https://hal.archives-ouvertes.fr/hal-01552799/document)

## Technologies required

1. Golang
2. React
3. gRPC

## Setting up the application

Installing dependencies for React

```bash
cd webapp/
yarn install
```

## Running the application locally

```bash
make run # Runs the backend service
make webrun # Runs the frontend
```

Currently, two separate terminals are required to run the application.

React supports hot reloading and thus, changes made in the webapp folder will be updated automatically.

The Go backend currently does not have such functionalities and you would have to shut down the server and run `make run` again.

## Docker

There is a docker image I am currently using to run the application on AWS EC2. You can find it at https://hub.docker.com/repository/docker/tankangliang/gollab

This helps to speed up the deployment process but I/O operations are really slow, causing a huge delay in running the file.

Run the following commands to view it locally

```bash
docker pull tankangliang/gollab:latest
docker run --rm -p 3000:3000 -p 8080:8080 tankangliang/gollab:latest --app=3000
```

The web application will be available at localhost:3000 and the backend at port 8080.

## Todo

- [x] Ability to run the file
- [x] Display for file execution output
- [x] Disconnect client when pages closes
- [x] Syncs up users on first load
- [x] Handling tabs
- [x] Handling multiple key presses like copy paste

## Possible Improvements

1. Deploy without Docker and compare speed performances
2. Rewrite of application without React
3. Using websockets instead of gRPC
