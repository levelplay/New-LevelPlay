import React, { FC } from "react";
import { AppContainer } from "./AppContainer";
import UserAvatar from "./UserAvatar";
import SafetyLayer from "./SafetyLayer";
import Link from "next/link";

const HomeNavbar: FC<{ className?: string }> = ({ className }) => {
  return (
    <header
      className={`w-full sticky bg-[hsla(0,0%,10%)] duration-200 top-0 z-40 ${className}`}
    >
      <AppContainer className="h-20 flex items-center justify-between">
        <Link href={"/"}>
          <h3
            className="text-2xl font-semibold text-nowrap cursor-pointer"
            style={{ letterSpacing: "4px" }}
          >
            LevelPlay
          </h3>
        </Link>
        <SafetyLayer>
          <UserAvatar />
        </SafetyLayer>
      </AppContainer>
    </header>
  );
};

export default HomeNavbar;
