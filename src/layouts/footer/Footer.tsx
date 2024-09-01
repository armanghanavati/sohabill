// import { faCamera, faEnvelope, faInstitution, faMessage, faPaperPlane, faVoicemail } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <>
            <Container>
                <br />
                <Row className='bgDarkPrimary text-white rounded-4 p-4 my-4 mx-1  justify-content-around' >
                    <Col className='fs-6 fw-bold text-white d-flex justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-xl-start align-items-center ' sm="12" md="12" xl="6">
                        تماس با ما:
                        <span className='me-3 text-white' >
                            4945 944 021
                        </span>
                    </Col>
                    <Col className='text-white fw-bold justify-content-between justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-xl-start align-items-center ' sm="12" md="12" xl="6" >
                        <Row>
                            <Col className='d-flex align-items-center justify-content-center py-4 ' sm="12" md="6" xl="6" >
                                ارتباط با ما در شبکه های اجتماعی:
                            </Col>
                            <Col className='d-flex justify-content-center' sm="12" md="6" xl="6" >
                                <i className="ms-4 mt-2 font45 bi bi-instagram" />
                                <i className="ms-4 mt-2 font45 bi bi-twitter" />
                                <i className="ms-4 mt-2 font45 bi bi-linkedin" />
                                {/* <FontAwesomeIcon className='mt-3 font45' icon={faPaperPlane} /> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md="3" className=' mt-4 text-end ' >
                        <Col className='fw-bold fs-5 textPrimary' >
                            راهنمای مشتریان
                        </Col>
                        <hr className="textPrimary" />
                        <Col className='textPrimary fw-lighter font12 mt-4'>
                            آموزش تصویری
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            مدارک لازم
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            محاسبه اقساط
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            آموزش تصویری دریافت وام
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            محاسبه اقساط
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            راهنمای امضای الکترونیکی
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            نمره اعتبار
                        </Col>
                        <Col className='mt-4 textPrimary fw-lighter font12'>
                            آموزش تصویری دریافت وام
                        </Col>
                    </Col>

                    <Col md="3" className='mt-4 text-end ' >
                        <Col className='fw-bold fs-5 textPrimary' >
                            ارتباط با ما
                        </Col>
                        <hr className="textPrimary" />
                        <Col className='mt-4 font12 textPrimary'>
                            درباره ما
                        </Col>
                        <Col className='mt-4 font12 textPrimary'>
                            محاسبه اقساط
                        </Col>
                        <Col className='mt-4 font12 textPrimary'>
                            راهنمای امضای الکترونیکی
                        </Col>
                        <Col className='mt-4 font12 textPrimary'>
                            نمره اعتبار
                        </Col>
                        <Col className='mt-4 font12 textPrimary'>
                            فرهنگ ما
                        </Col>
                    </Col>

                </Row>
                <hr />
            </Container >
            <Col xl="12">
                <p className='p-2 mb-0 bgGray textPrimary d-flex justify-content-center' > کلیه حقوق این سایت متعلق به شرکت هوشمند رهیافت داده پردازی (ارکا) است.
                    Copyrights - Arka Co. - 1402
                </p>
            </Col>
        </>
    )
}

export default Footer;