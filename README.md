# Gollab

Gollab is an online collaborative code editor inspired by the original Go Playground. The goal is to enable users to create a room with ease and work on code like how the Go playground would be used.

Algorithm for the CRDT can be found [here](https://hal.archives-ouvertes.fr/hal-01552799/document)

## Technologies used

1. Golang
2. React
3. gRPC

## Running the application

```bash
make run # Runs the backend service
make webrun # Runs the frontend
```

Currently, two separate terminals are required to run the application.

## Todo

- [ ] Ability to run the file
- [ ] Display for file execution output
- [ ] Handling tabs
- [ ] Handling multiple key presses like copy paste