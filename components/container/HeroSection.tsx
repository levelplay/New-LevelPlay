"use client";
import React from "react";
import { AppContainer } from "../layout/AppContainer";
import GameCard from "../card/GameCard";
import CommingSoonCard from "../card/CommingSoon";
import LeaderBoardModel from "../models/LeaderBoard";
import useSWR from "swr";
import { fetcher } from "@/core/http";
import { Button } from "@nextui-org/react";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";

const HeroSection = () => {
  const { data, isLoading } = useSWR("/me/leaderboard", fetcher);

  return (
    <section className="w-full relative">
      <div className="w-full">
        <AppContainer className="flex flex-col h-full justify-center gap-14 py-20 min-h-[calc(100vh-154px)]">
          <div className="flex items-center justify-center flex-col gap-2 max-sm:items-start">
            <h1 className="text-5xl leading-[125%] text-center font-semibold capitalize max-sm:text-start">
              Payment for User with most <br /> wins will be via email
            </h1>
            <Button
              color="primary"
              className="max-w-48 mt-4"
              onClick={() => {
                store.dispatch(changeModelStatus("leader-board"));
              }}
              fullWidth
            >
              Leader Board
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <GameCard />
            <CommingSoonCard />
            <CommingSoonCard />
          </div>
        </AppContainer>
      </div>
      <LeaderBoardModel data={data} isLoading={isLoading} />
    </section>
  );
};

export default HeroSection;
