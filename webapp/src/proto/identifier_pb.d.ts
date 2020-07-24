// package: github.com.tankangliang.gollab
// file: proto/identifier.proto

import * as jspb from "google-protobuf";
import * as proto_triplet_pb from "../proto/triplet_pb";

export class Identifier extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  clearTripletsList(): void;
  getTripletsList(): Array<proto_triplet_pb.Triplet>;
  setTripletsList(value: Array<proto_triplet_pb.Triplet>): void;
  addTriplets(value?: proto_triplet_pb.Triplet, index?: number): proto_triplet_pb.Triplet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Identifier.AsObject;
  static toObject(includeInstance: boolean, msg: Identifier): Identifier.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Identifier, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Identifier;
  static deserializeBinaryFromReader(message: Identifier, reader: jspb.BinaryReader): Identifier;
}

export namespace Identifier {
  export type AsObject = {
    value: string,
    tripletsList: Array<proto_triplet_pb.Triplet.AsObject>,
  }
}

