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
    <footer className="w-full bg-[hsla(0,0%,10%)] py-5">
      <AppContainer>
        <div className="flex justify-between items-center">
          <h3
            className="text-2xl font-semibold"
            style={{ letterSpacing: "4px" }}
          >
            Level Play
          </h3>
          <div className="text-stone-300 text-sm font-normal">
            © Level Play - All Rights Reserved
          </div>
          <div className="flex gap-3">
            {socialMedia.map((e, key) => {
              return (
                <Button
                  key={key}
                  variant="light"
                  size="sm"
                  radius="full"
                  isIconOnly
                >
                  <e.icon className="text-white text-base" />
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
