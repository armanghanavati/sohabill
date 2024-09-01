import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { GeneralLayoutType } from "../models/AllData.model";
import { handleGetUserProfileInfo } from "../common/slices/accountSlice";
import MessageModal from "../common/MessageModal";
import ProfileMob from "../assets/icons/ProfileMob";
import ManagerMob from "../assets/icons/ManagerMob";
import HomeMob from "../assets/icons/HomeMob";
import Buyers from "../assets/icons/Buyers";
import GoodsMob from "../assets/icons/GoodsMob";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../utils/tailwind-utils";
import { useMediaQuery } from "react-responsive";
import PhoneIcon from "../assets/icons/PhoneIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import UserIcon from "../assets/icons/UserIcon";
import Header from "./header/NavBar";
import Footer from "./footer/Footer";

type Props = GeneralLayoutType;
// const GeneralLayout: React.FC<Props> = ({ children }) => {
const Layout: React.FC<Props> = ({ children }) => {
  const isSmallScreenHead = useMediaQuery({ query: "(max-width: 768px)" });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("tokenId") !== null)
      dispatch(handleGetUserProfileInfo());
  }, []);

  return (
    <>
      <div className="wrapper">
        {children}
        <MessageModal />
      </div>
    </>
  );
};

export default Layout;
