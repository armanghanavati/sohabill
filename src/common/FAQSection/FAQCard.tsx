import WindowMaximizeIcon from "../../assets/icons/WindowMaximizeIcon";
import WindowMinimizeIcon from "../../assets/icons/WindowMinimizeIcon";
import { FAQType } from "../../models/AllData.model";

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
          className="bg-transparent tw-transition tw-inline-flex	tw-w-full	tw-items-center tw-justify-between tw-gap-x-3 tw-border-none tw-text-justify tw-text-start tw-text-sm tw-font-semibold tw-text-gray-900  lg:tw-text-lg"
          aria-controls="FAQ-card-collapse-one"
        >
          {question}
          <div className="hs-accordion-active:tw-hidden tw-block tw-flex-shrink-0">
            {isShowAnswer ? <WindowMinimizeIcon /> : <WindowMaximizeIcon />}
          </div>
        </button>
        <div
          id="FAQ-card-collapse-one"
          className={
            "animate-height-slow tw-w-full tw-overflow-hidden tw-pt-3 tw-duration-300" +
            ` ${isShowAnswer ? "tw-block" : "tw-hidden"}`
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
