import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInForm from "../pages/logIn";
import SignUp from "../pages/signUp";
import TaxPage from "../pages/tax/TaxPage";
import Home from "../pages/home/Home";
import AboutUs from "../pages/aboutUs/index";
import PageNotFound from "../pages/404/PageNotFound";
import Questions from "../pages/questions/Question";
import ChangeProfile from "../components/changeProfile/ChangeProfile";
import { SignUpAccount } from "../models/AllData.model";

const GeneralLayout: React.FC = () => {
  const [updateSignUp, setUpdateSignUp] = useState<SignUpAccount>({});

  return (
    <>
      <Routes>
        <Route path="/logIn" element={<LogInForm />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/updateProfile"
          element={
            <ChangeProfile
              updateSignUp={updateSignUp}
              setUpdateSignUp={setUpdateSignUp}
            />
          }
        />
      </Routes>
    </>
  );
};

export default GeneralLayout;
