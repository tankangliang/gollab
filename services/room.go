package services

import (
	"errors"
	"log"
	"sync"

	"github.com/tankangliang/gollab/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// ErrRoomAlreadyExists is returned when a user attempts to create an existing room
var ErrRoomAlreadyExists = errors.New("Room already exists")

// RoomStore is the interface to store list of rooms
type RoomStore interface {
	Create(roomID string) error
	GetRoom(roomID string) (*Room, error)
	AddUser(u *user, roomID string) error
	RemoveUser(u *user, roomID string)
	Broadcast(message *pb.Message)
}

// Rooms is an implementation of the RoomStore
type Rooms struct {
	mutex sync.RWMutex
	rooms map[string]*Room
}

// NewRooms returns Rooms which implements RoomStore
func NewRooms() *Rooms {
	return &Rooms{
		rooms: make(map[string]*Room),
	}
}

// Create attempts to create a new room, if room already exists, ErrRoomAlreadyExists is returned, else the room is created and no errors are returned
func (r *Rooms) Create(roomID string) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	if r.rooms[roomID] != nil {
		return ErrRoomAlreadyExists
	}

	r.rooms[roomID] = &Room{
		users: make([]*user, 0),
	}

	return nil
}

// GetRoom checks if there is a room with the given ID
func (r *Rooms) GetRoom(roomID string) (*Room, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	room, ok := r.rooms[roomID]
	if !ok {
		return nil, errors.New("Room not found")
	}

	return room, nil
}

// AddUser adds the user into the specified room
func (r *Rooms) AddUser(u *user, roomID string) error {
	log.Println("Adding user with id ", u.id)
	r.mutex.Lock()
	defer r.mutex.Unlock()
	room, ok := r.rooms[roomID]
	if !ok {
		return errors.New("Room not found")
	}
	if !ok {
		log.Println("Could not find room")
		return status.Errorf(codes.InvalidArgument, "No such room found")
	}
	room.users = append(room.users, u)
	return nil
}

// RemoveUser removes a user from the room
func (r *Rooms) RemoveUser(u *user, roomID string) {
	log.Println("Removing  user with id ", u.id)
	r.mutex.Lock()
	defer r.mutex.Unlock()
	room := r.rooms[roomID]
	log.Println("Current state is ", room.users)
	for i := range room.users {
		if room.users[i].id == u.id {
			if i < len(room.users)-1 {
				room.users = append(room.users[:i], room.users[i+1:]...)
			} else {
				room.users = room.users[:i]
			}

		}
	}

	if len(room.users) == 0 {
		delete(r.rooms, roomID)
	}

}

// Broadcast takes the message and disseminates to all users
func (r *Rooms) Broadcast(message *pb.Message) {
	roomID := message.GetRoomID()

	r.mutex.Lock()
	defer r.mutex.Unlock()
	room := r.rooms[roomID]
	for _, user := range room.users {
		log.Printf("Sending message %s to user %s\n", message.String(), user.id)
		err := user.stream.Send(message)
		if err != nil {
			log.Printf("Failed to send message: %s\n", err)
			status.Errorf(codes.Internal, "Error sending message %s", err)
			user.err <- err
		}
	}

}

// Room holds information about users
type Room struct {
	users []*user
}

type user struct {
	stream pb.RoomService_ConnectServer
	id     string
	err    chan error
}
