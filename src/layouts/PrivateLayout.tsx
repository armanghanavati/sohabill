import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { getUserProfileInfo } from "../services/masterServices";
import { RsetShowLoading } from "../common/slices/mainSlice";
import { RsetUserRole } from "../common/slices/accountSlice";
import Header from "./header/NavBar";
import { GeneralLayoutType } from "../models/AllData.model";
import ProfileMob from "../assets/icons/ProfileMob";
import ManagerMob from "../assets/icons/ManagerMob";
import HomeMob from "../assets/icons/HomeMob";
import Buyers from "../assets/icons/Buyers";
import GoodsMob from "../assets/icons/GoodsMob";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../utils/tailwind-utils";
import { useMediaQuery } from "react-responsive";
import HomeIcon from "../assets/icons/HomeIcon";
import UserIcon from "../assets/icons/UserIcon";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const PrivateLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [accepRefresh, setAccepRefresh] = useState<boolean>(false);
  const { main, tax } = useAppSelector((state) => state);
  const isSmallScreenHead = useMediaQuery({ query: "(max-width: 768px)" });

  // -> handle refresh
  const handleGetUserProfileInfo = async () => {
    if (localStorage.getItem("tokenId") === null) {
      window.location.assign("/login");
    } else {
      try {
        dispatch(RsetShowLoading({ value: true }));
        const resRefresh = await getUserProfileInfo();
        dispatch(RsetShowLoading({ value: false }));
        if (resRefresh?.data?.code === 0) {
          dispatch(RsetUserRole(resRefresh?.data?.result));
          setAccepRefresh(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetUserProfileInfo();
  }, []);

  return (
    <section>
      <Header />
      <main className="tw-container tw-mx-auto">
        {accepRefresh && children}
      </main>
      {isSmallScreenHead ? (
        <nav className=" tw-fixed tw-bottom-0 tw-z-50 tw-flex tw-min-h-fit tw-w-full tw-items-start tw-justify-center tw-rounded-t-xl tw-bg-white tw-drop-shadow-lg">
          <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col  tw-items-center tw-gap-0">
            <div className="">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cn(
                    "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                    isActive
                      ? "tw-border-t-2 tw-border-primary tw-text-primary"
                      : "",
                  )
                }
              >
                <UserIcon color="" className="" />
                <span className="tw-col-span-3 tw-mt-1 tw-text-center">
                  پروفایل
                </span>
              </NavLink>
            </div>
          </div>
          <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col  tw-items-center tw-gap-0">
            <div className="">
              <NavLink
                to="/buyers"
                className={({ isActive }) =>
                  cn(
                    "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                    isActive
                      ? "tw-border-t-2 tw-border-primary tw-text-primary"
                      : "",
                  )
                }
              >
                <Buyers color="" className="" />
                <span className="tw-col-span-3 tw-mt-1 tw-text-center">
                  خریداران
                </span>
              </NavLink>
            </div>
          </div>
          <div className="tw-flex tw-h-full tw-w-1/4 tw-flex-col  tw-items-center tw-gap-0">
            <div className="">
              <NavLink
                to="/users/baseTax"
                className={({ isActive }) =>
                  cn(
                    "tw-group tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                    isActive
                      ? "tw-border-t-2 tw-border-primary tw-text-primary"
                      : "",
                  )
                }
              >
                <ManagerMob color="" className="" />
                <span className="tw-col-span-3 tw-mt-1 tw-text-center">
                  صورتحساب‌ها
                </span>
              </NavLink>
            </div>
          </div>
          <div className="tw-flex tw-h-full tw-w-1/5 tw-flex-col  tw-items-center tw-gap-0">
            <div>
              <NavLink
                to="/goods"
                className={({ isActive }) =>
                  cn(
                    "tw-flex tw-w-14 tw-flex-col tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-pt-3 tw-text-mainBlack tw-no-underline",
                    isActive
                      ? "tw-border-t-2 tw-border-primary tw-text-primary"
                      : "",
                  )
                }
              >
                <GoodsMob color="" className="" />
                <span className="tw-col-span-3 tw-mt-1 tw-text-center">
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
                <HomeIcon color="" className="" />
                <span className="tw-col-span-3 tw-mt-1 tw-text-center">
                  خانه
                </span>
              </NavLink>
            </div>
          </div>
        </nav>
      ) : null}
    </section>
  );
};

export default PrivateLayout;
