import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";

import profileIcon from "../../assets/icons/Profile.svg";
import logo from "../../assets/img/logo.png";
import { Button, buttonVariants } from "../../common/Button";
import HamburgerMenu from "../../components/home/navbar/HamburgerMenu";
import { logout } from "../../services/masterServices";
import { cn } from "../../utils/tailwind-utils";
// import ChangeProFileModal from "./ChangeProFileModal";

const Header: React.FC = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const { main } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const accountLogin = () => {
    if (localStorage.getItem("tokenId") === null) {
      return (
        <div className="tw-flex tw-gap-6">
          <Link
            className={buttonVariants({ variant: "ghost", size: "link" })}
            to="/logIn"
          >
            ورود
          </Link>
          <Link className={buttonVariants({ size: "md" })} to="/signup">
            ثبت نام
          </Link>
        </div>
      );
    } else {
      return (
        <div className="tw-flex">
          <div className="tw-flex tw-items-center tw-gap-4 md:tw-gap-2 lg:tw-gap-4">
            <Button
              title="خروج"
              onClick={handleLogOut}
              variant="ghost"
              size="icon"
            />
            <Link
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              to="/updateProfile"
            >
              <img src={profileIcon} alt="profile" />
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  size: "default",
                }),
              )}
              to="/users/baseSubmitTaxReq"
            >
              ارسال صورتحساب
            </Link>
          </div>
          <span></span>
        </div>
      );
    }
  };

  const handleLogOut = async () => {
    const res = await logout();
    console.log(res);
    localStorage.clear();
    navigate("/logIn");
  };

  return (
    <header className="tw-container">
      {isSmallScreen ? (
        <>
          <div className="tw-flex tw-flex-row-reverse tw-items-center tw-justify-between tw-py-2">
            <img src={logo} alt="logo" />
            <HamburgerMenu>
              <NavLinks type="column" />
            </HamburgerMenu>
          </div>
        </>
      ) : (
        <>
          <div className=" tw-flex tw-items-center tw-justify-between tw-py-8">
            <div className="tw-flex tw-items-center tw-justify-center tw-gap-7">
              <img src={logo} alt="logo" />
              <NavLinks type="row" />
            </div>
            <div className="">{accountLogin()}</div>
          </div>
        </>
      )}
      {/* {main.showModal.showModal && main.showModal.typeModal === 1 && (
        <ChangeProFileModal />
      )} */}
    </header>
  );
};

export default Header;

const NavLinks = ({ type = "row" }: { type: "row" | "column" }) => {
  return (
    <div
      className={cn(
        "tw-flex tw-gap-4 lg:tw-gap-7",
        type === "row"
          ? "tw-flex-row"
          : "tw-flex-col tw-gap-4 tw-pt-8 tw-text-right",
      )}
    >
      <Link
        className={cn(
          buttonVariants({
            variant: "link",
            size: "link",
          }),
          type === "column"
            ? "tw-block tw-px-2 tw-text-base"
            : "tw-text-sm lg:tw-text-md",
        )}
        to="/"
      >
        صفحه اصلی
      </Link>
      <Link
        className={cn(
          buttonVariants({
            variant: "link",
            size: "link",
          }),
          type === "column"
            ? "tw-block tw-px-2 tw-text-base"
            : "tw-text-sm lg:tw-text-md",
        )}
        to="/users/ListBills"
      >
        خدمات
      </Link>
      <Link
        className={cn(
          buttonVariants({
            variant: "link",
            size: "link",
          }),
          type === "column"
            ? "tw-block tw-px-2 tw-text-base"
            : "tw-text-sm lg:tw-text-md",
        )}
        to="/aboutUs"
      >
        درباره ما
      </Link>
      <Link
        className={cn(
          buttonVariants({
            variant: "link",
            size: "link",
          }),
          type === "column"
            ? "tw-block tw-px-2 tw-text-base"
            : "tw-text-sm lg:tw-text-md",
        )}
        to="/overTime"
      >
        تماس با ما
      </Link>
    </div>
  );
};
