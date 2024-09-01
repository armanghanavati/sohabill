import React from "react";
import ErrorIcon from "../../assets/icons/ErrorIcon";
import GuidIcon from "../../assets/icons/ErrorIcon copy";
import { Control, Controller } from "react-hook-form";
import { ErrorsType } from "../../models/AllData.model";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  Icon?: React.ComponentType<{}>;
  guidMessage?: string;
  rules?: Record<string, object | string>;
  errors?: ErrorsType;
  control: Control<any>;
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  Icon,
  placeholder,
  rules,
  errors,
  control,
  guidMessage,
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
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              ref={ref}
              className={
                "input input-sm lg:input-base " +
                ` ${errors ? "input-failed" : !!value && !errors?.[name] ? "input-success" : ""}`
              }
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
