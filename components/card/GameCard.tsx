"use client";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { tikTakTok } from "@/public/images";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";
import NextImage from "../other/NextImage";

const GameCard = () => {
  return (
    <Card shadow="sm" className="max-w-40" isPressable onPress={() => {
      store.dispatch(changeModelStatus("game-start"));
    }}>
      <CardBody className="overflow-visible p-0">
        <NextImage
          shadow="sm"
          radius="lg"
          alt={'tik tak tok'}
          className="aspect-square"
          src={tikTakTok.src}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        Tik Tak Tok
      </CardFooter>
    </Card>
  );
};

export default GameCard;
