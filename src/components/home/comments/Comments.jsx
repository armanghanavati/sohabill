import React from "react"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const Comments = () => {
    return (
        <>
            <br />
            <br />
            <Container >
                <div className='mt-4 d-flex justify-content-center'>
                    <Col className='shadow bg-white p-4  rounded-4' xs="12" sm="12" lg="12" md="10" xl="4"  >
                        <Form className='' >
                            <div>
                                <Form.Label className='mb-2' > نام: </Form.Label>
                                <Form.Control className='mb-3' />
                                <Form.Label className='mb-2' > آدرس الکترونیکی: </Form.Label>
                                <Form.Control className='mb-3' />
                                <Form.Label className='mb-2' > نظر: </Form.Label>
                                <Form.Control className='mb-2' as="textarea" rows={4} />
                                <div className='row mb-4 justify-content-center ' >
                                    <button className='rounded-3 btn bgDarkPrimary text-white border border-1 py-2 mt-3' >
                                        ارسال نظر
                                    </button>
                                </div>
                            </div>
                        </Form >
                    </Col>
                </div >
            </Container >
            <br />
        </>
    )
}

export default Comments;


// <Container fluid className='vh-100'>
//     <div className='bgGray d-flex justify-content-center align-items-center' >
//         <Col sm="8" md="8" xl="3" className='m-auto bg-white p-4 rounded-4 md-8 col-xl-3' >
//             <Form className='bg-white' onSubmit={handleSubmit(submitData)} >
//                 <Row className='d-flex justify-content-center' >
//                     <Col sm="12" md="12" xl="12">
//                         <Form.Label> نام کاربری: </Form.Label>
//                         <Form.Control {...register("userName")} className='mb-4' />
//                     </Col>
//                 </Row>
//                 <Row className='d-flex justify-content-center'>
//                     <Col sm="12" md="12" xl="12">
//                         <Form.Label> ایمیل: </Form.Label>
//                         <Form.Control {...register("email")} type='email' className='mb-4' />
//                     </Col>
//                 </Row>
//                 <Row className='mb-4 d-flex '>
//                     <Col sm="6" md="6" xl="6">
//                         <Form.Label> جنسیت: </Form.Label>
//                         <Select {...register("gender", { pattern: { value: "" }, min: { message: "حداقل باید 2 حرف باشد" } })} options={itemGender} placeholder="انتخاب کنید" />
//                     </Col>
//                     <Col sm="6" md="6" xl="6">
//                         <Form.Label> تاریخ تولد: </Form.Label>
//                         <Controller
//                             control={control}
//                             name="date"
//                             rules={{ required: true }} //optional
//                             render={({
//                                 field: { onChange, name, value },
//                                 fieldState: { invalid, isDirty }, //optional
//                                 formState: { errors }, //optional, but necessary if you want to show an error message
//                             }) => (
//                                 <>
//                                     <DatePicker
//                                         value={value || ""}
//                                         onChange={(date) => {
//                                             onChange(date?.isValid ? date : "");
//                                         }}
//                                         format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
//                                         calendar="persian"
//                                         locale="fa"
//                                         calendarPosition="bottom-right"
//                                     />
//                                     {/* {errors && errors[name] && errors[name].type === "required" && (<span>your error message !</span>)} */}
//                                 </>
//                             )}
//                         />
//                     </Col>
//                 </Row>
//                 <Row className='d-flex justify-content-center'>
//                     <Col className='positionRelative' sm="12" md="12" xl="12">
//                         <Form.Label> رمز عبور: </Form.Label>
//                         <Form.Control type={showPass ? "text" : "password"} className='mb-4' />
//                         {/* <i onClick={() => setShowPass(!showPass)} className={`${showPass ? "cursorPointer bi bi-eye-slash-fill fitShowPass text-secondary font25" : "cursorPointer  bi bi-eye-fill fitShowPass text-secondary font25"} `} /> */}
//                     </Col>
//                     {/* {errors.userName && <span className='text-danger font12'> {errors.userName.message} </span>} */}
//                 </Row>
//                 <Row className='d-flex justify-content-center'>
//                     <Col sm="12" md="12" xl="12" className='positionRelative'>
//                         <Form.Label> تکرار رمز عبور: </Form.Label>
//                         <Form.Control type={showConfPass ? "text" : "password"} className='mb-4' />
//                         {/* <i onClick={() => setShowConfPass(!showConfPass)} className={`${showConfPass ? "cursorPointer bi bi-eye-slash-fill fitShowPass text-secondary font25" : "cursorPointer  bi bi-eye-fill fitShowPass text-secondary font25"} `} /> */}
//                     </Col>
//                     {/* {errors.userName && <span className='text-danger font12'> {errors.userName.message} </span>} */}
//                 </Row>
//                 <Col sm="12" md="12" xl="12" >
//                     <Button className='text-white rounded-4 w-100 border border-none bgDarkPrimary fs-6 p-2' variant='info' > تایید </Button>
//                 </Col>
//             </Form>
//         </Col>
//     </div>
// </Row>
// </Container >