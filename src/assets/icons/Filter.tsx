import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const Filter: React.FC<IconPropsType> = ({ color }) => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.60826 10.8274H1.35767"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.95044 2.75024H14.201"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.27183 2.70521C5.27183 1.6255 4.39002 0.75 3.30254 0.75C2.21505 0.75 1.33325 1.6255 1.33325 2.70521C1.33325 3.78492 2.21505 4.66042 3.30254 4.66042C4.39002 4.66042 5.27183 3.78492 5.27183 2.70521Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.6666 10.7948C14.6666 9.7151 13.7855 8.8396 12.698 8.8396C11.6098 8.8396 10.728 9.7151 10.728 10.7948C10.728 11.8745 11.6098 12.75 12.698 12.75C13.7855 12.75 14.6666 11.8745 14.6666 10.7948Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Filter;
