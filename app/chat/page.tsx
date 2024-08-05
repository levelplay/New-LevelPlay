"use client";
import { AppContainer } from "@/components/layout/AppContainer";
import HomeNavbar from "@/components/layout/HomeNavbar";
import React from "react";
import ContactDrawer from "./components/drawer";
import MessageContainer from "./components/message";
import { NextPage } from "@/core/type";

const ChatPage = (props: NextPage) => {
  return (
    <>
      <HomeNavbar className="max-md:hidden" />
      <main className="w-full h-[calc(100vh-80px)] max-md:h-screen">
        <AppContainer className="w-full h-full grid-cols-3 grid py-6 max-md:p-0">
          <ContactDrawer {...props} />
          <MessageContainer {...props} />
        </AppContainer>
      </main>
    </>
  );
};

export default ChatPage;
