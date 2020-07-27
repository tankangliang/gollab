import React, { useState, useEffect } from "react";
import "./index.css";
type Props = {
  room: string;
  value: string;
  onInsert: (val: string, position: number) => void;
  onDelete: (position: number) => void;
};
const TextEditor: React.FC<Props> = (props) => {
  const { value, onInsert, onDelete, room } = props;
  const [position, setPosition] = useState<number>(0);
  const [lines] = useState<number[]>(new Array(99).fill(0));
  const input = React.createRef<HTMLTextAreaElement>();

  console.log(position);
  useEffect(() => {
    if (input && input.current) {
      input.current.focus();
      input.current.selectionStart = position;
      input.current.selectionEnd = position;
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const position = event.currentTarget.selectionStart;
    //console.log(position);
    switch (event.keyCode) {
      case 8:
        onDelete(position);
        break;
      default:
        onInsert(event.key, position);
        setPosition(position);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-5 pb-5 justify-content-center align-items-center">
        Current room is {room}
        <button
          onClick={() => {
            const el = document.createElement("textarea");
            console.log("test");
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
      </div>
      <div className="texteditor">
        <div className="lines">
          {lines.map((_, i) => (
            <div className="line">{i + 1}</div>
          ))}
        </div>
        <div>
          <textarea
            key="editor"
            ref={input}
            value={props.value}
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
