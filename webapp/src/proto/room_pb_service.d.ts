// package: github.com.tankangliang.gollab
// file: proto/room.proto

import * as proto_room_pb from "../proto/room_pb";
import * as proto_message_pb from "../proto/message_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RoomServiceCreateRoom = {
  readonly methodName: string;
  readonly service: typeof RoomService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_room_pb.CreateRoomRequest;
  readonly responseType: typeof proto_room_pb.CreateRoomResponse;
};

type RoomServiceConnect = {
  readonly methodName: string;
  readonly service: typeof RoomService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_room_pb.ConnectRequest;
  readonly responseType: typeof proto_message_pb.Message;
};

type RoomServiceBroadcast = {
  readonly methodName: string;
  readonly service: typeof RoomService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_message_pb.Message;
  readonly responseType: typeof proto_room_pb.Close;
};

type RoomServiceRun = {
  readonly methodName: string;
  readonly service: typeof RoomService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_room_pb.RunRequest;
  readonly responseType: typeof proto_room_pb.RunResponse;
};

export class RoomService {
  static readonly serviceName: string;
  static readonly CreateRoom: RoomServiceCreateRoom;
  static readonly Connect: RoomServiceConnect;
  static readonly Broadcast: RoomServiceBroadcast;
  static readonly Run: RoomServiceRun;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class RoomServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createRoom(
    requestMessage: proto_room_pb.CreateRoomRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_room_pb.CreateRoomResponse|null) => void
  ): UnaryResponse;
  createRoom(
    requestMessage: proto_room_pb.CreateRoomRequest,
    callback: (error: ServiceError|null, responseMessage: proto_room_pb.CreateRoomResponse|null) => void
  ): UnaryResponse;
  connect(requestMessage: proto_room_pb.ConnectRequest, metadata?: grpc.Metadata): ResponseStream<proto_message_pb.Message>;
  broadcast(
    requestMessage: proto_message_pb.Message,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_room_pb.Close|null) => void
  ): UnaryResponse;
  broadcast(
    requestMessage: proto_message_pb.Message,
    callback: (error: ServiceError|null, responseMessage: proto_room_pb.Close|null) => void
  ): UnaryResponse;
  run(
    requestMessage: proto_room_pb.RunRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_room_pb.RunResponse|null) => void
  ): UnaryResponse;
  run(
    requestMessage: proto_room_pb.RunRequest,
    callback: (error: ServiceError|null, responseMessage: proto_room_pb.RunResponse|null) => void
  ): UnaryResponse;
}

