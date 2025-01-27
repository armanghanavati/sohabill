import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const UserIcon: React.FC<IconPropsType> = ({ color }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
    >
      <path
        d="M12.875 12C15.6364 12 17.875 9.76142 17.875 7C17.875 4.23858 15.6364 2 12.875 2C10.1136 2 7.875 4.23858 7.875 7C7.875 9.76142 10.1136 12 12.875 12Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <path
        d="M21.4651 22C21.4651 18.13 17.6152 15 12.8752 15C8.13515 15 4.28516 18.13 4.28516 22"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
