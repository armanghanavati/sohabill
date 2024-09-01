import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Goods from "./table/Goods";
import AddTableGoods from "../modals/AddTableGoods";
import {
  RsetProductList,
  RsetAllFieldSteps,
} from "../../../common/slices/taxSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  CurrencyType,
  ShowModal,
  HookForm,
  TableStepValues,
  ValidSteps,
} from "../../../models/AllData.model";
import { RsetShowModal, RsetShowToast } from "../../../common/slices/mainSlice";
import { useForm } from "react-hook-form";
import StringHelpers from "../../../helpers/string-helpers";
import TaxHelpers from "../../../helpers/tax-helpers";
import { useLocation } from "react-router-dom";

type ThirdStep = ShowModal & HookForm;

const ThirdStep: React.FC<ThirdStep> = ({
  showAddModal,
  setShowAddModal,
  styleOprationRow,
  setStyleOprationRow,
}) => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [modalFields, setModalFields] = useState({});
  const [editRowGoods, setEditRowGoods] = useState({});
  const { tax, main } = useAppSelector((state) => state);
  const currIR = TaxHelpers.fixCurrencyType(
    tax?.stepsInfoList?.currencies,
  )?.[67];

  const {
    control,
    watch,
    formState: { errors },
    clearErrors,
    getValues,
    reset,
    setValue,
    setError,
    handleSubmit,
  } = useForm<ValidSteps>({
    reValidateMode: "onChange",
    resetOptions: { keepErrors: true },
  });

  const setEditCurr = tax?.billItem?.billItems?.map((item: any) => {
    return item?.currencyCode;
  });

  useEffect(() => {
    if (tax?.billItem?.billItems?.length !== 0) {
      const fixCurrEdit = TaxHelpers.fixCurrencyType(setEditCurr)?.[0];
      reset({
        ...tax?.billItem?.billItems,
        currencyCode: fixCurrEdit,
      });
    }
  }, [tax?.billItem?.billItems]);

  const handleAddItems = (data: ValidSteps) => {
    setModalFields(data);
    console.log("edit rooooow");
    console.log(data);
    let dataValues: TableStepValues = {
      // settlementType: data?.settlementType,
      count: data?.count,
      valueIncreasedTaxRate: data?.valueIncreasedTaxRate,
      // tax?.allFieldSteps?.rowProductGoods?.vat || data?.valueIncreasedTaxRate,
      itemValueIncreasedTaxPrice: data?.itemValueIncreasedTaxPrice,
      otherTaxRate: data?.otherTaxRate,
      priceBeforeDiscount: data?.priceBeforeDiscount,
      otherTaxPrice: data?.otherTaxPrice,
      otherLegalFundsRate: data?.otherLegalFundsRate,
      otherLegalFundsPrice: data?.otherLegalFundsPrice,
      measurementUnitCode: data?.measurementUnitCode,
      otherTaxSubject: data?.otherTaxSubject,
      otherLegalFundsSubject: data?.otherLegalFundsSubject,
      registerContractId: data?.registerContractId,
      commission: data?.commission,
      constructionFee: data?.constructionFee,
      equivalentWithRial: data?.equivalentWithRial,
      serviceOrProductId:
        tax?.allFieldSteps?.rowProductGoods?.code || data?.serviceOrProductId,
      sellerProfit: data?.sellerProfit,
      description: data?.description,
      priceAfterDiscount: data?.priceAfterDiscount,
      settlementType: data?.settlementType,
      discount: data?.discount,
      unitPrice: data?.unitPrice,
      totalItemsPrice: data?.totalItemsPrice,
      currencyCode: data?.currencyCode,
      id: StringHelpers.generateRanHex(24),
      templateGoods: true,
    };
    console.log(dataValues);
    if (data.count !== undefined) {
      dispatch(RsetShowModal({ showModal: false }));
      dispatch(
        RsetShowToast({
          show: true,
          title: "!با موفقیت به جدول اضافه شد",
          bg: "success",
        }),
      );
      const allValues = getValues();
      dispatch(RsetAllFieldSteps({ ...allValues, ...dataValues }));
      console.log("tax?.productList", tax?.productList);
      // const arr: any = !!!tax?.productList ? [...tax?.productList] : [];
      const arr: any = tax?.productList ? [...tax?.productList] : [];
      // if (Array.isArray(arr)) {
      //   dispatch(
      //     RsetProductList({
      //       ...tax?.productList,
      //       product: arr,
      //     })
      //   );

      if (data?.id) {
        const index = arr?.findIndex((p: any) => {
          console.log(p);
          return p.id === data?.id;
        });
        arr[index] = dataValues;
      } else {
        arr.push(dataValues);
      }
      // dispatch(RsetProductList(arr));
      // if (!!state) {
      dispatch(RsetProductList([...arr]));
      // } else {
      //   dispatch(RsetProductList(arr));
      // }
    }
  };

  const handleAddTax = (e: React.FormEvent) => {
    if (!styleOprationRow?.subjectId_3 && !styleOprationRow?.subjectId_4) {
      e.preventDefault();
      dispatch(
        RsetAllFieldSteps({
          ...tax?.allFieldSteps,
          rowProductGoods: {},
        }),
      );
      setEditRowGoods({
        valueIncreasedTaxRate: "",
        settlementType: "",
        editRowGoods: "",
        currencyCode: currIR,
        unitPrice: "",
        count: "",
        PriceBeforeDiscount: "",
        discount: "",
        priceAfterDiscount: "",
        itemValueIncreasedTaxPrice: "",
        otherTaxRate: "",
        otherTaxPrice: "",
        otherLegalFundsRate: "",
        otherLegalFundsPrice: "",
        measurementUnitCode: "",
        otherTaxSubject: "",
        otherLegalFundsSubject: "",
        registerContractId: "",
        commission: "",
        constructionFee: "",
        equivalentWithRial: "",
        sellerProfit: "",
        totalItemsPrice: "",
        description: "",
      });
      dispatch(RsetShowModal({ showModal: true, typeModal: 1 }));
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <Form className="">
        <Row className="mt-4">
          <Col
            xs="10"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            className="d-flex fw-bold justify-content-center rounded-start-pill bgSuccessWhite text-white p-4"
          >
            کالا / خدمت
          </Col>
          <Goods
            styleOprationRow={styleOprationRow}
            setStyleOprationRow={setStyleOprationRow}
            watch={watch}
            setValue={setValue}
            setEditRowGoods={setEditRowGoods}
            modalFields={modalFields}
          />
          <Row className=" d-flex justify-content-center">
            <Col
              xs="9"
              sm="6"
              md="5"
              lg="6"
              xl="3"
              className="me-4 d-flex justify-content-center"
            >
              <button
                onClick={handleAddTax}
                className={`d-flex rounded-pill ${
                  styleOprationRow?.subjectId_3 || styleOprationRow?.subjectId_4
                    ? "bg-gray"
                    : "btnSuccessWhite"
                }  justify-content-center align-items-center border border-none py-2 px-5`}
              >
                <i className="d-flex text-white ms-1 font20 bi align-items-center bi-plus-lg"></i>
                <span className=" text-white">افزودن کالا</span>
              </button>
            </Col>
          </Row>
        </Row>
      </Form>
      {main.showModal.showModal && (
        <AddTableGoods
          styleOprationRow={styleOprationRow}
          fixCurrencyOptionType={TaxHelpers.fixCurrencyType(
            tax?.stepsInfoList?.currencies,
          )}
          currIR={currIR}
          setError={setError}
          clearErrors={clearErrors}
          getValues={getValues}
          handleSubmit={handleSubmit}
          setValue={setValue}
          reset={reset}
          watch={watch}
          editRowGoods={editRowGoods}
          setEditRowGoods={setEditRowGoods}
          handleAddItems={handleAddItems}
          control={control}
          errors={errors}
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
        />
      )}
    </>
  );
};

export default ThirdStep;

//     <Form className=''>
//         <Row className="mt-4">
//             <Col xs="10" sm="6" md="4" lg="3" xl="2" className="d-flex justify-content-center rounded-start-pill bgSuccessWhite text-white p-4">
//                 کالا / خدمت
//             </Col>
//             <Goods />
//             <Row className="d-flex justify-content-center">
//                 <OverlayTrigger placement="top" overlay={tooltip}>
//                     <Col xs="6" sm="4" md="3" xl="2" className=" justify-content-center">
//                         <button onClick={(e) => {
//                             e.preventDefault()
//                             dispatch(RsetShowModal(true))
//                         }}
//                             className="d-flex rounded-pill btnSuccessWhite justify-content-center align-items-center">
//                             <i className="d-flex text-white ms-1 font20 bi align-items-center bi-plus-lg"></i>
//                             <span className=" text-white" >
//                             </span>
//                         </button>
//                     </Col>
//                 </OverlayTrigger>
//             </Row>
//         </Row>
//     </Form >
// {
//     showMoadl && <AddTable />
// }
