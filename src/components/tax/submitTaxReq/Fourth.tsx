import React, { FC, FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Goods from "./table/Goods";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetListPay,
  selectListPay,
  RsetAllFieldSteps,
} from "../../../common/slices/taxSlice";
import {
  HookForm,
  StyleTypeOperation,
  TableStepValues,
  ValidSteps,
} from "../../../models/AllData.model";
import { RsetShowModal, RsetShowToast } from "../../../common/slices/mainSlice";
import AddTable from "../modals/AddTableGoods";
import AddTablePay from "../modals/AddTablePay";
import PayInfo from "./table/PayInfo";
import StringHelpers from "../../../helpers/string-helpers";

type Props = HookForm & StyleTypeOperation;

const Fourth: FC<Props> = ({ styleOprationRow }) => {
  const dispatch = useAppDispatch();
  const { tax } = useAppSelector((state) => state);
  const [editRowGoods, setEditRowGoods] = useState<any>({});

  const handleAddItems = (data: TableStepValues) => {
    // setModalFields(data)
    let dataValues: TableStepValues = {
      acceptanceNumber: data?.acceptanceNumber,
      payerCardNumber: data?.payerCardNumber,
      payerCodeNumber: data?.payerCodeNumber,
      paymentDate: data?.paymentDate || null,
      paymentSwitchNumber: data?.paymentSwitchNumber,
      paymentType: data?.paymentType,
      trackingNumber: data?.trackingNumber,
      terminalNumber: data?.terminalNumber,
      paidAmount: data?.paidAmount,
      id: StringHelpers.generateRanHex(24),
    };

    if (dataValues?.paymentType !== "") {
      dispatch(RsetShowModal({ showModal: false }));
      dispatch(
        RsetShowToast({
          show: true,
          title: "!با موفقیت به جدول اضافه شد",
          bg: "success",
        })
      );

      dispatch(RsetAllFieldSteps({ ...tax.allFieldSteps, ...dataValues }));
      const arr = tax.listPay ? [...tax.listPay] : [];

      if (data?.id) {
        const index = arr.findIndex((p) => p.id === data?.id);
        arr[index] = dataValues;
      } else {
        arr.push(dataValues);
      }
      dispatch(RsetListPay(arr));
    } else {
      dispatch(
        RsetShowToast({
          show: true,
          title: "!لطفا روش پرداخت را انتخاب نمایید",
          bg: "danger",
        })
      );
    }
  };

  const handleAddPayInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!styleOprationRow?.subjectId_3 && !styleOprationRow?.subjectId_4) {
      setEditRowGoods({
        paymentSwitchNumber: "",
        acceptanceNumber: "",
        terminalNumber: "",
        trackingNumber: "",
        payerCardNumber: "",
        paymentType: "",
        payerCodeNumber: "",
        paymentDate: "",
        paidAmount: "",
      });
      dispatch(RsetShowModal({ showModal: true, typeModal: 1 }));
    }
  };

  return (
    <>
      <Form className="">
        <Row className="mt-4">
          <Col
            xs="6"
            sm="5"
            md="4"
            lg="3"
            xl="2"
            className="d-flex fw-bold justify-content-center rounded-start-pill bgSuccessWhite text-white p-4"
          >
            اطلاعات پرداخت
          </Col>
          <PayInfo
            styleOprationRow={styleOprationRow}
            setEditRowGoods={setEditRowGoods}
          />
          <Row className="d-flex justify-content-center me-2">
            <Col
              xs="12"
              sm="7"
              md="6"
              lg="4"
              xl="3"
              className="me-4 justify-content-center"
            >
              <button
                onClick={handleAddPayInfo}
                className={`d-flex border border-none rounded-pill ${
                  !styleOprationRow?.subjectId_3 &&
                  !styleOprationRow?.subjectId_4
                    ? "btnSuccessWhite"
                    : "text-white"
                }   justify-content-center align-items-center py-2 px-5`}
              >
                <i className="d-flex text-white ms-1 font20 bi align-items-center bi-plus-lg" />
                <span id="addPayDoc" className="text-white">
                  افزودن اطلاعات پرداخت
                </span>
              </button>
            </Col>
          </Row>
        </Row>
        <AddTablePay
          editRowGoods={editRowGoods}
          setEditRowGoods={setEditRowGoods}
          handleAddItems={handleAddItems}
        />
      </Form>
    </>
  );
};

export default Fourth;
