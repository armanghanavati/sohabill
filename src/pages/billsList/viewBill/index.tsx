import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RsetShowToast } from "src/common/slices/mainSlice";
import { printBill } from "src/services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import { Table, TableParamsType, ColumnsType } from "src/components/Table";
import EyeIcon from "src/assets/icons/EyeIcon";
import { BillsPrintType } from "../types";
import ViewBillGoodsInfoModal from "./ViewBillGoodsInfoModal";
import ViewBillErrorsListModal from "./ViewBillErrorsListModal";
import Circale from "src/assets/icons/Circle";

export interface Item {
  id?: number | string;
  stuffCode?: string;
  internalCode?: number | string;
  description?: number | string;
  unitPrice?: number | string;
  discount?: number | string;
  otherTaxRate?: number | string;
  otherTaxSubject?: string;
  otherLegalFundsRate?: number | string;
  otherLegalFundsSubject?: string;
  detail?: string;
  code?: string;
  date?: string;
  currency?: any;
  currencyObject?: null | string;
  totalItemPrice?: any;
  valueIncreasedTaxRate?: null | string;
  count?: null | number;
}

const ViewBill = ({}) => {
  const [inputsData, setInputsData] = useState<BillsPrintType>();
  const [isOpenGoodsInfo, setIsOpenGoodsInfo] = useState(false);
  const [isOpenErrorsList, setIsOpenErrorsList] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [tableParams, setTableParams] = useState<TableParamsType>({
    current: 1,
    pageSize: 20,
    total: 20,
  });

  const printBillServices = asyncWrapper(async (id: number) => {
    const res = await printBill(id);
    if (res?.data?.code === 0) {
      setInputsData(res?.data?.result);
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

  const columns: ColumnsType<Item>[] = [
    {
      render: (item: Item) => <div>{item.description}</div>,
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
      render: (item: Item) => <div>{item.valueIncreasedTaxRate}</div>,
      header: "درصد مالیات بر ارزش افزوده",
    },
    {
      render: (item: Item) => <div>{item.totalItemPrice}</div>,
      header: "مبلغ کل",
    },
    {
      header: "اطلاعات کالا",
      render: (data: any) => {
        return (
          <div className="tw-flex tw-justify-center tw-gap-4">
            <span onClick={() => infoHandler(data)}>
              <EyeIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const infoHandler = (data: any) => {
    setIsOpenGoodsInfo(true);
  };
  const showErrors = (data: any) => {
    setIsOpenErrorsList(true);
  };
  const columns1: ColumnsType<Item>[] = [
    {
      render: (item: Item) => <div>{item.date}</div>,
      header: "تاریخ",
    },
    {
      header: "نمایش خطا",
      render: (data: any) => {
        return (
          <div className="tw-flex tw-justify-center tw-gap-4">
            <span onClick={() => showErrors(data)}>
              <EyeIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const handleChangePagination = (params: TableParamsType) => {
    setTableParams(params);
  };

  useEffect(() => {
    printBillServices(id);
  }, []);

  const childrenGoodsInfoProps = {
    isOpenGoodsInfo,
    setIsOpenGoodsInfo,
    inputsData,
  };
  const childrenErrorsListProps = {
    isOpenErrorsList,
    setIsOpenErrorsList,
    inputsData,
  };
  return (
    <>
      <div className=" tw-font-vazir tw-font-semibold tw-text-[#595959] ">
        <div className="tw-mb-8 tw-flex  tw-flex-col xl:tw-flex-row">
          <div className="tw-ml-9 md:tw-w-full xl:tw-w-[25%]">
            <p className="tw-ml-[17px] tw-flex  tw-items-center tw-text-[16px] tw-leading-[32px]">
              <span className="tw-pl-[12px]">
                <Circale
                  color={`${inputsData?.statusColor === "success" ? "#2BC985" : "#F7832F"}`}
                />
              </span>
              وضعیت : {inputsData?.statusDescription}
            </p>
            <Table
              tableParams={tableParams}
              setTableParams={handleChangePagination}
              data={inputsData?.errors}
              columns={columns1}
            />
          </div>
          <div className="md:tw-w-full xl:tw-w-[75%]">
            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-1  tw-justify-between tw-gap-[8px] tw-gap-y-2 tw-bg-[#F9FAFB] tw-px-2 tw-py-[10px] tw-text-[12px] tw-leading-[24px]  tw-text-[#929292] xl:tw-grid-cols-5">
              <div className="col-span-5 xl:tw-col-span-2">
                <p>
                  شماره منحصر به فرد مالیاتی صورتحساب مرجع :
                  <span className="tw-px-1    tw-text-[#595959]">
                    {inputsData?.referenceTaxId}
                  </span>
                </p>
                <p>
                  سریال صورتحساب داخلی حافظه مالیاتی :
                  <span className="tw-px-1   tw-text-[#595959]">
                    {inputsData?.serial}
                  </span>
                </p>
                <p>
                  موضوع صورتحساب :
                  <span className="tw-px-1   tw-text-[#595959]">
                    {inputsData?.subject}
                  </span>
                </p>
              </div>
              <div className="col-span-5 xl:tw-col-span-2">
                <p>
                  شماره منحصر به فرد مالیاتی :
                  <span className="tw-px-1   tw-text-[#595959]">
                    {inputsData?.taxId}
                  </span>
                </p>
                <p>
                  تاریخ صدور صورتحساب :
                  <span className="tw-px-1   tw-text-[#595959]">
                    {inputsData?.issueDate}
                  </span>
                </p>
                <p>
                  شماره صورتحساب داخلی :
                  <span className="tw-px-1 tw-text-[#595959]">
                    {inputsData?.billSerial}
                  </span>
                </p>
              </div>
              <div className="col-span-5 xl:tw-col-span-1">
                <p>
                  الگو:
                  <span className="tw-px-1   tw-text-[#595959]">
                    {inputsData?.billPaternType}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-mb-8 tw-w-full">
          <Table
            tableParams={tableParams}
            setTableParams={handleChangePagination}
            data={inputsData?.billItems}
            columns={columns}
          />
        </div>
        <div className="tw-mb-[53px]">
          <div className="tw-mb-[32px]">
            <p className="tw-mb-[8px] tw-text-[14px] tw-font-semibold tw-leading-[28px]">
              مشخصات فروشنده
            </p>
            <div className="tw-grid tw-justify-between tw-gap-[8px]  tw-gap-y-2 tw-bg-[#F9FAFB] tw-px-2 tw-py-[10px] tw-text-[12px] tw-leading-[24px]  tw-text-[#929292] md:tw-grid-cols-1 xl:tw-grid-cols-4">
              <p>
                نام شخص حقیقی/حقوقی :
                <span className="tw-px-1    tw-text-[#595959]">
                  {inputsData?.fullname}
                </span>
              </p>
              <p>
                شناسه یکتای ثبت قرارداد :
                <span className="tw-px-1   tw-text-[#595959]">
                  {inputsData?.registrationNumber}
                </span>
              </p>
              <p>
                کد شعبه :
                <span className="tw-px-1   tw-text-[#595959]">
                  {inputsData?.sellerBranchCode}
                </span>
              </p>
              <p>
                نام شرکت :
                <span className="tw-px-1   tw-text-[#595959]">
                  {inputsData?.companyName}
                </span>
              </p>
              <p>
                شماره اقتصادی :
                <span className="tw-px-1 tw-text-[#595959]">
                  {inputsData?.economicCode}
                </span>
              </p>
              <p>
                شماره/شناسه ملی :
                <span className="tw-px-1   tw-text-[#595959]">
                  {inputsData?.nationalCode}
                </span>
              </p>
              <p>
                کد پستی :
                <span className="tw-px-1   tw-text-[#595959]">
                  {inputsData?.buyerPersonPostalCode}
                </span>
              </p>
            </div>
          </div>
          <div className="tw-mb-[32px]">
            <p className="tw-mb-[8px] tw-font-vazir tw-text-[14px] tw-font-semibold tw-leading-[28px]">
              مشخصات خریدار
            </p>
            <div className=" md:grid tw-grid  tw-justify-between  tw-gap-[8px] tw-gap-y-2 tw-bg-[#F9FAFB] tw-px-2 tw-py-[10px] tw-text-[12px] tw-leading-[24px] tw-text-[#929292]  md:tw-grid-cols-1 xl:tw-grid-cols-4">
              <p>
                نام شخص حقیقی/حقوقی :
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.buyerPersonFullName}
                </span>
              </p>
              <p>
                کد شعبه :
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.buyerPersonBranchCode}
                </span>
              </p>
              <p>
                شماره/شناسه ملی :
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.buyerPersonNationalId}
                </span>
              </p>
              <p>
                کد پستی :
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.buyerPersonPostalCode}
                </span>
              </p>
              <p>
                شماره اقتصادی :
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.buyerPersonEconomicCode}
                </span>
              </p>
              <p>
                نام شرکت :
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.buyerCompanyName}
                </span>
              </p>
            </div>
          </div>
          <div className="tw-mb-[8px]">
            <p className="tw-mb-[8px] tw-font-vazir tw-text-[14px] tw-font-semibold tw-leading-[28px]">
              اطلاعات تکمیلی
            </p>
            <div className=" tw-grid tw-justify-between tw-gap-[8px] tw-gap-y-2 tw-bg-[#F9FAFB] tw-px-2 tw-py-[10px]  tw-text-[12px] tw-leading-[24px] tw-text-[#929292] md:tw-grid-cols-1 xl:tw-grid-cols-4">
              {inputsData?.article17TaxPrice !== "-" && (
                <p>
                  مالیات موضوع 17:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.taxArticle17}
                  </span>
                </p>
              )}
              {inputsData?.buyerPersonBranchCode !== "-" && (
                <p>
                  کد شعبه خریدار:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.buyerPersonBranchCode}
                  </span>
                </p>
              )}
              {inputsData?.sellerBranchCode !== "-" && (
                <p>
                  کد شعبه فروشنده:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.sellerBranchCode}
                  </span>
                </p>
              )}
              {inputsData?.customsLicenseNumber !== "-" && (
                <p>
                  شماره پرونده گمرکی فروشنده:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.customsLicenseNumber}
                  </span>
                </p>
              )}
              {inputsData?.cotageDate !== "-" && (
                <p>
                  تاریخ کوتاژ اظهارنامه گمرکی:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.cotageDate}
                  </span>
                </p>
              )}
              {inputsData?.flightTypes !== "-" && (
                <p>
                  نوع پرواز:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.flightTypes}
                  </span>
                </p>
              )}
              {inputsData?.customsCode !== "-" && (
                <p>
                  کد گمرک محل اظهار فروشنده:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.customsCode}
                  </span>
                </p>
              )}
              {inputsData?.cotageNumber !== "-" && (
                <p>
                  شماره کوتاژ اظهارنامه گمرکی:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.cotageNumber}
                  </span>
                </p>
              )}
              {inputsData?.registrationNumber !== "-" && (
                <p>
                  شناسه یکتای ثبت قرارداد فروشنده:
                  <span className="tw-px-1  tw-text-[#595959]">
                    {inputsData?.registrationNumber}
                  </span>
                </p>
              )}
              <p>
                شماره اشتراک / شناسه قبض بهره بردار:
                <span className="tw-px-1  tw-text-[#595959]">
                  {inputsData?.subscriptionNumber}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="tw-mb-[107px] tw-grid tw-w-full tw-grid-cols-2 tw-gap-3 tw-rounded-lg tw-border-none tw-bg-gray-100 tw-px-3 tw-py-2 tw-text-mainBlack lg:tw-mt-3 lg:tw-grid-cols-4">
          <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
            <span className="tw-text-xs lg:tw-text-base">مبلغ کل</span>
            <span className="tw-text-xs lg:tw-text-base">
              {inputsData?.totalCost + " " + "تومان"}
            </span>
          </div>
          <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
            <span className="tw-text-xs lg:tw-text-base">مجموع مالیات</span>
            <span className="tw-text-xs lg:tw-text-base">
              {inputsData?.totalValueIncreasedTaxPrice + " " + "تومان"}
            </span>
          </div>
          <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
            <span className="tw-text-xs lg:tw-text-base">مجموع تخفیف</span>
            <span className="tw-text-xs lg:tw-text-base">
              {inputsData?.totalDiscount + " " + "تومان"}
            </span>
          </div>
          <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
            <span className="tw-text-xs lg:tw-text-base">مبلغ نهایی</span>
            <span className="tw-text-xs lg:tw-text-base">
              {inputsData?.totalCost + " " + "تومان"}
            </span>
          </div>
        </div>
      </div>
      {isOpenGoodsInfo && (
        <ViewBillGoodsInfoModal {...childrenGoodsInfoProps} />
      )}
      {isOpenErrorsList && (
        <ViewBillErrorsListModal {...childrenErrorsListProps} />
      )}
    </>
  );
};

export default ViewBill;
