import React from "react";
import { AppContainer } from "../layout/AppContainer";
import Image from "next/image";
import { homeBanner } from "@/public/images";
import { Button } from "@nextui-org/react";
import { MdOutlineLeaderboard } from "react-icons/md";
import GameCard from "../card/GameCard";

const ExploreGames = () => {
  return (
    <AppContainer className="py-16">
      <div className="flex flex-col gap-3 items-center">
        <h4 className="text-4xl uppercase font-semibold ">Browse Games</h4>
      </div>
      <div className="flex justify-center pt-12">
        <GameCard />
      </div>
    </AppContainer>
  );
};

export default ExploreGames;
