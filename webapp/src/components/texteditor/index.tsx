import React, { useState, useEffect, useRef } from "react";
import "./index.css";
type Props = {
  room: string;
  value: string;
  onInsert: (val: string, position: number) => void;
  onDelete: (position: number) => void;
};
const TextEditor: React.FC<Props> = (props) => {
  const { value, onInsert, onDelete, room } = props;
  const [localVal, setLocal] = useState<string>("");
  const [position, setPosition] = useState<number>(0);
  const [lines] = useState<number[]>(new Array(99).fill(0));
  const input = useRef<any>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let pos = event.currentTarget.selectionStart;
    let end = event.currentTarget.selectionEnd;

    if (pos !== end) {
      console.log("Start is " + pos.toString() + " End is " + end.toString());

      for (let v = end; v > pos; v--) {
        console.log("deleting", v);
        onDelete(v);
      }

      if (event.key === "Backspace") {
        setPosition(pos);
        return;
      }
    }

    if (event.key.length === 1) {
      onInsert(event.key, pos);
      setPosition(pos + 1);
    } else if (event.key === "Backspace") {
      onDelete(pos);
      console.log("Deleting at ", pos);
      setPosition(pos - 1);
    } else if (event.key === "Enter") {
      onInsert("\n", pos);
      setPosition(pos + 1);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-5 pb-5 justify-content-center align-items-center">
        Current room is {room}
        <button
          onClick={() => {
            // Copy the room code
            const el = document.createElement("textarea");
            el.value = room;
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
          }}
          className="btn btn-outline-primary ml-3"
        >
          Copy Room Code
        </button>
        <button className="btn align-self-end btn-outline-danger ml-3">
          Run
        </button>
      </div>
      <div className="texteditor">
        <div className="lines">
          {lines.map((_, i) => (
            <div key={i} className="line">
              {i + 1}
            </div>
          ))}
        </div>
        <div>
          <textarea
            onScroll={(e) => {
              const element = e.currentTarget;
              const val = element.scrollTop;
              const lines = document.getElementsByClassName("lines")[0];
              (lines as HTMLDivElement).style.marginTop = "-" + val + "px";
            }}
            key="editor"
            ref={input}
            value={localVal}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setPosition(e.currentTarget.selectionStart);
            }}
            onFocus={(e) => {
              e.target.selectionStart = position;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
