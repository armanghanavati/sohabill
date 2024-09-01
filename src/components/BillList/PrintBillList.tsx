import React, { ReactNode, useEffect, useRef } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { handlePrintBill } from '../../common/slices/taxSlice'
import { HookForm } from '../../models/AllData.model'
import { useReactToPrint } from 'react-to-print'

type Props = {
    componentRef: any;
    // id: number;
}

const PrintBillList: React.FC<Props> = ({ componentRef }) => {
    const { tax, account } = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    // شماره منحصر به فرد مالیاتی:
    //  شماره منحصر به فرد مالیاتی صورتحساب مرجع:

    // useEffect(() => {
    //     dispatch(handlePrintBill(id))
    // }, [id])

    return (
        <>
            <div ref={componentRef} >
                <Container style={{ fontSize: "11px" }} className='' fluid>
                    <Row className='d-flex  justify-content-center' >
                        <Col xl="4" className=''>
                            <span className='border rounded-1 border-1 py-2 font11 me-1 d-flex justify-content-center font20 px-1 fw-bold ms-1'>
                                صورتحساب الکترونیکی نوع اول
                            </span>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col xl="4" lg="4" md="4" className='mb-4'>
                            <span className='font11 me-1   ms-1' >
                                شماره منحصر به فرد مالیاتی:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.taxId}
                            </span>
                        </Col>
                        <Col xl="3" lg="3" md="4" className=''>
                            <span className='font11 me-1  ms-1'>
                                شماره منحصر به فرد مالیاتی صورتحساب مرجع:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.referenceTaxId}
                            </span>
                        </Col>
                        <Col xl="3" lg="3" md="4" className='mb-4'>
                            <span className='font11 me-1  ms-1'>
                                شماره صورتحساب داخلی:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.billSerial}
                            </span>
                        </Col>
                        <Col xl="3" lg="3" md="4" className='mb-4'>
                            <span className='font11 me-1  ms-1'>
                                تاریخ وزمان صدور صورتحساب الکترونیکی:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.issueDate}
                            </span>
                        </Col>
                        <Col xl="4" md="4" className=''>
                            <span className='font11 me-1  ms-1'>
                                تاریخ و زمان ایجاد صورتحساب الکترونیکی:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.createDate}

                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" className='border border-2 fw-bold py-1 bg-light my-2 d-flex justify-content-center' >
                            <span className="font11 me-1" >
                                مشخصات فروشنده
                            </span>
                        </Col>
                        <Col className="my-2" md="4" xl="3">
                            <span className="font11 me-1" >
                                شماره اقتصادی:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.economicCode}
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4">
                            <span className="font11 me-1" >
                                شماره/شناسه ملی:
                            </span>
                            <span className='font11 me-1' >
                                {/* personCode */}
                                {tax?.printBill?.nationalCode}
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4">
                            <span className="font11 me-1" >
                                کد شعبه:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.sellerBranchCode}
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                کد پستی:
                            </span>
                            <span className='font11 me-1' >
                                ----------
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                نام شخص حقیقی/حقوقی:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.fullname}
                            </span>
                        </Col>

                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                نام بنگاه اقتصادی:
                            </span>
                            <span className='font11 me-1' >
                                ----
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                شناسه یکتای ثبت قرارداد:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.registrationNumber}
                            </span>
                        </Col>
                        {/* <Col className="my-2" xl="3" >
                        <span className="font11 me-1" >
                            تاریخ کوتاژاظهارنامه گمرکی:
                        </span>
                        <span className='font11 me-1' >
                            CotageDate
                        </span>
                    </Col> */}
                        {/* <Col className="my-2" xl="3" >
                        <span className="font11 me-1" >
                            شماره کوتاژاظهارنامه گمرکی:
                        </span>
                        <span className='font11 me-1' >
                            CotageNumber
                        </span>
                    </Col> */}
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                شماره پروانه گمرکی:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.customsLicenseNumber}
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                کد گمرک محل اظهار:
                            </span>
                            <span className='font11 me-1' >
                                {tax?.printBill?.customsCode}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" className='border border-2 fw-bold py-1 bg-light my-2 d-flex justify-content-center' >
                            <span className="font11 me-1" >
                                مشخصات خریدار
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col xl="2" className=''>
                        <span className='font11 me-1 ms-1'>
                            نوع پرواز:
                        </span>
                        <span className='font11 me-1'>
                            {tax?.billItem?.bill?.FlightType}
                        </span>
                    </Col> */}
                        <Col xl="4" md="4" className=''>
                            <span className='font11 me-1 ms-1'>
                                شماره اقتصادی:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.buyerPersonEconomicCode}
                            </span>
                        </Col>
                        <Col md="4" xl="3" className="my-2">
                            <span className="font11 me-1" >
                                شماره/شناسه ملی:
                            </span>
                            <span className='font11 me-1' >
                                {/* personCode */}
                                {tax?.printBill?.buyerPersonNationalId}
                            </span>
                        </Col>
                        <Col md="4" xl="4" className=''>
                            <span className='font11 me-1 ms-1'>
                                کد پستی:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.buyerPersonPostalCode}
                            </span>
                        </Col>

                        {/* <Col xl="4" className=''>
                        <span className='font11 me-1 ms-1'>
                            شماره اشتراک/شناسه قبض بهره بردار:
                        </span>
                        <span className='font11 me-1'>
                            SubscriptionNumber
                        </span>
                    </Col> */}
                        {/* <Col xl="4" className=''>
                        <span className='font11 me-1 ms-1'>
                            شماره گذرنامه:
                        </span>
                        <span className='font11 me-1'>
                            passportNumber
                        </span>
                    </Col> */}
                        <Col xl="4" md="4" className=''>
                            <span className='font11 me-1 ms-1'>
                                کد شعبه:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.buyerPersonBranchCode}
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                نام شخص حقیقی/حقوقی:
                            </span>
                            <span className='font11 me-1'>
                                {tax?.printBill?.buyerPersonFullName}
                            </span>
                        </Col>
                        <Col className="my-2" xl="3" md="4" >
                            <span className="font11 me-1" >
                                نام بنگاه اقتصادی:
                            </span>
                            <span className='font11 me-1' >
                                {/* {tax?.printBill?.buyerPersonFullName} */}
                                ----------------------
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" className='border border-2 fw-bold py-1 bg-light my-2 d-flex justify-content-center' >
                            <span className="font11" >
                                مشخصات کالا یا خدمات مورد معامله
                            </span>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive size="sm" className="mt-4">
                        <thead>
                            <tr>
                                <th className="font11 bg-secondary text-center text-white fw-normal">ردیف</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">شناسه کالا/خدمت</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">شرح کالا/خدمت</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">واحد اندازه گیری</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">تعداد/مقدار</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">مبلغ واحد(ریال/ارز)</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">نوع ارز</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">مبلغ تخفیف</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">نرخ مالیات بر ارزش افزوده</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">مبلغ مالیات بر ارزش افزوده</th>
                                <th className="font11 bg-secondary text-center text-white fw-normal">مبلغ کل کالا/خدمت</th>
                            </tr>
                        </thead>
                        <tbody style={{ verticalAlign: "center" }} className="text-center">
                            {tax?.printBill?.billItems?.map((item: any, index: number) => {
                                return (
                                    <>
                                        <tr key={index + 1}>
                                            <td className='font11' >{index + 1}</td>
                                            <td className="font11 fitTable">
                                                {item?.serviceOrProductId}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.description}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.measurementUnit}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.count}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.unitPrice}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.currencyType}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.discount}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.valueIncreasedTaxRate}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.valueIncreasedTaxPrice}
                                            </td>
                                            <td className="font11 fitTable">
                                                {item?.totalItemPrice}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="" colSpan={8}></td>
                                            <td className="font11 fitTable bg-secondary text-white fw-normal">
                                                جمع کل:
                                            </td>
                                            <td className="fitTable bg-secondary text-white fw-normal font11" >
                                                {tax?.printBill?.totalValueIncreasedTaxPrice}
                                            </td>
                                            <td className="fitTable bg-secondary text-white fw-normal font11" >
                                                {tax?.printBill?.totalCost}
                                            </td>
                                        </tr>
                                    </>
                                );
                            }
                            )
                            }
                        </tbody>
                    </Table>
                    <Row>
                        <Col xl="6" className='' >
                            <Table bordered hover responsive size="sm" className="">
                                <thead>
                                    <tr>
                                        <th className="font11  bg-secondary text-end text-white fw-normal">مبلغ نهایی:</th>
                                        <th className="font11 bg-white text-end text-dark fw-normal">{` ${tax?.printBill?.totalCost} ${tax?.printBill?.totalCostPersianWord} ریال`}</th>
                                        <th className="font11  bg-secondary text-end text-white fw-normal">مالیات موضوع 17:</th>
                                        <th className="font11 bg-white text-end text-dark fw-normal">{tax?.printBill?.taxArticle17}</th>
                                    </tr>
                                </thead>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="6" className='' >
                            <Table bordered hover responsive size="sm" className="">
                                <thead>
                                    <tr>
                                        <th className="font11 bg-secondary text-end text-white fw-normal">روش تسویه</th>
                                        <th className="font11 bg-secondary text-end text-white fw-normal">مبلغ پرداختی نقدی بدون احتساب ارزش افزوده</th>
                                        <th className="font11 bg-secondary text-end text-white fw-normal">مبلغ نسیه بدون احتساب ارزش افزوده</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fitTable text-dark fw-normal font11'>{tax?.printBill?.settelmentType}</td>
                                        <td className='fitTable text-dark fw-normal font11'>{tax?.printBill?.cashPrice}</td>
                                        <td className='fitTable text-dark fw-normal font11'>{tax?.printBill?.creditPrice}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container >
            </div>
        </>
    )
}

export default PrintBillList;