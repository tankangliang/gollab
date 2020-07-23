package serializer_test

import (
	"testing"

	"github.com/tankangliang/gollab/pb"
	"github.com/tankangliang/gollab/sample"
	"github.com/tankangliang/gollab/serializer"
	"google.golang.org/protobuf/proto"
)

func TestFileSerializer(t *testing.T) {
	t.Parallel()

	binaryFile := "../tmp/message.bin"
	jsonFile := "../tmp/message.json"
	textFile := "../tmp/message.txt"

	message := sample.NewMessage()
	err := serializer.ProtobufToBinaryFile(message, binaryFile)
	if err != nil {
		t.Errorf("Test failed %w", err)
	}

	message2 := &pb.Message{}
	err = serializer.BinaryFileToProtobuf(message2, binaryFile)
	if err != nil {
		t.Errorf("Test failed %w", err)
	}
	if !proto.Equal(message, message2) {
		t.Errorf("Messages are not the same\nOriginal: %s\nNew: %s", message.String(), message2.String())
	}

	err = serializer.ProtobufToJSONFile(message, jsonFile)
	if err != nil {
		t.Errorf("Test failed %w", err)
	}

	message3 := &pb.Message{}
	err = serializer.JSONFileToProtobuf(message3, jsonFile)
	if err != nil {
		t.Errorf("Test failed %w", err)
	}
	if !proto.Equal(message, message3) {
		t.Errorf("Messages are not the same\nOriginal: %s\nNew: %s", message.String(), message3.String())
	}

	err = serializer.ProtobufToTextFile(message, textFile)
	if err != nil {
		t.Errorf("Test failed %w", err)
	}

	message4 := &pb.Message{}
	err = serializer.TextFileToProtobuf(message4, textFile)
	if err != nil {
		t.Errorf("Test failed %w", err)
	}
	if !proto.Equal(message, message3) {
		t.Errorf("Messages are not the same\nOriginal: %s\nNew: %s", message.String(), message4.String())
	}
}
