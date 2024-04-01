import React from "react";
import { AppContainer } from "./AppContainer";
import UserAvatar from "./UserAvatar";
import SafetyLayer from "./SafetyLayer";

const HomeNavbar = () => {
  return (
    <header className="w-full sticky bg-[hsla(0,0%,10%)] duration-200 top-0 z-40">
      <AppContainer className="h-20 flex items-center justify-between">
        <h3
          className="text-2xl font-semibold text-nowrap"
          style={{ letterSpacing: "4px" }}
        >
          Level Play
        </h3>
        <SafetyLayer>
          <UserAvatar />
        </SafetyLayer>
      </AppContainer>
    </header>
  );
};

export default HomeNavbar;
