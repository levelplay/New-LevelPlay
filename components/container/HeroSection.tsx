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
        <AppContainer className="flex flex-col h-full justify-center gap-[30px] py-20 min-h-[calc(100vh-154px)]">
          <div className="flex justify-center gap-6">
            <GameCard />
            <CommingSoonCard />
            <CommingSoonCard />
          </div>
          <div className="flex items-center justify-center flex-col">
            <Button
              color="primary"
              size="lg"
              className="max-w-[300px]"
              onClick={() => {
                store.dispatch(changeModelStatus("leader-board"));
              }}
              fullWidth
            >
              Leader Board
            </Button>
          </div>
        </AppContainer>
      </div>
      <LeaderBoardModel data={data} isLoading={isLoading} />
    </section>
  );
};

export default HeroSection;
