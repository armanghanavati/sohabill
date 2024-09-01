import {
  HookForm,
  SelectOption,
  SignUpAccount,
  UpdateAccount,
} from "../../models/AllData.model";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  Controller,
  UseFormGetValues,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import InputText from "../../common/InputText";
import ComboBox from "../../common/ComboBox";
import Datepicker from "../../common/DatePicker";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import SwitchCase from "../../common/SwitchCase";
import Btn from "../../common/Btn";
import { handleGenerateKeys } from "../../common/slices/accountSlice";
import { useDispatch } from "react-redux";

interface Props extends HookForm {
  submitData: (data: SignUpAccount) => void;
  perFields?: boolean;
  userType?: SelectOption[];
  strategies?: SelectOption[];
  updateSignUp?: UpdateAccount;
  keySunUpdate?: boolean;
  watch: UseFormWatch<UpdateAccount>;
  getValues: UseFormGetValues<UpdateAccount>;
  setKeySunUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpFields: React.FC<Props> = ({
  userType,
  strategies,
  perFields,
  control,
  handleSubmit,
  watch,
  errors,
  getValues,
  submitData,
  keySunUpdate,
  setKeySunUpdate,
}) => {
  const { main, tax, account } = useAppSelector((state) => state);
  const validateCode = watch("personTypeId")?.id;
  const [showPass, setShowPass] = useState<Boolean>(false);
  const [showConfPass, setShowConfPass] = useState<Boolean>(false);
  const [showKeysunPass, setShowKeysunPass] = useState<Boolean>(false);
  const [keysanMode, setKeysanMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const keySunUpdateCheckbox = watch("shouldKeysunInfoBeUpdated");
  const strategy = watch("strategyType");
  const memoryId = getValues("memoryId");

  const handleDownloadGenerate = () => {
    dispatch(handleGenerateKeys(0));
  };

  return (
    <>
      <Form
        className="bg-white"
        onSubmit={handleSubmit((data: UpdateAccount) => {
          submitData(data);
        })}
      >
        <Row className="mb-4 d-flex justify-content-center">
          <InputText
            important
            xl={6}
            label="نام:"
            length_num={20}
            errors={errors}
            control={control}
            type="character"
            validation={{
              required: "لطفا نام کاربری را وارد کنید",
              minLength: {
                message: "نام کاربری باید بیشتر از 2 حرف باشد",
                value: 2,
              },
            }}
            name="name"
          />
          <InputText
            important
            xl={6}
            label="نام خانوادگی:"
            length_num={20}
            errors={errors}
            control={control}
            type="text"
            validation={{
              required: "لطفا نام خانوادگی را وارد کنید",
              minLength: {
                message: "نام خانوادگی باید بیشتر از 2 حرف باشد",
                value: 2,
              },
            }}
            name="lastName"
          />
          <InputText
            xl={6}
            ltr
            important={perFields ? false : true}
            disabled={perFields ? true : false}
            errors={errors}
            label="کد اقتصادی(نام کاربری):"
            type="number"
            control={control}
            name="economicCode"
            validation={{
              required: {
                value: perFields ? false : true,
                message: "لطفا کد اقتصادی خود را وارد نمایید",
              },
              minLength: {
                message: "کد اقتصادی حداقل باید 8 حرف باشد",
                value: 8,
              },
            }}
            length_num={14}
          />
          <InputText
            important
            xl={6}
            label="شماره تماس:"
            length_num={11}
            type="number"
            errors={errors}
            validation={{
              required: "لطفا شماره تماس را وارد کنید",
              minLength: { message: "شماره تماس باید 11 رقم باشد", value: 11 },
            }}
            control={control}
            name="mobileNumber"
            ltr
          />
          {perFields && (
            <>
              <ComboBox
                errmsg="لطفا روش ارسال صورتحساب را تعیین کنید"
                important
                loading={main?.showLoading?.value ? true : false}
                xl={6}
                md={12}
                label="روش ارسال صورتحساب:"
                control={control}
                errors={errors}
                name="strategyType"
                options={strategies}
                defaultValue={strategies?.find(
                  (str) => str.title === strategy?.title
                )}
                // optionValue={(option)=>option.id}
                className={`${
                  errors.strategyType
                    ? "rounded-2 star border border-danger"
                    : "mb-1"
                }`}
              />
              <InputText
                xl={6}
                ltr
                important={perFields ? false : true}
                errors={errors}
                label="کد حافظه مالیاتی:"
                control={control}
                name="memoryId"
                disabled={!!memoryId}
                validation={{
                  required: {
                    value: perFields ? false : true,
                    message: "لطفا کد حافظه مالیاتی خود را وارد نمایید",
                  },
                  minLength: {
                    message: "کد حافظه مالیاتی باید 6 رقم باشد",
                    value: 6,
                  },
                }}
                length_num={6}
              />
            </>
          )}
          <InputText
            important={perFields ? false : true}
            setEditStyle={() => {
              setShowPass(!showPass);
            }}
            showCharacter
            xl={12}
            errors={errors}
            label="رمز عبور:"
            control={control}
            name="password"
            validation={{
              required: {
                value: perFields ? false : true,
                message: "لطفا رمز عبور خود را وارد نمایید",
              },
              minLength: {
                message: "رمز عبور باید حداقل 8 حرف باشد",
                value: 8,
              },
            }}
            type={showPass ? "text" : "password"}
          />
          <InputText
            important={perFields ? false : true}
            setEditStyle={() => {
              setShowConfPass(!showConfPass);
            }}
            showCharacter
            xl={12}
            errors={errors}
            label="تکرار رمز عبور:"
            control={control}
            name="confirmPassword"
            validation={{
              required: {
                value: perFields ? false : true,
                message: "لطفا تکرار رمز عبور خود را وارد نمایید",
              },
              minLength: {
                message: "تکرار رمز عبور باید حداقل 8 حرف باشد",
                value: 8,
              },
            }}
            type={showConfPass ? "text" : "password"}
          />
          {/* اطلاعات کیسان */}

          {strategy?.id === 2 && (
            <>
              <Col className="my-4 d-flex align-items-center justify-content-center">
                <span
                  onClick={() => setKeysanMode(!keysanMode)}
                  className="d-flex bgWhitePrimary  align-items-center rounded-pill cursorPointer border-none p-2 px-4 text-dark  ms-3"
                >
                  <i
                    onClick={() => setKeysanMode(!keysanMode)}
                    className="cursorPointer d-flex align-items-center bi bi-caret-down-fill text-dark font20 ms-2"
                  />
                  اطلاعات کیسان
                </span>
              </Col>
              <Row className="d-flex justify-content-center">
                <Collapse in={keysanMode} className="col-sm-12 col-md-12">
                  <Row className=" bgWhitePrimary  rounded-4 py-4 mb-4">
                    <SwitchCase
                      className=""
                      label="تغییر اطلاعات کیسان"
                      name="shouldKeysunInfoBeUpdated"
                      // checked={keySunUpdate}
                      control={control}
                      // onChecked={(e) =>
                      //   setKeySunUpdate &&
                      //   setKeySunUpdate((prevKeySunUpdate) => !prevKeySunUpdate)
                      // }
                    />
                    <InputText
                      type="text"
                      xl={12}
                      errors={errors}
                      label="شناسه یکتای حافظه مالیاتی کیسان:"
                      length_num={6}
                      control={control}
                      name="keysunMemoryId"
                      disabled={
                        !!account?.userRole?.keysunMemoryId ? true : false
                      }
                      validation={{
                        required: {
                          value: keySunUpdateCheckbox ? true : false,
                          message:
                            "لطفا شناسه یکتای حافظه مالیاتی کیسان را وارد نمایید",
                        },
                        minLength: {
                          message:
                            "شناسه یکتای حافظه مالیاتی کیسان باید 6 حرف باشد",
                          value: 6,
                        },
                      }}
                    />
                    <InputText
                      xl={12}
                      important={false}
                      errors={errors}
                      label="نام کاربری کیسان:"
                      type="text"
                      control={control}
                      name="keysunUsername"
                      validation={{
                        required: {
                          value: keySunUpdateCheckbox,
                          message:
                            "لطفا نام کاربری جدید کیسان خود را وارد نمایید",
                        },
                        minLength: {
                          message: "نام کاربری حداقل باید 12 حرف باشد",
                          value: 12,
                        },
                        maxLength: {
                          message: "نام کاربری حداکثر باید 14 حرف باشد",
                          value: 14,
                        },
                      }}
                      disabled={keySunUpdateCheckbox ? false : true}
                    />
                    <InputText
                      xl={12}
                      setEditStyle={() => {
                        setShowKeysunPass(!showKeysunPass);
                      }}
                      showCharacter
                      important={false}
                      errors={errors}
                      label="رمز عبور کیسان:"
                      length_num={64}
                      control={control}
                      name="keysunPassword"
                      validation={{
                        required: {
                          value: keySunUpdateCheckbox ? true : false,
                          message:
                            "لطفا رمز عبور جدید کیسان خود را وارد نمایید",
                        },
                        minLength: {
                          message: "رمز عبور باید حداقل 7 حرف باشد",
                          value: 7,
                        },
                      }}
                      disabled={keySunUpdateCheckbox ? false : true}
                      type={showKeysunPass ? "text" : "password"}
                    />
                  </Row>
                </Collapse>
              </Row>
            </>
          )}
          <Col sm="12" md="12" xl="12">
            <button
              type="submit"
              className="mt-4 mb-2 text-white rounded-4 w-100 border border-none btnSuccessWhite fs-6 p-2"
            >
              {main?.showLoading?.value ? (
                <Spinner
                  as="span"
                  className=""
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "تایید"
              )}
            </button>
          </Col>
          {perFields && (
            <Row className="mt-4">
              <Col
                sm="12"
                md="4"
                xl="6"
                className="d-flex cursorPointer align-items-center justify-content-start"
                onClick={handleDownloadGenerate}
              >
                <i className="bi ms-2 font18 text-white bgPrimary d-flex rounded-pill p-1 bi-key"></i>
                <span className="font12 text-primary ">
                  دانلود کلید عمومی کاربران
                </span>
              </Col>
            </Row>
          )}
        </Row>
      </Form>
    </>
  );
};

export default SignUpFields;
