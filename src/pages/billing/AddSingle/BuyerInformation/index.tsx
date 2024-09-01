import { useState } from "react";
import {
  FilteredDataState,
  GetListSearch,
  SerGetBillInitializeData,
  ValidSteps,
} from "../../../../models/AllData.model";
import { handleLoading } from "src/common/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "src/hooks/hook";
import { useMediaQuery } from "react-responsive";
import { Button } from "src/components/Button";
import Plus from "src/assets/icons/Plus";
import asyncWrapper from "src/utils/asyncWrapper";
import { getList } from "src/services/masterServices";
import LiveSearch, { SelectedItems } from "src/components/LiveSearch";
import Modal from "src/components/Modal";
import BuyerData from "src/common/BuyerData";
import { UseFormGetValues } from "react-hook-form";

export type KeyType = {
  label: string;
  accessor: string | ((item: any) => JSX.Element);
};
export interface Item {
  firstName?: string;
  lastName?: string;
  personCode?: string;
  passportNumber?: string;
  economicCode?: string;
}

export interface PropsBuyerInformation {
  selectedItem: SelectedItems;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItems>>;
  billInitializeData: SerGetBillInitializeData | undefined;
  getValues?: UseFormGetValues<ValidSteps>;
}

const BuyerInformation: React.FC<PropsBuyerInformation> = ({
  selectedItem,
  setSelectedItem,
  billInitializeData,
  getValues,
}) => {
  const dispatch = useAppDispatch();
  const [filteredData, setFilteredData] = useState<FilteredDataState>({});
  const isSmallScreen = useMediaQuery({ query: "(max-width: 780px)" });
  const [openModal, setOpenModal] = useState(false);

  const temporary = [
    ...(isSmallScreen
      ? [
          {
            label: "firstName",
            accessor: (item: Item) => (
              <div>
                {"نام خریدار : " +
                  (!!item?.firstName ? item?.firstName : "-") +
                  " " +
                  (!!item?.lastName ? item?.lastName : "-")}
              </div>
            ),
          },
          {
            label: "personCode",
            accessor: (item: Item) => (
              <div>
                {"شماره ملی : " + (!!item?.personCode ? item?.personCode : "-")}
              </div>
            ),
          },
        ]
      : [
          {
            label: "firstName",
            accessor: (item: Item) => (
              <div>
                {"نام خریدار : " +
                  (!!item?.firstName ? item?.firstName : "-") +
                  " " +
                  (!!item?.lastName ? item?.lastName : "-")}
              </div>
            ),
          },
          {
            label: "personCode",
            accessor: (item: Item) => (
              <div>
                {"شماره ملی : " +
                  (!!item && !!item?.personCode ? item?.personCode : "-")}
              </div>
            ),
          },
          // {
          //   label: "passportNumber",
          //   accessor: (item: Item) => (
          //     <div>{"کد خریدار : " + item.passportNumber}</div>
          //   ),
          // },
          {
            label: "economicCode",
            accessor: (item: Item) => (
              <div>
                {"کد اقتصادی : " +
                  (!!item?.economicCode ? item?.economicCode : "-")}
              </div>
            ),
          },
        ]),
  ];
  const getLists = asyncWrapper(async (data: string) => {
    const postData: GetListSearch = {
      query: data || null,
      pageNumber: 1 || filteredData?.allData?.pageNumber,
      pageSize: 5 || filteredData?.allData?.pageSize,
    };
    dispatch(handleLoading({ loading: true }));
    const response = await getList(postData);
    dispatch(handleLoading({ loading: false }));
    if (response.data.code === 0) {
      setFilteredData({
        filteredData: response?.data?.result?.items,
        allData: response?.data?.result,
      });
      setSelectedItem((prev: SelectedItems) => ({
        ...prev,
        isShowSearchResult: true,
      }));
    }
  });

  const resultSelect = (
    <ul
      className="!tw-mb-0 tw-mt-3.5 tw-flex
               tw-w-full tw-cursor-pointer tw-items-center tw-py-1 tw-pl-0"
    >
      {temporary.map((key: KeyType, index: number) => {
        return (
          <li
            key={index}
            className="tw-text-gray-700 tw-text-mddlg:tw-py-4 tw-m-0 tw-flex tw-w-full tw-justify-start tw-py-2"
          >
            {typeof key?.accessor === "string"
              ? (selectedItem?.result as { [key: string]: string | null })[
                  key?.accessor
                ]
              : key?.accessor(selectedItem?.result)}
          </li>
        );
      })}
    </ul>
  );

  const handleSaveBuyerInformation = (data: any) => {
    if (openModal) {
      setSelectedItem((prev: SelectedItems) => ({
        ...prev,
        result: data,
      }));
      setOpenModal(false);
    }
  };

  return (
    <>
      <LiveSearch
        getLists={getLists}
        filteredData={filteredData?.filteredData}
        temporary={temporary}
        children={resultSelect}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isDisabled={
          getValues?.("subjectTypeId") === "2" ||
          getValues?.("subjectTypeId") === "3" ||
          getValues?.("subjectTypeId") === "4"
        }
        ButtonComponent={
          <Button
            size={"smm"}
            variant={"outLine_default"}
            title="خریدار جدید"
            className="tw-mt-0 tw-gap-1 lg:tw-gap-2"
            icon={<Plus color="#4CC19E" />}
            disabled={
              getValues?.("subjectTypeId") === "2" ||
              getValues?.("subjectTypeId") === "3" ||
              getValues?.("subjectTypeId") === "4"
            }
            onClick={() => {
              setOpenModal(true);
            }}
          />
        }
      />
      <Modal
        isOpen={openModal}
        title=""
        className="!tw-h-[100vh] !tw-max-h-[100vh] !tw-w-full !tw-max-w-[100%]"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <BuyerData
          billInitializeData={billInitializeData}
          handleSaveBuyerInformation={handleSaveBuyerInformation}
        />
      </Modal>
    </>
  );
};

export default BuyerInformation;
