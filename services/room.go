package services

import (
	"errors"
	"sync"

	"github.com/tankangliang/gollab/pb"
)

// ErrRoomAlreadyExists is returned when a user attempts to create an existing room
var ErrRoomAlreadyExists = errors.New("Room already exists")

// RoomStore is the interface to store list of rooms
type RoomStore interface {
	Create(roomID string) error
	GetRoom(roomID string) (*Room, error)
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

// Room holds information about users
type Room struct {
	users []*user
}

type user struct {
	stream pb.RoomService_ConnectServer
	id     string
	err    chan error
}
