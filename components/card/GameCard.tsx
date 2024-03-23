"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { homeBanner } from "@/public/images";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";

const GameCard = () => {
  return (
    <div className="cursor-pointer">
      <figure className=" aspect-[5/3] rounded-2xl overflow-hidden relative">
        <Button
          variant="flat"
          className="absolute top-1 right-1 text-xl z-10"
          size="sm"
          isIconOnly
          onClick={() => {
            store.dispatch(changeModelStatus("leader-board"));
          }}
        >
          <MdOutlineLeaderboard />
        </Button>
        <Image
          src={homeBanner}
          alt="game-image"
          width={400}
          height={300}
          className="w-full h-full object-cover hover:scale-110 hover:rotate-2 duration-400"
        />
      </figure>
      <div className="mt-2.5 flex justify-between px-4 gap-4">
        <h6 className="text-lg">Legends of the legends</h6>
        <Button
          radius="full"
          size="sm"
          color="primary"
          onClick={() => {
            store.dispatch(changeModelStatus("game-start"));
          }}
        >
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
