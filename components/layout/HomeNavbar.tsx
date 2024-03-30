"use client";
import React, { useEffect, useState } from "react";
import { AppContainer } from "./AppContainer";
import { store } from "@/redux/store";
import { showChallengeThunk } from "@/redux/toast/controller";
import UserAvatar from "./UserAvatar";
import SafetyLayer from "./SafetyLayer";

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      aria-checked={scrolled}
      className="w-full fixed duration-200 top-0 bg-transparent z-40 aria-checked:bg-[hsla(0,0%,10%,0.9)] aria-checked:backdrop-blur border-b-[hsla(0,0%,16%)] aria-checked:border-b-1"
    >
      <AppContainer className="h-20 flex items-center justify-between">
        <h3
          onClick={() => {
            store.dispatch(
              showChallengeThunk(
                "Hi, you just receive a request from xyz@gmail.com"
              )
            );
          }}
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
