package serializer

import (
	"fmt"
	"io/ioutil"

	"google.golang.org/protobuf/encoding/prototext"
	"google.golang.org/protobuf/proto"
)

// ProtobufToBinaryFile takes in a proto message and filename, writing the binary data into the file
func ProtobufToBinaryFile(message proto.Message, filename string) error {
	data, err := proto.Marshal(message)
	if err != nil {
		return fmt.Errorf("Failed to marshal proto message to binary: %w", err)
	}

	err = ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return fmt.Errorf("Failed to write data into file %s: %w", filename, err)
	}

	return nil
}

// BinaryFileToProtobuf reads a binary file into a protobuf message
func BinaryFileToProtobuf(message proto.Message, filename string) error {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("Failed to read file %s: %w", filename, err)
	}

	err = proto.Unmarshal(data, message)
	if err != nil {
		return fmt.Errorf("Failed to unmarshal binary data to proto message: %w", err)
	}

	return nil
}

// ProtobufToJSONFile converts a protobuf message into a JSON file
func ProtobufToJSONFile(message proto.Message, filename string) error {
	data, err := ProtobufToJSON(message)
	if err != nil {
		return fmt.Errorf("Failed to marshal protobuf to JSON: %w", err)
	}

	err = ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return fmt.Errorf("Failed to write to file %s: %w", filename, err)
	}

	return nil
}

// JSONFileToProtobuf reads json from filename and unmarshals into proto message
func JSONFileToProtobuf(message proto.Message, filename string) error {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("Failed to read from file %s: %w", filename, err)
	}

	err = JSONToProtobuf(message, data)
	if err != nil {
		return fmt.Errorf("Failed to unmarshal JSON to protobuf message: %w", err)
	}

	return nil

}

// ProtobufToTextFile converts proto message into a normal text file
func ProtobufToTextFile(message proto.Message, filename string) error {
	data, err := prototext.Marshal(message)
	if err != nil {
		return fmt.Errorf("Failed to marshal proto message to text: %w", err)
	}

	err = ioutil.WriteFile(filename, []byte(string(data)), 0644)
	if err != nil {
		return fmt.Errorf("Failed to write data into file %s: %w", filename, err)
	}

	return nil
}

// TextFileToProtobuf reads text from a file and unmarshals into proto message
func TextFileToProtobuf(message proto.Message, filename string) error {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("Failed to read file %s: %w", filename, err)
	}

	err = prototext.Unmarshal(data, message)
	if err != nil {
		return fmt.Errorf("Failed to unmarshal data into proto message: %w", err)
	}

	return nil
}
