import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/common/ui/tooltips";
import questionIcon from "src/assets/icons/questionIcon.svg";
type TooltisProps = {
  title?: string;
};
const Tooltips = ({ title }: TooltisProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="tw-hidden tw-w-full md:tw-size-10 lg:tw-block">
          <img src={questionIcon} alt="questionIcon" />
        </TooltipTrigger>
        <TooltipContent className="tw-w-[334px] tw-rounded tw-border-0 tw-bg-mainGray-light tw-px-2 tw-py-3">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default Tooltips;
