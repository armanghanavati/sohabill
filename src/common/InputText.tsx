import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  Controller,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  RsetIsDisable,
  RsetIsReqStepsDate,
  selectIsReqStepsDate,
  selectPerStatusFields,
} from "./slices/taxSlice";

type Props = {
  format?: string;
  length_num?: number;
  minLength?: number;
  value?: any;
  defaultValue?: string;
  className?: string;
  ref?: any;
  name?: any;
  type?: string;
  validation?: any;
  register?: any;
  control?: any;
  currency?: any;
  disabled?: boolean;
  rest?: any;
  ltr?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeClickToShow?: (e: ChangeEvent<HTMLInputElement>) => void;
  redux?: boolean;
  pattern?: string;
  label?: string;
  important?: boolean;
  normal?: boolean;
  errorValidation?: boolean;
  errors?: any;
  errmsg?: string;
  errmsgmin?: string;
  errminimum?: number;
  xs?: number;
  md?: number;
  dotCount?: number;
  xl?: number;
  addProps?: boolean;
  editStyle?: any;
  deleteStyle?: any;
  setDeleteStyle?: any;
  setEditStyle?: any;
  percent?: boolean;
  validate?: any;
  showCharacter?: boolean;
  validMsg?: string;
  validTrue?: boolean;
  clickToShow?: boolean;
  checkedClickToShow?: boolean;
};

const InputText: React.FC<Props> = ({
  label = "",
  checkedClickToShow = false,
  onChangeClickToShow = () => {},
  clickToShow = false,
  validMsg = "",
  validTrue = false,
  showCharacter,
  validate,
  percent = false,
  editStyle = {},
  deleteStyle = {},
  setDeleteStyle,
  setEditStyle,
  xs = 12,
  md = 12,
  xl = 4,
  rest,
  errors,
  addProps = false,
  errorValidation = false,
  redux = false,
  ltr = false,
  control,
  defaultValue,
  format,
  ref,
  onChange,
  minLength = 1,
  length_num = 50,
  value,
  type = "text",
  name = "",
  pattern = "",
  className = "",
  // id = "",
  validation,
  currency = false,
  disabled = false,
  important = false,
  normal = true,
  dotCount = 11,
  errmsg = "",
  errmsgmin = "",
  errminimum,
}) => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isAbsentField, setIsAbsentField] = useState<boolean>(false);
  const [inputLength, setInputLength] = useState<boolean>(false);
  const [operationDot, setOperationDot] = useState<number>(dotCount);

  const [isClassStyle, setIsClassStyle] = useState<string>("");
  const [isREQtest, setisREQtest] = useState<boolean>(false);
  const stepsPermition = useAppSelector(selectPerStatusFields);
  const reqSteps = useAppSelector(selectIsReqStepsDate);
  const dispatch = useAppDispatch();

  const formatCommas = (num: any) => {
    return num?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ".") {
      setOperationDot(dotCount);
      setInputLength(true);
      console.log("User entered a dot!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let inputValue: number | string;
    inputValue = e.target.value.replace(/[^\d.0-9]/g, "");
    inputValue = inputValue.replace(/\.{2,}/g, ".");
    let part = inputValue.split(".");
    switch (field.name) {
      case "creditPrice":
      case "itemValueIncreasedTaxPrice":
      case "equivalentWithRial":
      case "article17TaxPrice":
      case "otherTaxPrice":
      case "constructionFee":
      case "sellerProfit":
      case "commission":
      case "otherLegalFundsPrice":
        inputValue = parseFloat(inputValue || "0").toFixed(0);
        break;
      case "name":
      case "lastName":
        inputValue = e.target.value?.replace(/[^a-zA-Zآ-ی]/g, "");
        break;
      case "count":
      case "unitPrice":
        if (
          part[0].length > 18 ||
          (part[1] && part[0].length + part[1].length > 18)
        ) {
          part[0] = part[0].slice(0, 18);
        }
        if (part[1] && part[1].length > 8) {
          part[1] = part[1].slice(0, 8);
        }
        inputValue = part.join(".");
        break;
      case "otherLegalFundsRate":
      case "otherTaxRate":
        let partRate = inputValue.split(".");
        if (
          partRate[0].length > 3 ||
          (partRate[1] && partRate[0].length + partRate[1].length > 3)
        ) {
          partRate[0] = partRate[0].slice(0, 3);
        }
        if (partRate[1] && partRate[1].length > 2) {
          partRate[1] = partRate[1].slice(0, 2);
        }
        inputValue = partRate.join(".");
        break;
      default:
        break;
    }
    if (currency) {
      const dot = inputValue.split(".");
      dot[0] = dot[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputValue = dot.join(".");
      // if (inputValue.startsWith("0") && inputValue.length > 1) {
      //   inputValue = inputValue.slice(1);
      // }
    }
    field.onChange(inputValue);
  };

  // -> اجباری و اختیاری و غیر فعال بودن فیلدها
  let allReqPermisionInput: boolean | undefined = undefined;
  let allDesPermisionInput: boolean | undefined = undefined;
  let allAbsentPerInput: boolean | undefined = undefined;
  if (!!stepsPermition) {
    allReqPermisionInput = Object?.values(stepsPermition)
      ?.filter((item: any) => item?.status === 3)
      .some((item: any) => item?.name === name);
    allDesPermisionInput = Object?.values(stepsPermition)
      ?.filter((item: any) => {
        return item?.status === 1;
      })
      .some((item: any) => item?.name === name);
    allAbsentPerInput = Object?.values(stepsPermition)
      ?.filter((item: any) => item?.status === 4)
      .some((item: any) => item?.name === name);
  }

  useEffect(() => {
    if (stepsPermition) {
      const perFieldSteps = () => {
        if (allReqPermisionInput) {
          setisREQtest(true);
        } else {
          setisREQtest(false);
        }
        if (allDesPermisionInput) {
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
      perFieldSteps();
    }
  }, [stepsPermition]);

  return (
    <>
      <>
        {value !== undefined || defaultValue !== undefined ? (
          <>
            <Col className="mt-4" xs={xs} md={md} xl={xl}>
              <Form.Label
                className={`ms-3 ${reqSteps && "star"} ${
                  important && "star"
                }  align-items-center`}
              >
                {" "}
                {label}{" "}
              </Form.Label>
              <Form.Control
                name={name}
                className={`input - form ${
                  ltr ? " dir-ltr " : ""
                } ${className} ${isClassStyle} `}
                maxLength={length_num}
                defaultValue={defaultValue}
                value={currency ? formatCommas(value) : value}
                disabled={isDisable || disabled}
                onChange={onChange}
                onInput={(e: any) => {
                  type === "number" &&
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""));
                }}
              />
            </Col>
          </>
        ) : (
          <Col className="mt-4" xs={xs} md={md} xl={xl}>
            <Controller
              name={name}
              control={control}
              rules={{
                validate,
                required: { value: isREQtest || validTrue, message: errmsg },
                minLength: { message: errmsgmin, value: errminimum },
                ...validation,
              }}
              render={({ field }) => (
                <>
                  <Row>
                    <Col
                      className={`${
                        isAbsentField && "d-none"
                      } positionRelative`}
                    >
                      <Form.Label
                        className={`ms-3 text-end ${
                          allReqPermisionInput && "star"
                        } ${important && "star"}  align-items-center`}
                      >
                        {label}
                      </Form.Label>
                      <span className="">
                        <Form.Control
                          errmsgmin={errmsgmin}
                          errminimum={errminimum}
                          errmsg={errmsg}
                          minLength={minLength}
                          type={type === "password" ? "password" : "text"}
                          value={field.value}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                          maxLength={
                            !!inputLength
                              ? operationDot + length_num
                              : length_num
                          }
                          disabled={isDisable || disabled}
                          {...rest}
                          onKeyDown={handleKeyPress}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ): void =>
                            currency ||
                            type === "number" ||
                            type === "character"
                              ? handleChange(e, field)
                              : field.onChange(e)
                          }
                          onInput={(e: any) => {
                            type === "number" &&
                              !currency &&
                              (e.target.value = e.target.value.replace(
                                /[^\d.]/g,
                                "",
                              ));
                          }}
                          className={`input-form ${
                            ltr ? " dir-ltr " : ""
                          } ${className} ${
                            errors?.[name] && "border border-danger"
                          } `}
                        />
                        {addProps && (
                          <span className="fitShowPass d-flex">
                            <i
                              className={` ms-2 ${
                                deleteStyle
                                  ? " test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill fa-disabled"
                                  : "cursorPointer"
                              }  test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill `}
                              onClick={setDeleteStyle}
                              aria-disabled
                            />
                            <i
                              onClick={setEditStyle}
                              className={` ms-2 ${
                                editStyle
                                  ? " test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill bi bi-plus-circle-fill "
                                  : "bi bi-pencil-square cursorPointer"
                              } test-white d-flex  align-items-center justify-content-start font20 fw-bold cursorPointer  rounded-pill`}
                            />
                          </span>
                        )}
                        {percent && (
                          <span className="fitShowPass d-flex">%</span>
                        )}
                        {clickToShow && (
                          <span className="fitShowPass d-flex">
                            <Form.Check
                              className="cursorPointer"
                              checked={checkedClickToShow}
                              onChange={onChangeClickToShow}
                            />
                          </span>
                        )}
                        {showCharacter && (
                          <>
                            <span className="fitShowPass d-flex">
                              <i
                                className={` ms-2 ${
                                  editStyle
                                    ? " test-white bi bi-eye-fill d-flex align-items-center justify-content-start font20 cursorPointer fw-bold  rounded-pill"
                                    : "cursorPointer"
                                }  test-white d-flex align-items-center justify-content-start font20 fw-bold rounded-pill `}
                                onClick={setEditStyle}
                              />
                            </span>
                          </>
                        )}
                      </span>
                    </Col>
                    {errors?.[name] && (
                      <span className="text-danger font12">
                        {errors?.[name]?.message}
                      </span>
                    )}
                  </Row>
                </>
              )}
            />
          </Col>
        )}
      </>
    </>
  );
};

export default InputText;
