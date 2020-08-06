import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TextEditor from "./components/texteditor";
import template from "./template";

// GRPC
import { grpc } from "@improbable-eng/grpc-web";
import { Request } from "@improbable-eng/grpc-web/dist/typings/invoke";

// PB
import { Message } from "./proto/message_pb";
import {
  CreateRoomRequest,
  ConnectRequest,
  RunRequest,
  RunResponse,
} from "./proto/room_pb";
import { RoomService } from "./proto/room_pb_service";
import { Identifier } from "./proto/identifier_pb";

// LSEQ
import LSEQ from "./lseq";
import LocalIdentifier from "./lseq/identifier";
import * as converter from "./helpers/converter";

const HOST =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.207:8080"
    : "http://18.188.191.0:8080";

let position = {
  at: 0,
};
const setPosition = (newval: { at: number }) => {
  position = newval;
};
function App() {
  const [value, setValue] = useState<string>("");
  const [lseq, setLSEQ] = useState<LSEQ>(new LSEQ());
  // const [position, setPosition] = useState<{ at: number }>({ at: 0 });
  const [roomCode, setRoomCode] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [request, setRequest] = useState<Request | null>(null);
  const input = React.createRef<HTMLTextAreaElement>();

  useEffect(() => {
    return () => {
      if (request) {
        request.close();
      }
    };
  }, [request]);

  const onCreate = () => {
    const newRoom = LSEQ.getRandomString(1);
    console.log(newRoom);
    const createRoomReq = new CreateRoomRequest();
    createRoomReq.setId(newRoom);
    setLoading(true);
    grpc.unary(RoomService.CreateRoom, {
      request: createRoomReq,
      host: HOST,
      onEnd: (res) => {
        const { status } = res;
        if (status === grpc.Code.OK) {
          connect(newRoom, true);
        } else {
          setError("Failed to create room");
        }
        setLoading(false);
      },
    });
  };

  const connect = (roomToJoin: string, newRoom: boolean) => {
    const connectReq = new ConnectRequest();
    connectReq.setRoomid(roomToJoin);
    const user = LSEQ.getRandomString(5);
    connectReq.setUser(user);
    setUser(user);
    setLoading(true);
    const request = grpc.invoke(RoomService.Connect, {
      request: connectReq,
      host: HOST,
      onMessage: (msg) => {
        const received = msg.toObject() as Message.AsObject;
        switch (received.type) {
          case "success":
            console.log(received);
            lseq.site = user;
            if (newRoom) {
              for (let i = 0; i < template.length; i++) {
                lseq.insert(template.charAt(i), i);
              }
            }
            setLoading(false);
            setRoom(received.roomid);
            break;
          case "sendstate":
            console.log("sending state");
            lseq.values.forEach((val) => {
              onSendMessage("insert", received.roomid, val);
            });

            break;
          case "output":
            setOutput(received.output);
            break;
          default:
            const identifier = converter.pbIdentifierToLocalIdentifier(
              received.identifier as Identifier.AsObject
            );

            const positionChanged = lseq.broadcast(received.type, identifier);

            if (positionChanged !== -1) {
              if (positionChanged < position.at) {
                if (received.type === "insert")
                  setPosition({ at: position.at + 1 });
                if (received.type === "delete")
                  setPosition({ at: position.at + 1 });
              }
            }

            break;
        }

        setValue(lseq.string);
      },
      onEnd: (res, message) => {
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
    connect(roomCode, false);
  };

  const onInsert = (val: string, pos: number) => {
    const identifier = lseq.insert(val, pos);
    setValue(lseq.string);
    onSendMessage("insert", room, identifier);
  };

  const onDelete = (position: number) => {
    if (position === 0) return;
    const identifier = lseq.delete(position);
    setValue(lseq.string);
    onSendMessage("delete", room, identifier);
  };

  const onSendMessage = (
    type: string,
    roomID: string,
    iden?: LocalIdentifier,
    output?: string
  ) => {
    const message = new Message();

    message.setRoomid(roomID);
    message.setType(type);
    if (iden) {
      const identifier = converter.localIdentifierToPbIdentifier(iden);
      message.setIdentifier(identifier);
    }

    if (output) {
      message.setOutput(output);
    }

    message.setUserid(user);

    grpc.unary(RoomService.Broadcast, {
      request: message,
      host: HOST,
      onEnd: (res) => {
        const { status, message } = res;
      },
    });
  };

  const onRun = () => {
    const runRequest = new RunRequest();
    runRequest.setRoom(room);
    runRequest.setFile(lseq.string);
    grpc.unary(RoomService.Run, {
      request: runRequest,
      host: HOST,
      onEnd: (res) => {
        const { status, message, statusMessage } = res;
        const data = message?.toObject() as RunResponse.AsObject;
        if (status === grpc.Code.OK) {
          setOutput(data.output);
          onSendMessage("output", room, undefined, data.output);
        } else {
          const out = statusMessage.replace(/tmp\//g, "\n");
          setOutput(out);
          onSendMessage("output", room, undefined, out);
        }
      },
    });
  };

  return (
    <div className="container-fluid ">
      {room && (
        <TextEditor
          room={room}
          value={value}
          output={output}
          onInsert={onInsert}
          onDelete={onDelete}
          onRun={onRun}
          position={position}
          setPosition={(val: number) => setPosition({ at: val })}
          input={input}
        />
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
