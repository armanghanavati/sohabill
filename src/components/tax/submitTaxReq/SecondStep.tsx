import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { RsetAllFieldSteps } from "../../../common/slices/taxSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import InputText from "../../../common/InputText";
import { RsetShowModal } from "../../../common/slices/mainSlice";
import BuyerPersonIdModal from "../modals/BuyerPerson";
import MainTitle from "../../../common/MainTitle";
import {
  BuyerPersonFilterField,
  HookForm,
  SecondStepsType,
  StyleTypeOperation,
  ValidSteps,
} from "../../../models/AllData.model";
import { store } from "../../../common/store/store";
import { useLocation } from "react-router-dom";

type Props = SecondStepsType & HookForm & StyleTypeOperation;
const SecondStep: FC<Props> = ({
  watch,
  reset,
  setValue,
  styleOprationRow,
  clearErrors,
  errors,
  getValues,
  control,
}) => {
  const dispatch = useAppDispatch();
  const { tax, main } = useAppSelector((state) => state);
  const { state } = useLocation();

  // useEffect(() => {
  //   const getValidBuyer = watch(rowTable.lastName);
  //   if (getValidBuyer === undefined) {
  //     clearErrors("buyerPersonId");
  //   }
  //   setValue("buyerPersonId", tax?.billItem?.buyerPersonId?.firstName);
  // }, [watch(rowTable.lastName)]);

  const handleAddItemToStep = (item: any) => {
    dispatch(
      RsetAllFieldSteps({
        ...tax?.allFieldSteps,
        rowTableBuyerPer: item,
      }),
    );
  };

  // obj?.allFieldSteps?.rowTableBuyerPer?.id;

  // const handleAddItemToStep = (item: any) => {
  //   dispatch(
  //     RsetAllFieldSteps({ ...tax.allFieldSteps, editBillItem:{...tax.allFieldSteps?.editBillItem, buyerPersonId:item}, rowTableBuyerPer: item })
  //   );
  // };

  return (
    <>
      <MainTitle label="اطلاعات خریدار" />
      <Container fluid>
        <Form className="">
          <Row className="mx-2 mt-4">
            <InputText
              editStyle={
                tax?.allFieldSteps?.rowTableBuyerPer?.firstName === undefined ||
                tax?.allFieldSteps?.rowTableBuyerPer?.firstName === ""
              }
              deleteStyle={
                tax?.allFieldSteps?.rowTableBuyerPer?.firstName === undefined ||
                tax?.allFieldSteps?.rowTableBuyerPer?.firstName === ""
              }
              setEditStyle={() => {
                dispatch(
                  RsetShowModal({
                    ...main.showModal,
                    showModal: true,
                    typeModal: 1,
                  }),
                );
                // dispatch(handleBuyerPersonList({}));
              }}
              setDeleteStyle={() => {
                setValue("buyerPersonId", "");
                dispatch(
                  RsetAllFieldSteps({
                    ...tax?.allFieldSteps,
                    rowTableBuyerPer: {},
                  }),
                );
                setValue("personTypeDescription", "");
                setValue("personCode", "");
                setValue("economicCode", "");
                setValue("postCode", "");
                setValue("passportNumber", "");
              }}
              errmsg="لطفا یک خریدار انتخاب کنید"
              errors={errors}
              xl={4}
              md={12}
              xs={12}
              addProps={
                styleOprationRow?.subjectId_2
                  ? false
                  : !styleOprationRow?.subjectId_3 &&
                      !styleOprationRow?.subjectId_4
                    ? true
                    : false
              }
              className={
                styleOprationRow?.subjectId_2
                  ? ""
                  : !styleOprationRow?.subjectId_3 &&
                      !styleOprationRow?.subjectId_4
                    ? "desibleBgWhite"
                    : ""
              }
              disabled
              name="buyerPersonId"
              control={control}
              label="خریدار:"
            />
            <InputText
              disabled
              name="personTypeDescription"
              control={control}
              label="نوع شخص خریدار:"
            />
            <InputText
              disabled
              name="personCode"
              control={control}
              label="شناسه ملی/شماره ملی:"
            />
            <InputText
              disabled
              name="economicCode"
              control={control}
              label="کد اقتصادی خریدار:"
            />
            <InputText
              disabled
              name="postCode"
              control={control}
              label="کد پستی خریدار:"
            />
            <InputText
              disabled
              name="passportNumber"
              control={control}
              label="شماره گذرنامه:"
            />
          </Row>
        </Form>
      </Container>
      {main.showModal.showModal && main.showModal.typeModal === 1 && (
        <BuyerPersonIdModal
          control={control}
          clearErrors={clearErrors}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          handleAddItemToStep={handleAddItemToStep}
        />
      )}
    </>
  );
};

export default SecondStep;
