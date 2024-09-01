import React from "react";

const ListBills = () => {
  return <div>ListBills</div>;
};

export default ListBills;
// import React, {
//   FormEvent,
//   ReactNode,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
// import {
//   handleGetBillsList,
//   handleGetFields,
//   handlePrintBill,
//   handleRemoveBill,
// } from "../../../common/slices/taxSlice";
// import {
//   BillListItems,
//   HookForm,
//   PaginationTableType,
// } from "../../../models/AllData.model";
// import { Controller, useForm } from "react-hook-form";
// import Datepicker from "../../../common/DatePicker";
// import PrintBillList from "../../BillList/PrintBillList";
// import { useReactToPrint } from "react-to-print";
// import Loading from "../../../common/Loading";
// import { Link, useNavigate } from "react-router-dom";
// import ComboBox from "../../../common/ComboBox";
// import TableOption from "../../../assets/icons/TableOption";
// import { Button } from "../../Button";
// import Plus from "../../../assets/icons/Plus";
// import Filter from "../../../assets/icons/Filter";
// import Input from "../../../components/Input";
// import Searching from "../../../assets/icons/Searching";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "../../../common/ui/collapse";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../../../common/ui/DropDown";
// import Cancel from "../../../assets/icons/Cancel";
// import EditIcon from "../../../assets/icons/EditIcon";
// import RepeatIcon from "../../../assets/icons/RepeatIcon";
// import DeleteIcon from "../../../assets/icons/DeleteIcon";
// import { useMediaQuery } from "react-responsive";
// import DatePick from "../../DatePicker/index";
// import CustomTable from "../../../common/ui/TableUI";
// import { render } from "react-dom";
// import PrinterIcon from "src/assets/icons/PrinterIcon";
// import SendIcon from "src/assets/icons/SendIcon";
// // import EyeIcon from "src/assets/icons/eyeIcon";
// import { Table } from "src/components/Table";
// import Textarea from "src/components/Textarea";
// import EyeIcon from "src/assets/icons/EyeIcon";
// import Filters from "src/components/Filter";
// import FilterTable from "src/components/filterTable";
// import DropDown from "./DropDown";

// interface Props extends HookForm {
//   children?: ReactNode;
//   type?: "submit" | "button";
//   getValues?: any;
// }

// const BillsList: React.FC = () => {
//   const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

//   const [tableParams, setTableParams] = useState<any>({
//     current: 1,
//     pageSize: 10,
//     total: 10,
//   });
//   const { tax, main } = useAppSelector((state) => state);
//   const [appMounted, setAppMounted] = useState<boolean>(false);

//   const dispatch = useAppDispatch();
//   const componentRef = useRef<any>();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     clearErrors,
//     reset,
//     getValues,
//     resetField,
//   } = useForm<any>({ reValidateMode: "onChange" });
//   const navigate = useNavigate();

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: "paymentResult",
//     copyStyles: true,
//     onBeforeGetContent: () => {
//       // اعمال تنظیمات CSS برای چاپ از راست به چپ
//       const style = document.createElement("style");
//       style.innerHTML = `
//                     body {
//                       direction: rtl; /* تنظیم جهت متن به راست به چپ */
//                     }
//                   `;
//       document.head.appendChild(style);
//     },
//   });

//   useEffect(() => {
//     dispatch(handleGetBillsList({}));
//   }, []);

//   const onPageChange = (data: any) => {
//     setTableParams((prev: any) => ({
//       ...prev,
//       page: data || 1,
//     }));
//   };

//   useEffect(() => {
//     setAppMounted(true);
//   }, []);

//   useEffect(() => {
//     if (appMounted) {
//       setTableParams((prev: any) => ({
//         ...prev,
//         current: tax?.allBillList?.pageNumber,
//         pageSize: tax?.allBillList?.pageSize,
//         total: tax?.allBillList?.totalCount,
//       }));
//     }
//   }, [tax?.allBillList]);

//   const handleContollerSearch = (e: FormEvent) => {
//     // (prev: any) => ({ ...prev, controllerValues: getValues() })
//     e.preventDefault();
//     const controllerValues = getValues();
//     console.log(controllerValues);
//     dispatch(
//       handleGetBillsList({ ...controllerValues, loadingName: "search" }),
//     );
//   };

//   useEffect(() => {
//     dispatch(
//       handleGetBillsList({
//         pageNumber: tableParams?.page,
//         pageSize: tableParams?.sizePerPage,
//         tableParams: tableParams,
//       }),
//     );
//   }, [tableParams?.page, tableParams?.sizePerPage]);

//   const printList = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: "paymentResult",
//     copyStyles: true,
//     onBeforeGetContent: () => {
//       const style = document.createElement("style");
//       style.innerHTML = `
//                 body {
//                   direction: rtl; /* تنظیم جهت متن به راست به چپ */
//                 }
//               `;
//       document.head.appendChild(style);
//     },
//   });
//   // const handlePrintList = (id: number) => {
//   //     dispatch(handlePrintBill(id))
//   //     printList();
//   // };

//   // useEffect(() => {
//   //     if () {

//   //     }
//   // }, [tax?.printBill?.counter])
//   // console.log(navigate("/users/baseSubmitTaxReq"));

//   const handleEditBill = (item: BillListItems) => {
//     const id = item?.id;
//     // const subjectId: number = 3;
//     // dispatch(
//     //   handleGetFields({
//     //     patternId: item?.patternId,
//     //     typeId: item?.typeId,
//     //     subjectId,
//     //   })
//     // );
//     navigate("/users/baseSubmitTaxReq", {
//       state: { id, subjectId: 1, referenceTaxId: item?.taxId },
//     });
//   };

//   const handleCancelAble = (item: BillListItems) => {
//     // patternTypeId?.billPattern?.id, patternTypeId?.billType?.id, obj?.number

//     const subjectId: number = 3;
//     dispatch(
//       handleGetFields({
//         patternId: item?.patternId,
//         typeId: item?.typeId,
//         subjectId,
//       }),
//     );
//     navigate("/users/baseSubmitTaxReq", {
//       state: { id: item.id, subjectId, referenceTaxId: item?.taxId },
//     });
//   };

//   const handleReturnToSell = (item: BillListItems) => {
//     const subjectId: number = 4;
//     dispatch(
//       handleGetFields({
//         patternId: item.patternId,
//         typeId: item?.typeId,
//         subjectId,
//       }),
//     );
//     navigate("/users/baseSubmitTaxReq", {
//       state: { id: item.id, subjectId, referenceTaxId: item?.taxId },
//     });
//   };

//   const handleCorrectable = (item: BillListItems) => {
//     const subjectId: number = 2;
//     dispatch(
//       handleGetFields({
//         patternId: item.patternId,
//         typeId: item?.typeId,
//         subjectId,
//       }),
//     );
//     navigate("/users/baseSubmitTaxReq", {
//       state: { id: item.id, subjectId, referenceTaxId: item?.taxId },
//     });
//   };

//   const handleRemovable = (item: BillListItems) => {
//     dispatch(
//       handleRemoveBill({
//         billId: item?.id,
//       }),
//     );
//   };

//   // const tableBody = [
//   //   {
//   //     dataIndex: "اول",
//   //     render: () => {
//   //       return (
//   //         <>
//   //           <Button title="salam" />
//   //         </>
//   //       );
//   //     },
//   //     // render: () => {
//   //     //   return (
//   //     //     <>
//   //     //       <DropdownMenu>
//   //     //         <DropdownMenuTrigger asChild>
//   //     //           <span>
//   //     //             <TableOption color="#4cc19e" />
//   //     //           </span>
//   //     //         </DropdownMenuTrigger>
//   //     //         <DropdownMenuContent className="w-56">
//   //     //           <DropdownMenuRadioGroup
//   //     //             value={position}
//   //     //             onValueChange={setPosition}
//   //     //           >
//   //     //             <DropdownMenuRadioItem
//   //     //               className="tw-flex tw-justify-end tw-text-center"
//   //     //               value="bottom"
//   //     //             >
//   //     //               <div
//   //     //                 className="tw-flex tw-cursor-pointer tw-items-center"
//   //     //                 onClick={() => handleCancelAble(item)}
//   //     //               >
//   //     //                 <span className="tw-me-3">ابطال</span>
//   //     //                 <Cancel />
//   //     //               </div>
//   //     //             </DropdownMenuRadioItem>
//   //     //             <DropdownMenuRadioItem
//   //     //               className="tw-flex tw-justify-end tw-text-center"
//   //     //               value="top"
//   //     //             >
//   //     //               <div
//   //     //                 className="tw-flex tw-cursor-pointer tw-items-center"
//   //     //                 onClick={() => handleEditBill(item)}
//   //     //               >
//   //     //                 <span className="tw-me-3">اصلاح</span>
//   //     //                 <EditIcon />
//   //     //               </div>
//   //     //             </DropdownMenuRadioItem>
//   //     //             <DropdownMenuRadioItem
//   //     //               className="tw-flex tw-justify-end tw-text-center"
//   //     //               value="right"
//   //     //             >
//   //     //               <div
//   //     //                 className="tw-flex tw-cursor-pointer tw-items-center"
//   //     //                 onClick={() => handleReturnToSell(item)}
//   //     //               >
//   //     //                 <span className="tw-me-3">بازگشت از فروش</span>
//   //     //                 <RepeatIcon />
//   //     //               </div>
//   //     //             </DropdownMenuRadioItem>
//   //     //             {item?.isRemovable && (
//   //     //               <DropdownMenuRadioItem
//   //     //                 className="tw-flex tw-justify-end tw-text-center"
//   //     //                 value="right"
//   //     //               >
//   //     //                 <div
//   //     //                   className="tw-flex tw-cursor-pointer tw-items-center"
//   //     //                   onClick={() => handleRemovable(item)}
//   //     //                 >
//   //     //                   <span className="tw-me-3">حذف</span>
//   //     //                   <DeleteIcon />
//   //     //                 </div>
//   //     //               </DropdownMenuRadioItem>
//   //     //             )}
//   //     //           </DropdownMenuRadioGroup>
//   //     //         </DropdownMenuContent>
//   //     //       </DropdownMenu>
//   //     //     </>
//   //     //   );
//   //     // },
//   //   },
//   //   {
//   //     dataIndex: "دوم",
//   //     render: () => {
//   //       return (
//   //         <>
//   //           <Button title="salam" />
//   //         </>
//   //       );
//   //     },
//   //   },
//   //   {
//   //     dataIndex: "دوم",
//   //     render: () => {
//   //       return (
//   //         <>
//   //           <Button title="یییی" />
//   //         </>
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "index",
//   //   },
//   // ];

//   const columns = [
//     {
//       header: "#",
//       accessor: (record: any) => {
//         return (
//           <DropDown
//             key={record.id}
//             record={record}
//             handleReturnToSell={handleReturnToSell}
//             handleRemovable={handleRemovable}
//             handleEditBill={handleEditBill}
//             handleCancelAble={handleCancelAble}
//           />
//         );
//       },
//     },
//     { accessor: "subject", header: "موضوع" },
//     { accessor: "taxId", header: "شماره منحصربفرد مالیاتی" },
//     { accessor: "status", header: "وضعیت" },
//     { accessor: "issueDate", header: "تاریخ صورتحساب " },
//     { accessor: "serial", header: " شماره فاکتور" },
//     { accessor: "createDate", header: "تاریخ ثبت " },
//     { accessor: "billPattern", header: "الگوی صورتحساب" },
//     {
//       header: "عملیات",
//       accessor: (record: any) => {
//         return (
//           <div className="tw-flex tw-justify-center tw-gap-4 ">
//             <span className="tw-cursor-pointer">
//               <EyeIcon />
//             </span>
//             <span className="tw-cursor-pointer">
//               <PrinterIcon />
//             </span>
//             <span className="tw-cursor-pointer">
//               <SendIcon />
//             </span>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <>
//       <section>
//         <Filters
//           filteredData={[]}
//           getLists={() => {}}
//           placeholder="جست‌وجوی شماره فاکتور"
//           // getLists={[]}
//           // filteredData={filteredData}
//           // temporary={temporary}
//           // selectedItem={selectedItem}
//           // setSelectedItem={setSelectedItem}
//           // showList={showList}
//           allInputsFilter={[
//             <ComboBox
//               options={tax?.stepsInfoList?.subjectTypes}
//               control={control}
//               name="stautsId"
//               label="وضعیت"
//             />,
//             <Input
//               control={control}
//               name="taxId"
//               label="شماره منحصر بفرد مالیاتی"
//               placeholder="جست‌وجو"
//             />,
//             <Input
//               control={control}
//               name="taxId"
//               label="شماره منحصر بفرد مالیاتی"
//               placeholder="جست‌وجو"
//             />,
//             <div className="!tw-justify-self-end	">
//               <Button
//                 size={"default"}
//                 variant={"outLine_default"}
//                 title="جست‌وجو"
//               />
//             </div>,
//           ]}
//         >
//           <Button
//             size={"default"}
//             variant={"default"}
//             title="صورتحساب جدید"
//             icon={<Plus />}
//           />
//         </Filters>
//         <Table
//           columns={columns}
//           data={tax?.allBillList?.items}
//           setTableParams={setTableParams}
//           tableParams={tableParams}
//         />
//         <div className="d-none">
//           <PrintBillList componentRef={componentRef} />
//         </div>
//       </section>
//     </>
//   );
// };

// export default BillsList;

// {
//   /* <Table className="tw-mt-4 tw-w-full tw-table-fixed">
//     <TableHeader className="">
//       <TableRow className="">
//         <TableHead className="tw-w-[60px] tw-rounded-r-xl tw-p-2">#</TableHead>
//         {!isSmallScreen && (
//           <>
//             <TableHead className="tw-w-[60px]"> موضوع </TableHead>
//             <TableHead className="tw-w-[220px]">
//               شماره منحصربفرد مالیاتی
//             </TableHead>
//           </>
//         )}
//         {!isSmallScreen && (
//           <>
//             <TableHead className="tw-w-[200px]">وضعیت</TableHead>
//             <TableHead className="tw-w-[230px]">شماره فاکتور</TableHead>
//             <TableHead className="tw-w-[120px]">تاریخ صورتحساب</TableHead>
//             <TableHead className="tw-w-[120px] ">خریدار</TableHead>
//             <TableHead className="tw-w-[120px]">تاریخ ثبت</TableHead>
//             <TableHead className="tw-w-[230px]">الگوی صورتحساب</TableHead>
//           </>
//         )}
//       </TableRow>
//     </TableHeader>
//     <TableBody style={{ verticalAlign: "center" }} className="text-center">
//       {tax?.allBillList?.items?.length !== 0 ? (
//         tax?.allBillList?.items?.map((item: any, index: number) => {
//           // const oparationDate: string = String(item?.date?.convert(persian, persian_fa))
//           // const oparationExpenses: string = StringHelpers.formatNumber(item.expenses)
//           // return (
//           //   <TableRow className=" " key={item.id}>
//           //     <TableCell className="fitTableCell tw-flex tw-items-center tw-justify-center tw-rounded-r-2xl tw-text-center">
//           //       <DropdownMenu>
//           //         <DropdownMenuTrigger asChild>
//           //           <span>
//           //             <TableOption color="#4cc19e" />
//           //           </span>
//           //         </DropdownMenuTrigger>
//           //         <DropdownMenuContent className="w-56">
//           //           <DropdownMenuRadioGroup
//           //             value={position}
//           //             onValueChange={setPosition}
//           //           >
//           //             <DropdownMenuRadioItem
//           //               className="tw-flex tw-justify-end tw-text-center"
//           //               value="bottom"
//           //             >
//           //               <div
//           //                 className="tw-flex tw-cursor-pointer tw-items-center"
//           //                 onClick={() => handleCancelAble(item)}
//           //               >
//           //                 <span className="tw-me-3">ابطال</span>
//           //                 <Cancel />
//           //               </div>
//           //             </DropdownMenuRadioItem>
//           //             <DropdownMenuRadioItem
//           //               className="tw-flex tw-justify-end tw-text-center"
//           //               value="top"
//           //             >
//           //               <div
//           //                 className="tw-flex tw-cursor-pointer tw-items-center"
//           //                 onClick={() => handleEditBill(item)}
//           //               >
//           //                 <span className="tw-me-3">اصلاح</span>
//           //                 <EditIcon />
//           //               </div>
//           //             </DropdownMenuRadioItem>
//           //             <DropdownMenuRadioItem
//           //               className="tw-flex tw-justify-end tw-text-center"
//           //               value="right"
//           //             >
//           //               <div
//           //                 className="tw-flex tw-cursor-pointer tw-items-center"
//           //                 onClick={() => handleReturnToSell(item)}
//           //               >
//           //                 <span className="tw-me-3">بازگشت از فروش</span>
//           //                 <RepeatIcon />
//           //               </div>
//           //             </DropdownMenuRadioItem>
//           //             {item?.isRemovable && (
//           //               <DropdownMenuRadioItem
//           //                 className="tw-flex tw-justify-end tw-text-center"
//           //                 value="right"
//           //               >
//           //                 <div
//           //                   className="tw-flex tw-cursor-pointer tw-items-center"
//           //                   onClick={() => handleRemovable(item)}
//           //                 >
//           //                   <span className="tw-me-3">حذف</span>
//           //                   <DeleteIcon />
//           //                 </div>
//           //               </DropdownMenuRadioItem>
//           //             )}
//           //           </DropdownMenuRadioGroup>
//           //         </DropdownMenuContent>
//           //       </DropdownMenu>
//           //     </TableCell>
//           //     <TableCell>{item?.subject}</TableCell>
//           //     <TableCell>{item?.taxId}</TableCell>
//           //     <TableCell>{item?.status}</TableCell>
//           //     <TableCell>{item?.serial}</TableCell>
//           //     <TableCell>{item?.issueDate}</TableCell>
//           //     <TableCell>{item?.buyerPerson}</TableCell>
//           //     <TableCell>{item?.createDate}</TableCell>
//           //     <TableCell>{item?.billPattern}</TableCell>
//           //     <TableCell className="tw-rounded-l-2xl">
//           //       <div className="justify-content-center d-flex">
//           //         <i
//           //           className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center p-2 bi bi-cloud-arrow-down-fill rounded-pill  tw-text-primary"
//           //           onClick={async () => {
//           //             await dispatch(handlePrintBill(item?.id));
//           //             printList();
//           //           }}
//           //         />
//           //         {item?.isCancellable && (
//           //           <i
//           //             className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 bi bi-dash-circle-fill rounded-pill  tw-text-primary"
//           //             onClick={() => handleCancelAble(item)}
//           //           />
//           //         )}
//           //         {item?.isReturnable && (
//           //           // {true && (
//           //           <i
//           //             className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 bi bi-arrow-repeat rounded-pill  tw-text-primary"
//           //             onClick={() => handleReturnToSell(item)}
//           //           />
//           //         )}
//           //         {item?.isEditable && (
//           //           <i
//           //             onClick={() => handleEditBill(item)}
//           //             className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-pencil-square tw-text-primary"
//           //           />
//           //         )}
//           //         {item?.isCorrectable && (
//           //           <i
//           //             onClick={() => handleCorrectable(item)}
//           //             className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-clipboard-check tw-text-primary"
//           //           />
//           //         )}
//           //         {item?.isRemovable && (
//           //           <i
//           //             onClick={() => handleRemovable(item)}
//           //             className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-clipboard-check tw-text-primary"
//           //           />
//           //         )}
//           //       </div>
//           //     </TableCell>
//           //   </TableRow>
//           // );
//         })
//       ) : (
//         <TableRow>
//           <TableCell className="fitTable" colSpan={10}>
//             اطلاعاتی برای نمایش وجود ندارد
//           </TableCell>
//         </TableRow>
//       )}
//     </TableBody>
//   </Table>; */
// }

// {
//   /* <span
//                 onClick={async () => {
//                   await dispatch(handlePrintBill(record?.id));
//                   printList();
//                 }}
//                 className="tw-cursor-pointer"
//               >
//                 <PrinterIcon />
//               </span> */
// }

// {
//   /* <Collapsible>
//   <div className="tw-flex-cols-12 tw-flex tw-flex-col">
//     <div className="tw-grid tw-grid-cols-6 tw-justify-between tw-gap-4">
//       <Link to="/users/baseTax">
//         <Button
//           className="tw-mb-4 tw-py-2"
//           size={"default"}
//           variant={"default"}
//           title="صورتحساب جدید"
//           icon={<Plus />}
//         />
//       </Link>
//       <div className="tw-relative tw-z-0 tw-col-span-4">
//         <span className="tw-absolute tw-bottom-8 tw-right-4 tw-z-10 tw-inline">
//           <Searching color="gray" />
//         </span>
//         {/* <Input
//           className="tw-mb-4 tw-border-none tw-bg-gray-100"
//           control={control}
//           name="billSerialSearching"
//           placeholder={`جست‌وجوی شماره فاکتور`}
//           rules={{
//             required: "لطفا پست الکترونیکی را وارد کنید",
//           }}
//         /> */
// }
// //     </div>
// //     <CollapsibleTrigger className="tw-mx-9 tw-mb-4 tw-rounded-full tw-px-6 ">
// //       <Button
// //         size={"default"}
// //         variant={"white"}
// //         title="فیلترها"
// //         className="tw-rounded-full tw-py-2"
// //         icon={<Filter color="grey" />}
// //       />
// //     </CollapsibleTrigger>
// //   </div>
// //   <CollapsibleContent>
// //     <div className="tw-grid tw-grid-cols-4  tw-gap-3">
// //       <Input
// //         control={control}
// //         name="taxId"
// //         label="شماره منحصر بفرد مالیاتی"
// //         placeholder="جست‌وجو"
// //       />
// //       <ComboBox
// //         options={tax?.stepsInfoList?.subjectTypes}
// //         control={control}
// //         name="stautsId"
// //         label="وضعیت"
// //       />
// //       {/* <DatePick
// //         className="tw-border-none"
// //         control={control}
// //         name="issueDate"
// //         label="تاریخ صورتحساب"
// //       /> */}
// //       <div className="tw-flex tw-items-end tw-justify-end">
// //         <Button
// //           onClick={handleContollerSearch}
// //           name="search"
// //           size={"default"}
// //           variant={"outLine_default"}
// //           title="جست‌وجو"
// //           className=""
// //         />
// //       </div>
// //     </div>
// //   </CollapsibleContent>
// // </div>
// // </Collapsible> */}
