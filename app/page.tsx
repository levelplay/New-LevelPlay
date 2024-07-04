import HeroSection from "@/components/container/HeroSection";
import AppFooter from "@/components/layout/AppFooter";
import HomeNavbar from "@/components/layout/HomeNavbar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HomeNavbar />
      <HeroSection />
      <AppFooter />
    </>
  );
};

export default HomePage;
