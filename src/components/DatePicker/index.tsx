import React from "react";
import MultiDatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { Control, Controller } from "react-hook-form";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";
import { Button } from "src/components/Button";
import { ErrorsType } from "src/models/AllData.model";
import ErrorIcon from "src/assets/icons/ErrorIcon";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMediaQuery } from "react-responsive";

type DatePickerProps = {
  label?: string;
  minDate?:
    | `${number}/${number}/${number}`
    | Date
    | DateObject
    | string
    | number;
  maxDate?:
    | `${number}/${number}/${number}`
    | Date
    | DateObject
    | string
    | number;
  name?: string;
  placeholder?: string;
  control?: Control<any>;
  isDisabled?: boolean;
  errors?: ErrorsType;
  rules?: Record<string, object | string>;
  locale?: "fa" | "en";
  required?: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({
  locale = "fa",
  name = "",
  isDisabled = false,
  control,
  label,
  minDate,
  maxDate,
  rules,
  errors,
  required,
  placeholder,
}) => {
  const weekDays = [
    ["شنبه", "ش"],
    ["یکشنبه", "ی"],
    ["دوشنبه", "د"],
    ["سه شنبه", "س"],
    ["چهارشنبه", "چ"],
    ["پنجشنبه", "پ"],
    ["جمعه", "ج"],
  ];
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          <label className="input-label input-label-sm lg:input-label-base">
            {label}
            {required ||
              (!!rules?.required &&
                (rules.required?.value === true || !rules.required?.value) && (
                  <span className="input-label-required">*</span>
                ))}
          </label>
          <div
            className={
              "lg:input-base input input-sm tw-flex tw-w-full tw-items-center tw-justify-center !tw-p-0" +
              ` ${errors ? "input-failed" : !!field.value && !errors ? "input-success" : ""}`
            }
          >
            <MultiDatePicker
              placeholder={placeholder ? placeholder : "انتخاب کنید"}
              weekDays={weekDays}
              editable={false}
              name={name}
              disabled={field.disabled || isDisabled}
              value={field.value}
              onChange={field?.onChange}
              minDate={minDate}
              maxDate={maxDate}
              monthYearSeparator={" "}
              inputClass={`tw-w-full tw-border-none tw-outline-none input input-sm lg:tw-py-2 lg:tw-pe-3.5 lg:tw-ps-10 lg:!tw-text-sm !tw-h-full ${isDisabled ? "tw-rounded-none" : ""}`}
              className={`green tw-w-full ${
                isSmallScreen && "rmdp-mobile"
              } ${locale === "fa" ? " dir-ltr " : ""} `}
              calendar={locale === "fa" ? persian : undefined}
              locale={locale === "fa" ? persian_fa : undefined}
            >
              <Button
                title="لغو انتخاب"
                variant="default"
                className="tw-mb-2"
                onClick={(event) => {
                  event?.preventDefault();
                  field?.onChange(null);
                }}
              />
            </MultiDatePicker>
            {errors && (
              <div
                className={`tw-flex tw-h-full tw-items-center tw-pl-3 ${isDisabled ? "tw-bg-gray-100" : ""}`}
              >
                <ErrorIcon />
              </div>
            )}
          </div>

          {errors && (
            <span className="input-message-error">{errors?.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default DatePicker;
