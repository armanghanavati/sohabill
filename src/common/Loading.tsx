import React from "react";
import { cn } from "src/utils/tailwind-utils";

const Loading: React.FC = () => {
  return (
    <div
      className={cn(
        "tw-fixed tw-left-0 tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center tw-bg-[#1E1E1E]/30",
      )}
    >
      <div className="tw-relative tw-gap-12">
        <div className="tw-absolute tw-h-12 tw-w-12 -tw-translate-x-full tw-animate-[wave_1800ms_linear_infinite] tw-rounded-full tw-bg-[#4CC19E]"></div>
        <div className="tw-absolute tw-h-12 tw-w-12 -tw-translate-x-full tw-animate-[wave_1800ms_linear_infinite] tw-rounded-full tw-bg-[#D4F0E8] tw-delay-500"></div>
        <div className="tw-absolute tw-h-12 tw-w-12 -tw-translate-x-full tw-animate-[wave_1800ms_linear_infinite] tw-rounded-full tw-bg-[#FFFFFF] tw-delay-1000"></div>
      </div>
    </div>
  );
};

export default Loading;
