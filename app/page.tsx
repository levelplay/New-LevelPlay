import ExploreGames from "@/components/container/ExploreGames";
import HeroSection from "@/components/container/HeroSection";
import HomeNavbar from "@/components/layout/HomeNavbar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HomeNavbar />
      <HeroSection />
      <ExploreGames />
    </>
  );
};

export default HomePage;
