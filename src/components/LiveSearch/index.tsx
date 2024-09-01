import React, { ReactNode, useState, useEffect } from "react";
import Searching from "src/assets/icons/Searching";

export interface LiveSearchingProps<T> {
  placeholder?: string;
  getLists: (data: string) => void;
  filteredData?: T[];
  temporary?: KeyType[];
  children?: ReactNode;
  selectedItem?: SelectedItems;
  setSelectedItem?: (item: T) => void;
  showList?: boolean;
  count?: number;
  ButtonComponent?: ReactNode;
  isDisabled?: boolean;
}

export interface SelectedItems {
  result: null | { [key: string]: any | null };
  isShowSearchResult: boolean;
}

export type KeyType = {
  label: string;
  accessor: string | ((item: any) => JSX.Element);
};

const LiveSearch: React.FC<LiveSearchingProps<any>> = ({
  placeholder = "جست‌وجو کنید",
  getLists,
  filteredData,
  temporary,
  children,
  selectedItem,
  setSelectedItem = () => {},
  showList = true,
  ButtonComponent,
  isDisabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  function handleSelect<T>(item: T) {
    setSelectedItem({
      result: Array.isArray(selectedItem?.result)
        ? [...selectedItem?.result, item]
        : (item as unknown as string),
      isShowSearchResult: false,
      // openModal: true,
    });

    setSearchTerm("");
  }

  useEffect(() => {
    if (hasMounted && (searchTerm !== "" || !showList)) {
      const handler = setTimeout(() => {
        // //todo: این قسمت فعلا کامنت شده بعد از تست پاک شود
        // setSelectedItem({
        //   result: Array.isArray(selectedItem?.result)
        //     ? [...selectedItem?.result]
        //     : selectedItem?.result,
        //   show: true,
        // });
        getLists(searchTerm);
      }, 1000);

      return () => clearTimeout(handler);
    } else {
      setHasMounted(true);
    }
  }, [searchTerm]);

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2">
      <div className="tw-flex tw-w-full tw-gap-2  lg:tw-gap-4">
        {ButtonComponent}
        <div
          className={
            "input input-sm lg:input-base tw-flex !tw-h-9 tw-w-full tw-items-center tw-gap-2 tw-border-none tw-bg-mainGray !tw-py-0 !tw-pr-3 lg:!tw-h-12"
          }
        >
          <Searching color="gray" />
          <input
            className="!tw-h-9 tw-w-full tw-bg-mainGray tw-outline-none lg:!tw-h-12"
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={(e) =>
              e.key === "Enter" && !isDisabled && e.preventDefault()
            }
            disabled={isDisabled}
          />
        </div>
      </div>
      {showList &&
      searchTerm?.length > 0 &&
      selectedItem?.isShowSearchResult ? (
        <div
          className={`${!!filteredData && filteredData?.length > 0 ? "tw-max-h-80 tw-w-full tw-overflow-auto tw-rounded-xl tw-bg-gray-100 tw-px-4 tw-py-1 tw-pl-0 tw-scrollbar-hide lg:tw-px-7 lg:tw-py-2" : "tw-mt-3"}`}
        >
          {!!filteredData && filteredData?.length > 0
            ? filteredData?.map((result, index: number) => (
                <ul
                  key={`filteredData-${index}`}
                  className="tw-m-0 tw-flex tw-w-full tw-cursor-pointer tw-items-center
               tw-justify-start tw-gap-1 tw-border-b tw-border-mainGray  tw-py-1 tw-pl-0"
                  onClick={() => handleSelect(result)}
                >
                  {temporary?.map((key: KeyType, index: number) => {
                    return (
                      <li
                        key={`temporary-${index}`}
                        className="tw-text-gray-700 tw-m-0 tw-flex tw-w-full tw-justify-start tw-py-1 tw-pl-0 tw-text-mdd lg:tw-py-3"
                      >
                        {typeof key?.accessor === "string"
                          ? result[key?.accessor]
                          : key?.accessor(result)}
                      </li>
                    );
                  })}
                </ul>
              ))
            : "اطلاعاتی برای نمایش وجود ندارد"}
        </div>
      ) : null}
      {showList && !!selectedItem?.result && (
        <div className="tw-w-full tw-rounded-xl">{children}</div>
      )}
    </div>
  );
};

export default LiveSearch;
