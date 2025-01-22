import { useState, useEffect, useCallback } from "react";
import parse from "paste-from-excel";

const EditableCell = ({ selectedDecimal, getValue }) => {
  const initialValue = getValue();

  const formatValue = useCallback(
    (value) => {
      return value === ""
        ? value
        : selectedDecimal === "1"
        ? `${value}.0`
        : `${value}.00`;
    },
    [selectedDecimal]
  );
  const [value, setValue] = useState(formatValue(initialValue));

  const onPaste = (e) => {
    return parse(e);
  };

  useEffect(() => {
    setValue(formatValue(initialValue));
  }, [initialValue, selectedDecimal, formatValue]);

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
