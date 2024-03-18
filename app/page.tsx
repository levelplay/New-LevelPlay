import HeroSection from "@/components/container/HeroSection";
import HomeNavbar from "@/components/layout/HomeNavbar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HomeNavbar />
      <HeroSection />
      <div className=" h-[100vh]"></div>
    </>
  );
};

export default HomePage;
