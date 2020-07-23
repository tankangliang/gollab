package serializer

import (
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
)

// ProtobufToJSON converts a protobuf message to JSON
func ProtobufToJSON(message proto.Message) ([]byte, error) {
	marshaler := protojson.MarshalOptions{
		Indent:          "  ",
		AllowPartial:    true,
		UseProtoNames:   false,
		UseEnumNumbers:  false,
		EmitUnpopulated: true,
	}

	return marshaler.Marshal(message)
}

// JSONToProtobuf converts a JSON object to protobuf message
func JSONToProtobuf(message proto.Message, data []byte) error {
	unmarshaler := protojson.UnmarshalOptions{
		AllowPartial:   true,
		DiscardUnknown: true,
	}

	return unmarshaler.Unmarshal(data, message)
}
