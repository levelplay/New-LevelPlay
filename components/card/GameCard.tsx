"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { homeBanner, tikTakTok } from "@/public/images";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";
import Image from "next/image";

const GameCard = () => {
  return (
    <div className="cursor-pointer">
      <figure className="aspect-video rounded-2xl relative overflow-hidden" onClick={() => {
        store.dispatch(changeModelStatus("game-start"));
      }}>
        <Image
          src={tikTakTok}
          width={400}
          height={400}
          alt="game-image"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="flex justify-between px-4 gap-4 mt-4">
        <h6 className="text-lg" onClick={() => {
          store.dispatch(changeModelStatus("game-start"));
        }}>Tik Tak Tok</h6>
        <Button
          radius="full"
          size="sm"
          color="primary"
          onClick={() => {
            store.dispatch(changeModelStatus("leader-board"));
          }}
        >
          Leader Board
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
