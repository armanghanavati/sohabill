import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const TableOption: React.FC<IconPropsType> = ({ className, color = "#4cc19e" }) => {
  return (
    <svg
      className={className}
      width="6"
      height="16"
      viewBox="0 0 6 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5.75C4.24375 5.75 5.25 6.75625 5.25 8C5.25 9.24375 4.24375 10.25 3 10.25C1.75625 10.25 0.75 9.24375 0.75 8C0.75 6.75625 1.75625 5.75 3 5.75ZM0.75 2.5C0.75 3.74375 1.75625 4.75 3 4.75C4.24375 4.75 5.25 3.74375 5.25 2.5C5.25 1.25625 4.24375 0.25 3 0.25C1.75625 0.25 0.75 1.25625 0.75 2.5ZM0.75 13.5C0.75 14.7437 1.75625 15.75 3 15.75C4.24375 15.75 5.25 14.7437 5.25 13.5C5.25 12.2563 4.24375 11.25 3 11.25C1.75625 11.25 0.75 12.2563 0.75 13.5Z"
        fill={color}
      />
    </svg>
  );
};

export default TableOption;
