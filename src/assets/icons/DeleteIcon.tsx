import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const DeleteIcon: React.FC<IconPropsType> = ({ color = "#929292" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tw-cursor-pointer"
    >
      <path
        d="M16.104 7.89014C16.104 7.89014 15.6515 13.5026 15.389 15.8668C15.264 16.996 14.5665 17.6576 13.424 17.6785C11.2499 17.7176 9.0732 17.7201 6.89986 17.6743C5.8007 17.6518 5.11486 16.9818 4.99236 15.8726C4.7282 13.4876 4.2782 7.89014 4.2782 7.89014"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.2568 5.19971H3.12512"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.5337 5.19974C13.8796 5.19974 13.3162 4.73724 13.1879 4.0964L12.9854 3.08307C12.8604 2.61557 12.4371 2.29224 11.9546 2.29224H8.42707C7.94457 2.29224 7.52123 2.61557 7.39623 3.08307L7.19373 4.0964C7.0654 4.73724 6.50207 5.19974 5.8479 5.19974"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
