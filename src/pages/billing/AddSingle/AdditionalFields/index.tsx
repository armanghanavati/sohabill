import Input from "../../../../components/Input";
import ComboBox from "src/components/ComboBox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "src/common/ui/collapse";
import Chevrondown from "../../../../assets/icons/chevrondown";
import Chevronup from "../../../../assets/icons/chevronup";
import { useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { SerGetBillInitializeData, ValidSteps } from "src/models/AllData.model";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import StringHelpers from "../../../../helpers/string-helpers";
import DatePicker from "src/components/DatePicker";

interface AdditionalFileldsPropsType {
  control: Control<ValidSteps>;
  billInitializeData: SerGetBillInitializeData | undefined;
  errors?: FieldErrors<ValidSteps> | undefined | null;
  compareShamsiDates: (
    cotageDate: string,
    issueDate: string,
  ) => boolean | undefined;
  getValues?: any;
}

const AdditionalFilelds: React.FC<AdditionalFileldsPropsType> = ({
  control,
  billInitializeData,
  errors,
  getValues,
  compareShamsiDates,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger className="tw-mb-[20px] tw-flex tw-w-full tw-items-center">
        <h4 className="lg:text-[18px] md:text-[12px] tw-mt-2 tw-flex tw-items-end tw-pl-[12px] tw-text-lg tw-font-semibold tw-text-gray-800">
          فیلدهای تکمیلی(اختیاری)
        </h4>
        {open ? <Chevronup /> : <Chevrondown />}
      </CollapsibleTrigger>
      <CollapsibleContent className="tw-grid tw-grid-cols-2 tw-items-end tw-gap-x-6 tw-gap-y-7 md:tw-grid-cols-3 lg:tw-grid-cols-4 lg:tw-gap-y-6">
        <Input
          label="کد شعبه فروشنده"
          placeholder="کد شعبه فروشنده را وارد کنید"
          control={control}
          name="sellerBranchCode"
          maxLength={4}
          errors={errors?.sellerBranchCode}
          rules={{
            minLength: {
              message: "لطفا 4 رقم وارد کنید",
              value: 4,
            },
          }}
        />
        {getValues("billPatternId")?.id !== "3" && (
          <>
            <DatePicker
              label="تاریخ کوتاژ اظهارنامه گمرکی"
              name="cotageDate"
              control={control}
              errors={errors?.cotageDate}
              placeholder="تاریخ کوتاژ اظهارنامه گمرکی وارد کنید"
              maxDate={new DateObject({ calendar: persian }).set(
                "day",
                new DateObject({ calendar: persian }).day - 1,
              )}
              rules={{
                validate: (value: string) => {
                  const cotageDate = StringHelpers.convertDatePer(
                    getValues("issueDate"),
                  );
                  const issueDate = StringHelpers.convertDatePer(value);
                  if (!!value && compareShamsiDates(cotageDate, issueDate)) {
                    return "تاریخ صورتحساب باید بزرگتر از تاریخ کوتاژ اظهارنامه گمرکی باشد";
                  }
                  return true;
                },
              }}
            />
            <Input
              label="کد گمرک محل اظهار فروشنده"
              placeholder="کد گمرک محل اظهار فروشنده را وارد کنید"
              control={control}
              name="customsCode"
              maxLength={5}
              errors={errors?.customsCode}
              rules={{
                minLength: {
                  message: "لطفا 5 رقم وارد کنید",
                  value: 5,
                },
              }}
            />
            <Input
              label="شماره کوتاژ اظهارنامه گمرکی"
              placeholder="شماره کوتاژ اظهارنامه گمرکی را وارد کنید"
              control={control}
              name="cotageNumber"
              maxLength={10}
              rules={{
                minLength: {
                  message: "لطفا حداقل 4 و حداکثر 10 کاراکتر وارد کنید",
                  value: 4,
                },
              }}
              errors={errors?.cotageNumber}
            />
          </>
        )}
        {(getValues("billPatternId")?.id === "1" ||
          getValues("billPatternId")?.id === undefined) && (
          <>
            <Input
              label="شماره پرونده گمرکی فروشنده"
              placeholder="شماره پرونده گمرکی فروشنده را وارد کنید "
              control={control}
              name="customsLicenseNumber"
              rules={{
                minLength: {
                  message: "لطفا حداقل 4 و حداکثر 14 کاراکتر وارد کنید",
                  value: 4,
                },
              }}
              maxLength={14}
              errors={errors?.customsLicenseNumber}
            />
            <ComboBox
              control={control}
              label="نوع پرواز"
              options={billInitializeData?.flightTypes}
              name="flightType"
            />
            <Input
              label="شناسه یکتای ثبت قرارداد فروشنده"
              placeholder="شناسه یکتای ثبت قرارداد فروشنده را وارد کنید"
              control={control}
              name="registrationNumber"
              maxLength={12}
              errors={errors?.registrationNumber}
              rules={{
                minLength: {
                  message: "لطفا 12 رقم وارد کنید",
                  value: 12,
                },
              }}
            />
          </>
        )}
        {getValues("billPatternId")?.id !== "7" && (
          <Input
            label="کد شعبه خریدار"
            placeholder="کد شعبه خریدار را وارد کنید"
            control={control}
            name="buyerBranchCode"
            maxLength={4}
            errors={errors?.buyerBranchCode}
            rules={{
              minLength: {
                message: "لطفا 4 رقم وارد کنید",
                value: 4,
              },
            }}
          />
        )}
        {(getValues("billPatternId")?.id === "1" ||
          getValues("billPatternId")?.id === undefined) && (
          <Input
            label="شماره اشتراک/شناسه قبض بهره‌دار"
            placeholder="شماره اشتراک وارد کنید"
            control={control}
            name="subscriptionNumber"
            rules={{
              minLength: {
                message: "لطفا حداقل 2 و حداکثر 19 کاراکتر وارد کنید",
                value: 2,
              },
            }}
            maxLength={19}
            errors={errors?.subscriptionNumber}
            type="number"
          />
        )}
        {getValues("billPatternId")?.id !== "7" && (
          <Input
            label="مالیات موضوع 17 "
            placeholder="مالیات موضوع 17 وارد کنید"
            control={control}
            name="article17TaxPrice"
            errors={errors?.article17TaxPrice}
            maxLength={15}
            rules={{
              validate: {
                int: (value: number) => {
                  const regex = /^\d+$/;
                  const temp = value?.toString();
                  function validate(value: string): boolean {
                    return regex?.test(value);
                  }
                  if (!!value && !validate(temp)) {
                    return "مقدار وارد شده باید بدون اعشار باشد";
                  }
                  return true;
                },
              },
            }}
          />
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AdditionalFilelds;
