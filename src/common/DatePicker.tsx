import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { Button, Col, Form } from "react-bootstrap";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";
import { useAppSelector } from "../hooks/hook";
import { selectPerStatusFields } from "./slices/taxSlice";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";
import { useMediaQuery } from "react-responsive";

type DatepickerProps = {
  label?: string;
  value?: Date | null;
  onChange?: (value: DateObject | DateObject[] | null) => void;
  persianType?: string;
  inputClass?: string;
  minDate?: any;
  maxDate?: any;
  important?: boolean;
  register?: any;
  className?: string;
  name?: string;
  control?: any;
  validation?: any;
  field?: any;
  isDisabled?: boolean;
  normal?: boolean;
  errors?: any;
  xs?: number;
  md?: number;
  validate?: any;
  xl?: number;
  validTrue?: boolean;
  errmsg?: string;
  errmsgmin?: string;
  errValueMin?: boolean;
  ref?: any;
  ltr?: boolean;
};

const Datepicker: React.FC<DatepickerProps> = ({
  field,
  ref,
  ltr = false,
  validTrue = false,
  errValueMin = false,
  xs = 12,
  errmsgmin = "",
  md = 6,
  xl = 4,
  validate,
  name = "",
  normal = true,
  isDisabled = false,
  validation,
  control,
  errmsg = "",
  className,
  label,
  value,
  onChange = () => {},
  persianType = "per",
  minDate,
  maxDate,
  important,
  register,
  errors,
}) => {
  // const [calendar, setCalendar] = useState("");

  const weekDays = [
    ["شنبه", "ش"],
    ["یکشنبه", "ی"],
    ["دوشنبه", "د"],
    ["سه شنبه", "س"],
    ["چهارشنبه", "چ"],
    ["پنجشنبه", "پ"],
    ["جمعه", "ج"],
  ];

  const [isClassStyle, setIsClassStyle] = useState<string>("");
  const [isAbsentField, setIsAbsentField] = useState<boolean>(false);
  const [isDesabledField, setIsDesabledField] = useState<boolean>(false);
  const [isReqFields, setIsReqFields] = useState<boolean>(false);
  const stepsPermition = useAppSelector(selectPerStatusFields);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });
  let allReqPermisionInput: any = undefined;
  let allDesPermisionInput: any = undefined;
  let allAbsentPerInput: any = undefined;

  // const handleChange = (e: FormEvent, field: any) => {
  //   console.log("reset change ");

  //   setDate(null);
  //   field.onChange(e); // Notify parent component of the change
  // };

  if (!!stepsPermition) {
    allReqPermisionInput = Object?.values(stepsPermition)
      ?.filter((item: any) => item?.status === 3)
      .some((item: any) => item?.name === name);
    allDesPermisionInput = Object?.values(stepsPermition)
      ?.filter((item: any) => item?.status === 1)
      .some((item: any) => item?.name === name);
    allAbsentPerInput = Object?.values(stepsPermition)
      ?.filter((item: any) => item?.status === 4)
      .some((item: any) => item?.name === name);
  }

  useEffect(() => {
    if (stepsPermition) {
      const perFieldSteps = () => {
        if (allReqPermisionInput) {
          setIsReqFields(true);
        } else {
          setIsReqFields(false);
        }
        if (allAbsentPerInput) {
          setIsAbsentField(true);
        } else {
          setIsAbsentField(false);
        }
        if (allDesPermisionInput) {
          setIsDesabledField(true);
        } else {
          setIsDesabledField(false);
        }
      };
      perFieldSteps();
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
            <Col
              className={`${isAbsentField && "d-none"} mt-4`}
              xs={xs}
              md={md}
              xl={xl}
            >
              <Form.Label
                className={`align-items-center ${
                  (isReqFields || important) && "star"
                }`}
              >
                {label}
              </Form.Label>
              <DatePicker
                weekDays={weekDays}
                className={`input-form green ${
                  isSmallScreen && "rmdp-mobile"
                } ${ltr ? " dir-ltr " : ""} ${className} `}
                editable={false}
                name={field.name}
                disabled={field.disabled || isDisabled || isDesabledField}
                value={field.value}
                onChange={field?.onChange}
                minDate={minDate}
                maxDate={maxDate}
                monthYearSeparator={" "}
                inputClass={`form-control dir-ltr  ${
                  errors?.[name] && "border border-danger"
                } ${className} ${isClassStyle} `}
                calendar={persianType === "per" ? persian : undefined}
                locale={persianType === "per" ? persian_fa : undefined}
              >
                <Button
                  variant="outline-success"
                  className="mb-2"
                  style={{ margin: "5px" }}
                  onClick={() => field?.onChange(null)}
                >
                  لغو انتخاب
                </Button>
              </DatePicker>
              {errors?.[name] && (
                <span className="text-danger font12">
                  {" "}
                  {errors?.[name]?.message}{" "}
                </span>
              )}
            </Col>
          </>
        )}
      />
    </>
  );
};

export default Datepicker;
