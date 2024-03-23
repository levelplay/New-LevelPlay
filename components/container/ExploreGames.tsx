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
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl/6">Browse Games</h4>
        <span className="h-1 w-24 bg-white" />
      </div>
      <div className="grid grid-cols-3 gap-8 pt-8">
        {[1, 2, 3].map((e) => {
          return <GameCard key={e} />;
        })}
      </div>
    </AppContainer>
  );
};

export default ExploreGames;
