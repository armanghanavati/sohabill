import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SelectOption, SignUpAccount } from "../../models/AllData.model";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../common/InputText";
import ComboBox from "../../common/ComboBox";
import Datepicker from "../../common/DatePicker";
import { RsetShowToast } from "../../common/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Btn from "../../common/Btn";
import { handleCreateAccount } from "../../common/slices/accountSlice";
import SignUpFields from "./SignUpFields";
import { getUserTypes } from "../../services/masterServices";
import logo from "../../assets/img/nature-logo1.png";

const SignUp: React.FC = ({}) => {
  const [userType, setUserType] = useState<SelectOption[]>([]);
  const { main, account } = useAppSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<SignUpAccount>({ reValidateMode: "onChange" });
  const validateCode = watch("personTypeId")?.id;

  const submitData = (data: SignUpAccount) => {
    console.log(data?.username);
    dispatch(handleCreateAccount({ data: data, navigate }));
  };

  // handle get User Types
  const handleGetUserTypes = async () => {
    try {
      const resUserTypes = await getUserTypes();
      if (resUserTypes?.data?.code === 0) {
        setUserType(resUserTypes?.data?.result);
      } else {
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  useEffect(() => {
    handleGetUserTypes();
  }, []);

  return (
    <Container fluid className=" vh-100">
      <Row className=" vh-100">
        <div className="w-100 bgGray d-flex justify-content-center align-items-center">
          <Col
            sm="10"
            md="6"
            lg="5"
            xl="4"
            className="my-4 shadow bg-white p-4 rounded-4 md-8 col-xl-3"
          >
            <Row className="my-2 mb-4 d-flex justify-content-center">
              <div className="mb-2 d-flex justify-content-center">
                <Link className="" to="/">
                  <img
                    width={100}
                    height={100}
                    className="imageLogin"
                    src={String(logo)}
                  />
                </Link>
              </div>
            </Row>
            <SignUpFields
              userType={userType}
              control={control}
              handleSubmit={handleSubmit}
              errors={errors}
              watch={watch}
              getValues={getValues}
              submitData={submitData}
            />
            <Row className="mt-4 d-flex">
              <Col sm="12" md="12" xl="12" className="">
                <p className=" font12 d-flex align-items-center justify-content-center">
                  ثبت نام کرده ام
                  <Link className="text-decoration-none" to="/logIn">
                    <span className="me-2 text-primary">ورود </span>
                  </Link>
                </p>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default SignUp;
