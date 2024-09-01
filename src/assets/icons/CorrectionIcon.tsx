import { IconPropsType } from "../../models/AllData.model";

const CorrectionIcon: React.FC<IconPropsType> = ({ color = "#929292" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tw-cursor-pointer	"
    >
      <path
        d="M9.57602 2.32422H6.46018C3.89768 2.32422 2.29102 4.13839 2.29102 6.70672V13.6351C2.29102 16.2034 3.89018 18.0176 6.46018 18.0176H13.8135C16.3843 18.0176 17.9835 16.2034 17.9835 13.6351V10.2784"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.35555 9.10074L13.583 2.87324C14.3589 2.09824 15.6164 2.09824 16.3922 2.87324L17.4064 3.88741C18.1822 4.66324 18.1822 5.92158 17.4064 6.69658L11.1489 12.9541C10.8097 13.2932 10.3497 13.4841 9.86971 13.4841H6.74805L6.82638 10.3341C6.83805 9.87074 7.02721 9.42908 7.35555 9.10074Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.6367 3.83545L16.4417 7.64045"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CorrectionIcon;
