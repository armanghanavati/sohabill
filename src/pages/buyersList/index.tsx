import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import {
  RsetMessageModal,
  handleLoading,
  RsetShowToast,
} from "../../common/slices/mainSlice";
import { useMediaQuery } from "react-responsive";
import DeleteIcon from "src/assets/icons/DeleteIcon";
import { ColumnsType, Table } from "src/components/Table";
import { TableParamsType } from "src/components/Table/Pagination";
import { Button } from "src/components/Button";
import Plus from "src/assets/icons/Plus";
import Filters from "src/components/Filter";
import asyncWrapper from "src/utils/asyncWrapper";
import {
  deleteBuyer,
  getBillInitializeData,
  getBuyersListWithFilter,
} from "src/services/masterServices";
import { Link } from "react-router-dom";
import { BuyersListType } from "./types";
import CorrectionIcon from "src/assets/icons/CorrectionIcon";
import { useForm } from "react-hook-form";
import Input from "src/components/Input";
import DropDown from "src/pages/buyersList/DropDown/index";
import Modal from "src/components/Modal";
import BuyerData from "src/common/BuyerData";
import { SerGetBillInitializeData } from "src/models/AllData.model";

const BuyersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const [loading, setLoading] = useState(false);
  const [editFieldAddBuyer, setEditFieldAddBuyer] = useState<BuyersListType>(
    {},
  );
  const [billInitializeData, setBillInitializeData] =
    useState<SerGetBillInitializeData>();
  const [personBuyerList, setPersonBuyerList] = useState<BuyersListType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  const { control, getValues, setValue } = useForm<BuyersListType>({
    reValidateMode: "onChange",
  });

  const getBillInitialize = asyncWrapper(async () => {
    const response = await getBillInitializeData();
    if (response?.data?.code === 0) {
      setBillInitializeData(response?.data?.result);
    }
  });

  useEffect(() => {
    getBillInitialize();
  }, []);

  const getTable = asyncWrapper(
    async (
      values: BuyersListType = getValues(),
      temporaryTableParams: TableParamsType = {
        current: 1,
        pageSize: 20,
        total: 20,
      },
    ) => {
      const postData: BuyersListType = {
        economicCode: values?.economicCode ?? "",
        fullname: values?.fullname ?? "",
        lastname: values?.lastname ?? "",
        personCode: values?.personCode ?? "",
        pageNumber: temporaryTableParams?.current || 1,
        pageSize: temporaryTableParams?.pageSize || 20,
      };
      setLoading(true);
      const newData = await getBuyersListWithFilter(postData);
      setLoading(false);
      if (newData.data.code === 0) {
        setPersonBuyerList(newData?.data?.result?.items || []);
        setTableParams((prev: TableParamsType) => ({
          ...prev,
          current: newData?.data?.result?.pageNumber,
          pageSize: newData?.data?.result?.pageSize,
          total: newData?.data?.result?.totalCount,
        }));
      }
    },
  );

  useEffect(() => {
    getTable();
  }, []);

  const handleContollerSearch = (e: any) => {
    e?.preventDefault();
    const values = getValues();
    getTable({ ...values });
  };

  const handleSearch = (value: string) => {
    const values = getValues();
    setValue("economicCode", value);
    getTable({ ...values, economicCode: value });
  };

  const handleChangePagination = (params: TableParamsType) => {
    const values = getValues();
    getTable({ ...values }, params);
  };

  const handleDeleteBuyer = asyncWrapper(async (id: number) => {
    dispatch(handleLoading({ loading: true }));
    const {
      data: { code, message },
    } = await deleteBuyer(id);
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

  const columns: ColumnsType<BuyersListType>[] = [
    ...(isSmallScreen
      ? [
          {
            header: "#",
            render: (item: BuyersListType) => {
              return (
                <>
                  <DropDown
                    handleDeleteBuyer={handleDeleteBuyer}
                    setEditFieldAddBuyer={(item) => {
                      setEditFieldAddBuyer(item);
                      setOpenModal(true);
                    }}
                    item={item}
                  />
                </>
              );
            },
          },
        ]
      : []),
    {
      header: "نام‌ و نام‌خانوادگی",
      render: ({ firstName, lastName }: BuyersListType) => {
        return <>{`${firstName} ${lastName}`}</>;
      },
    },
    ...(isSmallScreen
      ? []
      : [{ accessor: "personTypeDescription", header: "نوع خریدار" }]),
    { accessor: "economicCode", header: "کد‌اقتصادی" },
    { accessor: "personCode", header: "شناسه‌ملی" },
    ...(isSmallScreen
      ? []
      : [
          {
            header: "عملیات",
            type: "Icon",
            count: 2,
            render: (item: BuyersListType) => {
              return (
                <div className="tw-flex tw-justify-center tw-gap-4">
                  <span onClick={() => handleDeleteBuyer(item?.id)}>
                    <DeleteIcon color="#4CC19E" />
                  </span>
                  <span
                    onClick={() => {
                      setEditFieldAddBuyer(item);
                      setOpenModal(true);
                    }}
                  >
                    <CorrectionIcon color="#4CC19E" />
                  </span>
                </div>
              );
            },
          },
        ]),
  ];

  return (
    <>
      <Filters
        getLists={handleSearch}
        placeholder="جست‌وجوی کد اقتصادی"
        ButtonComponent={
          <Link to="/users/addBuyer">
            <Button
              size={"default"}
              variant={"default"}
              title="خریدار جدید"
              className="lg:tw-py-2"
              icon={<Plus />}
            />
          </Link>
        }
        allInputsFilter={[
          <Input
            control={control}
            name="fullname"
            label="نام و نام خانوادگی "
            placeholder="جست‌وجو"
          />,
          <Input
            control={control}
            name="personCode"
            label="شناسه ملی"
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
      <Table
        tableParams={tableParams}
        setTableParams={handleChangePagination}
        data={personBuyerList}
        columns={columns}
        loading={loading}
      />
      <Modal
        isOpen={openModal}
        title="ویرایش خریدار"
        className="!tw-h-[100vh] !tw-max-h-[100vh] !tw-w-full !tw-max-w-[100%]"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <BuyerData
          billInitializeData={billInitializeData}
          handleSaveBuyerInformation={() => {
            setOpenModal(false);
            getTable();
          }}
          prevData={editFieldAddBuyer}
        />
      </Modal>
    </>
  );
};
export default BuyersList;
