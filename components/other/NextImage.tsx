"use client";
import React, { FC, useState } from "react";
import { Image, ImageProps } from "@nextui-org/react";
import ImageComponent from "next/image";

const NextImage: FC<ImageProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Image
      as={ImageComponent}
      alt="metal-exchange-services-image"
      width={500}
      height={500}
      onLoad={() => {
        setLoading(false);
      }}
      {...props}
      isLoading={props.isLoading ?? loading}
    />
  );
};

export default NextImage;
