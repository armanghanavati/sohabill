import Select from "react-select";
import React, { useEffect, useState } from "react";
import { SelectOption } from "../models/AllData.model";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  RsetIsDisable,
  RsetIsReqStepCombo,
  selectIsReqStepCombo,
  selectPerStatusFields,
} from "./slices/taxSlice";
import { Controller } from "react-hook-form";

type ComboBoxProps = {
  // options?: SelectOption[];
  options?: any;
  onChange?: (selectedOption: SelectOption | null) => void;
  selectedOption?: SelectOption | null;
  placeHolder?: string;
  isClearable?: boolean;
  control?: any;
  className?: string;
  validation?: any;
  // optionValue?: number;
  // optionLabel?: string;
  optionValue?: any;
  optionLabel?: any;
  field?: any;
  isMulti?: any;
  isDisabled?: boolean;
  onKeyDown?: () => void;
  palaceHolder?: string;
  defaultValue?: SelectOption | null;
  name?: string;
  onBlur?: () => void;
  important?: boolean;
  label?: string;
  normal?: boolean;
  loading?: boolean;
  errors?: any;
  xs?: number;
  md?: number;
  xl?: number;
  validate?: any;
  validTrue?: boolean;
  errmsg?: string;
  errmsgmin?: string;
  errValueMin?: boolean;
};

interface IdName {
  id: number;
  title: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  validate,
  errValueMin = false,
  validTrue = false,
  errmsgmin = "",
  errmsg = "",
  name = "",
  xs = 12,
  md = 6,
  xl = 4,
  label = "",
  options,
  onKeyDown,
  onBlur = () => {},
  defaultValue = {},
  onChange = () => {},
  validation,
  control = true,
  important = false,
  normal = true,
  isDisabled = false,
  isClearable = false,
  loading = false,
  placeHolder = "",
  selectedOption,
  optionValue = (option: IdName) => option.id,
  optionLabel = (option: IdName) => option.title,
  className = "",
  isMulti,
  palaceHolder = "",
  errors,
  field,
}) => {
  const dispatch = useAppDispatch();
  const { main } = useAppSelector((state) => state);
  const stepsPermition = useAppSelector(selectPerStatusFields);
  const reqStepsCombo = useAppSelector(selectIsReqStepCombo);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isAbsentField, setIsAbsentField] = useState<boolean>(false);
  const [isReqFields, setIsReqFields] = useState<boolean>(false);

  useEffect(() => {
    if (stepsPermition) {
      const allAbsentPerInput = Object?.values(stepsPermition)
        ?.filter((item: any) => item?.status === 4)
        .some((item: any) => item?.name === name);
      const someNames = Object.values(stepsPermition)
        .filter((item: any) => item.status === 3)
        .some((item: any) => item.name === name);
      const someNamesDes = Object.values(stepsPermition)
        .filter((item: any) => item.status === 1)
        .some((item: any) => item.name === name);

      const perFieldReqSteps = () => {
        if (someNames) {
          setIsReqFields(true);
        } else {
          setIsReqFields(false);
        }
        if (someNamesDes) {
          setIsDisable(true);
        } else {
          setIsDisable(false);
        }
        if (allAbsentPerInput) {
          setIsAbsentField(true);
        } else {
          setIsAbsentField(false);
        }
      };
      perFieldReqSteps();
    }
  }, [stepsPermition]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          validate,
          required: { value: isReqFields || validTrue, message: errmsg },
          minLength: { message: errmsgmin, value: errValueMin },
          ...validation,
        }}
        render={({ field }) => (
          <>
            <div
              className={`${isAbsentField && "d-none"}`}
              // xs={xs}
              // md={md}
              // xl={xl}
            >
              <label
                className={`ms-3 ${
                  (important || isReqFields) && "star"
                }  align-items-center input-label input-label-sm lg:input-label-base`}
              >
                {label}
              </label>
              <Select
                isRtl
                {...field}
                placeholder={palaceHolder}
                isMulti={isMulti}
                isLoading={loading || main?.showLoading?.value}
                onKeyDown={onKeyDown}
                isDisabled={isDisable || isDisabled}
                options={options}
                isClearable={isClearable}
                getOptionLabel={optionLabel}
                getOptionValue={optionValue}
                menuPortalTarget={document.body}
                className={`select ${className}`}
                loadingMessage={() => "درحال بارگذاری"}
                noOptionsMessage={() => "موجود نیست"}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
              />
              {errors?.[name] && (
                <span className="text-danger font12">
                  {errors?.[name]?.message}{" "}
                </span>
              )}
            </div>
          </>
        )}
      />
    </>
  );
};

export default ComboBox;

//
// return (
//   <Controller
//     control={control}
//     rules={rules}
//     render={({ field: { onChange, value, ref } }) => (
//       <div>
//         <label
//           htmlFor={name}
//           className={"input-label input-label-sm lg:input-label-base"}
//         >
//           {label}
//         </label>
//         <div className="input-container ">
//           <input
//             type={type}
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             onChange={onChange}
//             value={value}
//             ref={ref}
//             className={
//               "input input-sm lg:input-base " +
//               ` ${errors ? "input-failed" : !!value && !errors?.[name] ? "input-success" : ""}`
//             }
//           />
//           {!!Icon && (
//             <div className="input-icon">
//               <Icon />
//             </div>
//           )}
//           {errors && (
//             <div className="input-icon-error">
//               <ErrorIcon />
//             </div>
//           )}
//           {guidMessage && (
//             <div className="input-icon-error">
//               <GuidIcon />
//             </div>
//           )}
//         </div>
//         {errors && (
//           <span className="input-message-error">{errors?.message}</span>
//         )}
//         {guidMessage && (
//           <span className="input-message-guid">{guidMessage}</span>
//         )}
//       </div>
//     )}
//     name={name}
//   />
// );
