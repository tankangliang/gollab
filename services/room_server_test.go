package services_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/tankangliang/gollab/pb"
	"github.com/tankangliang/gollab/sample"
	"github.com/tankangliang/gollab/services"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestServerCreateRoom(t *testing.T) {
	t.Parallel()

	reqNoID := sample.NewRoomRequest()
	reqNoID.Id = ""

	reqDuplicateID := sample.NewRoomRequest()
	roomDuplicateID := services.NewRooms()
	err := roomDuplicateID.Create(reqDuplicateID.GetId())
	if err != nil {
		t.Errorf("Failed to create room for duplicate ID: %w", err)
	}

	testCases := []struct {
		name    string
		request *pb.CreateRoomRequest
		rooms   services.RoomStore
		code    codes.Code
	}{
		{
			name:    "Valid ID passed in",
			request: sample.NewRoomRequest(),
			rooms:   services.NewRooms(),
			code:    codes.OK,
		},
		{
			name:    "Invalid no ID",
			request: reqNoID,
			rooms:   services.NewRooms(),
			code:    codes.InvalidArgument,
		},
		{
			name:    "Invalid duplicate ID",
			request: reqDuplicateID,
			rooms:   roomDuplicateID,
			code:    codes.AlreadyExists,
		},
	}

	for i := range testCases {
		tc := testCases[i]

		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			req := tc.request
			server := services.NewRoomServer(tc.rooms)
			res, err := server.CreateRoom(context.Background(), req)

			if tc.code == codes.OK {
				require.NoError(t, err)
				require.NotNil(t, res)
				require.True(t, res.GetAccepted())
			} else {
				require.Error(t, err)
				require.Nil(t, res)
				st, ok := status.FromError(err)
				require.True(t, ok)
				require.Equal(t, st.Code(), tc.code)
			}
		})
	}
}
