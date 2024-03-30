"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { homeBanner } from "@/public/images";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";
import NextImage from "../other/NextImage";

const GameCard = () => {
  return (
    <div className="cursor-pointer max-w-md">
      <figure className="aspect-[5/3] rounded-2xl relative">
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
        <NextImage
          src={homeBanner.src}
          alt="game-image"
          className="w-full h-full object-cover"
          isZoomed
          isBlurred
        />
      </figure>
      <div className="flex justify-between px-4 gap-4">
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
