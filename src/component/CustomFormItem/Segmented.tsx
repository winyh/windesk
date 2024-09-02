import { useState, useRef, useEffect } from "react";
import { Segmented } from "antd";

const SegmentedItem = ({ onChange, options, value, id }) => {
  const [segmented, setSegmented] = useState("");

  const onSegmentedChange = (value) => {
    setSegmented(value);
    onChange && onChange(value);
  };

  return (
    <Segmented
      id={id}
      options={options}
      value={segmented || value}
      onChange={onSegmentedChange}
    />
  );
};

export { SegmentedItem };
export default SegmentedItem;
