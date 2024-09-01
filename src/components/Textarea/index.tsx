import React from "react";
import ErrorIcon from "../../assets/icons/ErrorIcon";
import GuidIcon from "../../assets/icons/ErrorIcon copy";
import { Control, Controller } from "react-hook-form";
import { ErrorsType } from "../../models/AllData.model";

interface TextareaProps {
  name: string;
  label: string;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  Icon?: React.ComponentType<{}>;
  guidMessage?: string;
  rules?: Record<string, object | string>;
  errors?: ErrorsType;
  control: Control<any>;
  rows?: number;
}
const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  Icon,
  placeholder,
  rules,
  errors,
  control,
  guidMessage,
  rows = 4,
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ref } }) => (
        <div>
          <label
            htmlFor={name}
            className={"input-label input-label-sm lg:input-label-base"}
          >
            {label}
          </label>
          <div className="input-container ">
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              ref={ref}
              rows={rows}
              cols={30}
              className={
                "input input-sm lg:input-base !tw-h-28 tw-resize-none" +
                ` ${errors ? "input-failed" : !!value && !errors?.[name] ? "input-success" : ""}`
              }
            />
            {!!Icon && (
              <div className="tw-pointer-events-none tw-absolute tw-top-2 tw-flex tw-items-center tw-ps-3">
                <Icon />
              </div>
            )}
            {errors && (
              <div className="tw-pointer-events-none tw-absolute tw-end-0 tw-top-3 tw-flex tw-items-center tw-pe-3">
                <ErrorIcon />
              </div>
            )}

            {guidMessage && (
              <div className="tw-pointer-events-none tw-absolute tw-end-0 tw-top-3 tw-flex tw-items-center tw-pe-3">
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
export default Textarea;
