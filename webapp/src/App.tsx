import React, { useState, useEffect } from "react";
import "./App.css";
import TextEditor from "./components/TextEditor";
import { grpc } from "@improbable-eng/grpc-web";
import { Message } from "./proto/message_pb";
import { CreateRoomRequest, ConnectRequest } from "./proto/room_pb";
import { RoomService } from "./proto/room_pb_service";
import { Identifier } from "./proto/identifier_pb";
import { Request } from "@improbable-eng/grpc-web/dist/typings/invoke";
import LSEQ from "./lseq";
import LocalIdentifier from "./lseq/identifier";
import * as converter from "./helpers/converter";

let lseq = new LSEQ();
function App() {
  const [value, setValue] = useState<string>("");

  const [roomCode, setRoomCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    return () => {
      if (request) {
        request.close();
      }
    };
  }, [request]);

  const onCreate = () => {
    const newRoom = LSEQ.getRandomString(6);
    console.log(newRoom);
    const createRoomReq = new CreateRoomRequest();
    createRoomReq.setId(newRoom);
    setLoading(true);
    grpc.unary(RoomService.CreateRoom, {
      request: createRoomReq,
      host: "http://localhost:8080",
      onEnd: (res) => {
        const { status, message } = res;
        if (status === grpc.Code.OK) {
          connect(newRoom);
        } else {
          setError("Failed to create room");
        }
        setLoading(false);
      },
    });
  };

  const connect = (roomToJoin: string) => {
    const connectReq = new ConnectRequest();
    connectReq.setRoomid(roomToJoin);
    connectReq.setUser(LSEQ.getRandomString(5));
    setLoading(true);
    const request = grpc.invoke(RoomService.Connect, {
      request: connectReq,
      host: "http://localhost:8080",
      onMessage: (msg) => {
        const received = msg.toObject() as Message.AsObject;
        switch (received.type) {
          case "success":
            console.log(received);
            lseq = new LSEQ();
            setLoading(false);
            setRoom(received.roomid);
            break;
          case "insert":
            const identifier = converter.pbIdentifierToLocalIdentifier(
              received.identifier as Identifier.AsObject
            );

            lseq.broadcast(received.type, identifier);

            break;
        }

        setValue(lseq.string);
      },
      onEnd: (res, message) => {
        console.log("Meessage is ", message);

        console.log(res === grpc.Code.OK);
        if (res !== grpc.Code.OK) {
          setError("Unable to join the room " + roomCode);
        }
        setLoading(false);
      },
      onHeaders: (headers) => {
        console.log(headers);
      },
    });
    setRequest(request);
  };

  const onJoin = () => {
    if (!roomCode) {
      setError("Please supply a room code");
    }
    connect(roomCode);
  };

  const onInsert = (val: string, position: number) => {
    const identifier = lseq.insert(val, position);
    onSendMessage(identifier, "insert");
  };

  const onDelete = (position: number) => {
    lseq.delete(position);
    setValue(lseq.string);
  };

  const onSendMessage = (iden: LocalIdentifier, type: string) => {
    const message = new Message();

    const identifier = converter.localIdentifierToPbIdentifier(iden);

    message.setRoomid(room);
    message.setType(type);
    message.setIdentifier(identifier);

    grpc.unary(RoomService.Broadcast, {
      request: message,
      host: "http://localhost:8080",
      onEnd: (res) => {
        const { status, message } = res;
      },
    });
  };

  return (
    <div className="container-fluid ">
      {room && (
        <TextEditor value={value} onInsert={onInsert} onDelete={onDelete} />
      )}
      {error && (
        <div className="row justify-content-center align-item-center">
          <div className="col-4 alert alert-danger text-center" role="alert">
            {error}
          </div>
        </div>
      )}
      {!room && (
        <>
          <div
            style={{ paddingTop: "250px" }}
            className="row justify-content-center align-item-center mt-2"
          >
            <div className="col-2">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={onCreate}
              >
                Create a room
              </button>
            </div>
          </div>
          <div className="row justify-content-center align-item-center mt-2">
            <div className="col-2">
              <div className="input-group">
                <input
                  className="mt-2"
                  value={roomCode}
                  placeholder="room"
                  onChange={(e) => setRoomCode(e.target.value)}
                  type="text"
                />
                <button
                  className="btn btn-outline-primary ml-2 mt-2"
                  onClick={onJoin}
                >
                  Join room
                </button>
              </div>
            </div>
          </div>
          {loading && (
            <div className="row justify-content-center align-item-center mt-2">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
