import React, { ChangeEvent } from "react";
import { ButtonToolbar, Col, Form, OverlayTrigger, Row } from "react-bootstrap";
import InputText from "../../../common/InputText";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { RsetAllFieldSteps } from "../../../common/slices/taxSlice";
import ComboBox from "../../../common/ComboBox";
import StringHelpers from "../../../helpers/string-helpers";
import { Controller } from "react-hook-form";
import {
  FieldsAddTableGoodsType,
  HookForm,
  StyleTypeOperation,
} from "../../../models/AllData.model";

type Props = HookForm & StyleTypeOperation & FieldsAddTableGoodsType;

const FieldsAddTableGoods: React.FC<Props> = ({
  setShowSettlementMod,
  setValue,
  styleOprationRow,
  errors,
  control,
  fixCurrencyOptionType,
  watch,
  disableOtherTax,
  setDisableOtherTax,
  tooltip,
  disableOtherLegalFunds,
  setDisableOtherLegalFunds,
  state,
}) => {
  const { tax } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <>
      <Form>
        <Row className="mx-2">
          <InputText
            editStyle={tax?.allFieldSteps?.rowProductGoods?.code === undefined}
            deleteStyle={
              tax?.allFieldSteps?.rowProductGoods?.code === undefined
            }
            setEditStyle={() => {
              setShowSettlementMod(true);
            }}
            setDeleteStyle={() => {
              setValue("valueIncreasedTaxRate", "");
              setValue("settlementType", "");
              dispatch(
                RsetAllFieldSteps({
                  ...tax.allFieldSteps,
                  rowProductGoods: {},
                }),
              );
            }}
            addProps={
              !styleOprationRow?.subjectId_3 && !styleOprationRow?.subjectId_4
                ? true
                : false
            }
            errmsg="لطفا یک کالا انتخاب کنید"
            errors={errors}
            xl={12}
            md={12}
            xs={12}
            className={
              !styleOprationRow?.subjectId_3 && !styleOprationRow?.subjectId_4
                ? "desibleBgWhite"
                : ""
            }
            disabled
            name="settlementType"
            control={control}
            label="کالا/ خدمت:"
          />
          <Row>
            <ComboBox
              errmsg="لطفا نوع ارز را تعیین کنید"
              control={control}
              xl={4}
              md={12}
              xs={12}
              errors={errors}
              label="نوع ارز:"
              name="currencyCode"
              options={fixCurrencyOptionType}
              className={`${
                errors.currencyCode
                  ? "rounded-2 star border border-danger"
                  : "mb-1"
              }`}
            />
            <InputText
              xl={4}
              type="number"
              control={control}
              label="نرخ برابری ارز با ریال:"
              name="equivalentWithRial"
              ltr
              currency
              disabled={watch("currencyCode")?.id !== "IRR" ? false : true}
              errors={errors}
              validate={(value: string) => {
                const valueNum = Number(value);
                if (watch("currencyCode")?.id !== "IRR" && valueNum <= 0) {
                  return "نرخ برابری ارز با ریال نمی‌تواند کوچکتر از صفر باشد";
                }
                return true;
              }}
            />
          </Row>
          <InputText
            ltr
            label="مبلغ واحد(ریال):"
            errmsg="لطفا مبلغ واحد را وارد کنید"
            errmsgmin="مبلغ واحد حداقل باید 2 رقم باشد"
            errminimum={2}
            errors={errors}
            control={control}
            name="unitPrice"
            currency
            length_num={19}
            type="number"
          />
          <ComboBox
            errmsg="لطفا واحد اندازه گیری را تعیین کنید"
            control={control}
            errors={errors}
            label="واحد اندازه گیری:"
            // field={field}
            md={12}
            name="measurementUnitCode"
            className={`${
              errors.measurementUnitCode
                ? "rounded-2 star border border-danger"
                : "mb-1"
            }`}
            options={tax?.stepsInfoList?.unitTypes}
          />
          <InputText
            errmsg="لطفا تعداد/مقدار را وارد کنید"
            errors={errors}
            control={control}
            label="تعداد/مقدار:"
            name="count"
            type="number"
            dotCount={7}
            length_num={18}
            ltr
            validate={(value: string) => {
              if (value <= "0") {
                return "تعداد/مقدار نمی‌تواند کوچکتر از صفر باشد";
              }
              return true;
            }}
          />
          <Row>
            <InputText
              ltr
              errmsg="لطفا مبلغ تخفیف را وارد کنید"
              length_num={18}
              errors={errors}
              control={control}
              label="مبلغ تخفیف:"
              name="discount"
              type="number"
              currency
            />
            <InputText
              xl={4}
              ltr
              errors={errors}
              label="مبلغ پس از تخفیف:"
              disabled
              name="priceAfterDiscount"
              type="number"
              validate={(value: number) => {
                const numbValue = StringHelpers.operationRemoveSep(value);
                if (0 > numbValue) {
                  return "مبلغ پس از تخفیف نمی‌تواند منفی باشد";
                }
                return true;
              }}
              control={control}
              length_num={10}
            />
          </Row>
          <Row>
            <InputText
              errmsg="نرخ مالیات بر ارزش افزوده را وارد کنید"
              length_num={2}
              errors={errors}
              className="text-center"
              label="نرخ مالیات بر ارزش افزوده:"
              name="valueIncreasedTaxRate"
              type="number"
              control={control}
              percent
              validate={(value: string) => {
                const valueNum = Number(value);
                if (valueNum !== 9 && valueNum !== 0) {
                  return "نرخ باید 0 یا 9 درصد باشد";
                }
                return true;
              }}
            />
            <InputText
              disabled
              ltr
              label="مبلغ مالیات بر ارزش افزوده:"
              name="itemValueIncreasedTaxPrice"
              type="number"
              length_num={16}
              control={control}
            />
          </Row>
          <Row className="">
            <InputText
              xl={4}
              errors={errors}
              label="نرخ سایر مالیات و عوارض:"
              disabled={disableOtherTax ? true : false}
              name="otherTaxRate"
              type="number"
              validate={() => {
                const numericValue = Number(
                  watch("otherTaxRate")?.toString().replace(/,/g, "") || 0,
                );
                if (numericValue < 0 || numericValue > 100) {
                  return "نرخ باید بین 0 تا 100 باشد و تا 2 رقم اعشار باشد";
                }
                return true; // اگر شرط صحیح باشد
              }}
              control={control}
              length_num={6}
              percent
            />
            <Col xl={4} className=" d-flex">
              <Col className="position-relative">
                <InputText
                  xl={12}
                  disabled={disableOtherTax ? false : true}
                  clickToShow
                  checkedClickToShow={disableOtherTax}
                  onChangeClickToShow={(e: ChangeEvent<HTMLInputElement>) =>
                    setDisableOtherTax(e.target.checked)
                  }
                  label="مبلغ سایر مالیات و عوارض:"
                  name="otherTaxPrice"
                  currency
                  type="number"
                  length_num={18}
                  control={control}
                />
                <ButtonToolbar className="fitTooltip">
                  <OverlayTrigger placement="top" overlay={tooltip}>
                    <i
                      onClick={() => {}}
                      className="me-2 d-flex align-items-center mb-2 font20 text-dark justify-content-center bi bi-question-circle"
                    />
                  </OverlayTrigger>
                </ButtonToolbar>
              </Col>
            </Col>
            <InputText
              xl={4}
              label="موضوع سایر مالیات و عوارض:"
              errors={errors}
              name="otherTaxSubject"
              control={control}
              length_num={120}
            />
          </Row>
          <Row>
            <InputText
              disabled={disableOtherLegalFunds ? true : false}
              label="نرخ سایر وجوه قانونی:"
              name="otherLegalFundsRate"
              errors={errors}
              type="number"
              className=""
              validate={() => {
                const numericValue = Number(
                  watch("otherLegalFundsRate")?.toString().replace(/,/g, "") ||
                    0,
                );
                if (numericValue < 0 || numericValue > 100) {
                  return "نرخ باید بین 0 تا 100 باشد و تا 2 رقم اعشار باشد";
                }
                return true;
              }}
              percent
              control={control}
              length_num={5}
            />
            <Col xl={4} className=" d-flex">
              <Col className="position-relative">
                <InputText
                  xl={12}
                  disabled={disableOtherLegalFunds ? false : true}
                  clickToShow
                  checkedClickToShow={disableOtherLegalFunds}
                  onChangeClickToShow={(e: ChangeEvent<HTMLInputElement>) =>
                    setDisableOtherLegalFunds(e.target.checked)
                  }
                  control={control}
                  label="مبلغ سایر وجوه قانونی:"
                  name="otherLegalFundsPrice"
                  currency
                  type="number"
                  length_num={18}
                />
                <ButtonToolbar className="fitTooltip">
                  <OverlayTrigger placement="top" overlay={tooltip}>
                    <i
                      onClick={() => {}}
                      className="me-2 d-flex align-items-end mb-2  font20 text-dark justify-content-center bi bi-question-circle"
                    />
                  </OverlayTrigger>
                </ButtonToolbar>
              </Col>
            </Col>
            <InputText
              errmsg="لطفا موضوع سایر وجوه قانونی را وارد کنید"
              errors={errors}
              control={control}
              label="موضوع سایر وجوه قانونی:"
              name="otherLegalFundsSubject"
              length_num={16}
            />
          </Row>
          <Row>
            <InputText
              errmsg="لطفا شناسه یکتای ثبت قرارداد حق العمل کاری را وارد کنید"
              errmsgmin="شناسه یکتای ثبت قرارداد حق العمل کاری باید 12 رقم باشد"
              errminimum={12}
              errors={errors}
              control={control}
              // className=''
              label="شناسه یکتای ثبت قرارداد حق العمل کاری:"
              name="registerContractId"
              type="number"
              ltr
              length_num={12}
            />
          </Row>
          <Row>
            <InputText
              // errmsg="لطفا سود فروشنده"
              // errmsgmin="سود فروشنده 4 رقم باشد"
              // errminimum={4}
              // // errors={errors}
              control={control}
              length_num={18}
              label="سود فروشنده:"
              ltr
              currency
              type="number"
              name="sellerProfit"
            />
            <InputText
              // errmsg="لطفا اجرت ساخت را وارد کنید"
              // errmsgmin="اجرت ساخت حداقل باید 5 رقم باشد"
              // errminimum={5}
              // // errors={errors}
              control={control}
              label="اجرت ساخت:"
              name="constructionFee"
              currency
              type="number"
              length_num={16}
            />
            <InputText
              // errmsg="لطفا حق العمل را وارد کنید"
              // errmsgmin="حق العمل حداقل باید 5 رقم باشد"
              // errminimum={5}
              // errors={errors}
              control={control}
              label="حق العمل:"
              name="commission"
              currency
              type="number"
              length_num={18}
            />
          </Row>
          <InputText
            control={control}
            disabled
            label="مبلغ کل کالا(ریال):"
            name="totalItemsPrice"
            ltr
            currency
            type="number"
            length_num={18}
            errors={errors}
            validate={(value: string | number) => {
              const numericValue = StringHelpers.operationRemoveSep(value);
              if (numericValue < 0) {
                return "مبلغ کل کالا نباید کوچکتر از صفر باشد";
              }
              return true;
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Col xl="12" className="mt-4">
                <Form.Label className="ms-3 align-items-end">
                  شرح کالا:
                </Form.Label>
                <textarea
                  disabled={
                    state?.subjectId === 3 || state?.subjectId === 4
                      ? true
                      : false
                  }
                  {...field}
                  name="description"
                  rows={5}
                  className="form-control"
                />
              </Col>
            )}
          />
        </Row>
      </Form>
    </>
  );
};

export default FieldsAddTableGoods;
