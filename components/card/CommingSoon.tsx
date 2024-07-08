"use client";
import React from "react";
import { commingSoon } from "@/public/images";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import NextImage from "../other/NextImage";

const CommingSoonCard = () => {
  return (
    <Card className="max-w-40" shadow="sm">
      <CardBody className="overflow-visible p-0">
        <NextImage
          shadow="sm"
          radius="lg"
          alt={'tik tak tok'}
          className="aspect-square"
          src={commingSoon.src}
        />
      </CardBody>
      <CardFooter className="text-small">
        Coming soon
      </CardFooter>
    </Card>
  );
};
1
export default CommingSoonCard;
