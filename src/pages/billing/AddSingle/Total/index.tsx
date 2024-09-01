import React from "react";

const Total: React.FC<any> = ({ selectedItemGoods }) => {
  const totalDiscount =
    selectedItemGoods?.result &&
    selectedItemGoods?.result?.reduce(
      (acc: number, item: any) => acc + Number(item.discount),
      0,
    );

  const totalTax = selectedItemGoods?.result?.reduce(
    (acc: number, item: any) => {
      const value =
        ((parseFloat(item.count) * item.unitPrice - item.discount) * item.vat) /
        100;
      return acc + value;
    },
    0,
  );

  const totalAmount = selectedItemGoods?.result?.reduce(
    (acc: number, item: any) => {
      const value = parseFloat(item.count) * item.unitPrice - item.discount;
      return acc + value;
    },
    0,
  );

  const round = (total: number) => {
    return Math.round(total * 10) / 10;
  };

  return (
    <div
      className={
        "tw-grid tw-w-full tw-grid-cols-2 tw-gap-3 tw-rounded-lg tw-border-none tw-bg-gray-100 tw-px-3 tw-py-2 tw-text-mainBlack lg:tw-mt-3 lg:tw-grid-cols-4"
      }
    >
      <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
        <span className="tw-text-xs lg:tw-text-base">مبلغ کل</span>
        <span className="tw-text-xs lg:tw-text-base">
          {isNaN(round(totalAmount)) || round(totalAmount) === 0
            ? 0
            : round(totalAmount) + " تومان"}
        </span>
      </div>
      <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
        <span className="tw-text-xs lg:tw-text-base">مجموع مالیات</span>
        <span className="tw-text-xs lg:tw-text-base">
          {isNaN(round(totalTax)) || round(totalTax) === 0
            ? 0
            : round(totalTax) + " تومان"}
        </span>
      </div>
      <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
        <span className="tw-text-xs lg:tw-text-base">مجموع تخفیف</span>
        <span className="tw-text-xs lg:tw-text-base">
          {isNaN(round(totalDiscount)) || round(totalDiscount) === 0
            ? 0
            : round(totalDiscount) + " تومان"}
        </span>
      </div>
      <div className="tw-flex tw-justify-between tw-gap-5 lg:tw-justify-normal lg:tw-gap-3">
        <span className="tw-text-xs lg:tw-text-base">مبلغ نهایی</span>
        <span className="tw-text-xs lg:tw-text-base">
          {(isNaN(round(totalAmount)) ? 0 : round(totalAmount)) +
            (isNaN(round(totalTax)) ? 0 : round(totalTax)) ===
          0
            ? 0
            : (isNaN(round(totalAmount)) ? 0 : round(totalAmount)) +
              (isNaN(round(totalTax)) ? 0 : round(totalTax)) +
              " تومان"}
        </span>
      </div>
    </div>
  );
};

export default Total;
