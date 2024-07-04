"use client";
import React from "react";
import { AppContainer } from "../layout/AppContainer";
import { Button } from "@nextui-org/react";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";
import GameCard from "../card/GameCard";
import CommingSoonCard from "../card/CommingSoon";

const HeroSection = () => {
  return (
    <section className="w-full relative">
      <div className="w-full">
        <AppContainer className="flex flex-col h-full justify-center gap-6 pt-16 pb-24 max-sm:gap-8">
          <h1 className="text-5xl leading-[125%] text-center font-semibold capitalize">
            Play whatever,
            <br />
            wherever with whoever
          </h1>
          <div className="flex justify-center pt-8 gap-6 max-sm:flex-col max-sm:gap-10">
            <GameCard />
            <CommingSoonCard />
            <CommingSoonCard />
          </div>
        </AppContainer>
      </div>
    </section>
  );
};

export default HeroSection;
