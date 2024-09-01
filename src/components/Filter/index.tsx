import { ReactNode } from "react";
import { Button } from "../Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "src/common/ui/collapse";
import Filter from "src/assets/icons/Filter";
import LiveSearch, { LiveSearchingProps } from "../LiveSearch";
import { useMediaQuery } from "react-responsive";

interface PropsType<T> extends LiveSearchingProps<T> {
  allInputsFilter?: ReactNode[];
  ButtonComponent?: ReactNode;
  placeholder?: string;
  hasFilterButton?: boolean;
}

const Filters = <T extends object>({
  allInputsFilter = [],
  ButtonComponent,
  placeholder = "جست‌وجو کنید",
  getLists,
  temporary,
  hasFilterButton = true,
}: PropsType<T>) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });

  const renderLiveSearch = (extraClassNames = "") => (
    <LiveSearch
      placeholder={placeholder}
      getLists={getLists}
      showList={false}
      temporary={temporary}
      setSelectedItem={() => {}}
    />
  );

  const renderFilterButton = () => (
    <Button
      size="default"
      variant="white"
      title="فیلترها"
      className="tw-rounded-full tw-px-4 tw-py-1 tw-text-gray-800 lg:!tw-py-2"
      icon={<Filter color="gray" />}
    />
  );

  const renderCollapsibleTrigger = () => (
    <CollapsibleTrigger className="tw-rounded-full">
      {hasFilterButton && renderFilterButton()}
    </CollapsibleTrigger>
  );

  return (
    <div>
      <Collapsible>
        <div className="tw-flex-cols-12 tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-5 sm:tw-flex-nowrap">
            {ButtonComponent}
            {isSmallScreen && ButtonComponent && renderCollapsibleTrigger()}
            {!isSmallScreen && (
              <>
                {renderLiveSearch()}
                {renderCollapsibleTrigger()}
              </>
            )}
          </div>
          {isSmallScreen && (
            <div className="tw-mt-3.5 tw-flex tw-gap-4">
              {renderLiveSearch()}
              {!ButtonComponent && renderCollapsibleTrigger()}
            </div>
          )}
          <CollapsibleContent>
            <div className="tw-mt-3.5 tw-grid tw-grid-cols-2 tw-items-end tw-justify-end tw-gap-x-7 tw-gap-y-3 lg:tw-grid-cols-4 lg:tw-gap-y-8">
              {allInputsFilter.map((item, index) => (
                <div
                  key={index}
                  className={
                    allInputsFilter.length === index + 1
                      ? "tw-col-start-2 !tw-justify-self-end lg:tw-col-start-4"
                      : ""
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default Filters;
