import React from "react";
import { IconPropsType } from "src/models/AllData.model";

const FirstPage: React.FC<IconPropsType> = () => {
  return (
    <svg
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.58984 1.41L12.1698 6L7.58984 10.59L8.99984 12L14.9998 6L8.99984 0L7.58984 1.41Z"
        fill="#CAC9C9"
      />
      <path
        d="M0.180176 1.41L4.76018 6L0.180176 10.59L1.59018 12L7.59018 6L1.59018 0L0.180176 1.41Z"
        fill="#CAC9C9"
      />
    </svg>
  );
};

export default FirstPage;
