// package: github.com.tankangliang.gollab
// file: proto/room.proto

import * as jspb from "google-protobuf";
import * as proto_message_pb from "../proto/message_pb";

export class CreateRoomRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoomRequest): CreateRoomRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoomRequest;
  static deserializeBinaryFromReader(message: CreateRoomRequest, reader: jspb.BinaryReader): CreateRoomRequest;
}

export namespace CreateRoomRequest {
  export type AsObject = {
    id: string,
  }
}

export class CreateRoomResponse extends jspb.Message {
  getAccepted(): boolean;
  setAccepted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoomResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoomResponse): CreateRoomResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRoomResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoomResponse;
  static deserializeBinaryFromReader(message: CreateRoomResponse, reader: jspb.BinaryReader): CreateRoomResponse;
}

export namespace CreateRoomResponse {
  export type AsObject = {
    accepted: boolean,
  }
}

export class ConnectRequest extends jspb.Message {
  getUser(): string;
  setUser(value: string): void;

  getRoomid(): string;
  setRoomid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectRequest): ConnectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConnectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectRequest;
  static deserializeBinaryFromReader(message: ConnectRequest, reader: jspb.BinaryReader): ConnectRequest;
}

export namespace ConnectRequest {
  export type AsObject = {
    user: string,
    roomid: string,
  }
}

export class RunRequest extends jspb.Message {
  getFile(): string;
  setFile(value: string): void;

  getRoom(): string;
  setRoom(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunRequest): RunRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RunRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunRequest;
  static deserializeBinaryFromReader(message: RunRequest, reader: jspb.BinaryReader): RunRequest;
}

export namespace RunRequest {
  export type AsObject = {
    file: string,
    room: string,
  }
}

export class RunResponse extends jspb.Message {
  getOutput(): string;
  setOutput(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RunResponse): RunResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RunResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunResponse;
  static deserializeBinaryFromReader(message: RunResponse, reader: jspb.BinaryReader): RunResponse;
}

export namespace RunResponse {
  export type AsObject = {
    output: string,
  }
}

export class Close extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Close.AsObject;
  static toObject(includeInstance: boolean, msg: Close): Close.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Close, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Close;
  static deserializeBinaryFromReader(message: Close, reader: jspb.BinaryReader): Close;
}

export namespace Close {
  export type AsObject = {
  }
}

