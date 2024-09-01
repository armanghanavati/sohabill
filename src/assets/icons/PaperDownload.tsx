import React from "react";
import { IconPropsType } from "../../models/AllData.model";

const PaperDownload: React.FC<IconPropsType> = ({ className }) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.7369 2.76175H8.08489C6.00489 2.75378 4.30089 4.41078 4.25089 6.49078V17.2278C4.20589 19.3298 5.87389 21.0698 7.97489 21.1148C8.01189 21.1148 8.04889 21.1158 8.08489 21.1148H16.0729C18.1629 21.0408 19.8149 19.3188 19.803 17.2278V8.03778L14.7369 2.76175Z"
          stroke={className}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.4751 2.75V5.659C14.4751 7.079 15.6241 8.23 17.0441 8.234H19.7981"
          stroke={className}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.6421 15.9497V9.90869"
          stroke={className}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.29639 13.5942L11.6414 15.9492L13.9864 13.5942"
          stroke={className}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default PaperDownload;
