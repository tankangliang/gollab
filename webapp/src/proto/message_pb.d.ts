// package: github.com.tankangliang.gollab
// file: proto/message.proto

import * as jspb from "google-protobuf";
import * as proto_identifier_pb from "../proto/identifier_pb";

export class Message extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  hasIdentifier(): boolean;
  clearIdentifier(): void;
  getIdentifier(): proto_identifier_pb.Identifier | undefined;
  setIdentifier(value?: proto_identifier_pb.Identifier): void;

  hasOutput(): boolean;
  clearOutput(): void;
  getOutput(): string;
  setOutput(value: string): void;

  getRoomid(): string;
  setRoomid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getDataCase(): Message.DataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    type: string,
    identifier?: proto_identifier_pb.Identifier.AsObject,
    output: string,
    roomid: string,
    userid: string,
  }

  export enum DataCase {
    DATA_NOT_SET = 0,
    IDENTIFIER = 2,
    OUTPUT = 5,
  }
}

