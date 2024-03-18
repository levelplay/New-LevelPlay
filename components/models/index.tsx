import React from "react";
import SignInModel from "./SignIn";
import SignUpModel from "./SignUp";
import ForgetPasswordModel from "./ForgetPassword";

const ModelsGroup = () => {
  return (
    <>
      <SignInModel />
      <SignUpModel />
      <ForgetPasswordModel/>
    </>
  );
};

export default ModelsGroup;
