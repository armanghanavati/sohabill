import WindowMaximizeIcon from "../../assets/icons/WindowMaximizeIcon";
import WindowMinimizeIcon from "../../assets/icons/WindowMinimizeIcon";
import { FAQType } from "./types";

interface FAQCardProp extends FAQType {
  toggle: (id: number | undefined) => void;
  isShowAnswer: boolean;
}

const FAQCard: React.FC<FAQCardProp> = ({
  id,
  question,
  answer,
  isShowAnswer = false,
  toggle,
}) => {
  return (
    <div
      key={`FAQ-card-${id}`}
      className="hs-accordion-group tw-border-t tw-border-solid tw-border-x-white tw-border-b-white tw-border-t-mainGray tw-pt-1.5 "
    >
      <div className="hs-accordion tw-active tw-py-1" id="FAQ-card-heading-one">
        <button
          onClick={() => toggle(id)}
          className="bg-transparent tw-inline-flex tw-w-full	tw-items-center	tw-justify-between tw-gap-x-3 tw-border-none tw-text-justify tw-text-start tw-text-sm tw-font-semibold tw-text-gray-900 tw-transition  lg:tw-text-lg"
          aria-controls="FAQ-card-collapse-one"
        >
          {question}
          <div className="hs-accordion-active:tw-hidden tw-block tw-flex-shrink-0">
            {isShowAnswer ? <WindowMinimizeIcon /> : <WindowMaximizeIcon />}
          </div>
        </button>
        <div
          id="FAQ-card-collapse-one"
          data-state={isShowAnswer}
          className={
            "animate-height-slow tw-hidden tw-w-full tw-overflow-hidden tw-pt-3 tw-duration-300 data-[state=true]:!tw-block"
          }
          aria-labelledby="FAQ-card-heading-one"
        >
          <p className="tw-text-justify tw-text-xs tw-text-gray-900 lg:tw-text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQCard;
