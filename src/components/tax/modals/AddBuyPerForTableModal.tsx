import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Form,
  Table,
  DropdownButton,
  Dropdown,
  Container,
  Collapse,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetPersonBuyerList,
  handleAddBuyerPerson,
  handleBuyerPersonList,
} from "../../../common/slices/taxSlice";
import { Controller, useForm } from "react-hook-form";
import InputText from "../../../common/InputText";
import { RsetShowModal, RsetShowToast } from "../../../common/slices/mainSlice";
import Btn from "../../../common/Btn";
import { ValidSteps } from "../../../models/AllData.model";
import ComboBox from "../../../common/ComboBox";
import { validation } from "../../../common/validations/personCodeValid";

const AddBuyPerForTableModal: FC = ({}) => {
  const dispatch = useAppDispatch();
  const { main, tax } = useAppSelector((state) => state);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    getValues,
    setError,
    resetField,
    watch,
  } = useForm<ValidSteps>({ reValidateMode: "onChange" });

  const submitData = (data: ValidSteps) => {
    if (
      watch("personCode")?.length !== 0 &&
      watch("personCode") !== undefined
    ) {
      if (
        validation.legalNationalCodeOrNationalCode(data.personCode) !== true
      ) {
        setError("personCode", {
          type: "invalidNationalCode",
          message: "کد/شناسه ملی وارد شده صحیح نمی باشد",
        });
        return;
      }
    }
    dispatch(handleAddBuyerPerson(getValues()));
  };

  // useEffect(() => {
  //     if (watch("personTypeId")?.id !== 0) {
  //         dispatch(RsetShowToast({ show: true, title: "لطفا یا شناسه و کد پستی را وارد کنید و یا تنها شماره اقتصادی را وارد کنید ", bg: "warning", }))
  //     }
  // }, [watch("personTypeId")])

  return (
    <>
      <Modal
        size="lg"
        keyboard={true}
        backdrop="static"
        centered
        show={main.showModal.showModal2 && main.showModal.typeModal2 === 2}
        onHide={() =>
          dispatch(
            RsetShowModal({
              ...main.showModal,
              showModal2: false,
              typeModal2: 2,
            }),
          )
        }
      >
        <Modal.Header
          style={{ transform: "scale(-1, 1)", direction: "ltr" }}
          className="d-flex bgSuccessWhite text-white justify-content-center"
          closeButton
        >
          <span style={{ transform: "scale(-1, 1)" }} className="fw-bold">
            مشخصات خریدار
          </span>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="d-flex justify-content-center">
              <InputText
                control={control}
                label="نام:"
                name="firstName"
                errmsg="لطفا نام را وارد کنید"
                errmsgmin="نام حداقل باید 3 حرف باشد"
                length_num={20}
                errminimum={3}
                errors={errors}
              />
              <InputText
                control={control}
                name="lastName"
                label="نام خانوادگی:"
                errmsg="لطفا نام خانوادگی را وارد کنید"
                errmsgmin="نام خانوادگی حداقل باید 3 حرف باشد"
                length_num={20}
                errminimum={3}
                errors={errors}
              />
              {/* <Controller
                                control={control}
                                name="personTypeId"
                            render={({ field }) => */}
              <ComboBox
                errmsg="لطفا نوع شخص خریدار را تعیین کنید"
                control={control}
                xs={12}
                md={12}
                xl={4}
                label="نوع شخص خریدار:"
                // field={field}
                errors={errors}
                name="personTypeId"
                options={tax?.stepsInfoList?.personTypes}
                className={`${
                  errors.personTypeId
                    ? "rounded-2 star border border-danger"
                    : "mb-1"
                }`}
              />
              <InputText
                validate={(value: number | string) => {
                  const postValue = watch("postCode");
                  const personType = watch("personTypeId")?.id;
                  const economic = watch("economicCode");
                  if (
                    (personType === 1 && !!!economic && !!!value) ||
                    (personType === 4 && !!!economic && !!!value)
                  ) {
                    return "لطفا شناسه/ شماره ملی را وارد کنیدِ";
                  }
                  return true;
                }}
                errmsgmin="شناسه/شماره ملی حداقل باید 10 حرف باشد"
                length_num={14}
                errminimum={10}
                errors={errors}
                control={control}
                name="personCode"
                type="number"
                label="شناسه/شماره ملی:"
              />
              <InputText
                validate={
                  (value: string | number) => {
                    const personValue = watch("personCode");
                    const postValue = watch("postCode");
                    const personType = watch("personTypeId")?.id;
                    if (
                      (personType === 2 && !!!value) ||
                      (personType === 3 && !!!value) ||
                      (personType === 1 &&
                        !!!value &&
                        !!!postValue &&
                        !!!personValue) ||
                      (personType === 4 &&
                        !!!value &&
                        !!!postValue &&
                        !!!personValue)
                    ) {
                      return "لطفا شماره اقتصادی را وارد کنید";
                    }
                    return true;
                  }
                  // }
                }
                errmsgmin="شماره اقتصادی حداقل باید 5 حرف باشد"
                errminimum={5}
                length_num={14}
                errors={errors}
                control={control}
                name="economicCode"
                type="number"
                label="شماره اقتصادی:"
              />
              <InputText
                validate={(value: number | string) => {
                  const postValue = watch("postCode");
                  const personType = watch("personTypeId")?.id;
                  const economic = watch("economicCode");
                  if (
                    (personType === 1 && !!!economic && !!!value) ||
                    (personType === 4 && !!!economic && !!!value)
                  ) {
                    return "لطفا کد پستی را وارد کنیدِ";
                  }
                  return true;
                }}
                errmsgmin="کد پستی باید 10 حرف باشد"
                errminimum={10}
                length_num={10}
                errors={errors}
                name="postCode"
                control={control}
                type="number"
                label="کد پستی:"
              />
              <InputText
                errmsg="لطفا شماره گذرنامه را وارد کنید"
                errmsgmin="شماره گذرنامه باید 9 حرف باشد"
                errminimum={9}
                length_num={9}
                errors={errors}
                control={control}
                name="passportNumber"
                label="شماره گذرنامه:"
              />
              <InputText
                errmsg="لطفا نام شرکت را وارد کنید"
                errmsgmin="نام شرکت حداقل باید 3 حرف باشد"
                length_num={20}
                errminimum={3}
                errors={errors}
                control={control}
                name="companyName"
                label="نام شرکت:"
              />
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Btn
            title="افزودن"
            variant="success"
            onClick={handleSubmit((data: ValidSteps) => submitData(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBuyPerForTableModal;
