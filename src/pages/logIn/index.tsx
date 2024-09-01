import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Button, Container, Card, Form, Col, Row } from "react-bootstrap";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../models/AllData.model";
import { useForm } from "react-hook-form";
import InputText from "../../common/InputText";
import { useAppDispatch } from "../../hooks/hook";
import { RsetShowToast } from "../../common/slices/mainSlice";
import { handleLogin } from "../../common/slices/accountSlice";
import { isMobile, isTablet, osName } from "react-device-detect";
import Btn from "../../common/Btn";
import logo from "../../assets/img/nature-logo1.png";

const LogInForm: FC = ({ }) => {
  const [showPass, setShowPass] = useState<Boolean>(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Login>({ reValidateMode: "onChange" });
  const [opratingSystem, setOpratingSystem] = useState<any>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setOpratingSystem(osName);
    } else if (isTablet) {
      setOpratingSystem(isTablet);
    } else {
      setOpratingSystem(window.navigator.platform);
    }
  }, []);

  const submitData = (data: any) => {
    dispatch(
      handleLogin({
        data: data,
        navigate,
        loadingName: "login",
        opratingSystem,
      }),
    );
  };

  return (
    <Container fluid className="vh-100">
      <Row className="vh-100">
        <div className="d-flex  bgGray  justify-content-center align-items-center">
          <Col
            xs="12"
            sm="9"
            md="7"
            lg="6"
            xl="4"
            className="bg-white shadow  mx-auto my-auto p-4 rounded-4 "
          >
            <form className="justify-content-center bg-white">
              <div className="bg-white">
                <div className="d-flex  justify-content-center">
                  <Link className="" to="/">
                    <img
                      width={100}
                      height={100}
                      className="cursorPointer imageLogin"
                      src={String(logo)}
                    />
                  </Link>
                </div>
                <InputText
                  xl={12}
                  errmsg="لطفا نام کاربری خود را وارد کنید"
                  label="کد اقتصادی(نام کاربری):"
                  type="number"
                  validation={{
                    required: "لطفا نام کاربری را وارد کنید",
                    minLength: {
                      message: "نام کاربری باید بیشتر از 2 حرف باشد",
                      value: 2,
                    },
                  }}
                  control={control}
                  name="userName"
                  errors={errors}
                  important
                  className="py-2"
                  length_num={20}
                />
                <InputText
                  errmsg="لطفا رمز عبور خود را وارد کنید"
                  setEditStyle={() => {
                    setShowPass(!showPass);
                  }}
                  showCharacter
                  errors={errors}
                  label="رمز عبور:"
                  xl={12}
                  important
                  validation={{
                    required: "لطفا رمز عبور خود را وارد کنید",
                    minLength: {
                      message: "رمز عبور خود باید بیشتر از 8 حرف باشد",
                      value: 8,
                    },
                  }}
                  name="password"
                  control={control}
                  type={showPass ? "text" : "password"}
                  className="py-2"
                />
              </div>
              <Col sm="12" md="12" xl="12">
                <Btn
                  xl={12}
                  title="ورود"
                  onClick={handleSubmit((data) => submitData(data))}
                  loadingName="login"
                  className="mt-4 border border-none text-white  btnSuccessWhite py-2 fs-6  rounded-4 w-100 p-2"
                />
              </Col>
              <Row className="mt-4">
                <Col sm="12" md="12" xl="12">
                  <p className="">
                    <Link className="font12  text-decoration-none" to="#">
                      رمز خود را فراموش کرده اید؟
                    </Link>
                  </p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm="12" md="12" xl="12" className="">
                  <p className=" font12 d-flex align-items-center justify-content-center">
                    هنوز ثبت نام نکرده اید؟
                    <Link className="text-decoration-none" to="/signUp">
                      <span className=" me-1 text-primary "> ثبت نام </span>
                    </Link>
                  </p>
                </Col>
              </Row>
            </form>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default LogInForm;
