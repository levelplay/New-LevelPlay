import React from "react";
import { AppContainer } from "./AppContainer";
import { Button, Divider } from "@nextui-org/react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const AppFooter = () => {
  const socialMedia = [
    {
      icon: FaFacebookF,
      link: "/",
    },
    {
      icon: FaXTwitter,
      link: "/",
    },
    {
      icon: FaInstagram,
      link: "/",
    },
    {
      icon: FaLinkedinIn,
      link: "/",
    },
  ];

  return (
    <footer className="w-full dark bg-[#1A1A1A] py-5">
      <AppContainer>
        <div className="flex justify-between items-center">
          <h3
            className="text-2xl max-sm:text-xl font-semibold text-foreground"
            style={{ letterSpacing: "4px" }}
          >
            LevelPlay
          </h3>
          <div className="text-sm font-normal max-md:hidden text-foreground">
            © LevelPlay - All Rights Reserved
          </div>
          <div className="flex gap-3 max-sm:gap-1">
            {socialMedia.map((e, key) => {
              return (
                <Button
                  key={key}
                  variant="light"
                  color="primary"
                  size="sm"
                  radius="full"
                  isIconOnly
                >
                  <e.icon className="text-base" />
                </Button>
              );
            })}
          </div>
        </div>
      </AppContainer>
    </footer>
  );
};

export default AppFooter;
