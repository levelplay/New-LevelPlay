import React from "react";
import SignInModel from "./SignIn";
import SignUpModel from "./SignUp";
import ForgetPasswordModel from "./ForgetPassword";
import GameStartModel from "./GameStart";
import GameEndModel from "./GameEnd";
import NewContactModel from "./NewContact";

const ModelsGroup = () => {
  return (
    <>
      <SignInModel />
      <SignUpModel />
      <ForgetPasswordModel />
      <GameStartModel />
      <GameEndModel />
      <NewContactModel />
    </>
  );
};

export default ModelsGroup;
