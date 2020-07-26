import React, { useState, useEffect } from "react";

type Props = {
  value: string;
  onInsert: (val: string, position: number) => void;
  onDelete: (position: number) => void;
};
const TextEditor: React.FC<Props> = (props) => {
  const { value, onInsert, onDelete } = props;
  const [position, setPosition] = useState<number>(0);
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
  );
};

export default TextEditor;
