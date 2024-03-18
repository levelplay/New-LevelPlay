"use client";
import React from "react";
import { AppContainer } from "./AppContainer";
import { Button, Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { store } from "@/redux/store";
import { changeModelStatus } from "@/redux/model/controller";

const AppNavbar = () => {
  return (
    <header className="w-full bg-opacity-80 backdrop-blur sticky top-0 bg-[#242424]">
      <AppContainer className="h-20 flex items-center justify-between">
        <h3 className="text-2xl font-semibold" style={{ letterSpacing: "4px" }}>
          Level Play
        </h3>
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

export default AppNavbar;
