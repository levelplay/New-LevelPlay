import React from "react";
import SignInModel from "./SignIn";
import SignUpModel from "./SignUp";
import ForgetPasswordModel from "./ForgetPassword";
import GameStartModel from "./GameStart";
import GameEndModel from "./GameEnd";

const ModelsGroup = () => {
  return (
    <>
      <SignInModel />
      <SignUpModel />
      <ForgetPasswordModel />
      <GameStartModel />
      <GameEndModel />
    </>
  );
};

export default ModelsGroup;
