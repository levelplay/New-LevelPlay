import React from "react";
import NextImage from "next/image";
import { homeBanner } from "@/public/images";

const HeroSection = () => {
  return (
    <section className="w-full h-screen">
      <NextImage
        src={homeBanner}
        alt="home-banner"
        quality={1}
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default HeroSection;
