import React from "react";
import { AppContainer } from "../layout/AppContainer";
import Image from "next/image";
import { homeBanner } from "@/public/images";
import { Button } from "@nextui-org/react";
import { MdOutlineLeaderboard } from "react-icons/md";

const ExploreGames = () => {
  return (
    <AppContainer className="py-16">
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl/6">Browse Games</h4>
        <span className="h-1 w-24 bg-white" />
      </div>
      <div className="grid grid-cols-4 gap-5 pt-6">
        {[1, 2, 3, 4].map((e) => {
          return (
            <div className="cursor-pointer" key={e}>
              <figure className=" aspect-[5/3] rounded-2xl overflow-hidden relative">
                <Button
                  variant="flat"
                  className="absolute top-1 right-1 text-xl"
                  size="sm"
                  isIconOnly
                >
                  <MdOutlineLeaderboard />
                </Button>
                <Image
                  src={homeBanner}
                  alt="game-image"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </figure>
              <h6 className="text-lg mt-2 text-center">
                Legends of the legends
              </h6>
            </div>
          );
        })}
      </div>
    </AppContainer>
  );
};

export default ExploreGames;
