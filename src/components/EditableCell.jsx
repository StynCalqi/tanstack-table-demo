import { useState, useEffect } from "react";
import parse from "paste-from-excel";

const EditableCell = ({ getValue }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onPaste = (e) => {
    return parse(e);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      type="text"
      onChange={(e) => setValue(e.target.value)}
      onPaste={(e) => onPaste(e)}
      className="w-full p-1"
    />
  );
};

export default EditableCell;
