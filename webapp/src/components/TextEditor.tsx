import React from "react";

type Props = {
  value: string;
  onInsert: (val: string, position: number) => void;
  onDelete: (position: number) => void;
};
const TextEditor: React.FC<Props> = (props) => {
  const { value, onInsert, onDelete } = props;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const position = event.currentTarget.selectionStart;
    switch (event.keyCode) {
      case 8:
        onDelete(position);
        break;
      default:
        onInsert(event.key, position);
    }
  };
  return <textarea value={value} onKeyDown={handleKeyDown} />;
};

export default TextEditor;
