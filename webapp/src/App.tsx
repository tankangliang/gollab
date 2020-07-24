import React, { useState, useEffect } from "react";
import "./App.css";
import TextEditor from "./components/TextEditor";
import { grpc } from "@improbable-eng/grpc-web";
import { Message } from "./proto/message_pb";
import { CreateRoomRequest, ConnectRequest } from "./proto/room_pb";
import { RoomService } from "./proto/room_pb_service";
import lseq from "./store";
import { Identifier } from "./proto/identifier_pb";
import { Triplet } from "./proto/triplet_pb";
import { Request } from "@improbable-eng/grpc-web/dist/typings/invoke";

function App() {
  const [value, setValue] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [request, setRequest] = useState<Request | null>(null);
  useEffect(() => {
    console.log("Running");
    const createRoomReq = new CreateRoomRequest();
    createRoomReq.setId("newroom");
    grpc.unary(RoomService.CreateRoom, {
      request: createRoomReq,
      host: "http://localhost:8080",
      onEnd: (res) => {
        const { status, message } = res;

        if (status === grpc.Code.OK && message) {
          console.log("all ok. got book: ", message.toObject());
        }
      },
    });
  }, []);

  useEffect(() => {
    return () => {
      if (request) {
        request.close();
      }
    };
  }, []);

  const onInsert = (val: string, position: number) => {
    console.log(val, position);
    lseq.insert(val, position);
    setValue(lseq.string);
    console.log(lseq.string);
  };

  const onDelete = (position: number) => {
    lseq.delete(position);
    setValue(lseq.string);
  };

  const onConnect = () => {
    const connectReq = new ConnectRequest();
    connectReq.setRoomid(room);
    connectReq.setUser(user);
    const request = grpc.invoke(RoomService.Connect, {
      request: connectReq,
      host: "http://localhost:8080",
      onMessage: (msg) => {
        console.log(msg.toObject());
      },
      onEnd: (res, message) => {
        console.log("Meessage is ", message);

        console.log(res === grpc.Code.OK);
      },
    });
    setRequest(request);
    request.close();
  };
  const onSendMessage = () => {
    const message = new Message();
    const identifier = new Identifier();
    const triplet = new Triplet();
    triplet.setPath(1);
    triplet.setSite(user);
    triplet.setCount(1);
    identifier.setValue("meme");
    identifier.setTripletsList([triplet]);

    message.setRoomid(room);
    message.setType("insert");
    message.setIdentifier(identifier);

    grpc.unary(RoomService.Broadcast, {
      request: message,
      host: "http://localhost:8080",
      onEnd: (res) => {
        const { status, message } = res;

        if (status === grpc.Code.OK && message) {
          console.log("all ok. got book: ", message.toObject());
        }
      },
    });
  };

  return (
    <div>
      <TextEditor value={value} onInsert={onInsert} onDelete={onDelete} />
      <input
        value={room}
        placeholder="room"
        onChange={(e) => setRoom(e.target.value)}
        type="text"
      />
      <input
        value={user}
        placeholder="user"
        onChange={(e) => setUser(e.target.value)}
        type="text"
      />
      <button onClick={onConnect}>Connect</button>
      <button onClick={onSendMessage}>Send Message</button>
    </div>
  );
}

export default App;
