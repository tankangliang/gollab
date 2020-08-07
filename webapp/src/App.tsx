import React, { useState, useEffect } from "react";
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
    ? "http://localhost:8080"
    : "http://18.188.191.0:8080";

// Somehow using position as a state doesn't work in the callback handler of connect
let position = {
  start: 0,
  end: 0,
};
const setPosition = (newval: { start: number; end: number }) => {
  position = newval;
};

function App() {
  const [value, setValue] = useState<string>("");
  const [lseq, setLSEQ] = useState<LSEQ>(new LSEQ());
  const [roomCode, setRoomCode] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [request, setRequest] = useState<Request | null>(null);

  // Disconnects from backend when screen is unmounted
  useEffect(() => {
    return () => {
      if (request) {
        request.close();
      }
    };
  }, [request]);

  // Click handler for Create a room button
  // Generates a random string as room code
  // On successful room creation, attempts to connect to created room
  const onCreate = () => {
    const newRoom = LSEQ.getRandomString(6);
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

  // Connects to the room, if it is a new room, insert the default Hello world template
  // Defines the callback handler for responding to different types of incoming messages
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
          // Successful connection to room
          case "success":
            // Sets lseq site identifier to user id
            lseq.site = user;
            if (newRoom) {
              for (let i = 0; i < template.length; i++) {
                lseq.insert(template.charAt(i), i);
              }
            }
            setLoading(false);
            // Sets the room to change the current screen
            setRoom(received.roomid);
            setError("");
            break;
          // Prompt to send all identifiers in the skiplist to all other users
          // This is used to sync up other users that join
          case "sendstate":
            lseq.values.forEach((val) => {
              onSendMessage("insert", received.roomid, val);
            });
            break;

          // Receiving the output of running the code by someone else
          case "output":
            setOutput(received.output);
            break;

          // Standard Insert / Delete operations
          default:
            const identifier = converter.pbIdentifierToLocalIdentifier(
              received.identifier as Identifier.AsObject
            );

            const positionChanged = lseq.broadcast(received.type, identifier);

            // If position of insert / delete is less than the current position of the cursor
            // Current position has to be changed to account for the insertion / deletion
            if (positionChanged !== -1) {
              if (positionChanged < position.start) {
                if (received.type === "insert")
                  setPosition({
                    start: position.start + 1,
                    end: position.end + 1,
                  });
                if (received.type === "delete")
                  setPosition({
                    start: position.start - 1,
                    end: position.end - 1,
                  });
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
    });
    setRequest(request);
  };

  // Broadcasting a local action to other users
  // Fields of the message are same as the ones received in onMessage field of connect
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
      onEnd: (res) => {},
    });
  };

  // Sends the current file to server to run code
  // Response received is the output of running the code
  // This output will be broadcasted to other users
  const onRun = () => {
    setOutput("Running...");
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

  // Click handler for Join room button
  const onJoin = () => {
    if (!roomCode) {
      setError("Please supply a room code");
    }
    connect(roomCode, false);
  };

  // Prop passed down to TextEditor for inserting characters
  const onInsert = (val: string, pos: number) => {
    const identifier = lseq.insert(val, pos);
    setValue(lseq.string);
    onSendMessage("insert", room, identifier);
  };

  // Prop passed down to TextEditor for deleting characters
  const onDelete = (position: number) => {
    if (position === 0) return;
    const identifier = lseq.delete(position);
    setValue(lseq.string);
    onSendMessage("delete", room, identifier);
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
          setPosition={(start: number, end: number) =>
            setPosition({ start, end })
          }
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
