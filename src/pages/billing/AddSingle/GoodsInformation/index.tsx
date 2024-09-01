import { useState } from "react";
import {
  FilteredDataState,
  GetListSearchGoods,
  SelectOption,
  SerGetBillInitializeData,
  ValidSteps,
} from "../../../../models/AllData.model";
import { handleLoading, RsetShowModal } from "src/common/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "src/hooks/hook";
import { useMediaQuery } from "react-responsive";
import { Button } from "src/components/Button";
import Plus from "src/assets/icons/Plus";
import asyncWrapper from "src/utils/asyncWrapper";
import { getPersonalizedList } from "src/services/masterServices";
import { useParams } from "react-router-dom";
import { ColumnsType, Table, TableParamsType } from "src/components/Table";
import DeleteIcon from "src/assets/icons/DeleteIcon";
import EditSquare from "src/assets/icons/EditSquare";
import LiveSearch, { SelectedItems } from "src/components/LiveSearch";
import GoodsModals from "src/common/GoodsModal";
import {
  AddGoodsInputModel,
  SelectedItemGoods,
} from "src/common/GoodsModal/type";
import { UseFormGetValues, UseFormReset } from "react-hook-form";
export interface Item {
  id?: number | string;
  stuffCode?: string;
  internalCode?: number | string;
  vat?: number | string;
  unitPrice?: number | string;
  discount?: number | string;
  otherTaxRate?: number | string;
  otherTaxSubject?: string;
  otherLegalFundsRate?: number | string;
  otherLegalFundsSubject?: string;
  stuffDesc?: string;
  currency?: any;
  currencyObject?: null | string;
  measurementUnit?: any;
  measurementUnitObject?: null | string;
  count?: null | number;
}
export interface PropsGoodsInformation {
  selectedItem: SelectedItems;
  billInitializeData?: SerGetBillInitializeData;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItems>>;
  checkStatus?: any;
  subjectTypeIdGoods?: SelectOption;
  getValues?: UseFormGetValues<ValidSteps>;
  getTempData: () => void;
  salesPattern?: SelectOption;
}
const GoodsInformation: React.FC<PropsGoodsInformation> = ({
  selectedItem,
  setSelectedItem,
  billInitializeData,
  checkStatus,
  subjectTypeIdGoods,
  getValues,
  getTempData,
  salesPattern,
}) => {
  const { main } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [editData, setEditData] = useState<any>({});
  const [type, setType] = useState({
    editMode: false,
    taxAdditionMode: false,
    singleAdditionMode: false,
    singleEditMode: false,
  });
  const [filteredData, setFilteredData] = useState<FilteredDataState>({});
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 20,
    total: 20,
  });
  const [openModal, setOpenModal] = useState(false);

  const temporary = [
    {
      label: "stuffDesc",
      accessor: (item: Item) => <div>{item.stuffDesc}</div>,
    },

    {
      label: "internalCode",
      accessor: (item: Item) => (
        <div>
          {isSmallScreen
            ? item?.internalCode
            : "شناسه یکتا  : " + item?.internalCode}
        </div>
      ),
    },
  ];

  const getLists = asyncWrapper(
    async (data: string, params: TableParamsType = tableParams) => {
      dispatch(handleLoading({ loading: true }));
      const postData: GetListSearchGoods = {
        query: data,
        page: params?.current || 1,
        size: params?.pageSize || 5,
      };

      const response = await getPersonalizedList(postData);
      dispatch(handleLoading({ loading: false }));
      if (response.data.code === 0) {
        setFilteredData({
          filteredData: response?.data?.result?.items,
          allData: response?.data?.result,
        });
        setSelectedItem &&
          setSelectedItem((prev: SelectedItems) => ({
            ...prev,
            isShowSearchResult: true,
          }));
        dispatch(RsetShowModal({ ...main.showModal, showModal2: false }));
      }
    },
  );

  const handleChangePagination = (params: TableParamsType) => {
    setTableParams(params);
    getLists(undefined, params);
  };
  // this function to delete goods---------------
  const removeItems = (data: AddGoodsInputModel) => {
    if (Array.isArray(selectedItem.result)) {
      const filter: AddGoodsInputModel[] = selectedItem.result.filter(
        (item: AddGoodsInputModel) => item.internalCode !== data.internalCode,
      );

      setSelectedItem({
        result: filter,
        isShowSearchResult: false,
      });
    }
  };
  // this function to edit goods---------------
  function handleEdit(data: Item) {
    setType((prev) => ({
      ...prev,
      singleEditMode: true,
      singleAdditionMode: false,
    }));
    setEditData(data);
    setOpenModal(true);
  }
  const columns: ColumnsType<Item>[] = [
    ...(isSmallScreen
      ? [
          {
            render: (item: Item) => <div>{item.stuffDesc}</div>,
            header: "تعداد",
          },
          {
            render: (item: Item) => <div>{item.unitPrice}</div>,
            header: "مبلغ واحد",
          },
          {
            render: (item: Item) => <div>{item.count}</div>,
            header: "تعداد",
          },
          {
            header: "عملیات",
            render: (data: Item) => {
              return (
                <div className="tw-flex tw-cursor-pointer tw-flex-row tw-justify-center tw-gap-4">
                  <span
                    onClick={() => {
                      handleEdit(data);
                    }}
                  >
                    <EditSquare color="#4CC19E" />
                  </span>
                  <span onClick={() => removeItems(data)}>
                    <DeleteIcon color="#4CC19E" />
                  </span>
                </div>
              );
            },
          },
        ]
      : [
          {
            render: (item: Item) => <div>{item.stuffDesc}</div>,
            header: "شرح کالا",
          },
          {
            render: (item: Item) => <div>{item.count}</div>,
            header: "تعداد",
          },
          {
            render: (item: Item) => <div>{item.unitPrice}</div>,
            header: "مبلغ واحد",
          },
          {
            render: (item: Item) => <div>{item.discount}</div>,
            header: "مبلغ تخفیف",
          },
          {
            render: (item: Item) => <div>{item.vat}</div>,
            header: "درصد مالیات بر ارزش افزوده",
          },
          {
            render: (item: Item) => (
              <div>
                {item.count !== null && item.count !== undefined
                  ? item.count * Number(item.unitPrice) - Number(item.discount)
                  : 0}
              </div>
            ),
            header: "مبلغ کل",
          },
          {
            header: "عملیات",
            render: (data: any) => {
              return (
                <div className="tw-flex tw-flex-row tw-justify-center tw-gap-3">
                  <span
                    onClick={() => {
                      handleEdit(data);
                    }}
                  >
                    <EditSquare color="#4CC19E" />
                  </span>
                  <span onClick={() => removeItems(data)}>
                    <DeleteIcon color="#4CC19E" />
                  </span>
                </div>
              );
            },
          },
        ]),
  ];
  const resultData: AddGoodsInputModel[] = Array.isArray(selectedItem.result)
    ? selectedItem.result
    : [];
  const resultSelect = (
    <Table
      tableParams={tableParams}
      setTableParams={handleChangePagination}
      data={resultData}
      columns={columns}
    />
  );

  const getDataItem = (newItem: AddGoodsInputModel) => {
    setSelectedItem((prevState: any) => {
      const updatedResult = prevState.result.some(
        (item: AddGoodsInputModel) => item.id === newItem.id,
      )
        ? prevState.result.map((item: AddGoodsInputModel) =>
            item.id === newItem.id ? newItem : item,
          )
        : [...prevState.result, newItem];

      return {
        ...prevState,
        result: updatedResult,
        isShowSearchResult: false,
      };
    });
  };

  // this function to add goods data and also read data-------------------
  function handleNewGoods(e: SubmitEvent): void {
    e.preventDefault();
    getTempData();
  }

  return (
    <>
      <LiveSearch
        isDisabled={
          getValues?.("subjectTypeId") === "3" ||
          getValues?.("subjectTypeId") === "4"
        }
        getLists={getLists}
        filteredData={filteredData?.filteredData}
        temporary={temporary}
        children={resultSelect}
        selectedItem={selectedItem}
        setSelectedItem={(data: SelectedItemGoods) => {
          setType((prev) => ({
            ...prev,
            singleAdditionMode: true,
            singleEditMode: false,
          }));
          if (Array.isArray(data.result)) {
            const editData = data?.result?.at(-1);
            setEditData(editData);
            setOpenModal(true);
          }
        }}
        ButtonComponent={
          <Button
            size={"smm"}
            variant={"outLine_default"}
            title="کالا جدید"
            className="tw-gap-1 lg:tw-gap-2"
            icon={<Plus color="#4CC19E" />}
            onClick={handleNewGoods}
            disabled={
              getValues?.("subjectTypeId") === "3" ||
              getValues?.("subjectTypeId") === "4"
            }
          />
        }
      />
      <GoodsModals
        openModal={openModal}
        editData={editData}
        setOpenModal={setOpenModal}
        type={type}
        billInitializeData={billInitializeData}
        setSelectedItem={setSelectedItem}
        getSelectedItem={getDataItem}
        checkStatus={checkStatus}
        subjectTypeId={subjectTypeIdGoods}
        salesPattern={salesPattern}
      />
    </>
  );
};

export default GoodsInformation;
