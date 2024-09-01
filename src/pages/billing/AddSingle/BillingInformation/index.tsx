import React, { useEffect, useState } from "react";
import ComboBox from "../../../../components/ComboBox/index";
import Datepicker from "../../../../components/DatePicker/index";
import {
  SelectOption,
  SerGetBillInitializeData,
  ValidSteps,
} from "../../../../models/AllData.model";
import Input from "../../../../components/Input";
import { billTypeId } from "../../../../services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { useParams } from "react-router-dom";
import { Control, FieldErrors } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import StringHelpers from "src/helpers/string-helpers";

interface BillingProps {
  control: Control<ValidSteps>;
  billInitializeData: SerGetBillInitializeData | undefined;
  errors?: FieldErrors<ValidSteps>;
  getField: (e: number) => void;
  handleCheckStatus: (name: string) => number | undefined;
  compareShamsiDates: (
    cotageDate: string,
    issueDate: string,
  ) => boolean | undefined;
  getValues?: any;
  setValue?: any;
}
const BillingInformation: React.FC<BillingProps> = ({
  control,
  billInitializeData,
  errors,
  getField,
  handleCheckStatus,
  getValues,
  compareShamsiDates,
  setValue,
}) => {
  const params = useParams();
  const [billTypeData, setBillTypeData] = useState<SelectOption[]>([]);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const getBillTypeId = asyncWrapper(async (data: SelectOption) => {
    const postData: number = Number(data?.id);
    const response = await billTypeId(postData);
    setBillTypeData(response.data?.result);
  });

  useEffect(() => {
    if (
      !!params?.subjectTypeId &&
      !!getValues("billTypeId") &&
      !!handleCheckStatus("billPatternId") &&
      !(handleCheckStatus("billPatternId") === 1)
    ) {
      getBillTypeId(getValues("billTypeId"));
    }
  }, [getValues("billTypeId"), handleCheckStatus("billPatternId")]);

  return (
    <>
      {!isSmallScreen && (
        <h3 className="tw-m-0 tw-w-full tw-text-right tw-text-xss lg:tw-text-xll">
          افزودن تکی صورتحساب
        </h3>
      )}
      <div className="tw-mb-8 tw-mt-6 tw-grid tw-grid-cols-2 tw-gap-x-6 tw-gap-y-3 md:tw-grid-cols-3 lg:tw-grid-cols-4 lg:tw-gap-y-6">
        <Input
          label="شماره صورت حساب"
          placeholder="شماره صورت حساب را وارد کنید"
          name="billSerial"
          disabled={
            params?.subjectTypeId === "1" ||
            handleCheckStatus("billSerial") === 1
          }
          control={control}
          errors={errors?.billSerial}
          rules={{
            minLength: {
              message: "شماره فاکتور صورتحساب حداقل باید 2 رقم باشد",
              value: 2,
            },
            required:
              handleCheckStatus("billSerial") === 3
                ? "لطفا شماره فاکتور صورتحساب را وارد کنید"
                : "",
            // validate: (value: string) => {
            //   if (!!!value && handleCheckStatus("billSerial") === 3) {
            //     return "لطفا شماره فاکتور صورتحساب را وارد کنید";
            //   }
            //   return true;
            // },
          }}
        />
        <Datepicker
          label="تاریخ صورتحساب"
          name="issueDate"
          control={control}
          errors={errors?.issueDate}
          rules={{
            required:
              handleCheckStatus("issueDate") === 3
                ? "لطفا تاریخ صورتحساب را تعیین کنید"
                : "",
            validate: (value: string) => {
              if (getValues("billPatternId")?.id === "7") {
                const cotageDate = StringHelpers.convertDatePer(value);
                const issueDate = StringHelpers.convertDatePer(
                  getValues("cotageDate"),
                );
                if (!!value && compareShamsiDates(cotageDate, issueDate)) {
                  return "تاریخ صورتحساب باید بزرگتر از تاریخ کوتاژ اظهارنامه گمرکی باشد";
                }
                return true;
              }
            },
          }}
          isDisabled={handleCheckStatus("issueDate") === 1}
          maxDate={new DateObject({ calendar: persian }).set(
            "day",
            new DateObject({ calendar: persian }).day - 1,
          )}
        />
        <div>
          <ComboBox
            name="billTypeId"
            label="نوع صورتحساب"
            handleOnChange={(e) => {
              getBillTypeId(e);
              getField(e);
              setValue("billPatternId", "");
              if (e?.id === "2")
                setValue("settlementType", { id: "1", title: "نقد" });
              else setValue("settlementType", "");
            }}
            control={control}
            errors={errors?.billTypeId}
            rules={{
              required: "لطفا نوع صورتحساب را تعیین کنید",
            }}
            options={billInitializeData?.types}
            isDisabled={handleCheckStatus("billTypeId") === 1}
          />
        </div>
        <div>
          <ComboBox
            control={control}
            handleOnChange={(e) => getField(e)}
            label="الگوی فروش"
            name="billPatternId"
            options={billTypeData}
            isDisabled={handleCheckStatus("billPatternId") === 1}
            errors={errors?.billPatternId}
            rules={{
              required: "لطفا الگوی فروش را تعیین کنید",
            }}
          />
        </div>
        <div>
          <ComboBox
            control={control}
            name="settlementType"
            label="روش تسویه"
            rules={{
              required:
                handleCheckStatus("settlementType") === 3
                  ? "لطفا روش تسویه را تعیین کنید"
                  : "",
              // validate: (value: string) => {
              //   if (!!!value && handleCheckStatus("settlementType") === 3) {
              //     return "لطفا روش تسویه را تعیین کنید";
              //   }
              //   return true;
              // },
            }}
            options={billInitializeData?.settlementTypes}
            errors={errors?.settlementType}
            isDisabled={
              handleCheckStatus("settlementType") === 1 ||
              getValues("billTypeId")?.id === "2"
            }
          />
        </div>
        <Input
          label="موضوع"
          placeholder="شماره صورت حساب را وارد کنید"
          control={control}
          name="subjectType"
          disabled
        />
      </div>
    </>
  );
};

export default BillingInformation;
