import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/hook";
import { GeneralLayoutType } from "../models/AllData.model";
import { handleGetUserProfileInfo } from "../common/slices/accountSlice";
import MessageModal from "../common/MessageModal";
import ManagerMob from "../assets/icons/ManagerMob";
import Buyers from "../assets/icons/Buyers";
import GoodsMob from "../assets/icons/GoodsMob";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../utils/tailwind-utils";
import { useMediaQuery } from "react-responsive";
import HomeIcon from "../assets/icons/HomeIcon";
import UserIcon from "../assets/icons/UserIcon";

type Props = GeneralLayoutType;
// const GeneralLayout: React.FC<Props> = ({ children }) => {
const Layout: React.FC<Props> = ({ children }) => {
  const isSmallScreenHead = useMediaQuery({ query: "(max-width: 768px)" });
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (localStorage.getItem("tokenId") !== null)
      dispatch(handleGetUserProfileInfo());
  }, []);

  const pathnames = (path1: string, path2: string) => {
    return pathname === `/users/${path1}` || pathname === `/users/${path2}`;
  };

  return (
    <>
      <div className="wrapper">
        {children}
        <MessageModal />
        {isSmallScreenHead && localStorage.getItem("tokenId") !== null ? (
          <>
            <div className="tw-h-8" />
            <nav className=" tw-fixed tw-bottom-0 tw-z-50 tw-flex tw-min-h-fit tw-w-full tw-items-start tw-justify-center tw-rounded-t-xl tw-bg-white tw-drop-shadow-lg">
              <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col  tw-items-center tw-gap-0">
                <div className="">
                  <NavLink
                    to="/updateProfile"
                    className={({ isActive }) =>
                      cn(
                        "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                        isActive
                          ? "tw-border-t-2 tw-border-primary tw-text-primary"
                          : "",
                      )
                    }
                  >
                    <UserIcon
                      color={`${location.pathname === "/updateProfile" ? "#4CC19E" : ""}`}
                    />
                    <span
                      className={`${location.pathname === "/updateProfile" ? "tw-text-primary" : ""} tw-col-span-3 tw-mt-1 tw-text-center`}
                    >
                      پروفایل
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col  tw-items-center tw-gap-0">
                <NavLink
                  to="/users/buyersList"
                  className={() =>
                    cn(
                      "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                      pathnames("buyersList", "addBuyer")
                        ? "tw-border-t-2 tw-border-primary tw-text-primary"
                        : "",
                    )
                  }
                >
                  <Buyers
                    color={`${pathnames("buyersList", "addBuyer") ? "#4CC19E" : ""}`}
                  />
                  <span
                    className={`${pathnames("buyersList", "addBuyer") ? "tw-text-primary" : ""} tw-col-span-3 tw-mt-1 tw-text-center`}
                  >
                    خریداران
                  </span>
                </NavLink>
              </div>
              <div className="tw-flex tw-h-full tw-w-1/4 tw-flex-col  tw-items-center tw-gap-0">
                <div className="">
                  <NavLink
                    to="/users/billsList"
                    className={() =>
                      cn(
                        "tw-group tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                        pathnames("billsList", "billing")
                          ? "tw-border-t-2 tw-border-primary tw-text-primary"
                          : "",
                      )
                    }
                  >
                    <ManagerMob
                      color={`${pathnames("billsList", "billing") ? "#4CC19E" : ""}`}
                    />
                    <span
                      className={`${pathnames("billsList", "billing") ? "tw-text-primary" : ""} tw-col-span-3 tw-mt-1 tw-text-center`}
                    >
                      صورتحساب‌ها
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col  tw-items-center tw-gap-0">
                <div>
                  <NavLink
                    to="/users/goodsList"
                    className={() =>
                      cn(
                        "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                        pathnames("/users/goodsList", "/users/addGoods")
                          ? "tw-border-t-2 tw-border-primary tw-text-primary"
                          : "",
                      )
                    }
                  >
                    <GoodsMob
                      color={`${pathnames("goodsList", "addGoods") ? "#4CC19E" : ""}`}
                    />
                    <span
                      className={`${pathnames("goodsList", "addGoods") ? "tw-text-primary" : ""} tw-col-span-3 tw-mt-1 tw-text-center`}
                    >
                      کالاها
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col tw-items-center  tw-justify-center tw-gap-0">
                <div className="">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                        isActive
                          ? "tw-border-t-2 tw-border-primary tw-text-primary"
                          : "",
                      )
                    }
                  >
                    <HomeIcon color={`${pathname === "/" ? "#4CC19E" : ""}`} />
                    <span
                      className={`${pathname === "/" ? "tw-text-primary" : ""} tw-col-span-3 tw-mt-1 tw-text-center`}
                    >
                      خانه
                    </span>
                  </NavLink>
                </div>
              </div>
            </nav>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Layout;
