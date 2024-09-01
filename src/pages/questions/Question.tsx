import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { questionsData } from "../../message/questions";
import Header from "../../layouts/header/NavBar";
import { Link } from "react-router-dom";
import Footer from "../../layouts/footer/Footer";

const Questions: React.FC = () => {
  return (
    <>
      <Container className="mt-4 bgWhitePrimary" fluid>
        <Row className="d-flex  justify-content-center p-4">
          <Col xl="11" className="d-flex justify-content-center mt-4">
            <h1 className=" fs-1 fw-bold textPrimary py-4 mt-4 justify-content-center d-flex ">
              سوالات متداول
            </h1>
          </Col>
          <br />
          <Col xs="12" sm="12" md="12" xl="7" className="mb-4">
            <Row className=" bg-light d-flex py-4 px-2 my-4  rounded-4 justify-content-center">
              <Accordion defaultActiveKey="0">
                <Col xs="12" xl="12" className="rounded my-2">
                  <Accordion.Item
                    style={{ transform: "scale(-1, 1)", direction: "ltr" }}
                    eventKey="0"
                  >
                    <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                      <span
                        className="text-dark"
                        style={{ transform: "scale(-1, 1)" }}
                      >
                        شناسه کالا/خدمت چیست؟ از چه مرجعی قابل دریافت است؟
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ transform: "scale(-1, 1)", direction: "rtl" }}
                      className="textJustify mx-2 lh-lg textPrimary"
                    >
                      {`  
                                        شناسه کالا/خدمت یک شماره 13 رقمی است که به کالا/خدمت تخصیص داده می‌شود. به ازای هر ردیف در صورتحساب الکترونیک صادره توسط مؤدیان، درج شناسه کالا/خدمت الزامی است.
                                        کلیه تولیدکنندگان، واردکنندگان، بازرگانان و ارائه دهندگان خدمت مکلف به دریافت شناسه مذکور از وزارت صنعت، معدن و تجارت هستند. همچنین کلیه شناسه‌های کالا/خدمت تخصیص داده‌شده، از طریق نشانی `}
                      <Link to="https://stuffid.tax.gov.ir/">
                        Stuffid.tax.gov.ir
                      </Link>
                      {`قابل دریافت است. برای دریافت شناسه کالا/خدمت می‌توان از طریق نمایندگی‌های مرکز ملی شماره‌گذاری کالا و خدمات که لیست اسامی و مشخصات تماس آن‌ها در آدرس`}
                      <Link to="https://www.irancode.ir/CMS/Colleagues/Colleagues">
                        https://www.irancode.ir/ CMS/Colleagues/Colleagues
                      </Link>
                      {`ارائه شده است اقدام کنید.`}
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
                <Col xs="12" xl="12" className="rounded my-2">
                  <Accordion.Item
                    style={{ transform: "scale(-1, 1)", direction: "ltr" }}
                    eventKey="1"
                  >
                    <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                      <span
                        className="text-dark"
                        style={{ transform: "scale(-1, 1)" }}
                      >
                        درصورتی که به هر دلیل امکان اخذ شناسه کالا/خدمت برای
                        مؤدیان فراهم نباشد، چه راهکاری در نظر گرفته شده است؟
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ transform: "scale(-1, 1)", direction: "rtl" }}
                      className="textJustify mx-2 lh-lg textPrimary"
                    >
                      شناسه کالا/خدمت قابل پذیرش از سوی سامانه مودیان در درگاه
                      stuffid.tax.gov.ir ارائه شده است. کلیه تولیدکنندگان،
                      واردکنندگان و ارائه‌دهندگان خدمت مکلف به دریافت شناسه
                      مذکور از وزارت صنعت، معدن و تجارت بوده و مادامی که شناسه
                      کالا/ خدمت اختصاصی برای کالاها و خدمات مورد نظر فراهم نشده
                      باشد یا در درگاه بیان شده درج نشده است، می‌توانند از شناسه
                      کالا/خدمت عمومی برای صدور صورتحساب الکترونیکی استفاده
                      نمایند.
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
                <Col xl="12" className="rounded my-2">
                  <Accordion.Item
                    style={{ transform: "scale(-1, 1)", direction: "ltr" }}
                    eventKey="2"
                  >
                    <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                      <span
                        className="text-dark"
                        style={{ transform: "scale(-1, 1)" }}
                      >
                        مؤدیانی که کلیه تکالیف قانونی خود را انجام می‌دهند، آیا
                        الزامی به ارسال اطلاعات معاملات فصلی موضوع ماده
                        169دارند؟
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ transform: "scale(-1, 1)", direction: "rtl" }}
                      className="textJustify mx-2 lh-lg textPrimary"
                    >
                      طبق مقررات ماده (7) قانون پایانه‌های فروشگاهی و سامانه
                      مودیان، ارسال صورتحساب‌های الکترونیکی به سامانه مودیان به
                      منزله ثبت آن در سامانه فهرست معاملات موضوع ماده (169)
                      قانون مالیات‌های مستقیم بوده و فروشنده و خریدار تکلیف
                      اضافی در این خصوص نخواهند داشت. بدیهی است مودیان مکلفند
                      بابت کلیه معاملات خود که در سامانه مودیان درج نمی‌شود،
                      مقررات ماده(169) قانون مالیات‌های مستقیم را در ارائه آمار
                      معاملات فصلی ظرف مهلت مقرر، رعایت نمایند.{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
                <Col xl="12" className="rounded my-2">
                  <Accordion.Item
                    style={{ transform: "scale(-1, 1)", direction: "ltr" }}
                    eventKey="3"
                  >
                    <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                      <span
                        className="text-dark"
                        style={{ transform: "scale(-1, 1)" }}
                      >
                        روش ارسال صورتحساب الکترونیکی توسط سامانه سها در کدام
                        دسته از روش‌های ارسال قرار می‌گیرد؟
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ transform: "scale(-1, 1)", direction: "rtl" }}
                      className="textJustify mx-2 lh-lg textPrimary"
                    >
                      سامانه پایانه فروشگاهی سها به دو روش می‌تواند صورتحساب‌های
                      الکترونیک مؤدیان را به کارپوشه آن‌ها در سامانه مؤدیان
                      ارسال نماید. روش اول: مؤدیان می‌توانند صورتحساب‌های خود را
                      در بستر رابط کاربری سامانه مذکور ثبت نموده و سها
                      صورتحساب‌ها را از طریق کلید مؤدی با روش ارسال مستقیم به
                      کارپوشه سامانه مؤدیان ارسال نماید. روش دوم: اگر مؤدیان با
                      شرکت‌های معتمد همکاری نموده و قصد ارسال صورتحساب‌های
                      الکترونیک خود را از طریق شرکت معتمد دارند، سامانه سها
                      می‌تواند صورتحساب‌های مؤدیان را به قالب‌های ارسالی
                      شرکت‌های معتمد تبدیل کرده و در اختیار شرکت معتمد طرف
                      قرارداد مودی قرار دهد.
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
                <Col xl="12" className="rounded my-2">
                  <Accordion.Item
                    style={{ transform: "scale(-1, 1)", direction: "ltr" }}
                    eventKey="4"
                  >
                    <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
                      <span
                        className="text-dark"
                        style={{ transform: "scale(-1, 1)" }}
                      >
                        در روش ارسال مستقیم صورتحساب از طریق سامانه سها چه
                        نیازمندی‌هایی وجود دارد؟
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ transform: "scale(-1, 1)", direction: "rtl" }}
                      className="textJustify mx-2 lh-lg textPrimary"
                    >
                      در گام اول، مؤدیان باید از بخش ثبت‌نام، نسبت به ایجاد نام
                      کاربری و رمز عبور خود و تکمیل سایر اطلاعات مرتبط اقدام
                      نمایند. در گام بعدی، سامانه سها کلید خصوصی و عمومی مؤدیان
                      را تولید و در اختیار آن‌ها قرار می‌دهد. در این مرحله
                      مؤدیان می‌بایست نسبت به دریافت شناسه یکتای حافظه مالیاتی
                      با روش ارسال مستقیم اقدام نموده و کلید عمومی خود را در
                      کارپوشه مؤدیان بارگذاری نمایند. سپس شناسه یکتای حافظه
                      مالیاتی دریافت‌شده را در بخش «مشخصات مالیاتی» در سامانه
                      سها درج نمایند.
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
              </Accordion>
            </Row>
          </Col>
          <br />
          <br />
          <br />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Questions;
