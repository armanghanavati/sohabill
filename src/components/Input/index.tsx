import React, { FC } from "react";
import ErrorIcon from "../../assets/icons/ErrorIcon";
import GuidIcon from "../../assets/icons/ErrorIcon copy";
import { Control, Controller } from "react-hook-form";
import { ErrorsType } from "../../models/AllData.model";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  Icon?: React.ComponentType<{}>;
  guidMessage?: string;
  rules?: Record<string, object | string | boolean | undefined>;
  errors?: ErrorsType;
  control: Control<any>;
  maxLength?: number;
  handleOnChange?: (value: string | undefined | number) => void;
  hasNumberSeparator?: boolean;
  disabled?: boolean;
}
const Input: FC<InputProps> = ({
  name,
  label,
  type = "text",
  Icon,
  placeholder,
  rules,
  errors,
  control,
  guidMessage,
  maxLength,
  disabled = false,
  handleOnChange = () => {},
  hasNumberSeparator = false,
  required,
}) => {
  // function for separe number in input-----------------------
  const removeSeparators = (value: string): string => {
    return value.replace(/,/g, ""); // حذف کاماها برای داده خام
  };
  // cunstopm onchaneg-------------

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: React.FormEvent<HTMLInputElement> | string) => void,
  ): void => {
    const { value } = e.target;

    // If the value starts with '0' and its length is greater than 1,
    // remove the leading zeros
    let rawValue;
    if (value.startsWith("0") && value.length > 1) {
      rawValue = removeSeparators(value.replace(/^0+/, ""));
    } else {
      rawValue = removeSeparators(value);
    }
    console.log(rawValue, "row");
    // Your existing logic for handling separators
    if (hasNumberSeparator) {
      handleOnChange(rawValue);
      onChange(rawValue);
    } else {
      handleOnChange(value);
      onChange(e);
    }
  };

  //  format value
  const formatValue = (val: string) => {
    if (!val) return ""; // در صورت خالی بودن مقدار
    const parts = val.toString().split("."); // جداسازی قبل و بعد از ممیز
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // جداکننده سه‌تا‌سه قبل از ممیز
    return parts.join("."); // ترکیب بخش‌های صحیح و اعشاری
  };

  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => (
        <div>
          <label
            htmlFor={name}
            className="input-label input-label-sm lg:input-label-base"
          >
            {label}
            {required ||
              (!!rules?.required &&
                (rules.required?.value === true || !rules.required?.value) && (
                  <span className="input-label-required">*</span>
                ))}
          </label>
          <div className="input-container">
            <input
              disabled={disabled}
              maxLength={maxLength}
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              onChange={(e) => changeHandler(e, onChange)}
              value={hasNumberSeparator ? formatValue(value) : value}
              ref={ref}
              data-state={
                disabled && !Icon
                  ? "disabled"
                  : errors
                    ? "failed"
                    : !!value && !errors
                      ? "success"
                      : ""
              }
              className="input input-sm lg:input-base data-[state=failed]:input-failed data-[state=success]:input-success tw-truncate disabled:tw-cursor-pointer disabled:!tw-border-none disabled:tw-bg-gray-100 disabled:tw-text-[#777777] disabled:!tw-shadow-none data-[state=disabled]:disabled:!tw-px-3 data-[state=disabled]:disabled:!tw-py-2"
            />
            {!!Icon && (
              <div className="input-icon">
                <Icon />
              </div>
            )}
            {errors && (
              <div className="input-icon-error">
                <ErrorIcon />
              </div>
            )}

            {guidMessage && (
              <div className="input-icon-error">
                <GuidIcon />
              </div>
            )}
          </div>
          {errors && (
            <span className="input-message-error">{errors?.message}</span>
          )}
          {guidMessage && (
            <span className="input-message-guid">{guidMessage}</span>
          )}
        </div>
      )}
      name={name}
    />
  );
};
export default Input;
