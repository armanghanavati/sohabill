import React from "react";
import { GeneralLayoutType } from "../models/AllData.model";
import Header from "./header/NavBar";
import Footer from "./footer/Footer";

type Props = GeneralLayoutType;
const GeneralLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Footer /> */}
      {children}
      <Footer />
    </>
  );
};

export default GeneralLayout;
