import React from "react";
import { Col, Container, Row, Form, Accordion } from "react-bootstrap";
import {
  selectListPay,
  selectPersonBuyer,
} from "../../../common/slices/taxSlice";
import { useAppSelector } from "../../../hooks/hook";
import Loading from "../../../common/Loading";
import MessageModal from "../../../common/MessageModal";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
import StringHelpers from "../../../helpers/string-helpers";
// import DatePicker from'react-datepicker';

type Props = {
  getValues?: any;
  myRef?: any;
};

// const ChildComponent: React.FC<{}> = ({ myRef }) => {
const Sixth: React.FC<Props> = ({ getValues, myRef }) => {
  const { main, tax } = useAppSelector((state) => state);
  const personBuyer = useAppSelector(selectPersonBuyer);

  const dataValues = getValues();

  console.log(dataValues);

  return (
    <>
      <Row className="mt-4">
        <Col
          xs="6"
          sm="5"
          md="4"
          lg="3"
          xl="2"
          className="mb-2 fw-bold d-flex justify-content-center rounded-start-pill bgSuccessWhite text-white p-4"
        >
          تایید نهایی
        </Col>
      </Row>
      <div ref={myRef}>
        <Container fluid>
          <Form className="mt-4 me-4">
            <Row>
              {/* مشخصات صورتحساب */}
              {tax?.patternTypeId?.billType?.title !== undefined && (
                <div className="d-flex justify-content-between">
                  <span
                    style={{ backgroundColor: "rgb(124 153 210)" }}
                    className="d-flex justify-content-end shadow p-3 rounded-pill text-white "
                  >
                    مشخصات صورتحساب
                  </span>
                  <hr className="mt-4 col-xl-9 col-md-8 col-sm-5" />
                </div>
              )}
              {tax?.patternTypeId?.billType?.title !== undefined && (
                <Col md="4" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> نوع صورتحساب:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {tax?.patternTypeId?.billType?.title}
                  </span>
                </Col>
              )}
              {tax?.patternTypeId?.billPattern?.title !== undefined && (
                <Col md="4" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> الگو صورتحساب:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {tax?.patternTypeId?.billPattern?.title}
                  </span>
                </Col>
              )}
              {dataValues?.settlementType?.title !== undefined && (
                <Col md="4" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> روش تسویه:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {dataValues?.settlementType?.title}
                  </span>
                </Col>
              )}
              {dataValues?.issueDate && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold">تاریخ صورتحساب: </span>
                  <span className="text-secondary me-1 ">
                    {typeof dataValues?.issueDate === "object"
                      ? StringHelpers?.convertDatePer(dataValues?.issueDate)
                      : dataValues?.issueDate}
                  </span>
                </Col>
              )}
              {dataValues?.creditPrice !== undefined && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold">مبلغ نسيه:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {dataValues?.creditPrice}
                  </span>
                </Col>
              )}
              {dataValues?.billSerial !== undefined && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> شماره صورتحساب:</span>
                  <span className="text-secondary me-1 ">
                    {dataValues?.billSerial}
                  </span>
                </Col>
              )}

              {/* اطلاعات خریدار */}
              {!!(
                tax?.allFieldSteps?.rowPersonBuyer?.personCode ||
                tax?.allFieldSteps?.editBillItem?.buyerPersonId?.id
              ) && (
                <div className="d-flex justify-content-between">
                  <span
                    style={{ backgroundColor: "rgb(124 153 210)" }}
                    className="d-flex justify-content-end shadow p-3 rounded-pill text-white "
                  >
                    اطلاعات خریدار
                  </span>
                  <hr className="mt-4 col-xl-10 col-md-8 col-sm-5" />
                </div>
              )}
              {(!!tax?.allFieldSteps?.rowPersonBuyer?.firstName &&
                !!tax?.allFieldSteps?.rowPersonBuyer?.lastName) ||
                (!!tax?.allFieldSteps?.editBillItem?.buyerPersonId?.firstName &&
                  !!tax?.allFieldSteps?.editBillItem?.buyerPersonId
                    ?.lastName && (
                    <Col md="12" xl="4" className="my-4 d-flex mx-3">
                      <span className="text-dark fw-bold">
                        {" "}
                        نام و نام خانوادگی:
                      </span>
                      <span className="text-secondary me-1 ">
                        {`${
                          tax?.allFieldSteps?.rowPersonBuyer?.firstName ||
                          tax?.allFieldSteps?.editBillItem?.buyerPersonId
                            ?.firstName
                        } ${
                          tax?.allFieldSteps?.rowPersonBuyer?.lastName ||
                          tax?.allFieldSteps?.editBillItem?.buyerPersonId
                            ?.lastName
                        }`}
                      </span>
                    </Col>
                  ))}
              {tax?.allFieldSteps?.rowPersonBuyer?.personCode !== undefined ||
                (!!tax?.allFieldSteps?.editBillItem?.buyerPersonId
                  ?.personCode && (
                  <Col md="12" xl="4" className="my-4 d-flex mx-3">
                    <span className="text-dark fw-bold">
                      {" "}
                      شناسه ملی / شماره ملی:
                    </span>
                    <span className="text-secondary me-1 ">
                      {" "}
                      {tax?.allFieldSteps?.rowPersonBuyer?.personCode ||
                        tax?.allFieldSteps?.editBillItem?.buyerPersonId
                          ?.personCode}
                    </span>
                  </Col>
                ))}
              {tax?.allFieldSteps?.rowPersonBuyer?.economicCode !==
                undefined && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> کد اقتصادی خریدار:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {tax?.allFieldSteps?.rowPersonBuyer?.economicCode}
                  </span>
                </Col>
              )}
              {tax?.allFieldSteps?.rowPersonBuyer?.postCode !== undefined && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> کد پستی خریدار:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {tax?.allFieldSteps?.rowPersonBuyer?.postCode}
                  </span>
                </Col>
              )}
              {tax?.allFieldSteps?.rowPersonBuyer?.personTypeDescription !==
                undefined && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> نوع شخص خریدار:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {tax?.allFieldSteps?.rowPersonBuyer?.personTypeDescription}
                  </span>
                </Col>
              )}

              {/* ------------------------------*/}

              {/* کالا / خدمت*/}
              {!!(
                tax?.allFieldSteps?.step3?.count || tax?.productList[0]?.count
              ) && (
                <>
                  <div className="d-flex justify-content-between">
                    <span
                      style={{ backgroundColor: "rgb(124 153 210)" }}
                      className="d-flex justify-content-end shadow p-3 rounded-pill text-white "
                    >
                      کالا / خدمت
                    </span>
                    <hr className="mt-4 col-xl-10 col-md-8 col-sm-5" />
                  </div>
                  <Row className="bg-light d-flex py-2 my-4 rounded-4 justify-content-center">
                    <Col xs="12" sm="12" md="12" xl="12" className=" ">
                      {tax?.productList?.map((item: any) => {
                        console.log(item);
                        return (
                          <Accordion defaultActiveKey="0">
                            <Col xs="12" xl="12" className="rounded my-2">
                              <Accordion.Item
                                style={{
                                  transform: "scale(-1, 1)",
                                  direction: "ltr",
                                }}
                                eventKey="0"
                              >
                                <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                                  <span
                                    className="text-dark headParaphFit"
                                    style={{
                                      transform: "scale(-1, 1)",
                                      textAlign: "end",
                                    }}
                                  >
                                    {` ردیف ${
                                      item?.settlementType ||
                                      item?.serviceOrProductDescription
                                    }`}
                                  </span>
                                </Accordion.Header>
                                <Accordion.Body
                                  style={{
                                    transform: "scale(-1, 1)",
                                    direction: "rtl",
                                  }}
                                  className="textJustify mx-2 lh-lg textPrimary"
                                >
                                  <Row>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {!!(
                                        item?.currencyCode?.title ||
                                        item?.currencyCode?.nameFa
                                      ) && (
                                        <>
                                          <span className="text-dark fw-bold">
                                            {" "}
                                            نوع ارز:
                                          </span>
                                          <span className="text-secondary me-1 ">
                                            {item?.currencyCode?.title ||
                                              item?.currencyCode?.nameFa}
                                          </span>
                                        </>
                                      )}
                                    </Col>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {item?.unitPrice !== undefined && (
                                        <>
                                          <span className="text-dark fw-bold">
                                            {" "}
                                            مبلغ واحد(ریال):
                                          </span>
                                          <span className="text-secondary me-1 ">
                                            {item?.unitPrice}
                                          </span>
                                        </>
                                      )}
                                    </Col>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {item?.count !== undefined && (
                                        <>
                                          <span className="text-dark fw-bold">
                                            {" "}
                                            تعداد/مقدار:
                                          </span>
                                          <span className="text-secondary me-1 ">
                                            {item?.count}
                                          </span>
                                        </>
                                      )}
                                    </Col>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {!!item?.PriceBeforeDiscount ||
                                        (!!item?.priceBeforeDiscount && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              مبلغ قبل از تخفیف:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.PriceBeforeDiscount ||
                                                item?.priceBeforeDiscount}
                                            </span>
                                          </>
                                        ))}
                                    </Col>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {!!item?.valueIncreasedTaxRate && (
                                        <>
                                          <span className="text-dark fw-bold">
                                            نرخ مالیات بر ارزش افزوده:
                                          </span>
                                          <span className="text-secondary me-1 ">
                                            {item?.valueIncreasedTaxRate}%
                                          </span>
                                        </>
                                      )}
                                    </Col>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {item?.measurementUnitCode?.title !==
                                        undefined && (
                                        <>
                                          <span className="text-dark fw-bold">
                                            {" "}
                                            واحد اندازه گیری:
                                          </span>
                                          <span className="text-secondary me-1 ">
                                            {item?.measurementUnitCode?.title}
                                          </span>
                                        </>
                                      )}
                                    </Col>
                                    <Col
                                      md="12"
                                      xl="4"
                                      className="my-4 d-flex mx-3"
                                    >
                                      {item?.totalItemsPrice !== undefined && (
                                        <>
                                          <span className="text-dark fw-bold">
                                            {" "}
                                            مبلغ کل کالا(ریال):
                                          </span>
                                          <span className="text-secondary me-1 ">
                                            {" "}
                                            {item?.totalItemsPrice}
                                          </span>
                                        </>
                                      )}
                                    </Col>
                                  </Row>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Col>
                          </Accordion>
                        );
                      })}
                    </Col>
                  </Row>
                </>
              )}
              {/* ------------------------------*/}
              {/* اطلاعات پرداخت*/}
              {tax?.allFieldSteps?.step4?.paymentDate !== undefined ||
                (!!tax?.listPay[0]?.paymentDate && (
                  <>
                    <div className="d-flex justify-content-between">
                      <span
                        style={{ backgroundColor: "rgb(124 153 210)" }}
                        className="d-flex justify-content-end shadow p-3 rounded-pill text-white "
                      >
                        اطلاعات پرداخت
                      </span>
                      <hr className="mt-4 col-xl-10 col-md-8 col-sm-5" />
                    </div>
                    <Row className="bg-light d-flex py-2 my-4 rounded-4 justify-content-center">
                      <Col xs="12" sm="12" md="12" xl="12" className="">
                        {tax?.listPay?.map((item, index) => {
                          return (
                            <Accordion defaultActiveKey="0">
                              <Col
                                key={index}
                                xs="12"
                                xl="12"
                                className="rounded my-2"
                              >
                                <Accordion.Item
                                  style={{
                                    transform: "scale(-1, 1)",
                                    direction: "ltr",
                                  }}
                                  eventKey="0"
                                >
                                  <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                                    <span
                                      className="text-dark headParaphFit"
                                      style={{
                                        transform: "scale(-1, 1)",
                                        textAlign: "end",
                                      }}
                                    >
                                      {` شماره پایانه ${item?.terminalNumber}`}
                                    </span>
                                  </Accordion.Header>
                                  <Accordion.Body
                                    style={{
                                      transform: "scale(-1, 1)",
                                      direction: "rtl",
                                    }}
                                    className="textJustify mx-2 lh-lg textPrimary"
                                  >
                                    <Row>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.acceptanceNumber !==
                                          undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              شماره پذیرنده فروشگاهی:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.acceptanceNumber}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.paidAmount !== undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              مبلغ پرداختی:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.paidAmount}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.payerCardNumber !==
                                          undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              شماره کارت پرداخت کننده صورتحساب:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.payerCardNumber}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.payerCodeNumber !==
                                          undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              شناسه ملی/کد فراگیر پرداخت کننده
                                              صورتحساب:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.payerCodeNumber}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.paymentDate !== undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              تاریخ و زمان پرداخت:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {typeof item?.paymentDate ===
                                              "object"
                                                ? StringHelpers?.convertDatePer(
                                                    item?.paymentDate,
                                                  )
                                                : item?.paymentDate}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.paymentSwitchNumber !==
                                          undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              شماره سوئیچ پرداخت:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.paymentSwitchNumber}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.paymentType?.title !==
                                          undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              روش پرداخت:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.paymentType?.title}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.terminalNumber !== undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              شماره پایانه:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.terminalNumber}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                      <Col
                                        md="12"
                                        xl="4"
                                        className="my-4 d-flex mx-3"
                                      >
                                        {item?.trackingNumber !== undefined && (
                                          <>
                                            <span className="text-dark fw-bold">
                                              {" "}
                                              شماره پیگیری/شماره مرجع:
                                            </span>
                                            <span className="text-secondary me-1 ">
                                              {item?.trackingNumber}
                                            </span>
                                          </>
                                        )}
                                      </Col>
                                    </Row>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Col>
                            </Accordion>
                          );
                        })}
                      </Col>
                    </Row>
                  </>
                ))}

              {/* ----------------------------------- */}
              {/* اطلاعات تکمیلی*/}

              <div className="d-flex justify-content-between">
                <span
                  style={{ backgroundColor: "rgb(124 153 210)" }}
                  className="d-flex justify-content-end shadow p-3 rounded-pill text-white "
                >
                  اطلاعات تکمیلی
                </span>
                <hr className="mt-4 col-xl-10 col-md-8 col-sm-5" />
              </div>
              {!!(
                dataValues?.sellerBranchCode ||
                tax?.allFieldSteps?.editBillItem?.sellerBranchCode
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> کد شعبه فروشنده:</span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {dataValues?.SsellerBranchCode ||
                      tax?.allFieldSteps?.editBillItem?.sellerBranchCode}
                  </span>
                </Col>
              )}
              {!!(
                dataValues?.customsLicenseNumber ||
                tax?.allFieldSteps?.editBillItem?.customsCode
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold">
                    {" "}
                    شماره پروانه گمرکي فروشنده:
                  </span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {dataValues?.customsLicenseNumber ||
                      tax?.allFieldSteps?.editBillItem?.customsLicenseNumber}
                  </span>
                </Col>
              )}
              {!!(
                dataValues?.customsCode ||
                tax?.allFieldSteps?.editBillItem?.customsCode
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold">
                    {" "}
                    کد گمرک محل اظهار فروشنده:
                  </span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {dataValues?.customsCode ||
                      tax?.allFieldSteps?.editBillItem?.CustomsCode}
                  </span>
                </Col>
              )}
              {!!(
                dataValues?.registrationNumber ||
                tax?.allFieldSteps?.editBillItem?.registrationNumber
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold">
                    {" "}
                    شناسه يکتاي ثبت قرارداد فروشنده:
                  </span>
                  <span className="text-secondary me-1 ">
                    {" "}
                    {dataValues?.registrationNumber ||
                      tax?.allFieldSteps?.editBillItem?.registrationNumber}
                  </span>
                </Col>
              )}
              {!!(
                dataValues?.article17TaxPrice ||
                tax?.allFieldSteps?.editBillItem?.article17TaxPrice
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex  mx-3">
                  <span className="text-dark fw-bold">
                    مالیات موضوع ماده 17:
                  </span>
                  <span className="text-secondary me-1 ">
                    {dataValues?.article17TaxPrice ||
                      tax?.allFieldSteps?.editBillItem?.article17TaxPrice}
                  </span>
                </Col>
              )}
              {!!(
                dataValues?.cotageDate ||
                tax?.allFieldSteps?.editBillItem?.cotageDate
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold">
                    {" "}
                    تاریخ کوتاژ اظهارنامه گمرکی:
                  </span>
                  <span className="text-secondary me-1 ">
                    {typeof dataValues?.cotageDate === "object"
                      ? StringHelpers?.convertDatePer(
                          dataValues?.cotageDate ||
                            tax?.allFieldSteps?.editBillItem?.cotageDate,
                        )
                      : dataValues?.cotageDate ||
                        tax?.allFieldSteps?.editBillItem?.cotageDate}
                  </span>
                </Col>
              )}
              {!!(
                tax?.allFieldSteps?.editBillItem?.flightType?.title ||
                dataValues?.flightType?.title
              ) && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> نوع پرواز:</span>
                  <span className="text-secondary me-1 ">
                    {dataValues?.flightType.title ||
                      tax?.allFieldSteps?.editBillItem?.flightType?.title}
                  </span>
                </Col>
              )}
              {!!tax?.allFieldSteps?.rowPersonBuyer?.buyerBranchCode && (
                <Col md="12" xl="4" className="my-4 d-flex mx-3">
                  <span className="text-dark fw-bold"> کد شعبه خریدار:</span>
                  <span className="text-secondary me-1 ">
                    {tax?.allFieldSteps?.rowPersonBuyer?.buyerBranchCode}
                  </span>
                </Col>
              )}
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Sixth;
