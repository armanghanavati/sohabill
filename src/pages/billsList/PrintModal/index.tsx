import Modal from "src/components/Modal";
import logo from "../../../assets/img/dibajadid.png";
import { BillsPrintType } from "../types";
import { useEffect } from "react";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
type PrintModalsProps = {
  openModal: boolean;
  inputsData?: BillsPrintType | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
function PrintModals({
  openModal,
  setOpenModal,
  inputsData,
}: PrintModalsProps) {
  const dataHeader = [
    { title: "#" },
    {
      title: "شناسه کالا",
    },
    {
      title: "شرح کالا",
    },
    {
      title: "تعداد",
    },

    {
      title: "واحد اندازه‌گیری",
    },
    {
      title: "مبلغ واحد (ریال)",
    },
    { title: "مبلغ تخفیف" },
    { title: "نوع ارز" },
    { title: "نرخ مالیات برارزش افزوده" },
    { title: "مبلغ مالیات برارزش افزوده" },
    { title: "مبلغ کل" },
  ];

  const handleSave = () => {
    const targetElement = document.getElementById("targetSection");
    html2pdf(targetElement, {
      margin: 1,
      filename: "TAX.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },

      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    }).then((pdf: any) => {
      saveAs(pdf, "Tax.pdf");
    });
  };

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        handleSave();
      }, 1000);
    }
  }, [openModal]);

  return (
    <Modal
      isOpen={openModal}
      setIsOpen={setOpenModal}
      title=""
      width="2640px"
      padding="0px"
    >
      <div className="tw-p-[11px] tw-text-[#595959]" id="targetSection">
        <div className=" tw-mb-3 tw-flex tw-items-center tw-justify-between tw-font-vazir tw-font-semibold">
          <p className="tw-m-0 tw-text-[9px] tw-font-semibold tw-leading-[18px]">
            تاریخ صورت حساب : {inputsData?.createDate}
          </p>
          <p className="tw-m-0 tw-text-[11px] tw-font-semibold tw-leading-[22px]">
            صورت حساب الکترونیکی فروش کالا/خدمات
          </p>
          <img src={logo} alt="logo" />
        </div>
        <div className="">
          <div className="  tw-mb-[8px] tw-grid tw-grid-cols-4 tw-justify-between tw-gap-2 tw-bg-[#F9FAFB] tw-px-[2px] tw-py-2">
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] ">
              موضوع صورتحساب : {inputsData?.subject}
            </p>
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
              شماره منحصر به فرد مالیاتی صورتحساب مرجع :
              {inputsData?.referenceTaxId}
            </p>
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
              تاریخ صدور صورتحساب : {inputsData?.issueDate}
            </p>
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
              الگو: {inputsData?.billPaternType}
            </p>
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
              شماره منحصر به فرد مالیاتی : {inputsData?.taxId}
            </p>
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
              سریال صورتحساب داخلی حافظه مالیاتی : {inputsData?.serial}
            </p>
            <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
              شماره صورتحساب داخلی : {inputsData?.billSerial}
            </p>
          </div>

          <div className="tw-mb-[8px]">
            <p className="tw-m-[8px] tw-font-vazir tw-text-[10px] tw-font-medium tw-leading-[20px]">
              مشخصات فروشنده
            </p>
            <div className="tw-grid tw-grid-cols-4 tw-justify-between tw-gap-[8px] tw-gap-y-2 tw-bg-[#F9FAFB]  tw-px-2 tw-py-[10px] tw-text-[#929292]">
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                نام شخص حقیقی/حقوقی :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.fullname}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                شناسه یکتای ثبت قرارداد :
                <span className="tw-px-1 tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.registrationNumber}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                کد شعبه :
                <span className="tw-px-1 tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.sellerBranchCode}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                نام شرکت :
                <span className="tw-px-1 tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.companyName}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                شماره اقتصادی :
                <span className="tw-px-1 tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.economicCode}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                شماره/شناسه ملی :
                <span className="tw-px-1 tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.nationalCode}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                کد پستی :
                <span className="tw-px-1 tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerPersonPostalCode}
                </span>
              </p>
            </div>
          </div>
          <div className="tw-mb-[8px]">
            <p className="tw-m-[8px] tw-font-vazir tw-text-[10px] tw-font-medium tw-leading-[20px]">
              مشخصات خریدار
            </p>
            <div className="tw-grid tw-grid-cols-4 tw-justify-between tw-gap-[8px] tw-gap-y-2 tw-bg-[#F9FAFB]  tw-px-2 tw-py-[10px] tw-text-[#929292]">
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                نام شخص حقیقی/حقوقی :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerPersonFullName}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                کد شعبه :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerPersonBranchCode}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                شماره/شناسه ملی :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerPersonNationalId}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                کد پستی :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerPersonPostalCode}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                شماره اقتصادی :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerPersonEconomicCode}
                </span>
              </p>
              <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                نام شرکت :
                <span className="tw-px-1 tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[18px] tw-text-[#595959]">
                  {inputsData?.buyerCompanyName}
                </span>
              </p>
            </div>
          </div>

          <div className="tw-relative tw-mb-[23px] tw-overflow-x-auto">
            <p className="tw-m-[5px]tw-font-vazir tw-text-[10px] tw-font-semibold tw-leading-[20px] tw-text-[#595959] ">
              مشخصات کالا
            </p>
            <div className="tw-border-rgba(146, 146, 146, 1) tw-rounded-md ">
              <table className="tw-text-gray-500 tw-w-full tw-table-fixed tw-border">
                <thead className="tw-text-gray-700 tw-bg-gray-50 tw-border tw-bg-gray-100">
                  <tr>
                    {dataHeader?.map((item) => (
                      <th className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                        {item?.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inputsData?.billItems?.map((item, index) => (
                    <>
                      <tr
                        key={index}
                        className={`tw-group tw-border-b ${index % 2 === 0 ? "tw-bg-white" : "tw-bg-[#E7E7E7]"} `}
                      >
                        <td
                          className={`${!!item?.totoalAmount && "tw-pr-[24px] tw-font-semibold"} " tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal  group-last:tw-bg-[#E7E7E7] `}
                        >
                          {!!item?.totoalAmount
                            ? item?.totoalAmount
                            : index + 1}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.serviceOrProductId}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.description}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.count}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.measurementUnit}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.unitPrice}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-white group-last:tw-font-semibold`}
                        >
                          {item.discount}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.currencyType}
                        </td>
                        <td
                          className={`" tw-leading-[18px]" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal group-last:tw-bg-[#E7E7E7]`}
                        >
                          {item.valueIncreasedTaxRate}
                        </td>
                        <td
                          className={`tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px] group-last:tw-bg-white group-last:tw-font-semibold`}
                        >
                          {item.valueIncreasedTaxPrice}
                        </td>
                        <td
                          className={`tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px] group-last:tw-bg-white group-last:tw-font-semibold`}
                        >
                          {item.totalItemPrice}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="tw-border-rgba(146, 146, 146, 1) tw-flex tw-gap-2 tw-rounded-md">
            <div className="tw-ml-[17px] tw-flex tw-items-start tw-gap-2">
              <table className="tw-text-gray-500  tw-table-fixed tw-border">
                <thead className="tw-text-gray-700 tw-bg-gray-50 tw-border tw-bg-gray-100">
                  <tr>
                    <th className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                      مبلغ نهایی
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={"tw-group tw-border-b"}>
                    <td className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px]">
                      {inputsData?.totalCost}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="tw-text-gray-500  tw-table-fixed tw-border">
                <thead className="tw-text-gray-700 tw-bg-gray-50 tw-border tw-bg-gray-100">
                  <tr>
                    <th className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                      مالیات موضوع 17
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={"tw-group tw-border-b"}>
                    <td className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px]">
                      {inputsData?.taxArticle17}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="tw-text-gray-500 tw-table-fixed tw-border">
                <thead className="tw-text-gray-700 tw-bg-gray-50 tw-border tw-bg-gray-100">
                  <tr>
                    <th className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                      روش تسویه
                    </th>
                    <th className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                      مبلغ پرداختی نقدی بدون احتساب ارزش افزوده
                    </th>
                    <th className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[18px]">
                      مبلغ نسیه بدون احتساب ارزش افزوده
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={"tw-group tw-border-b"}>
                    <td className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px]">
                      {inputsData?.settelmentType}
                    </td>
                    <td className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px]">
                      {inputsData?.cashPrice}
                    </td>
                    <td className=" tw-px-3 tw-py-3 tw-text-center tw-font-vazir tw-text-[9px] tw-font-normal tw-leading-[18px]">
                      {inputsData?.creditPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              {inputsData?.billItems?.slice(0, -1)?.map((item, index) => (
                <>
                  {item?.otherTaxPrice !== "-" && (
                    <p
                      key={index + 1}
                      className="tw-font-vazir tw-text-[9px] tw-font-semibold tw-leading-[15px]"
                    >
                      + موضوع {item?.otherTaxSubject + " "}
                      ردیف
                      {" " + index + 1 + " "}
                      به مبلغ
                      {" " + item?.otherTaxPrice + " "}
                      است.
                    </p>
                  )}
                  {!!item?.otherLegalFundsPrice && (
                    <p className="tw-font-vazir  tw-text-[9px] tw-font-semibold tw-leading-[15px]">
                      + موضوع {" " + item?.otherLegalFundsSubject + " "} : ردیف
                      {" " + index + 1 + " "}
                      به مبلغ
                      {" " + item?.otherLegalFundsPrice + " "} است.
                    </p>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default PrintModals;
