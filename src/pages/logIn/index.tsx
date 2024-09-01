import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../models/AllData.model";
import { useForm } from "react-hook-form";
import InputText from "../../common/InputText";
import { useAppDispatch } from "../../hooks/hook";
import { handleLogin } from "../../common/slices/accountSlice";
import { isMobile, isTablet, osName } from "react-device-detect";
import logo from "../../assets/img/dibajadid.png";
import { Button } from "src/components/Button";

const LogInForm = () => {
  const [showPass, setShowPass] = useState<Boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
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
                    <img src={String(logo)} />
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
              <div className="tw-flex tw-w-full tw-items-center tw-justify-center">
                <Button
                  onClick={handleSubmit((data) => submitData(data))}
                  size={"smm"}
                  variant={"default"}
                  className="!tw-mt-6 !tw-w-full tw-rounded-2xl tw-px-6 tw-py-2 !tw-text-mdd tw-text-white"
                  title="ورود"
                />
              </div>
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
