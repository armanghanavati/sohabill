import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInForm from "../pages/logIn";
import SignUp from "../pages/signUp";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/home/Home";
import AboutUs from "../pages/aboutUs/index";
import PageNotFound from "../pages/404/PageNotFound";
import Questions from "../pages/questions/Question";
import ChangeProfile from "../components/changeProfile/ChangeProfile";
import { SignUpAccount } from "../models/AllData.model";
import Profile from "../pages/profile/Profile";
import Layout from "../layouts/Layout";
import GeneralLayout from "../layouts/GeneralLayout";

const GeneralRoutes: React.FC = () => {
  const [updateSignUp, setUpdateSignUp] = useState<SignUpAccount>({});

  return (
    <>
      <GeneralLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/profile" element={<Profile />} />
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
      </GeneralLayout>
    </>
  );
};

export default GeneralRoutes;
