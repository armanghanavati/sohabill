import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const HomeIcon: React.FC<IconPropsType> = ({ color = "#595959" }) => {
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
        d="M9.145 2.84004L3.755 7.04004C2.855 7.74004 2.125 9.23004 2.125 10.36V17.77C2.125 20.09 4.015 21.99 6.335 21.99H17.915C20.235 21.99 22.125 20.09 22.125 17.78V10.5C22.125 9.29004 21.315 7.74004 20.325 7.05004L14.145 2.72004C12.745 1.74004 10.495 1.79004 9.145 2.84004Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.125 17.99V14.99"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
