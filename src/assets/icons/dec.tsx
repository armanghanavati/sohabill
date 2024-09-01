import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const Dec: React.FC<IconPropsType> = ({
  color = "white",
  width = "14px",
  height = "14px",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.91016 2.33496H0.511719V0.550781H6.91016V2.33496Z"
        fill={color}
      />
    </svg>
  );
};

export default Dec;
