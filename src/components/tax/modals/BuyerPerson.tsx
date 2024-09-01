import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetPersonBuyerList,
  handleBuyerPersonList,
} from "../../../common/slices/taxSlice";
import InputText from "../../../common/InputText";
import { RsetShowModal, RsetShowToast } from "../../../common/slices/mainSlice";
import { HookForm } from "../../../models/AllData.model";
import { useMediaQuery } from "react-responsive";
import DeleteIcon from "src/assets/icons/DeleteIcon";
import EditSquare from "src/assets/icons/EditIcon";
import Input from "src/components/Input";
import ComboBox from "src/components/ComboBox";
import { ColumnsType, Table } from "src/components/Table";
import { useForm } from "react-hook-form";
import { TableParamsType } from "src/components/Table/Pagination";
import FilterTable from "src/components/Filter";
import { Button } from "src/components/Button";
import Plus from "src/assets/icons/Plus";
import DatePicker from "src/components/DatePicker";
import Filters from "src/components/Filter";
import { BuyersListType } from "src/pages/buyersList/types";

interface Props extends HookForm {
  handleAddItemToStep: any;
  // showAddModal: boolean;
  // setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  // handleAddItems: (event: FormEvent) => void;
}

const BuyerPerson: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isClickOnRow, setIsClickOnRow] = useState<any>({});
  const [appMounted, setAppMounted] = useState<boolean>(false);
  const { main, tax } = useAppSelector((state) => state);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    getValues,
    resetField,
  } = useForm<any>({ reValidateMode: "onChange" });

  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  useEffect(() => {
    setAppMounted(true);
  }, []);

  useEffect(() => {
    if (appMounted) {
      setTableParams((prev) => ({
        ...prev,
        page: tax?.personBuyerList?.pageNumber || 1,
        totalPages: tax?.personBuyerList?.totalPages,
        totalSize: tax?.personBuyerList?.totalCount,
        sizePerPage: tax?.personBuyerList?.pageSize,
      }));
    }
  }, [tax?.personBuyerList]);

  console.log(tax?.personBuyerList);

  const handleStyleRow = (id: number) => {
    setIsClickOnRow((prev: BuyersListType) => {
      return {
        [id]: true,
      };
    });
  };

  const handleSearching = (e: FormEvent) => {
    e.preventDefault();
    const controllerValues = getValues();
    dispatch(
      handleBuyerPersonList({ ...controllerValues, loadingName: "search" }),
    );
  };

  useEffect(() => {
    if (appMounted) {
      setTableParams((prev: any) => ({
        ...prev,
        page: tax?.personBuyerList?.pageNumber || 1,
        totalPages: tax?.personBuyerList?.totalPages,
        totalSize: tax?.personBuyerList?.totalCount,
        sizePerPage: tax?.personBuyerList?.pageSize,
      }));
    }
  }, [tax?.personBuyerList]);

  useEffect(() => {
    dispatch(
      handleBuyerPersonList({
        pageNumber: tableParams?.current,
        pageSize: tableParams?.pageSize,
        // query:
      }),
    );
  }, [tableParams?.current, tableParams?.pageSize]);

  // const opratiOnDoubleClickForWeb = () => {
  //   setValue(
  //     "buyerPersonId",
  //     `${tax?.allFieldSteps?.rowTableBuyerPer?.firstName || ""} ${tax?.allFieldSteps?.rowTableBuyerPer?.lastName || ""} `,
  //   );
  //   setValue(
  //     "personTypeDescription",
  //     tax?.allFieldSteps?.rowTableBuyerPer?.personTypeDescription,
  //   );
  //   setValue("personCode", tax?.allFieldSteps?.rowTableBuyerPer?.personCode);
  //   setValue(
  //     "economicCode",
  //     tax?.allFieldSteps?.rowTableBuyerPer?.economicCode,
  //   );
  //   setValue("postCode", tax?.allFieldSteps?.rowTableBuyerPer?.postCode);
  //   setValue(
  //     "passportNumber",
  //     tax?.allFieldSteps?.rowTableBuyerPer?.passportNumber,
  //   );

  //   dispatch(RsetShowModal({ showModal: false }));
  // };

  // const opratiOnClickForPhone = (item?: any) => {
  //   handleStyleRow(item?.id);
  //   handleAddItemToStep(item);
  //   if (isSmallScreen) {
  //     setValue("buyerPersonId", `${item?.firstName} ${item?.lastName} `);
  //     setValue(
  //       "personTypeDescription",
  //       tax?.allFieldSteps?.rowTableBuyerPer?.personTypeDescription,
  //     );
  //     setValue("personCode", tax?.allFieldSteps?.rowTableBuyerPer?.personCode);
  //     setValue(
  //       "economicCode",
  //       tax?.allFieldSteps?.rowTableBuyerPer?.economicCode,
  //     );
  //     setValue("postCode", tax?.allFieldSteps?.rowTableBuyerPer?.postCode);
  //     setValue(
  //       "passportNumber",
  //       tax?.allFieldSteps?.rowTableBuyerPer?.passportNumber,
  //     );
  //     dispatch(RsetShowModal({ showModal: false }));
  //   }
  // };

  // const handleAddToField = (event: FormEvent) => {
  //   if (tax?.allFieldSteps?.rowTableBuyerPer?.firstName !== undefined) {
  //     dispatch(RsetShowModal({ showModal: false }));
  //     setValue(
  //       "buyerPersonId",
  //       `${tax?.allFieldSteps?.rowTableBuyerPer?.firstName || ""} ${tax?.allFieldSteps?.rowTableBuyerPer?.lastName || ""} `,
  //     );
  //     setValue(
  //       "personTypeDescription",
  //       tax?.allFieldSteps?.rowTableBuyerPer?.personTypeDescription,
  //     );
  //     setValue("personCode", tax?.allFieldSteps?.rowTableBuyerPer?.personCode);
  //     setValue(
  //       "economicCode",
  //       tax?.allFieldSteps?.rowTableBuyerPer?.economicCode,
  //     );
  //     setValue("postCode", tax?.allFieldSteps?.rowTableBuyerPer?.postCode);
  //     setValue(
  //       "passportNumber",
  //       tax?.allFieldSteps?.rowTableBuyerPer?.passportNumber,
  //     );
  //     clearErrors("buyerPersonId");
  //   } else {
  //     dispatch(
  //       RsetShowToast({
  //         show: true,
  //         title: "!لطفا یک شناسه برای افزودن انتخاب کنید",
  //         bg: "danger",
  //       }),
  //     );
  //   }
  // };

  const columns: ColumnsType<BuyersListType>[] = [
    { accessor: "lastName", header: "نام‌ و نام‌خانوادگی" },
    { accessor: "personTypeDescription", header: "نوع خریدار" },
    { accessor: "economicCode", header: "کد‌اقتصادی" },
    { accessor: "personCode", header: "شناسه‌ملی" },
    { accessor: "personCode", header: "کد‌داخلی" },
    {
      header: "عملیات",
      render: (data: any) => {
        console.log(data);
        return (
          <div className="tw-flex tw-justify-center tw-gap-4">
            <span className="">
              <DeleteIcon color="#4CC19E" />
            </span>
            <span className="">
              <EditSquare color="#4CC19E" />
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Filters
          filteredData={[]}
          getLists={() => {}}
          // placeholder=""
          // getLists={[]}
          // filteredData={filteredData}
          // temporary={temporary}
          // selectedItem={selectedItem}
          // setSelectedItem={setSelectedItem}
          // showList={showList}
          allInputsFilter={[
            <ComboBox
              options={tax?.stepsInfoList?.subjectTypes}
              control={control}
              name="stautsId"
              label="وضعیت"
              menuPortalTarget={true}
            />,
            <Input
              control={control}
              name="taxId"
              label="شماره منحصر بفرد مالیاتی"
              placeholder="جست‌وجو"
            />,
            <Input
              control={control}
              name="taxId"
              label="شماره منحصر بفرد مالیاتی"
              placeholder="جست‌وجو"
            />,
            <div className="!tw-justify-self-end	">
              <Button
                size={"default"}
                variant={"outLine_default"}
                title="جست‌وجو"
              />
            </div>,
          ]}
        >
          <Button
            size={"default"}
            variant={"default"}
            title="خریدار جدید"
            icon={<Plus />}
          />
        </Filters>
        <Table
          tableParams={tableParams}
          setTableParams={setTableParams}
          data={tax?.personBuyerList?.items}
          columns={columns}
        />
      </div>
    </>
  );
};

export default BuyerPerson;

// <Collapsible>
//   <div className="tw-flex-cols-12 tw-flex tw-flex-col">
//     <div className="tw-grid tw-grid-cols-6 tw-justify-between tw-gap-4">
//       <Link to="/users/baseTax">
//         <Button
//           className="tw-mb-4 tw-py-2"
//           size={"default"}
//           variant={"default"}
//           title="خریدار جدید"
//           icon={<Plus />}
//         />
//       </Link>
//       <div className="tw-relative tw-z-0 tw-col-span-4">
//         <span className="tw-absolute tw-bottom-8 tw-right-4 tw-z-10 tw-inline">
//           <Searching color="gray" />
//         </span>
//         <Input
//           control={control}
//           name="billSerialSearching"
//           placeholder={`جست‌وجوی شماره فاکتور`}
//           rules={{
//             required: "لطفا پست الکترونیکی را وارد کنید",
//           }}
//         />
//       </div>
//       <CollapsibleTrigger className="tw-mx-9 tw-mb-4 tw-rounded-full tw-px-6 ">
//         <Button
//           size={"default"}
//           variant={"white"}
//           title="فیلترها"
//           className="tw-rounded-full tw-py-2"
//           icon={<Filter color="grey" />}
//         />
//       </CollapsibleTrigger>
//     </div>
//     <CollapsibleContent >
//       <div className="tw-grid tw-grid-cols-4  tw-gap-3">
//         <Input
//           control={control}
//           name="taxId"
//           label="شماره منحصر بفرد مالیاتی"
//           placeholder="جست‌وجو"
//         />
//         <ComboBox
//           options={tax?.stepsInfoList?.subjectTypes}
//           control={control}
//           name="stautsId"
//           label="وضعیت"
//           // placeholder="وضعیت را انتخاب کنید"
//         />
//         <DatePicker
//           control={control}
//           name="issueDate"
//           label="تاریخ صورتحساب"
//         />
//         <div className="tw-flex tw-items-end tw-justify-end">
//           <Button
//             // onClick={handleContollerSearch}
//             name="search"
//             size={"default"}
//             variant={"outLine_default"}
//             title="جست‌وجو"
//             className=""
//           />
//         </div>
//       </div>
//     </CollapsibleContent>
//   </div>
// </Collapsible>
