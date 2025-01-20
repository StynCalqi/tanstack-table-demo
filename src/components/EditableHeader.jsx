import { useState } from "react";

const EditableHeader = ({ text, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)} className="cursor-pointer">
      {text}
    </span>
  );
};

export default EditableHeader;
