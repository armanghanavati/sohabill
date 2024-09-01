import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const ProfileMob: React.FC<IconPropsType> = ({
  color = "#595959",
  className,
  id,
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
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      >
        <path
          stroke={color}
          d="M14.5 8C14.5 9.79493 13.0449 11.25 11.25 11.25V12.75C13.8734 12.75 16 10.6234 16 8H14.5ZM11.25 11.25C9.45507 11.25 8 9.79493 8 8H6.5C6.5 10.6234 8.62665 12.75 11.25 12.75V11.25ZM8 8C8 6.20507 9.45507 4.75 11.25 4.75V3.25C8.62665 3.25 6.5 5.37665 6.5 8H8ZM11.25 4.75C13.0449 4.75 14.5 6.20507 14.5 8H16C16 5.37665 13.8734 3.25 11.25 3.25V4.75ZM8.25 15.75H14.25V14.25H8.25V15.75ZM2 11C2 5.89137 6.14137 1.75 11.25 1.75V0.25C5.31294 0.25 0.5 5.06294 0.5 11H2ZM11.25 1.75C16.3586 1.75 20.5 5.89137 20.5 11H22C22 5.06294 17.1871 0.25 11.25 0.25V1.75ZM20.5 11C20.5 13.6233 19.409 15.9905 17.6539 17.6748L18.6925 18.7571C20.7301 16.8016 22 14.0485 22 11H20.5ZM17.6539 17.6748C15.9912 19.2705 13.7358 20.25 11.25 20.25V21.75C14.1382 21.75 16.7617 20.61 18.6925 18.7571L17.6539 17.6748ZM14.25 15.75C15.826 15.75 17.1415 16.8726 17.4376 18.3621L18.9088 18.0697C18.476 15.8918 16.5555 14.25 14.25 14.25V15.75ZM11.25 20.25C8.76425 20.25 6.50884 19.2705 4.84612 17.6748L3.80751 18.7571C5.73833 20.61 8.36182 21.75 11.25 21.75V20.25ZM4.84612 17.6748C3.09103 15.9905 2 13.6233 2 11H0.5C0.5 14.0485 1.76989 16.8016 3.80751 18.7571L4.84612 17.6748ZM8.25 14.25C5.94445 14.25 4.02403 15.8918 3.5912 18.0697L5.06243 18.3621C5.35846 16.8726 6.67396 15.75 8.25 15.75V14.25Z"
          fill="#595959"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
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
    </>
  );
};

export default ProfileMob;
