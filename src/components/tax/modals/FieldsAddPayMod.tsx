import React, { useEffect } from "react";
import InputText from "../../../common/InputText";
import { HookForm } from "../../../models/AllData.model";
import { Controller } from "react-hook-form";
import Datepicker from "../../../common/DatePicker";
import { useAppSelector } from "../../../hooks/hook";
import ComboBox from "../../../common/ComboBox";

const FieldsAddPayMod: React.FC<HookForm> = ({ control, errors, watch }) => {
  const { tax } = useAppSelector((state) => state);

  // console.log(watch('paymentType').id);

  useEffect(() => {}, []);

  return (
    <>
      {/* <Controller
                control={control}
                name="paymentType"
                rules={{ required: { value: tax.isReqStepsCombo, message: "لطفا روش پرداخت را تعیین کنید" } }}
                render={({ field }) => */}
      <ComboBox
        control={control}
        errmsg="لطفا روش پرداخت را تعیین کنید"
        name="paymentType"
        label="روش پرداخت:"
        md={12}
        isDisabled={tax.isDisable ? true : false}
        // field={field}
        options={tax.stepsInfoList?.paymentTypes}
        className={`${
          errors.settlementType ? "rounded-2 star border border-danger" : "mb-1"
        }`}
        errors={errors}
      />
      {/* }
            /> */}
      <Datepicker
        validate={(value: number | string) => {
          const oprationPayType = watch("paymentType")?.id !== undefined;
          // const oprationPayDate = watch("paymentDate") !== ""
          if (oprationPayType && value === "") {
            return "لطفا تاریخ و زمان پرداخت را وارد کنید";
          }
          return true;
        }}
        control={control}
        label="تاریخ و زمان پرداخت:"
        errors={errors}
        name="paymentDate"
        maxDate={new Date()}
        persianType="per"
      />
      <InputText
        validate={(value: number | string) => {
          const oprationPayType = watch("paymentType")?.id !== undefined;
          // const oprationPayDate = watch("paymentDate") !== ""
          if (oprationPayType && value === "") {
            return "لطفا مبلغ پرداختی را وارد کنید";
          }
          return true;
        }}
        errmsgmin="مبلغ پرداختی حداقل باید 5 رقم باشد"
        errminimum={5}
        errors={errors}
        control={control}
        label="مبلغ پرداختی:"
        name="paidAmount"
        type="number"
        length_num={16}
        currency
      />
      {/* <InputText
        errmsg="لطفا شماره سوئیچ پرداخت را وارد کنید"
        errmsgmin="شماره سوئیچ پرداخت حداقل باید 6 رقم باشد"
        errminimum={6}
        errors={errors}
        control={control}
        label=" شماره سوئیچ پرداخت:"
        name="paymentSwitchNumber"
        type="number"
        length_num={9}
      /> */}
      {/* <InputText
        errmsg="لطفا شماره پذیرنده فروشگاهی را وارد کنید"
        errmsgmin="شماره پذیرنده فروشگاهی حداقل باید 6 رقم باشد"
        errminimum={6}
        errors={errors}
        control={control}
        label="شماره پذیرنده فروشگاهی:"
        name="acceptanceNumber"
        type="number"
        length_num={14}
      /> */}
      {/* <InputText
        errmsg="لطفا شماره پایانه را وارد کنید"
        errmsgmin="شماره پایانه حداقل باید 6 رقم باشد"
        errminimum={6}
        errors={errors}
        control={control}
        label="شماره پایانه:"
        name="terminalNumber"
        type="number"
        length_num={8}
      /> */}
      {/* <InputText
        errmsg="لطفا شماره پیگیری/شماره مرجع را وارد کنید"
        errmsgmin="شماره پیگیری/شماره مرجع حداقل باید 6 رقم باشد"
        errminimum={6}
        errors={errors}
        control={control}
        label="شماره پیگیری/شماره مرجع:"
        name="trackingNumber"
        type="number"
        length_num={14}
      /> */}
      <InputText
        errmsg="لطفا شماره کارت پرداخت کننده صورتحساب وارد کنید"
        errmsgmin="شماره کارت پرداخت کننده صورتحساب حداقل باید 5 رقم باشد"
        errminimum={5}
        errors={errors}
        control={control}
        label="شماره کارت پرداخت کننده صورتحساب:"
        name="payerCardNumber"
        type="number"
        length_num={16}
      />
      <InputText
        errmsg="لطفا کد فراگیر پرداخت کننده را وارد کنید"
        errmsgmin="کد فراگیر پرداخت کننده حداقل باید 5 رقم باشد"
        errminimum={5}
        errors={errors}
        control={control}
        label="شناسه ملی/کد فراگیر پرداخت کننده صورتحساب:"
        name="payerCodeNumber"
        type="number"
        length_num={12}
      />
    </>
  );
};

export default FieldsAddPayMod;
