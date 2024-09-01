import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { SelectOption } from "../../models/AllData.model";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ComboBox from "../../components/ComboBox";
import { Button } from "../../components/Button";
import Plus from "../../assets/icons/Plus";
import Input from "../../components/Input";
import PrinterIcon from "src/assets/icons/PrinterIcon";
import SendIcon from "src/assets/icons/SendIcon";
import { ColumnsType, Table, TableParamsType } from "src/components/Table";
import EyeIcon from "src/assets/icons/EyeIcon";
import Filters from "src/components/Filter";
import PrintBillList from "src/components/BillList/PrintBillList";
import DropDown from "./DropDown";
import DatePicker from "src/components/DatePicker";
import asyncWrapper from "src/utils/asyncWrapper";
import { RsetShowToast, handleLoading } from "src/common/slices/mainSlice";
import {
  getBillInitializeData,
  getBillsList,
  printBill,
  serSendBill,
} from "src/services/masterServices";
import StringHelpers from "src/helpers/string-helpers";
import { useMediaQuery } from "react-responsive";
import { BillsListFiltersType, BillsListType, BillsPrintType } from "./types";
import PrintModals from "./PrintModal";
import Tooltips from "src/components/Tooltip";

const BillsList: React.FC = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });
  const dispatch = useAppDispatch();
  const componentRef = useRef<any>();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputsData, setInputsData] = useState<BillsPrintType>();
  const [billStatuses, setBillStatuses] = useState<SelectOption[]>();
  const [tableData, setTableData] = useState<BillsListType[]>([]);
  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  const { control, getValues, setValue } = useForm<BillsListFiltersType>({
    reValidateMode: "onChange",
  });

  const handleGetBillsList = asyncWrapper(
    async (
      obj: BillsListFiltersType = getValues(),
      temporaryTableParams: TableParamsType = {
        current: 1,
        pageSize: 20,
        total: 20,
      },
    ) => {
      const postData: BillsListFiltersType = {
        taxId: obj?.taxId || "",
        buyerPersonCode: obj?.buyerPersonCode || "",
        statusId: obj?.status?.id || 0,
        serial: obj?.serial || "",
        issueDate: StringHelpers.convertDatePer(obj?.issueDate) || "",
        createDate: StringHelpers.convertDatePer(obj?.createDate) || "",
        page: temporaryTableParams?.current || 1,
        size: temporaryTableParams?.pageSize || 20,
      };
      setLoading(true);
      const newData = await getBillsList(postData);
      setLoading(false);
      if (newData.data.code === 0) {
        setTableData(newData?.data?.result?.items);
        setTableParams((prev: TableParamsType) => ({
          ...prev,
          current: newData?.data?.result?.pageNumber,
          pageSize: newData?.data?.result?.pageSize,
          total: newData?.data?.result?.totalCount,
        }));
      }
    },
  );

  const getBillInitialize = asyncWrapper(async () => {
    const {
      data: {
        result: { billStatuses },
      },
    } = await getBillInitializeData();
    setBillStatuses([
      {
        id: 0,
        title: "انتخاب کنید...",
      },
      ,
      ...billStatuses,
    ]);
  });

  const handleContollerSearch = (e: any) => {
    e?.preventDefault();
    const controllerValues = getValues();
    handleGetBillsList({ ...controllerValues });
  };

  const getLists = (value: string) => {
    const values = getValues();
    setValue("serial", value);
    handleGetBillsList({ ...values, serial: value });
  };

  const handleChangePagination = (params: TableParamsType) => {
    const values = getValues();
    handleGetBillsList({ ...values }, params);
  };

  const handleSendBill = asyncWrapper(async (id: number) => {
    dispatch(handleLoading({ loading: true }));
    const res = await serSendBill(id);
    dispatch(handleLoading({ loading: false }));
    if (res?.data?.code === 0) {
      handleGetBillsList();
      dispatch(
        RsetShowToast({
          show: true,
          title: res?.data?.message,
          bg: "success",
        }),
      );
    } else {
      dispatch(
        RsetShowToast({
          show: true,
          title: res?.data?.message,
          bg: "danger",
        }),
      );
    }
  });

  const printHandler = asyncWrapper(async (id: number) => {
    const res = await printBill(id);
    if (res?.data?.code === 0) {
      setOpenModal(true);
      const lastItemInBillItems: object = {
        totoalAmount: "جمع کل",
        serviceOrProductId: "",
        description: "",
        count: "",
        measurementUnit: "",
        unitPrice: "",
        discount: res?.data?.result?.totalDiscount,
        currencyType: "",
        valueIncreasedTaxRate: "",
        valueIncreasedTaxPrice: res?.data?.result?.totalValueIncreasedTaxPrice,
        totalValueIncreasedTaxPrice:
          res?.data?.result?.totalValueIncreasedTaxPrice,
      };

      setInputsData({
        ...res?.data?.result,
        billItems: [...res?.data?.result?.billItems, lastItemInBillItems],
      });
    } else {
      dispatch(
        RsetShowToast({
          show: true,
          title: res?.data?.message,
          bg: "danger",
        }),
      );
    }
  });

  useEffect(() => {
    getBillInitialize();
    handleGetBillsList();
  }, []);

  const columns: ColumnsType<BillsListType>[] = [
    {
      header: "#",
      type: "DropDown",
      render: ({
        id,
        taxId,
        patternId,
        typeId,
        isCorrectable,
        isCancellable,
        isEditable,
        isRemovable,
        isReturnable,
      }: BillsListType) => {
        return (
          <DropDown
            isCorrectable={isCorrectable}
            isCancellable={isCancellable}
            isEditable={isEditable}
            isRemovable={isRemovable}
            isReturnable={isReturnable}
            patternId={patternId}
            typeId={typeId}
            id={id}
            taxId={taxId}
            getBillsList={handleGetBillsList}
          />
        );
      },
    },
    ...(isSmallScreen
      ? []
      : [
          { accessor: "subject", header: "موضوع" },
          { accessor: "taxId", header: "شماره منحصربفرد مالیاتی" },
        ]),

    {
      render: ({ status, statusId }: BillsListType) => {
        return (
          <span className="tw-flex tw-items-center">
            <span
              className={`${statusId === 4 ? " tw-pl-2 tw-text-red" : statusId === 5 ? "tw-text-green-200" : ""}`}
            >
              {status}
            </span>
            {statusId === 4 && (
              <Tooltips
                title={
                  "برای مشاهده نتیجه درخواست ، در ستون عملیات روی دکمه مشاهده (آیکن چشم) کلیک نمایید."
                }
              />
            )}
          </span>
        );
      },
      header: "وضعیت",
      type: "text",
      count: 1,
    },
    { accessor: "issueDate", header: "تاریخ صورتحساب " },
    { accessor: "serial", header: " شماره فاکتور" },
    ...(isSmallScreen
      ? []
      : [
          { accessor: "createDate", header: "تاریخ ثبت " },
          { accessor: "billPattern", header: "الگوی صورتحساب" },
          {
            header: "عملیات",
            count: 3,
            type: "Icon",
            render: ({ id, taxId, isSendable }: BillsListType) => {
              return (
                <div className="tw-flex tw-justify-center tw-gap-4 ">
                  <Link
                    to={`/users/viewBill/${id}`}
                    className="tw-cursor-pointer"
                  >
                    <EyeIcon />
                  </Link>
                  <span
                    className="tw-cursor-pointer"
                    onClick={() => printHandler(id)}
                  >
                    {/* // todo: در تسک دیگری انجام میشود */}
                    <PrinterIcon />
                  </span>
                  {isSendable && (
                    <span
                      className="tw-cursor-pointer"
                      onClick={() => handleSendBill(id)}
                    >
                      <SendIcon />
                    </span>
                  )}
                </div>
              );
            },
          },
        ]),
  ];

  const childProps = {
    inputsData,
    setOpenModal,
    openModal,
    setInputsData,
  };
  return (
    <>
      <section>
        <Filters
          getLists={getLists}
          placeholder="جست‌وجوی شماره فاکتور"
          allInputsFilter={[
            <Input
              control={control}
              name="taxId"
              label="شماره منحصر بفرد مالیاتی"
              placeholder="جست‌وجو"
            />,
            <ComboBox
              name="status"
              label="وضعیت"
              options={billStatuses}
              control={control}
              menuPortalTarget={true}
            />,
            <DatePicker
              control={control}
              name="issueDate"
              label="تاریخ صورتحساب"
            />,
            <Button
              onClick={handleContollerSearch}
              size={"default"}
              variant={"outLine_default"}
              title="جست‌وجو"
            />,
          ]}
          ButtonComponent={
            <Button
              onClick={() => navigate("/users/billing")}
              size={"default"}
              variant={"default"}
              title="صورتحساب جدید"
              className="lg:tw-py-2"
              icon={<Plus />}
            />
          }
        />
        <Table
          columns={columns}
          data={tableData}
          setTableParams={handleChangePagination}
          tableParams={tableParams}
          loading={loading}
        />
        <div className="d-none">
          <PrintBillList componentRef={componentRef} />
        </div>
      </section>
      <PrintModals {...childProps} />
    </>
  );
};

export default BillsList;
