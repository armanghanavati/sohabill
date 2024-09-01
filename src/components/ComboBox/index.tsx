import React from "react";
import Select, { StylesConfig } from "react-select";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface ComboBoxProps {
  name?: string;
  label?: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  options: any[] | undefined;
  onKeyDown?: React.KeyboardEventHandler;
  control: any;
  isDisabled?: boolean;
  isClearable?: boolean;
  loading?: boolean;
  getOptionValue?: (option: any) => any;
  getOptionLabel?: (option: any) => any;
  isMulti?: boolean;
  placeholder?: string;
  errors?: any;
  handleOnChange?: (value: any) => void;
  required?: boolean;
  menuPortalTarget?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  name = "",
  label = "",
  rules,
  options,
  onKeyDown,
  control,
  isDisabled = false,
  isClearable = true,
  loading = false,
  getOptionValue = (option) => option.id,
  getOptionLabel = (option) => option.title,
  isMulti,
  placeholder = "انتخاب کنید",
  errors,
  handleOnChange = () => {},
  required,
  menuPortalTarget = false,
}) => {
  const customStyles: StylesConfig<any> = {
    control: (base) => ({
      ...base,
      height: 42,
      boxShadow: "none",
      minHeight: 42,
      borderRadius: 12,
      paddingRight: "1.5rem",
      border: "none",
    }),
    placeholder: (styles) => ({ ...styles, color: "#CAC9C9" }),
    clearIndicator: (provided) => ({
      ...provided,
      position: "absolute",
      right: 5,
      display: "block !important",
    }),
  };

  return (
    <div className="tw-relative">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref, name } }) => (
          <div>
            <label className="input-label input-label-sm lg:input-label-base tw-ms-3">
              {label}
              {(required ||
                (!!rules?.required &&
                  (rules.required === true || !rules.required))) && (
                <span className="input-label-required">*</span>
              )}
            </label>
            <Select
              isRtl
              value={value}
              ref={ref}
              onChange={(value) => {
                onChange(value);
                handleOnChange(value);
              }}
              placeholder={placeholder}
              isMulti={isMulti}
              isLoading={loading}
              onKeyDown={onKeyDown}
              isDisabled={isDisabled}
              options={options}
              isClearable={isClearable}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              menuPortalTarget={menuPortalTarget ? document.body : undefined}
              className={
                "input" +
                ` ${errors ? "input-failed" : !!value?.id && !errors && !isDisabled ? "input-success" : ""}`
              }
              loadingMessage={() => "درحال بارگذاری"}
              noOptionsMessage={() => "موجود نیست"}
              styles={customStyles}
              id={name}
            />
            {errors && (
              <span className="text-danger font12">{errors?.message}</span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ComboBox;
