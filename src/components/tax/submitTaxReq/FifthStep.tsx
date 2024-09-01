import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ComboBox from "../../../common/ComboBox";
import Datepicker from "../../../common/DatePicker";
import InputText from "../../../common/InputText";
import { Controller } from "react-hook-form";
import { useAppSelector } from "../../../hooks/hook";
import { HookForm } from "../../../models/AllData.model";

const FifthStep: React.FC<HookForm> = ({ control, watch, errors }) => {
  const { tax } = useAppSelector((state) => state);

  console.log(watch("buyerBranchCode"));

  return (
    <>
      <Row className="mt-4">
        <Col
          xs="6"
          sm="5"
          md="4"
          lg="3"
          xl="2"
          className="d-flex fw-bold justify-content-center rounded-start-pill bgSuccessWhite text-white p-4"
        >
          اطلاعات تکمیلی
        </Col>
      </Row>
      <Container className="mb-4 " fluid>
        <Form className="">
          <Row className="mx-2 mt-4">
            <InputText
              control={control}
              label="کد شعبه فروشنده:"
              name="sellerBranchCode"
              type="number"
              errors={errors}
              length_num={8}
              errminimum={4}
              errmsgmin="کد شعبه فروشنده حداقل باید 4 حرف باشد"
              errmsg="لطفا کد شعبه فروشنده را وارد نمایید"
            />
            <InputText
              control={control}
              label="شماره پروانه گمرکي فروشنده:"
              name="customsLicenseNumber"
              type="number"
              errors={errors}
              length_num={14}
              errminimum={2}
              errmsgmin="شماره پروانه گمرکي فروشنده حداقل باید 2 حرف باشد"
              errmsg="لطفا شماره پروانه گمرکي فروشنده را وارد نمایید"
            />
            <InputText
              control={control}
              label="کد گمرک محل اظهار فروشنده:"
              name="customsCode"
              type="number"
              errors={errors}
              length_num={5}
              errminimum={5}
              errmsgmin="کد گمرک محل اظهار فروشنده باید دقیقا 5 رقم باشد"
              errmsg="لطفا کد گمرک محل اظهار فروشنده را وارد نمایید"
            />
            <InputText
              control={control}
              label="شماره کوتاژ اظهارنامه گمرکی:"
              name="cotageNumber"
              type="number"
              errors={errors}
              length_num={5}
              errmsg="لطفا شماره کوتاژ اظهارنامه گمرکی را وارد نمایید"
            />
            <InputText
              control={control}
              label="شناسه يکتاي ثبت قرارداد فروشنده:"
              name="registrationNumber"
              type="number"
              errors={errors}
              length_num={12}
              errminimum={12}
              errmsgmin="شناسه يکتاي ثبت قرارداد فروشنده باید 12 حرف باشد"
              errmsg="لطفا شناسه يکتاي ثبت قرارداد فروشنده را وارد نمایید"
            />
            <InputText
              control={control}
              label="شماره اشتراک / شناسه قبض بهره بردار:"
              name="subscriptionNumber"
              type="number"
              errors={errors}
              length_num={19}
              errminimum={2}
              errmsgmin="شماره اشتراک / شناسه قبض بهره بردار حداقل باید 2 حرف باشد"
              errmsg="لطفا شماره اشتراک / شناسه قبض بهره بردار را وارد نمایید"
            />
            <InputText
              errors={errors}
              length_num={18}
              errminimum={2}
              errmsgmin="مالیات موضوع ماده 17 حداقل باید 2 حرف باشد"
              // errmsg="لطفا مالیات  17 را وارد نمایید"
              control={control}
              label="مالیات موضوع ماده 17:"
              name="article17TaxPrice"
              type="number"
              currency
              ltr
            />
            <Datepicker
              control={control}
              errmsg="لطفا تاریخ کوتاژ اظهارنامه گمرکی را تعیین کنید"
              label="تاریخ کوتاژ اظهارنامه گمرکی:"
              errors={errors}
              name="cotageDate"
              maxDate={new Date()}
              persianType="per"
            />
            {/* <Controller
                            control={control}
                            name="FlightType"
                            // rules={{ required: { value: tax.isReqStepsCombo, message: "لطفا نوع پرواز را تعیین کنید" } }}
                            render={({ field }) => */}
            <ComboBox
              errmsg="لطفا نوع پرواز را تعیین کنید"
              name="flightType"
              label="نوع پرواز:"
              control={control}
              // field={field}
              options={tax?.stepsInfoList?.flightTypes}
              className={`${
                errors.FlightType
                  ? "rounded-2 star border border-danger"
                  : "mb-1"
              }`}
              errors={errors}
            />
            {/* }
                        /> */}
            <InputText
              errmsg="لطفا کد شعبه خریدار را وارد کنید"
              errmsgmin="کد شعبه خریدار باید 4 رقم باشد"
              errminimum={4}
              errors={errors}
              label="کد شعبه خریدار:"
              type="number"
              length_num={4}
              ltr
              control={control}
              name="buyerBranchCode"
            />
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default FifthStep;
