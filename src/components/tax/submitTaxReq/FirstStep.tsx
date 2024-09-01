import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ComboBox from "../../../common/ComboBox";
import SwitchCase from "../../../common/SwitchCase";
import Datepicker from "../../../common/DatePicker";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetInfoBuyer,
  RsetPattern,
  RsetPatternTypeId,
  handleGetFields,
} from "../../../common/slices/taxSlice";
import InputText from "../../../common/InputText";
import {
  FirstStepType,
  HookForm,
  StepOneField,
  StyleOprationRowState,
  StyleTypeOperation,
} from "../../../models/AllData.model";
import { Controller } from "react-hook-form";
import MainTitle from "../../../common/MainTitle";
import { billTypeId } from "../../../services/masterServices";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

type Props = FirstStepType & HookForm & StyleTypeOperation;
const FirstStep: React.FC<Props> = ({
  styleOprationRow,
  pattern,
  setShadowStylePattern,
  setShadowStyle,
  watch,
  control,
  errors,
}) => {
  const { tax } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  // useEffect(() => {
  //   clearErrors([
  //     "DebtPrice",
  //     "settlementType",
  //     "issueDate",
  //     "BillPatternTypeId",
  //   ]);
  // }, [tax.isReqStepsCombo]);

  return (
    <>
      <Form className="input-page">
        <MainTitle label="انتخاب نوع صورتحساب و اطلاعات اصلی" />
        {/* <Row className="me-2 mt-4 d-flex">
          <Col xs="9" sm="6" md="4" lg="3" xl="2" className="mt-2 pb-4 d-flex justify-content-start ">
            <SwitchCase
              className="me-2"
              onChecked={(e: any) => dispatch(RsetInfoBuyer(e.target.checked))}
              checked={tax.infoBuyer}
              label="اطلاعات خریدار را دارم"
            />
            <span className="font16 d-flex align-items-center ">
              ندارم
            </span>
          </Col>
        </Row> */}
        <Row className="mt-4  mx-2">
          <Col xl="4" className="mt-4">
            <Form.Label className="ms-3 star  align-items-center">
              نوع صورتحساب:
            </Form.Label>
            <Select
              placeholder="انتخاب"
              className="mb-4 "
              isDisabled={
                styleOprationRow?.subjectId_2
                  ? true
                  : !styleOprationRow?.subjectId_3 &&
                      !styleOprationRow?.subjectId_4
                    ? false
                    : true
              }
              name="billTypeId"
              getOptionLabel={(option: any) => option.title}
              getOptionValue={(option: any) => option.id}
              value={tax?.patternTypeId?.billType}
              options={tax?.stepsInfoList?.types}
              onChange={(e: any) => {
                setShadowStyle(false);
                setShadowStylePattern(false);
                dispatch(
                  RsetPatternTypeId({ ...tax?.patternTypeId, billType: e }),
                );
              }}
            />
          </Col>
          <Col xl="4" className="mt-4">
            <Form.Label className="ms-3 star  align-items-center">
              الگوی صورتحساب:
            </Form.Label>
            <Select
              placeholder="انتخاب"
              isDisabled={
                styleOprationRow?.subjectId_2
                  ? true
                  : !styleOprationRow?.subjectId_3 &&
                      !styleOprationRow?.subjectId_4
                    ? false
                    : true
              }
              getOptionLabel={(option: any) => option.title}
              getOptionValue={(option: any) => option.id}
              // isClearable={true}
              className=""
              name="billPatternId"
              value={tax?.patternTypeId?.billPattern}
              options={pattern}
              onChange={(e: any) => {
                setShadowStylePattern(true);
                dispatch(
                  RsetPatternTypeId({ ...tax?.patternTypeId, billPattern: e }),
                );
                dispatch(handleGetFields(e));
              }}
            />
          </Col>
          <InputText
            md={6}
            label="شماره فاکتور:"
            // pattern="money"
            ltr
            disabled={state?.subjectId === 1 ? true : false}
            length_num={22}
            control={control}
            name="billSerial"
            // type="number"
            errors={errors}
            errmsg="لطفا شماره فاکتور صورتحساب را وارد کنید"
            errmsgmin="شماره فاکتور صورتحساب حداقل باید 2 رقم باشد"
            errminimum={2}
            // errorValidation={true}
            className={`${
              errors.billSerial ? " mb-1 border border-danger" : "mb-1"
            }`}
          />
          <Datepicker
            control={control}
            errmsg="لطفا تاریخ صورتحساب را تعیین کنید"
            label="تاریخ صورتحساب:"
            errors={errors}
            name="issueDate"
            // maxDate={new Date()}
            maxDate={new DateObject({ calendar: persian }).set(
              "day",
              new DateObject({ calendar: persian }).day - 1,
            )}
            persianType="per"
          />
          {/* <Controller
            control={control}
            name="settlementType"
            rules={{
              required: {
                value: tax.isReqStepsCombo,
                message: "لطفا روش تسویه را تعیین کنید",
              },
            }}
            render={({ field }) => ( */}
          <ComboBox
            errmsg="لطفا روش تسویه را تعیین کنید"
            control={control}
            name="settlementType"
            label="روش تسویه:"
            // field={field}
            options={tax.stepsInfoList?.settlementTypes}
            className={`${
              errors.settlementType
                ? "rounded-2 star border border-danger"
                : "mb-1"
            }`}
            errors={errors}
          />
          {/* )}
          /> */}
          <InputText
            md={6}
            label="مبلغ نسيه:"
            pattern="money"
            currency
            ltr
            length_num={18}
            control={control}
            validation={{
              required: {
                value: watch("settlementType")?.id === 3,
                message: "لطفا مبلغ نسیه را وارد کنید",
              },
            }}
            name="creditPrice"
            type="number"
            errors={errors}
            important={watch("settlementType")?.id === 3 ? true : false}
            // errorValidation={true}
            className={`${
              errors.creditPrice ? "mb-1 border border-danger" : "mb-1"
            }`}
          />
        </Row>
      </Form>
    </>
  );
};

export default FirstStep;
