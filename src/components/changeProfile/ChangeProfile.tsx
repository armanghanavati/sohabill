import Header from "../../layouts/header/NavBar";
import Footer from "../../layouts/footer/Footer";
import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import {
  SelectOption,
  SignUpAccount,
  UpdateAccount,
} from "../../models/AllData.model";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../common/InputText";
import ComboBox from "../../common/ComboBox";
import Datepicker from "../../common/DatePicker";
import { RsetShowToast } from "../../common/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Btn from "../../common/Btn";
import {
  handleCreateAccount,
  handleGetUserProfileInfo,
  handleUpdateAccount,
} from "../../common/slices/accountSlice";
import SignUpFields from "../../pages/signUp/SignUpFields";
import { getStrategies, getUserTypes } from "../../services/masterServices";

interface Props {
  updateSignUp: any;
  setUpdateSignUp: React.Dispatch<React.SetStateAction<any>>;
}

const ChangeProfile: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<UpdateAccount>({ reValidateMode: "onChange" });
  const { main, account } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const validateCode = watch("personTypeId")?.id;
  const [userType, setUserType] = useState<SelectOption[]>([]);
  const [strategies, setStrategies] = useState<SelectOption[]>([]);

  const submitData = (data: UpdateAccount) => {
    dispatch(
      handleUpdateAccount({
        data,
        navigate,
      }),
    );
  };

  // -> handle get User Types
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

  // -> handle get strategies
  const handleGetStrategies = async () => {
    try {
      const resStrategies = await getStrategies();
      if (resStrategies?.data?.code === 0) {
        console.log(resStrategies, "resStrategies");
        setStrategies(resStrategies?.data?.result);
      } else {
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  useEffect(() => {
    handleGetUserTypes();
    handleGetStrategies();
    dispatch(handleGetUserProfileInfo());
  }, []);

  useEffect(() => {
    reset({ ...account.userRole });
  }, [account.userRole]);

  return (
    <>
      <Container fluid style={{ marginTop: "70px" }} className="bg-danger">
        <section>
          <Row className="d-flex  bgWhitePrimary justify-content-center">
            <Col xs="11" xl="4" className="bg-white shadow m-4 p-4 rounded-4 ">
              <SignUpFields
                strategies={strategies}
                perFields={true}
                userType={userType}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                watch={watch}
                getValues={getValues}
                submitData={submitData}
                // keySunUpdate={keySunUpdate}
                // setKeySunUpdate={setKeySunUpdate}
              />
            </Col>
            <Col xs="12" xl="4" className="posterFit  mt-4 p-4 rounded-4 ">
              <h3 className="fw-bold font25 textPrimary">
                {" "}
                برای به روز رسانی اطلاعات لطفا دقت داشته باشید!{" "}
              </h3>
              <p className="lh-lg ">
                <ul>
                  {/* <li className='my-4' >
                                        کاربر گرامی اطلاعات ذخیره شده در این قسمت مربوط به اطلاعات ثبت شده شما میباشد
                                    </li>
                                    <li className='my-4' >
                                        برای جابجایی هر کدامی از اطلاعات اختیاری، شما میتوانید به صورت دستی آنرا تغییر دهید و در نهایت تایید کنید تا اطلاعات شما بروز شود
                                    </li> */}
                  <li className="my-4">
                    در قسمت
                    <span className="fw-bold d-inline-block mx-2 text-primary ">
                      روش ارسال صورتحساب
                    </span>
                    شما میتوانید به صورت مستقیم اطلاعات صورتحساب خود را به
                    سامانه مالیاتی کشور ارسال کنید یا از طریق ارسال به شرکت
                    معتمد کیسان اطلاعات را به صورت غیر مستقیم به سامانه مالیاتی
                    کشور ارسال کنید
                  </li>
                  <li className="my-4">
                    تغییر
                    <span className="fw-bold text-primary mx-2">رمز عبور</span>و
                    تکرار آن به صورت اختیاری میباشد. در صورت وارد نکردن آن ، رمز
                    عبور شما تغییری نخواهد کرد.
                  </li>
                </ul>
              </p>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default ChangeProfile;
