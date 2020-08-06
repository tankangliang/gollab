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
	SendCurrentState(roomID string)
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

// AddUser adds the user into the specified room. The user type
// stores the id of the user as well as the stream to send data to
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
		log.Printf("i is %v, room users is %v, length is %v", i, room.users[i], len(room.users))
		if room.users[i].id == u.id {
			if i < len(room.users)-1 {
				log.Println("First block is ran with length ", len(room.users))
				room.users = append(room.users[:i], room.users[i+1:]...)

			} else {
				log.Println("Second block is ran")
				room.users = room.users[:i]

			}
			break
		}
	}

	if len(room.users) == 0 {
		delete(r.rooms, roomID)
	}

}

// Broadcast takes the message and disseminates to all users in the room
// specified in the message
func (r *Rooms) Broadcast(message *pb.Message) {
	roomID := message.GetRoomID()

	r.mutex.Lock()
	defer r.mutex.Unlock()
	room := r.rooms[roomID]

	for _, user := range room.users {

		if message.GetUserID() == user.id {
			continue
		}
		//log.Printf("Sending message %s to user %s\n", message.String(), user.id)
		err := user.stream.Send(message)
		if err != nil {
			log.Printf("Failed to send message: %s\n", err)
			status.Errorf(codes.Internal, "Error sending message %s", err)
			user.err <- err
		}
	}

}

// SendCurrentState prompts the first user in the list to broadcast
// all identifiers. This is called when a new user joins the room
// and helps to sync them up with what is on the document so far
func (r *Rooms) SendCurrentState(roomID string) {
	log.Println("Asking room to send state")
	r.mutex.Lock()
	defer r.mutex.Unlock()
	firstUser := r.rooms[roomID].users[0]

	firstUser.stream.Send(&pb.Message{
		Type:   "sendstate",
		Data:   &pb.Message_Identifier{},
		RoomID: roomID,
	})
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
