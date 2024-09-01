import React, { ReactNode } from "react";
import { Button } from "../Button/index";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "src/common/ui/collapse";
import Filter from "src/assets/icons/Filter";
import { Control } from "react-hook-form";
import LiveSearch, { LiveSearchingProps } from "../LiveSearch";
import { useMediaQuery } from "react-responsive";

interface PropsType extends LiveSearchingProps {
  ButtonComponent?: ReactNode;
  children: JSX.Element[] | JSX.Element;
  redirectTitle: string;
  redirectLink: string;
  icon: string;
  control: Control<any>;
  searchBarPlaceHolder: string;
  handleSearch: () => void;
  name: string;
  allInputsFilter: ReactNode[];
}

const FilterTable: React.FC<PropsType> = ({
  children,
  allInputsFilter,
  placeholder = "جست‌وجو کنید",
  getLists,
  filteredData,
  temporary,
  selectedItem,
  setSelectedItem = () => {},
  showList = true,
  ButtonComponent,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });

  return (
    <div>
      <Collapsible>
        <div className="tw-flex-cols-12 tw-flex tw-flex-col">
          <div className="tw-grid tw-grid-cols-1 tw-justify-between tw-gap-4 lg:tw-grid-cols-6">
            {ButtonComponent}
            {!isSmallScreen && (
              <LiveSearch
                placeholder={placeholder}
                getLists={getLists}
                showList={false}
              />
            )}
            <CollapsibleTrigger className="tw-mx-9 tw-mb-4 tw-rounded-full tw-px-6 ">
              <Button
                size={"default"}
                variant={"white"}
                title="فیلترها"
                className="tw-rounded-full tw-py-2"
                icon={<Filter color="grey" />}
              />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="tw-grid tw-grid-cols-2 tw-gap-3  md:tw-grid-cols-4">
              {allInputsFilter?.map((item: any) => {
                return (
                  <div className="tw-grid tw-grid-cols-1  tw-gap-3">{item}</div>
                );
              })}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default FilterTable;
