// import { faArrowAltCircleLeft, faArrowAltCircleRight, faArrowCircleLeft, faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

import Img1 from "../../../assets/img/nody-تبدیل-عکس-به-فرمت-jpg-با-گوشی-1628749763.jpg";
import Img2 from "../../../assets/img/31203.jpg";
import Img3 from "../../../assets/img/ZMBC10.jpg";
import Img4 from "../../../assets/img/F1UJR2.jpg";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleCarousel = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const oprationSlider = () => {
    if (index === 0) {
      return (
        <>
          <h3 className="textPrimary fs-4 fw-bold">ایجاد درخواست</h3>
          <p className=" fitParaphSlider p-2 textPrimary lh-lg m-4 paraphFit">
            مبلغ وام، مدت بازپرداخت و نحوه استفاده از وام (فروشگاه تیمچه یا بام
            کارت) را انتخاب و درخواست وام خود را ثبت کنید. اگر در بانک آینده
            حساب ندارید، به‌ صورت آنلاین (با نرم‌افزار کیلید) یا حضوری مراحل
            افتتاح حساب را انجام دهید. ‌
            <br />
            <div className="d-flex align-items-center ">
              <span className="my-4 fw-bold text-primary">ثبت درخواست</span>
              {/* <FontAwesomeIcon className='me-4 font25 text-primary' icon={faArrowLeft} /> */}
            </div>
          </p>
        </>
      );
    }
    if (index === 1) {
      return (
        <>
          <h3 className="textPrimary fs-4 fw-bold">بارگذاری مدارک</h3>
          <p className=" fitParaphSlider p-2 textPrimary lh-lg m-4 paraphFit">
            حالا باید از طریق حساب کاربری خود، پیش‌پرداخت وامتان را واریز کنید و
            بعد از آن هم مدارک را بارگذاری کنید تا وارد مرحله اعتبارسنجی اولیه
            شوید. ثبت درخواست بارگذاری مدارک و واریز پیش‌پرداخت حالا باید از
            طریق حساب کاربری خود، پیش‌پرداخت وامتان را واریز کنید و بعد از آن هم
            مدارک را بارگذاری کنید تا وارد مرحله اعتبارسنجی اولیه شوید.‌
            <br />
            <div className="d-flex align-items-center ">
              <span className="my-4 fw-bold text-primary">بارگذاری مدرک</span>
              {/* <FontAwesomeIcon className='me-4 font25 text-primary' icon={faArrowLeft} /> */}
            </div>
          </p>
        </>
      );
    }
    if (index === 2) {
      return (
        <>
          <h3 className=" textPrimary fs-4 fw-bold">درخواست</h3>
          <p className=" fitParaphSlider p-2 textPrimary lh-lg m-4 paraphFit">
            مبلغ وام، مدت بازپرداخت و نحوه استفاده از وام (فروشگاه تیمچه یا بام
            کارت) را انتخاب و درخواست وام خود را ثبت کنید. اگر در بانک آینده
            حساب ندارید، به‌ صورت آنلاین (با نرم‌افزار کیلید) یا حضوری مراحل
            افتتاح حساب را انجام دهید. ‌
            <br />
            <div className="d-flex align-items-center ">
              <span className="my-4 fw-bold text-primary">ثبت درخواست</span>
              {/* <FontAwesomeIcon className='me-4 font25 text-primary' icon={faArrowLeft} /> */}
            </div>
          </p>
        </>
      );
    }
    if (index === 3) {
      return (
        <>
          <h3 className="fs-4 fw-bold textPrimary">
            بارگذاری مدارک و واریز پیش‌ پرداخت
          </h3>
          <p className="fitParaphSlider p-2 lh-lg m-4 paraphFit textPrimary">
            حالا باید از طریق حساب کاربری خود، پیش‌پرداخت وامتان را واریز کنید و
            بعد از آن هم مدارک را بارگذاری کنید تا وارد مرحله اعتبارسنجی اولیه
            شوید. ثبت درخواست بارگذاری مدارک و واریز پیش‌پرداخت حالا باید از
            طریق حساب کاربری خود، پیش‌پرداخت وامتان را واریز کنید و بعد از آن هم
            مدارک را بارگذاری کنید تا وارد مرحله اعتبارسنجی اولیه شوید.‌
            <br />
            <div className="d-flex align-items-center ">
              <span className="my-4 fw-bold text-primary">بارگذاری مدرک</span>
              {/* <FontAwesomeIcon className='me-4 font25 text-primary' icon={faArrowLeft} /> */}
            </div>
          </p>
        </>
      );
    }
  };

  return (
    <section>
      <br />
      <br />
      <div className="fitContainerSlider d-flex justify-content-center">
        <Container className="justify-content-center">
          <Row className="">
            <Col sm="12" md="12" xl="6">
              <Col md="12" className=" justify-content-center">
                <h1 className="fs-2 fw-bold textPrimary py-4 my-4">
                  {/* <FontAwesomeIcon className='font40  text-primary ms-3 ' icon={faCheck} /> */}
                  مراحل ارسال صورتحساب
                </h1>
              </Col>
              <Col className="p-0" md="12">
                <div className="py-3 px-4 rounded-4 bgGray d-flex justify-content-around">
                  <span
                    onClick={() => setIndex(0)}
                    className={`${
                      index === 0
                        ? "cursorPointer text-primary userSelect fw-bold bg-white rounded-4 p-3"
                        : "userSelect p-3 cursorPointer"
                    }`}
                  >
                    مرحله اول
                  </span>
                  <span
                    onClick={() => setIndex(1)}
                    className={`${
                      index === 1
                        ? "cursorPointer text-primary userSelect fw-bold bg-white rounded-4 p-3"
                        : "userSelect p-3 cursorPointer"
                    }`}
                  >
                    مرحله دوم
                  </span>
                  <span
                    onClick={() => setIndex(2)}
                    className={`${
                      index === 2
                        ? "cursorPointer text-primary userSelect fw-bold bg-white rounded-4 p-3"
                        : "userSelect p-3 cursorPointer"
                    }`}
                  >
                    مرحله سوم
                  </span>
                  <span
                    onClick={() => setIndex(3)}
                    className={`${
                      index === 3
                        ? "cursorPointer text-primary userSelect fw-bold bg-white rounded-4 p-3"
                        : "userSelect p-3 cursorPointer"
                    }`}
                  >
                    مرحله چهارم
                  </span>
                </div>
                <div className="my-4 ">{oprationSlider()}</div>
              </Col>
            </Col>
            <Col sm="12" md="12" xl="6" className="mt-4">
              <Carousel
                className="rounded-pill mx-2 mt-4"
                activeIndex={index}
                onSelect={handleCarousel}
              >
                <Carousel.Item>
                  <img
                    alt="First slide"
                    className="d-block w-100"
                    src={String(Img1)}
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={String(Img2)}
                    alt="Second slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={String(Img3)}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={String(Img4)}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Slider;
