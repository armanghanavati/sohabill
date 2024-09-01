import { Link } from "react-router-dom";
import Plus from "src/assets/icons/Plus";
import { Button } from "src/components/Button";
import Filters from "src/components/Filter";
import Input from "src/components/Input";
import { Table, TableParamsType } from "src/components/Table";
import DeleteIcon from "src/assets/icons/DeleteIcon";
import CorrectionIcon from "src/assets/icons/CorrectionIcon";
import {
  RsetMessageModal,
  handleLoading,
  RsetShowToast,
} from "src/common/slices/mainSlice";
import {
  deletePersonalizedGoods,
  getBillInitializeData,
  getPersonalizedGoods,
} from "src/services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "src/hooks/hook";
import { InputModelPersonalizedGoods, PersonalizedGoodsType } from "./type";
import DropDown from "./DropDown";
import GoodsModals from "src/common/GoodsModal";
import { SerGetBillInitializeData } from "src/models/AllData.model";
// function PersonalizedGoods-----------------------------------------------
function GoodsList() {
  // states------------------------------------------------------------
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const [personalizedGoodsList, setPersonalizedGoodsList] = useState<
    PersonalizedGoodsType[]
  >([]);
  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 10,
    total: 10,
  });
  const { control, getValues, setValue } = useForm<InputModelPersonalizedGoods>(
    {
      reValidateMode: "onChange",
    },
  );
  const [editData, setEditData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billInitializeData, setBillInitializeData] =
    useState<SerGetBillInitializeData>();
  const [refreshTable, setRefreshTable] = useState(false);
  // get comboBox for unitTypes and economicCode----------------------------------
  const getBillInitialize = asyncWrapper(async () => {
    const response = await getBillInitializeData();
    setBillInitializeData(response?.data?.result);
  });

  // useefect for get comboBox--------------------------------------
  useEffect(() => {
    getBillInitialize();
  }, []);
  //   function to get table from server--------------------------------------------
  const getTable = asyncWrapper(
    async (
      values: InputModelPersonalizedGoods = getValues(),
      temporaryTableParams: TableParamsType = {
        current: 1,
        pageSize: 20,
        total: 20,
      },
    ) => {
      const postData: PersonalizedGoodsType = {
        inputModel: {
          internalCode: values?.internalCode ?? "",
          stuffCode: values?.stuffCode ?? "",
          stuffDesc: values?.stuffDesc ?? "",
          page: temporaryTableParams?.current || 1,
          size: temporaryTableParams?.pageSize || 20,
        },
      };
      setLoading(true);
      const newData = await getPersonalizedGoods(postData);
      setLoading(false);
      if (newData.data.code === 0) {
        setPersonalizedGoodsList(newData?.data?.result?.items || []);
        setTableParams((prev: TableParamsType) => ({
          ...prev,
          current: newData?.data?.result?.pageNumber,
          pageSize: newData?.data?.result?.pageSize,
          total: newData?.data?.result?.totalCount,
        }));
      }
    },
  );
  //   useefect for get table-----------------------------------------
  useEffect(() => {
    getTable();
  }, [refreshTable]);
  //   handle search for serach in filter ----------------------------------
  const handleContollerSearch = (e: any) => {
    e?.preventDefault();
    const values = getValues();
    getTable({ ...values });
  };

  const handleSearch = (value: string) => {
    const values = getValues();
    setValue("internalCode", value);
    getTable({ ...values, internalCode: value });
  };
  //   handle pagination------------------------------------
  const handleChangePagination = (params: TableParamsType) => {
    const values = getValues();
    getTable({ ...values }, params);
  };
  //   this function for delete from server---------------------------
  const handleDeleteGoods = asyncWrapper(async (id: number) => {
    dispatch(handleLoading({ loading: true }));
    const {
      data: { code, message },
    } = await deletePersonalizedGoods(id);
    if (code === 0) {
      getTable();
      dispatch(
        RsetShowToast({
          show: true,
          title: message,
          bg: "success",
        }),
      );
    } else {
      dispatch(
        RsetMessageModal({
          show: true,
          title: message || "مشکلی در سرور به وجود آمده است.",
        }),
      );
    }
    dispatch(handleLoading({ loading: false }));
  });
  // handle Edit icon goods--------------------------------------
  function handleEditGoods(data: any) {
    setEditData(data), setOpenModal(true);
  }
  // columns for table--------------------------------------------------
  const columns = [
    ...(isSmallScreen
      ? [
          {
            header: "#",
            render: (item: any) => {
              return (
                <DropDown
                  handleDeleteFunction={handleDeleteGoods}
                  id={item?.id}
                  handleEditFunction={handleEditGoods}
                  editData={item}
                />
              );
            },
          },
        ]
      : []),
    { accessor: "stuffDesc", header: "نام کالا" },
    { accessor: "internalCode", header: "شناسه داخلی" },
    ...(isSmallScreen
      ? []
      : [
          {
            accessor: "vat",
            header: "نرخ مالیات بر ارزش افزوده",
          },
        ]),
    { accessor: "stuffCode", header: "شناسه یکتا" },

    ...(isSmallScreen
      ? []
      : [
          {
            header: "عملیات",
            count: 2,
            type: "Icon",
            render: (item: any) => {
              return (
                <div className="tw-flex tw-justify-center tw-gap-4">
                  <span onClick={() => handleDeleteGoods(item?.id)}>
                    <DeleteIcon color="#4CC19E" />
                  </span>
                  <span onClick={() => handleEditGoods(item)}>
                    <CorrectionIcon color="#4CC19E" />
                  </span>
                </div>
              );
            },
          },
        ]),
  ];
  //   return funtion--------------------------------------------------
  return (
    <>
      <Filters
        getLists={handleSearch}
        placeholder=" جستجو شناسه داخلی"
        ButtonComponent={
          <Link to="/users/addGoods">
            <Button
              size={"default"}
              variant={"default"}
              title="کالای جدید"
              className="lg:tw-py-2"
              icon={<Plus />}
            />
          </Link>
        }
        allInputsFilter={[
          <Input
            control={control}
            name="stuffCode"
            label="شناسه یکتا"
            placeholder="جست‌وجو"
          />,
          <Input
            control={control}
            name="stuffDesc"
            label="نام کالا"
            placeholder="جست‌وجو"
          />,
          <Button
            onClick={handleContollerSearch}
            size={"default"}
            variant={"outLine_default"}
            title="جست‌وجو"
          />,
        ]}
      />
      {personalizedGoodsList ? (
        <Table
          tableParams={tableParams}
          setTableParams={handleChangePagination}
          data={personalizedGoodsList}
          columns={columns}
          loading={loading}
        />
      ) : (
        ""
      )}
      <GoodsModals
        openModal={openModal}
        editData={editData}
        setOpenModal={setOpenModal}
        type={{ editMode: true }}
        billInitializeData={billInitializeData}
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
    </>
  );
}
export default GoodsList;
