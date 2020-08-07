import React, { useState, useEffect } from "react";
import "./index.css";
type Props = {
  room: string;
  value: string;
  output: string;
  onInsert: (val: string, position: number) => void;
  onDelete: (position: number) => void;
  onRun: () => void;
  position: { start: number; end: number };
  setPosition: (start: number, end: number) => void;
};

let controlPressed = false;
let shiftPressed = false;

const setControlPressed = (val: boolean) => {
  controlPressed = val;
};

const setShiftPressed = (val: boolean) => {
  shiftPressed = val;
};
const TextEditor: React.FC<Props> = (props) => {
  const {
    value,
    onInsert,
    onDelete,
    room,
    onRun,
    output,
    position,
    setPosition,
  } = props;

  const [lines] = useState<number[]>(new Array(99).fill(0));
  const input = React.createRef<HTMLTextAreaElement>();
  //const [controlPressed, setControlPressed] = useState<boolean>(false);
  //const [shiftPressed, setShiftPressed] = useState<boolean>(false);

  // Redirects cursor to correct position
  useEffect(() => {
    if (input.current) {
      input.current.value = value;
      input.current.selectionStart = position.start;
      input.current.selectionEnd = position.end;
    }
  }, [value, input, position.start, position.end]);

  // Handles pasting of text by adding it one by one to the document
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const paste = event.clipboardData.getData("Text");
    for (let i = 0; i < paste.length; i++) {
      onInsert(paste.charAt(i), position.start + i);
    }
  };

  // Handles adding of characters into the text
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Shift") setShiftPressed(true);

    let pos = event.currentTarget.selectionStart;
    let end = event.currentTarget.selectionEnd;

    if (event.key === "Control" || controlPressed) {
      setPosition(pos, end);
      setControlPressed(true);
    } else {
      console.log("Ran");
      if (pos !== end) {
        for (let v = end; v > pos; v--) {
          onDelete(v);
        }

        if (event.key === "Backspace") {
          setPosition(pos, pos);
          return;
        }
      }

      if (event.key.length === 1) {
        onInsert(event.key, pos);

        setPosition(pos + 1, pos + 1);
      } else if (event.key === "Backspace") {
        onDelete(pos);
        setPosition(pos - 1, pos - 1);
      } else if (event.key === "Enter") {
        if (shiftPressed) {
          onRun();
        } else {
          onInsert("\n", pos);
          setPosition(pos + 1, pos + 1);
        }
      } else if (event.key === "Tab") {
        onInsert("\t", pos);

        setPosition(pos + 1, pos + 1);
        event.preventDefault();
      }
    }
  };

  // For detection of simultaneous keypresses
  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Control") {
      console.log("CTRL up");
      setControlPressed(false);
    }
    if (event.key === "Shift") {
      console.log("SHIFT up");
      setShiftPressed(false);
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
        <button
          onClick={onRun}
          className="btn align-self-end btn-outline-danger ml-3"
        >
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
            defaultValue={value}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
          />
        </div>
      </div>
      <div className="output">
        {output.split("\n").map((text, i) => (
          <p key={text + i}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default TextEditor;
