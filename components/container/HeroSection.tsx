"use client";
import React from "react";
import { AppContainer } from "../layout/AppContainer";
import { Button } from "@nextui-org/react";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";

const HeroSection = () => {
  return (
    <section className="w-full h-[calc(100vh-154px)] relative">
      <div className="w-full h-full top-0 left-0 z-10 absolute">
        <AppContainer className="flex flex-col h-full justify-center">
          <h1 className="text-5xl leading-[125%] font-semibold capitalize">
            Play whatever,
            <br />
            wherever with
            <br />
            whoever
          </h1>
          <h3 className="text-base pt-2 opacity-85">
            This can be useful when you want to remove filters conditionally,
          </h3>
          <div className="w-full flex gap-4 pt-6">
            <Button
              radius="full"
              color="primary"
              size="lg"
              onClick={() => {
                store.dispatch(changeModelStatus("game-start"));
              }}
            >
              Play Now
            </Button>
            <Button
              radius="full"
              color="primary"
              variant="bordered"
              size="lg"
              onClick={() => {
                store.dispatch(changeModelStatus("leader-board"));
              }}
            >
              Leaderboard
            </Button>
          </div>
        </AppContainer>
      </div>
    </section>
  );
};

export default HeroSection;
