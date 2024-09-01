import React, { FormEvent, useEffect, useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
// import LastStep from "./LastStep";
import MultiStepProgressBar from "./MultiStepProgressBar";
import { Row, Col, Form, Button, Container, Spinner } from "react-bootstrap";
import Select from "react-select";
import Fourth from "./Fourth";
import FifthStep from "./FifthStep";
import Sixth from "./Sixth";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetAllFieldSteps,
  RsetProductList,
  RsetListPay,
  RsetPatternTypeId,
  handleGetBill,
  handleGetFields,
  handleSaveBill,
  handleUpdateBill,
  handleUpsert,
  selectInfoBuyer,
  selectPerStatusFields,
} from "../../../common/slices/taxSlice";
import {
  PatternTypeId,
  SelectOption,
  ServiceGetField,
  StyleTypeOperation,
  TableStepValues,
  ValidSteps,
} from "../../../models/AllData.model";
import { useForm } from "react-hook-form";
import Btn from "../../../common/Btn";
import Loading from "../../../common/Loading";
import MessageModal from "../../../common/MessageModal";
import { PrintPage } from "../../../common/SetPdf";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
import TaxHelpers from "../../../helpers/tax-helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../common/store/store";

type Props = {
  reloadRoute?: () => void;
  keyState: number;
  pattern?: any;
};

const BaseSubmitTaxReq: React.FC<Props> = ({
  keyState,
  excelBase64,
  setExcelBase64,
  pattern,
  reloadRoute,
}) => {
  const [styleOprationRow, setStyleOprationRow] = useState<StyleTypeOperation>(
    {},
  );
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [shadowStyle, setShadowStyle] = useState<boolean>(true);
  const [shadowStylePattern, setShadowStylePattern] = useState<boolean>(false);
  const [disabledDiv, setDisabledDiv] = useState<boolean>(false);

  const [currentSteps, setCurrentSteps] = useState<number>(1);
  const infoBuyer = useAppSelector(selectInfoBuyer);

  const dispatch = useAppDispatch();
  const { state, search, pathname } = useLocation();
  const navigate = useNavigate();
  const { tax, main } = useAppSelector((state) => state);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    resetField,
    watch,
    setError,
    reset,
  } = useForm<ValidSteps>({ reValidateMode: "onChange" });

  const opretionTypeBill = () => {
    const getId = tax?.billItem?.bill?.billTypeId;
    return tax?.stepsInfoList?.types?.find((item: any) => item.id === getId)
      ?.title;
  };

  const setEditCurr = tax?.billItem?.billItems?.map((item: any) => {
    return item?.currencyCode;
  });

  const filterFlight = tax?.stepsInfoList?.flightTypes?.filter(
    (item: SelectOption) =>
      tax?.allFieldSteps?.editBillItem?.flightType === item?.id,
  );

  console.log(getValues());

  useEffect(() => {
    dispatch(
      handleGetFields({
        patternId: -1,
        typeId: -1,
      }),
    );
    // navigate("/users/baseSubmitTaxReq", { state: undefined });
    // ...styleOprationRow,
    reset({
      personTypeDescription: "",
      personCode: "",
      economicCode: "",
      postCode: "",
      passportNumber: "",
      buyerPersonId: "",
      billSerial: "",
      settlementType: "",
      creditPrice: "",
      issueDate: "",
    });
    dispatch(
      RsetAllFieldSteps({
        ...tax?.allFieldSteps,
        rowTableBuyerPer: {},
      }),
    );
    dispatch(RsetAllFieldSteps({ rowTableBuyerPer: {}, editBillItem: {} }));
    dispatch(RsetPatternTypeId({ billPattern: {}, billType: {} }));
    dispatch(RsetProductList([]));
    dispatch(RsetListPay([]));
    setStyleOprationRow({});
  }, [keyState]);

  useEffect(() => {
    if (!!state) {
      if (tax?.allFieldSteps?.editBillItem?.issueDate !== undefined) {
        reset({
          ...tax?.allFieldSteps?.editBillItem,
          billSerial: tax?.allFieldSteps?.editBillItem?.billSerial,
          issueDate: tax?.allFieldSteps?.editBillItem?.issueDate,
          settlementType: tax?.allFieldSteps?.editBillItem?.settlementType,
          creditPrice: tax?.allFieldSteps?.editBillItem?.creditPrice,
          SellerBranchCode: tax?.allFieldSteps?.editBillItem?.SellerBranchCode,
          flightType: filterFlight,
        });
        dispatch(
          RsetPatternTypeId({
            ...tax?.patternTypeId,
            billType: tax?.allFieldSteps?.editBillItem?.billTypeId,
            billPattern: tax?.allFieldSteps?.editBillItem?.billPatternId,
          }),
        );
        if (!!tax?.allFieldSteps?.editBillItem?.buyerPersonId?.firstName) {
          setValue(
            "buyerPersonId",
            `${tax?.allFieldSteps?.editBillItem?.buyerPersonId?.firstName} ${tax?.allFieldSteps?.editBillItem?.buyerPersonId?.lastName}`,
          );
        }
        // dispatch(
        //   handleGetFields((prev: any) => {
        //     return {
        //       ...prev,
        //       subjectId: state?.subjectId,
        //       billType: tax?.allFieldSteps?.editBillItem?.billTypeId,
        //       billPattern: tax?.allFieldSteps?.editBillItem?.billPatternId,
        //     };
        //   })
        // );
        dispatch(
          handleGetFields({
            subjectId: state?.subjectId,
            billType: tax?.allFieldSteps?.editBillItem?.billTypeId,
            billPattern: tax?.allFieldSteps?.editBillItem?.billPatternId,
          }),
        );
      }
    }
  }, [tax?.allFieldSteps?.editBillItem, state]);

  useEffect(() => {
    if (state) {
      setValue(
        "buyerPersonId",
        `${tax?.allFieldSteps?.editBillItem?.buyerPersonId?.firstName} ${tax?.allFieldSteps?.editBillItem?.buyerPersonId?.lastName}`,
      );
      setValue(
        "personTypeDescription",
        tax?.allFieldSteps?.editBillItem?.buyerPersonId?.personTypeDescription,
      );
      setValue(
        "personCode",
        tax?.allFieldSteps?.editBillItem?.buyerPersonId?.personCode,
      );
      setValue(
        "economicCode",
        tax?.allFieldSteps?.editBillItem?.buyerPersonId?.economicCode,
      );
      setValue(
        "postCode",
        tax?.allFieldSteps?.editBillItem?.buyerPersonId?.postCode,
      );
      setValue(
        "passportNumber",
        tax?.allFieldSteps?.editBillItem?.buyerPersonId?.passportNumber,
      );
    }
  }, [tax?.allFieldSteps?.editBillItem?.buyerPersonId, state]);

  useEffect(() => {
    if (state?.subjectId === 3) {
      setStyleOprationRow({
        ...styleOprationRow,
        subjectId_3: true,
      });
    }
    if (state?.subjectId === 4) {
      setStyleOprationRow({
        ...styleOprationRow,
        subjectId_4: true,
      });
    }
    if (state?.subjectId === 2) {
      setStyleOprationRow({
        ...styleOprationRow,
        subjectId_2: true,
      });
    }
    if (!!state) {
      dispatch(handleGetBill(state?.id));
    } else {
      dispatch(
        handleGetFields({
          patternId: -1,
          typeId: -1,
        }),
      );
      dispatch(RsetProductList([]));
      dispatch(RsetListPay([]));
    }
  }, []);

  const submitData = (data: ValidSteps) => {
    dispatch(RsetAllFieldSteps({ ...tax.allFieldSteps, data }));
    console.log(data);
    // dispatch(RsetAllFieldSteps(getAllValues))
    nextStep();
  };

  const nextStep = () => {
    if (currentSteps === 1 && infoBuyer === false) {
      setCurrentSteps(currentSteps >= 0 ? 40 : currentSteps + 1);
    }
    if (currentSteps === 1 && infoBuyer === true) {
      setCurrentSteps(currentSteps >= 0 ? 20 : currentSteps + 1);
    }
    // if (currentSteps === 1 && infoBuyer === false) {
    //     setCurrentSteps(currentSteps >= 20 ? 40 : currentSteps + 1);
    // }
    if (currentSteps === 20) {
      setCurrentSteps(currentSteps >= 20 ? 40 : currentSteps + 1);
    }

    if (currentSteps === 40) {
      setCurrentSteps(currentSteps >= 40 ? 60 : currentSteps + 1);
    }
    if (currentSteps === 60) {
      setCurrentSteps(currentSteps >= 60 ? 80 : currentSteps + 1);
    }
    if (currentSteps === 80) {
      setCurrentSteps(currentSteps >= 80 ? 100 : currentSteps + 1);
    }
  };

  const prevStep = () => {
    if (currentSteps === 20) {
      setCurrentSteps(currentSteps <= 20 ? 1 : currentSteps - 1);
      clearErrors("buyerPersonId");
    }
    if (currentSteps === 40 && infoBuyer === false) {
      setCurrentSteps(currentSteps <= 40 ? 1 : currentSteps - 1);
    }
    if (currentSteps === 40 && infoBuyer === true) {
      setCurrentSteps(currentSteps <= 40 ? 20 : currentSteps - 1);
    }
    if (currentSteps === 60) {
      setCurrentSteps(currentSteps <= 60 ? 40 : currentSteps - 1);
    }
    if (currentSteps === 80) {
      setCurrentSteps(currentSteps <= 80 ? 60 : currentSteps - 1);
    }
    if (currentSteps === 100) {
      setCurrentSteps(currentSteps <= 100 ? 80 : currentSteps - 1);
    }
  };

  return (
    <>
      <Form className="">
        <div className="my-4 ">
          <Col className="" sm="12" md="12">
            <div
              style={{ transform: "scale(-1, 1)" }}
              className=" w-50 m-auto py-4"
            >
              <MultiStepProgressBar
                setCurrentSteps={setCurrentSteps}
                currentSteps={currentSteps}
              />
            </div>
          </Col>
          <hr className="mt-4" />
          {currentSteps === 1 && (
            <FirstStep
              styleOprationRow={styleOprationRow}
              setStyleOprationRow={setStyleOprationRow}
              reset={reset}
              pattern={pattern}
              shadowStylePattern={shadowStylePattern}
              setShadowStylePattern={setShadowStylePattern}
              watch={watch}
              getValues={getValues}
              shadowStyle={shadowStyle}
              setShadowStyle={setShadowStyle}
              control={control}
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              resetField={resetField}
            />
          )}
          {currentSteps === 20 && (
            <SecondStep
              styleOprationRow={styleOprationRow}
              setStyleOprationRow={setStyleOprationRow}
              reset={reset}
              getValues={getValues}
              setValue={setValue}
              watch={watch}
              disabledDiv={disabledDiv}
              setDisabledDiv={setDisabledDiv}
              control={control}
              register={register}
              errors={errors}
              clearErrors={clearErrors}
            />
          )}
          {currentSteps === 40 && (
            <ThirdStep
              styleOprationRow={styleOprationRow}
              setStyleOprationRow={setStyleOprationRow}
              getValues={getValues}
              control={control}
              register={register}
              errors={errors}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
            />
          )}
          {currentSteps === 60 && (
            <Fourth styleOprationRow={styleOprationRow} />
          )}
          {currentSteps === 80 && (
            <FifthStep watch={watch} control={control} errors={errors} />
          )}
          {/* {currentSteps === 100 && <Sixth getValues={getValues} />} */}
          {currentSteps === 100 && <PrintPage getValues={getValues} />}
        </div>
        <Row className="d-flex  mt-auto">
          <Col
            sm="12"
            md="12"
            lx="12"
            className=" d-flex mb-3 fitBtnSteps justify-content-center"
          >
            {currentSteps === 100 ? (
              <Col
                xl="12"
                className="d-flex  mt-auto align-items-xl-end align-items-lg-center justify-content-xl-end justify-content-lg-center"
              >
                {/* <Col className="">
                                        <ListToPDF listData={listData()} />
                                    </Col> */}
                <i
                  onClick={prevStep}
                  className="cursorPointer btnSteps textPrimary mx-1 bi bi-arrow-right-circle-fill d-flex align-items-center justify-content-center font40"
                />
                <span
                  // loadingName="upsert"
                  // xs={12} sm={12} md={12} xl={1}
                  onClick={(e: FormEvent) => {
                    e.preventDefault();
                    if (state?.subjectId === 1) {
                      dispatch(
                        handleUpdateBill({
                          step1_2: getValues(),
                          step3: tax?.allFieldSteps?.step3,
                          step4: getValues(),
                          loadingName: "upsert",
                        }),
                      );
                    } else {
                      dispatch(
                        handleUpsert({
                          stateURL: state,
                          step1_2: getValues(),
                          step3: tax?.allFieldSteps?.step3,
                          step4: getValues(),
                          loadingName: "upsert",
                        }),
                      );
                    }
                  }}
                  // title=""
                  className="rounded-pill cursorPointer px-4 py-2  bgDarkPrimary border border-none nextStepFit text-white"
                >
                  {main?.showLoading?.value ? (
                    <Spinner
                      as="span"
                      className="mx-4"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "تایید نهایی"
                  )}
                </span>
              </Col>
            ) : (
              <Col
                xl="12"
                className="d-flex  mt-auto align-items-xl-end align-items-lg-between justify-content-xl-end justify-content-lg-center"
              >
                <Col
                  xl="11"
                  className="d-flex justify-content-xl-end justify-content-lg-center"
                >
                  <i
                    onClick={prevStep}
                    className="cursorPointer d-flex align-items-center mx-1 rounded-pill btnSteps prveStepFit textPrimary bi bi-arrow-right-circle-fill font40"
                  />
                  <span
                    // loadingName="saveBill"
                    // xs={12} sm={12} md={12} lg={12} xl={1}
                    onClick={(e: FormEvent) => {
                      e.preventDefault();
                      dispatch(
                        handleSaveBill({
                          step1_2: getValues(),
                          step3: tax?.allFieldSteps?.step3,
                          step4: tax?.allFieldSteps?.step4,
                          loadingName: "saveBill",
                        }),
                      );
                    }}
                    className="rounded-pill cursorPointer px-4 py-2  bgDarkPrimary border border-none nextStepFit text-white"
                  >
                    {main?.showLoading?.value ? (
                      <Spinner
                        as="span"
                        className="mx-4"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "ثبت موقت"
                    )}
                  </span>
                  <i
                    onClick={handleSubmit((data: ValidSteps) =>
                      submitData(data),
                    )}
                    className="cursorPointer d-flex align-items-center mx-1 rounded-pill btnSteps nextStepFit  textPrimary bi bi-arrow-left-circle-fill font40"
                  />
                </Col>
              </Col>
            )}
          </Col>
        </Row>
      </Form>
      {main.messageModal && <MessageModal />}
    </>
  );
};

export default BaseSubmitTaxReq;
