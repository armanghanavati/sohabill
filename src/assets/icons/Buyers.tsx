import { IconPropsType } from "../../models/AllData.model";

const Buyers: React.FC<IconPropsType> = ({
  color = "#595959",
  className,
  id,
}) => {
  return (
    <>
      <svg
        className={className}
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M18.5127 10.8967C19.9077 10.7007 20.9817 9.50473 20.9847 8.05573C20.9847 6.62773 19.9437 5.44373 18.5787 5.21973"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.3535 14.2502C21.7045 14.4522 22.6475 14.9252 22.6475 15.9002C22.6475 16.5712 22.2035 17.0072 21.4855 17.2812"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5117 14.6638C9.29773 14.6638 6.55273 15.1508 6.55273 17.0958C6.55273 19.0398 9.28073 19.5408 12.5117 19.5408C15.7257 19.5408 18.4697 19.0588 18.4697 17.1128C18.4697 15.1668 15.7427 14.6638 12.5117 14.6638Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5114 11.8879C14.6204 11.8879 16.3304 10.1789 16.3304 8.06888C16.3304 5.95988 14.6204 4.24988 12.5114 4.24988C10.4024 4.24988 8.69241 5.95988 8.69241 8.06888C8.68444 10.1709 10.3814 11.8809 12.4834 11.8879H12.5114Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.51009 10.8967C5.11409 10.7007 4.04109 9.50473 4.03809 8.05573C4.03809 6.62773 5.07909 5.44373 6.44409 5.21973"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.669 14.2502C3.318 14.4522 2.375 14.9252 2.375 15.9002C2.375 16.5712 2.819 17.0072 3.537 17.2812"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default Buyers;
