import { useEffect, useRef } from "react";

const Checkbox = ({ indeterminate, ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
};

export default Checkbox;
