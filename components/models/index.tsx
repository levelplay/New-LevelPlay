import React from "react";
import SignInModel from "./SignIn";
import SignUpModel from "./SignUp";
import ForgetPasswordModel from "./ForgetPassword";
import LeaderBoardModel from "./LeaderBoard";
import GameStartModel from "./GameStart";
import GameEndModel from "./GameEnd";

const ModelsGroup = () => {
  return (
    <>
      <SignInModel />
      <SignUpModel />
      <ForgetPasswordModel />
      <LeaderBoardModel />
      <GameStartModel />
      <GameEndModel />
    </>
  );
};

export default ModelsGroup;
