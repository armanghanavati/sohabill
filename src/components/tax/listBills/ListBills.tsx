import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Spinner,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import MainTitle from "../../../common/MainTitle";
import {
  handleGetBill,
  handleGetBillsList,
  handleGetFields,
  handlePrintBill,
  handleRemoveBill,
} from "../../../common/slices/taxSlice";
import {
  BillListItems,
  HookForm,
  PaginationTableType,
} from "../../../models/AllData.model";
import PaginationTable from "../submitTaxReq/table/PaginationTable";
import InputText from "../../../common/InputText";
import Btn from "../../../common/Btn";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "../../../common/DatePicker";
import PrintBillList from "../../BillList/PrintBillList";
import { useReactToPrint } from "react-to-print";
import Loading from "../../../common/Loading";
import { Link, useNavigate } from "react-router-dom";
import ComboBox from "../../../common/ComboBox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/ui/table";
import TableOption from "../../../assets/icons/TableOption";
import { Button } from "../../../common/Button";
import Plus from "../../../assets/icons/Plus";
import Filter from "../../../assets/icons/Filter";
import Input from "../../../components/Input";
import Searching from "../../../assets/icons/Searching";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../common/ui/collapse";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../common/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../common/ui/DropDown";
import Cancel from "../../../assets/icons/Cancel";
import EditIcon from "../../../assets/icons/editIcon";
import RepeatIcon from "../../../assets/icons/RepeatIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";

interface Props extends HookForm {
  children?: ReactNode;
  type?: "submit" | "button";
  getValues?: any;
}

const ListBills: React.FC = () => {
  const [paginationOption, setPaginationOption] = useState<any>({
    page: 1,
    sizePerPage: 10,
    totalSize: 10,
    totalPages: 1,
  });
  const { tax, main } = useAppSelector((state) => state);
  const [appMounted, setAppMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [isClickOnRow, setIsClickOnRow] = useState<any>({});
  const [styleRowTable, setStyleRowTable] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [position, setPosition] = useState("bottom")

  const dispatch = useAppDispatch();
  const componentRef = useRef<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    getValues,
    resetField,
  } = useForm<any>({ reValidateMode: "onChange" });
  const navigate = useNavigate();

  console.log(tax?.stepsInfoList?.billStatuses);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "paymentResult",
    copyStyles: true,
    onBeforeGetContent: () => {
      // اعمال تنظیمات CSS برای چاپ از راست به چپ
      const style = document.createElement("style");
      style.innerHTML = `
                  body {
                    direction: rtl; /* تنظیم جهت متن به راست به چپ */
                  }
                `;
      document.head.appendChild(style);
    },
  });

  useEffect(() => {
    dispatch(handleGetBillsList({}));
  }, []);

  const onPageChange = (data: any) => {
    setPaginationOption((prev: any) => ({
      ...prev,
      page: data || 1,
    }));
  };

  useEffect(() => {
    setAppMounted(true);
  }, []);

  useEffect(() => {
    if (appMounted) {
      setPaginationOption((prev: any) => ({
        ...prev,
        page: tax?.allBillList?.pageNumber || 1,
        totalPages: tax?.allBillList?.totalPages,
        totalSize: tax?.allBillList?.totalCount,
        sizePerPage: tax?.allBillList?.pageSize,
      }));
    }
  }, [tax?.allBillList]);

  const handleContollerSearch = (e: FormEvent) => {
    // (prev: any) => ({ ...prev, controllerValues: getValues() })
    e.preventDefault();
    const controllerValues = getValues();
    dispatch(
      handleGetBillsList({ ...controllerValues, loadingName: "search" }),
    );
  };

  useEffect(() => {
    dispatch(
      handleGetBillsList({
        pageNumber: paginationOption?.page,
        pageSize: paginationOption?.sizePerPage,
        paginationOption: paginationOption,
      }),
    );
  }, [paginationOption?.page, paginationOption?.sizePerPage]);

  const printList = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "paymentResult",
    copyStyles: true,
    onBeforeGetContent: () => {
      const style = document.createElement("style");
      style.innerHTML = `
              body {
                direction: rtl; /* تنظیم جهت متن به راست به چپ */
              }
            `;
      document.head.appendChild(style);
    },
  });
  // const handlePrintList = (id: number) => {
  //     dispatch(handlePrintBill(id))
  //     printList();
  // };

  // useEffect(() => {
  //     if () {

  //     }
  // }, [tax?.printBill?.counter])
  // console.log(navigate("/users/baseSubmitTaxReq"));

  const handleEditBill = (item: BillListItems) => {
    const id = item?.id;
    // const subjectId: number = 3;
    // dispatch(
    //   handleGetFields({
    //     patternId: item?.patternId,
    //     typeId: item?.typeId,
    //     subjectId,
    //   })
    // );
    navigate("/users/baseSubmitTaxReq", {
      state: { id, subjectId: 1, referenceTaxId: item?.taxId },
    });
  };

  const handleCancelAble = (item: BillListItems) => {
    // patternTypeId?.billPattern?.id, patternTypeId?.billType?.id, obj?.number
    console.log(item?.taxId);

    const subjectId: number = 3;
    dispatch(
      handleGetFields({
        patternId: item?.patternId,
        typeId: item?.typeId,
        subjectId,
      }),
    );
    navigate("/users/baseSubmitTaxReq", {
      state: { id: item.id, subjectId, referenceTaxId: item?.taxId },
    });
  };

  const handleReturnToSell = (item: BillListItems) => {
    console.log(item);
    const subjectId: number = 4;
    dispatch(
      handleGetFields({
        patternId: item.patternId,
        typeId: item?.typeId,
        subjectId,
      }),
    );
    navigate("/users/baseSubmitTaxReq", {
      state: { id: item.id, subjectId, referenceTaxId: item?.taxId },
    });
  };

  const handleCorrectable = (item: BillListItems) => {
    const subjectId: number = 2;
    dispatch(
      handleGetFields({
        patternId: item.patternId,
        typeId: item?.typeId,
        subjectId,
      }),
    );
    navigate("/users/baseSubmitTaxReq", {
      state: { id: item.id, subjectId, referenceTaxId: item?.taxId },
    });
  };

  const handleRemovable = (item: BillListItems) => {
    console.log(item?.id);
    dispatch(
      handleRemoveBill({
        billId: item?.id
      }),
    );
  }

  return (
    <>
      <section>
        <Collapsible>
          <div className="tw-flex-cols-12 tw-flex tw-flex-col">
            <div className="tw-grid tw-grid-cols-6 tw-justify-between tw-gap-4">
              <Link to="/users/baseTax" >
                <Button
                  className="tw-mb-4 tw-py-2"
                  size={"default"}
                  variant={"default"}
                  title="صورتحساب جدید"
                  icon={<Plus />}
                />
              </Link>
              <div className="tw-relative tw-z-0 tw-col-span-4">
                <span className="tw-inline tw-absolute tw-z-10 tw-bottom-8 tw-right-4" >
                  <Searching color="gray" />
                </span>
                <Input
                  className="tw-mb-4 tw-border-none tw-bg-gray-100"
                  control={control}
                  name="billSerialSearching"
                  placeholder={`جستجوی شماره فاکتور`}
                  rules={{
                    required: "لطفا پست الکترونیکی را وارد کنید",
                  }}
                />
              </div>
              <CollapsibleTrigger className="tw-mb-4 tw-mx-9 tw-rounded-full tw-px-6 ">
                <Button
                  size={"default"}
                  variant={"white"}
                  title="فیلترها"
                  className="tw-rounded-full tw-py-2"
                  icon={<Filter color="grey" />}
                />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="CollapsibleContent">
              <div className="tw-grid tw-grid-cols-4  tw-gap-3" >
                <Input
                  control={control}
                  name="taxId"
                  label="شماره منحصر بفرد مالیاتی"
                  placeholder="جستجو"
                />
                <Input
                  control={control}
                  name="stautsId"
                  label="وضعیت"
                  placeholder="وضعیت را انتخاب کنید"

                />
                <Input
                  control={control}
                  name="issueDate"
                  label="تاریخ صورتحساب"
                  placeholder="تاریخ را انتخاب کنید"

                />
                <div className="tw-flex tw-justify-end tw-items-end" >
                  <Button
                    onClick={handleContollerSearch}
                    name="search"
                    size={"default"}
                    variant={"outLine_default"}
                    title="جستجو"
                    className=""
                  />
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
        {/* <Col className="mb-4 d-flex align-items-center justify-content-center">
              <span
                onClick={() => setOpenFilter(!openFilter)}
                className="d-flex align-items-center rounded-pill cursorPointer border-none p-2 px-4 bg-light shadow text-dark ms-3"
              >
                <i
                  onClick={() => setOpenFilter(!openFilter)}
                  className="cursorPointer d-flex align-items-center bi bi-caret-down-fill text-dark font20 ms-2"
                />
                جستجو
              </span>
            </Col> */}
        {/* <Row className="d-flex justify-content-center">
          <Col xl="11" className=" d-flex justify-content-center">
            <Collapse in={openFilter} className="col-sm-12 col-md-12">
              <Row className="shadow rounded-4 bg-light py-4 mb-4">
                <InputText
                  label="شماره منحصر به فرد مالیاتی:"
                  name="taxId"
                  control={control}
                />
                <InputText
                  label="شناسه خریدار:"
                  name="buyerPersonCode"
                  control={control}
                />
                <ComboBox
                  options={tax?.stepsInfoList?.billStatuses}
                  label="وضعیت صورتحساب:"
                  name="stautsId"
                  control={control}
                />
                <Datepicker
                  control={control}
                  errmsg="لطفا تاریخ ثبت صورتحساب اظهارنامه گمرکی را تعیین کنید"
                  label="تاریخ صورتحساب:"
                  errors={errors}
                  name="issueDate"
                  maxDate={new Date()}
                  persianType="per"
                  className={`${
                    errors.issueDate
                      ? "form-control star border border-danger"
                      : "form-control mb-1"
                  }`}
                />
                <Datepicker
                  control={control}
                  errmsg="لطفا تاریخ ثبت را تعیین کنید"
                  label="تاریخ ثبت:"
                  errors={errors}
                  name="createDate"
                  maxDate={new Date()}
                  persianType="per"
                  className={`${
                    errors.createDate
                      ? "form-control star border border-danger"
                      : "form-control mb-1"
                  }`}
                />
                <InputText
                  label="سریال داخلی صورتحساب:"
                  name="serial"
                  control={control}
                />
                <Col className="d-flex  align-items-end">
                  <Btn
                    xs={4}
                    xl={1}
                    onClick={handleContollerSearch}
                    className=" mt-4 "
                    name="search"
                    loadingName="search"
                    variant="outline-success"
                    title="جستجو"
                  />
                  <Btn
                    xs={4}
                    xl={1}
                    onClick={() =>
                      dispatch(
                        handleGetBillsList({ loadingName: "cancelSearch" }),
                      )
                    }
                    className="mt-4 me-2"
                    loadingName="cancelSearch"
                    variant="outline-danger"
                    title="لغو"
                  />
                </Col>
              </Row>
            </Collapse>
          </Col>
        </Row>
        <Row>
          <Col xs="3" md="2" xl="1" className="d-flex">
            <DropdownButton
              style={{ direction: "ltr" }}
              variant="light"
              className="shadow rounded-pill"
              id="dropdown-basic-button"
              title={tax?.allBillList?.pageSize}
            >
              <Dropdown.Item
                onClick={() => dispatch(handleGetBillsList({ pageSize: 10 }))}
                className="d-flex border-bottom justify-content-center"
              >
                10
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch(handleGetBillsList({ pageSize: 25 }))}
                className="d-flex border-bottom justify-content-center"
              >
                25
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch(handleGetBillsList({ pageSize: 50 }))}
                className="d-flex border-bottom justify-content-center"
              >
                50
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row> */}
        <Table className="tw-w-full tw-mt-4 tw-table-fixed">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="tw-w-[60px] tw-rounded-r-xl tw-p-2">
                #
              </TableHead>
              <TableHead className="tw-w-[60px]"> موضوع </TableHead>
              <TableHead className="tw-w-[220px]">
                شماره منحصربفرد مالیاتی
              </TableHead>
              <TableHead className="tw-w-[200px]">وضعیت</TableHead>
              <TableHead className="tw-w-[230px]">شماره فاکتور</TableHead>
              <TableHead className="tw-w-[120px]"> تاریخ صورتحساب</TableHead>
              <TableHead className="tw-w-[120px] ">خریدار</TableHead>
              <TableHead className="tw-w-[120px]">تاریخ ثبت</TableHead>
              <TableHead className="tw-w-[230px]"> الگوی صورتحساب </TableHead>
              <TableHead className="tw-w-[200px] tw-rounded-l-xl">
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            style={{ verticalAlign: "center" }}
            className="text-center"
          >
            {tax?.allBillList?.items?.length !== 0 ? (
              tax?.allBillList?.items?.map((item: any, index: number) => {
                console.log(item);
                // const oparationDate: string = String(item?.date?.convert(persian, persian_fa))
                // const oparationExpenses: string = StringHelpers.formatNumber(item.expenses)
                return (
                  <TableRow className=" " key={item.id}>
                    <TableCell className="fitTableCell tw-flex tw-items-center tw-justify-center tw-rounded-r-2xl tw-text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <span>
                            <TableOption color="#4cc19e" />
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem className="tw-flex tw-text-center tw-justify-end" value="bottom">
                              <div className="tw-flex tw-items-center tw-cursor-pointer" onClick={() => handleCancelAble(item)} >
                                <span className="tw-me-3" >
                                  ابطال
                                </span>
                                <Cancel />
                              </div>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="tw-flex tw-text-center tw-justify-end" value="top">
                              <div className="tw-flex tw-items-center tw-cursor-pointer" onClick={() => handleEditBill(item)} >
                                <span className="tw-me-3">
                                  اصلاح
                                </span>
                                <EditIcon />
                              </div>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="tw-flex tw-text-center tw-justify-end" value="right">
                              <div className="tw-flex tw-items-center tw-cursor-pointer" onClick={() => handleReturnToSell(item)} >
                                <span className="tw-me-3">
                                  بازگشت از فروش
                                </span>
                                <RepeatIcon />
                              </div>
                            </DropdownMenuRadioItem>
                            {item?.isRemovable &&
                              <DropdownMenuRadioItem className="tw-flex tw-text-center tw-justify-end" value="right">
                                <div
                                  className="tw-flex tw-items-center tw-cursor-pointer"
                                  onClick={() => handleRemovable(item)}
                                >
                                  <span
                                    className="tw-me-3"
                                  >
                                    حذف
                                  </span>
                                  <DeleteIcon />
                                </div>
                              </DropdownMenuRadioItem>
                            }
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </TableCell>
                    <TableCell>{item?.subject}</TableCell>
                    <TableCell>{item?.taxId}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>{item?.serial}</TableCell>
                    <TableCell>{item?.issueDate}</TableCell>
                    <TableCell>{item?.buyerPerson}</TableCell>
                    <TableCell>{item?.createDate}</TableCell>
                    <TableCell>{item?.billPattern}</TableCell>
                    <TableCell className="tw-rounded-l-2xl">
                      <div className="justify-content-center d-flex">
                        <i
                          className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center p-2 bi bi-cloud-arrow-down-fill rounded-pill  tw-text-primary"
                          onClick={async () => {
                            await dispatch(handlePrintBill(item?.id));
                            printList();
                          }}
                        />
                        {item?.isCancellable && (
                          <i
                            className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 bi bi-dash-circle-fill rounded-pill  tw-text-primary"
                            onClick={() => handleCancelAble(item)}
                          />
                        )}
                        {item?.isReturnable && (
                          // {true && (
                          <i
                            className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 bi bi-arrow-repeat rounded-pill  tw-text-primary"
                            onClick={() => handleReturnToSell(item)}
                          />
                        )}
                        {item?.isEditable && (
                          <i
                            onClick={() => handleEditBill(item)}
                            className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-pencil-square tw-text-primary"
                          />
                        )}
                        {item?.isCorrectable && (
                          <i
                            onClick={() => handleCorrectable(item)}
                            className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-clipboard-check tw-text-primary"
                          />
                        )}
                        {item?.isRemovable
                          && (
                            <i
                              onClick={() => handleRemovable(item)}
                              className="d-flex justify-content-center font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-clipboard-check tw-text-primary"
                            />
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell className="fitTable" colSpan={10}>
                  اطلاعاتی برای نمایش وجود ندارد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <PaginationTable
          currentPage={paginationOption.page}
          totalPages={paginationOption.totalPages}
          onPageChange={onPageChange}
        />
        <div>
          {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </div>
        <div className="d-none">
          <PrintBillList componentRef={componentRef} />
        </div>
      </section >
    </>
  );
};

export default ListBills;
