import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const ManagerMob: React.FC<IconPropsType> = ({
  color = "#595959",
  className,
  id,
  gradient,
}) => {
  return (
    <>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      >
        <path
          d="M16.4661 16.2236H9.24609"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.4661 12.0371H9.24609"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.0011 7.86035H9.24609"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.6585 2.75C16.6585 2.75 8.98149 2.754 8.96949 2.754C6.20949 2.771 4.50049 4.587 4.50049 7.357V16.553C4.50049 19.337 6.22249 21.16 9.00649 21.16C9.00649 21.16 16.6825 21.157 16.6955 21.157C19.4555 21.14 21.1655 19.323 21.1655 16.553V7.357C21.1655 4.573 19.4425 2.75 16.6585 2.75Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_41_4261"
            x1="9"
            y1="6"
            x2="9"
            y2="11"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2790AF" />
            <stop offset="1" stop-color="#5CD178" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_41_4261"
            x1="9"
            y1="1"
            x2="9"
            y2="19"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2790AF" />
            <stop offset="1" stop-color="#5CD178" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default ManagerMob;
