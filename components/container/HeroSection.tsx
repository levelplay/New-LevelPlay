"use client";
import React from "react";
import NextImage from "next/image";
import { homeBanner } from "@/public/images";
import { AppContainer } from "../layout/AppContainer";
import { Button } from "@nextui-org/react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";

const HeroSection = () => {
  return (
    <section className="w-full h-screen relative">
      <NextImage
        src={homeBanner}
        alt="home-banner"
        quality={1}
        className="w-full h-full object-cover"
      />
      <div
        className="w-full h-full top-0 left-0 z-10 absolute"
        style={{
          boxShadow: "inset #0000004d 500px 0px 100px 40px",
        }}
      >
        <AppContainer className="flex flex-col h-full justify-center">
          <h1 className="text-5xl leading-[125%] font-semibold capitalize">
            Participates for <br /> weekly prizes <br /> in your favorite games
          </h1>
          <h3 className="text-base pt-2 opacity-85">
            This can be useful when you want to remove filters conditionally,
          </h3>
          <div className="w-full flex gap-4 pt-6">
            <Button
              radius="full"
              color="primary"
              size="lg"
              onClick={() => {
                store.dispatch(changeModelStatus("signUp"));
              }}
            >
              Join Now
            </Button>
            <Button
              radius="full"
              color="primary"
              variant="bordered"
              size="lg"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 80,
                  behavior: "smooth",
                });
              }}
              endContent={
                <div className=" translate-y-[3px]">
                  <MdKeyboardDoubleArrowDown className="animate-bounce text-xl" />
                </div>
              }
            >
              Explore
            </Button>
          </div>
        </AppContainer>
      </div>
    </section>
  );
};

export default HeroSection;
