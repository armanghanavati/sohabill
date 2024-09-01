import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, TableParamsType } from "src/components/Table";
import { SerGetBillInitializeData } from "src/models/AllData.model";
import { getGoodsList } from "src/services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import Plus from "src/assets/icons/Plus";
import Filters from "src/components/Filter";
import Input from "src/components/Input";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button";
import { GoodsListFiltersType, GoodsListType } from "./types";
import { useMediaQuery } from "react-responsive";
import GoodsModals from "src/common/GoodsModal";
interface AddSinglePropsType {
  billInitializeData: SerGetBillInitializeData;
}
const AddSingle: React.FC<AddSinglePropsType> = ({ billInitializeData }) => {
  // states-----------------------------------------------------------
  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 20,
    total: 20,
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });
  const [goodsList, setGoodsList] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { control, getValues, setValue } = useForm<GoodsListFiltersType>({
    reValidateMode: "onChange",
  });
  const [stuffCode, setStuffCode] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  // this function to get data table in server-------------------------------
  const getTableGoods = asyncWrapper(
    async (
      obj: GoodsListFiltersType = getValues(),
      temporaryTableParams: TableParamsType = {
        current: 1,
        pageSize: 20,
        total: 20,
      },
    ) => {
      const postData: GoodsListType = {
        inputModel: {
          page: temporaryTableParams?.current || 1,
          size: temporaryTableParams?.pageSize || 20,
          stuffCode: obj?.stuffCode || "",
          type: "",
          specialOrGeneral: "",
          taxableOrFree: "",
          vat: 0,
          vatCustomPurposes: 0,
          descriptionOfID: obj?.descriptionOfID || "",
        },
      };
      setLoading(true);
      const newData = await getGoodsList(postData);
      setLoading(false);
      if (newData?.data?.code === 0) {
        setGoodsList(newData?.data?.result);
        setTableParams((prev: TableParamsType) => ({
          ...prev,
          current: newData?.data?.result?.pageNumber,
          pageSize: newData?.data?.result?.pageSize,
          total: newData?.data?.result?.totalCount,
        }));
      }
    },
  );
  // useffect for get table-------------------------------
  useEffect(() => {
    getTableGoods();
  }, []);
  // function handle search for get value input and search it----------
  const handleContollerSearch = (e: any) => {
    e?.preventDefault();
    const controllerValues = getValues();
    getTableGoods({ ...controllerValues });
  };

  const getLists = (value: string) => {
    setValue("stuffCode", value);
    getTableGoods();
  };

  const handleChangePagination = (params: TableParamsType) => {
    const values = getValues();
    getTableGoods({ ...values }, params);
  };
  // columns for table----------------------------------------
  const columns = [
    { accessor: "descriptionOfID", header: "شرح کالا" },
    { accessor: "stuffCode", header: "شناسه یکتا" },
    ...(isSmallScreen ? [] : [{ accessor: "type", header: "نوع" }]),
    ...(isSmallScreen
      ? []
      : [
          {
            type: "text",
            count: 1,
            accessor: "vatCustomPurposes",
            header: "نرخ مالیات بر ارزش افزوده",
            render: (item: { vatCustomPurposes?: number }) => {
              return item?.vatCustomPurposes !== undefined ? (
                <p>{item.vatCustomPurposes}%</p>
              ) : (
                ""
              );
            },
          },
        ]),
    ...(isSmallScreen ? [] : [{ accessor: "taxableOrFree", header: "مالیات" }]),

    {
      header: "افزودن کالا",
      type: "Plus",
      count: 1,
      render: (item: any) => {
        return (
          <div className="tw-flex tw-justify-center tw-gap-4">
            <span
              className={``}
              onClick={() => {
                setStuffCode(item);
                setOpenModal(true);
              }}
            >
              <Plus className="tw-h-5 tw-w-5 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-[5px] tw-bg-[#4CC19E]	tw-fill-white tw-p-1" />
            </span>
          </div>
        );
      },
    },
  ];
  // return
  return (
    <section>
      <Filters
        getLists={getLists}
        placeholder="جست‌و‌جو شناسه یکتا"
        allInputsFilter={[
          <Input
            control={control}
            name="descriptionOfID"
            label="شرح کالا"
            placeholder="جست‌و‌جو"
          />,

          <Button
            onClick={handleContollerSearch}
            size={"default"}
            variant={"outLine_default"}
            title="جستجو"
          />,
        ]}
      />
      {goodsList?.items ? (
        <Table
          tableParams={tableParams}
          setTableParams={handleChangePagination}
          data={goodsList?.items}
          columns={columns}
          loading={loading}
        />
      ) : (
        ""
      )}
      <GoodsModals
        openModal={openModal}
        editData={stuffCode}
        setOpenModal={setOpenModal}
        type={{ taxAdditionMode: true }}
        billInitializeData={billInitializeData}
      />
    </section>
  );
};
export default AddSingle;
