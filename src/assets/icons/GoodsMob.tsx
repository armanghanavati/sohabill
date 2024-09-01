import { IconPropsType } from "../../models/AllData.model";

const GoodsMob: React.FC<IconPropsType> = ({
  color = "#595959",
  className = "",
}) => {
  return (
    <div>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M3.125 3.24988L5.205 3.60988L6.168 15.0829C6.245 16.0199 7.028 16.7389 7.968 16.7359H18.877C19.774 16.7379 20.535 16.0779 20.662 15.1899L21.611 8.63188C21.717 7.89888 21.208 7.21888 20.476 7.11288C20.412 7.10388 5.539 7.09888 5.539 7.09888"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.5 10.7948H17.273"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.52935 20.2025C7.83035 20.2025 8.07335 20.4465 8.07335 20.7465C8.07335 21.0475 7.83035 21.2915 7.52935 21.2915C7.22835 21.2915 6.98535 21.0475 6.98535 20.7465C6.98535 20.4465 7.22835 20.2025 7.52935 20.2025Z"
          fill="#595959"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.8096 20.2025C19.1106 20.2025 19.3546 20.4465 19.3546 20.7465C19.3546 21.0475 19.1106 21.2915 18.8096 21.2915C18.5086 21.2915 18.2656 21.0475 18.2656 20.7465C18.2656 20.4465 18.5086 20.2025 18.8096 20.2025Z"
          fill="#595959"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default GoodsMob;
