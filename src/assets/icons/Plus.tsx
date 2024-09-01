import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const Plus: React.FC<IconPropsType> = ({
  color = "white",
  width = "14px",
  height = "14px",
  disabled,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={`tw-h-5 tw-w-5 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-[5px] ${disabled ? "tw-bg-mainGray" : "tw-bg-[#4CC19E]"} 	tw-fill-white tw-p-1`}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 5.5H8.5V1C8.5 0.447812 8.05219 0 7.5 0H6.5C5.94781 0 5.5 0.447812 5.5 1V5.5H1C0.447812 5.5 0 5.94781 0 6.5V7.5C0 8.05219 0.447812 8.5 1 8.5H5.5V13C5.5 13.5522 5.94781 14 6.5 14H7.5C8.05219 14 8.5 13.5522 8.5 13V8.5H13C13.5522 8.5 14 8.05219 14 7.5V6.5C14 5.94781 13.5522 5.5 13 5.5Z" />
    </svg>
  );
};

export default Plus;
