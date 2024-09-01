import { IconPropsType } from "../../models/AllData.model";

const chevronup: React.FC<IconPropsType> = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke="#A0A0A0"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default chevronup;