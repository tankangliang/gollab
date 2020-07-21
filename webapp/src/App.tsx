import React, { useState } from "react";
import "./App.css";
import TextEditor from "./components/TextEditor";
import lseq from "./store";

function App() {
  const [value, setValue] = useState<string>("");
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

  return (
    <div>
      <TextEditor value={value} onInsert={onInsert} onDelete={onDelete} />
    </div>
  );
}

export default App;
