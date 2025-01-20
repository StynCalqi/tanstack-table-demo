/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import parse from "paste-from-excel";

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta.updateData(row.index, column.id, value);
  };

  const onPaste = (e) => {
    return parse(e);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onPaste={(e) => onPaste(e)}
    />
  );
};

export default EditableCell;
