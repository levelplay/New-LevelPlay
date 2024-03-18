"use client";
import React, { useEffect, useState } from "react";
import { AppContainer } from "./AppContainer";
import { Button, Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      aria-checked={scrolled}
      className="w-full fixed duration-200 top-0 bg-transparent aria-checked:bg-[hsla(0,0%,10%,0.9)] aria-checked:backdrop-blur"
    >
      <AppContainer className="h-20 flex items-center justify-between">
        <h3
          className="text-2xl font-semibold text-nowrap"
          style={{ letterSpacing: "4px" }}
        >
          Level Play
        </h3>
        <div
          aria-checked={scrolled}
          className="w-full flex items-center justify-center aria-checked:translate-y-0 translate-y-[-80px] duration-200"
        >
          <Input
            startContent={<IoIosSearch className="text-xl" />}
            classNames={{
              innerWrapper: "gap-1",
            }}
            placeholder="Search here..."
            className=" max-w-96"
            radius="full"
            fullWidth
          />
        </div>
        <div className="flex gap-4">
          <Button
            color="primary"
            onClick={() => {
              store.dispatch(changeModelStatus("signIn"));
            }}
          >
            Sign in
          </Button>
          <Button
            variant="bordered"
            color="primary"
            onClick={() => {
              store.dispatch(changeModelStatus("signUp"));
            }}
          >
            Sign up
          </Button>
        </div>
      </AppContainer>
    </header>
  );
};

export default HomeNavbar;
