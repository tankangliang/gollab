// package: github.com.tankangliang.gollab
// file: proto/room.proto

var proto_room_pb = require("../proto/room_pb");
var proto_message_pb = require("../proto/message_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RoomService = (function () {
  function RoomService() {}
  RoomService.serviceName = "github.com.tankangliang.gollab.RoomService";
  return RoomService;
}());

RoomService.CreateRoom = {
  methodName: "CreateRoom",
  service: RoomService,
  requestStream: false,
  responseStream: false,
  requestType: proto_room_pb.CreateRoomRequest,
  responseType: proto_room_pb.CreateRoomResponse
};

RoomService.Connect = {
  methodName: "Connect",
  service: RoomService,
  requestStream: false,
  responseStream: true,
  requestType: proto_room_pb.ConnectRequest,
  responseType: proto_message_pb.Message
};

RoomService.Broadcast = {
  methodName: "Broadcast",
  service: RoomService,
  requestStream: false,
  responseStream: false,
  requestType: proto_message_pb.Message,
  responseType: proto_room_pb.Close
};

exports.RoomService = RoomService;

function RoomServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RoomServiceClient.prototype.createRoom = function createRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomService.CreateRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RoomServiceClient.prototype.connect = function connect(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(RoomService.Connect, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

RoomServiceClient.prototype.broadcast = function broadcast(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomService.Broadcast, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RoomServiceClient = RoomServiceClient;

