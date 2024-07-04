"use client";
import React from "react";
import Image from "next/image";
import { commingSoon } from "@/public/images";

const CommingSoonCard = () => {
  return (
    <div className="cursor-pointer">
      <figure className="aspect-video rounded-2xl relative overflow-hidden">
        <Image
          src={commingSoon}
          width={400}
          height={400}
          alt="game-image"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="flex justify-between px-4 gap-4 mt-4">
        <h6 className="text-lg">Comming Soon</h6>
      </div>
    </div>
  );
};

export default CommingSoonCard;
