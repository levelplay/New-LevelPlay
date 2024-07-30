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
      <HomeNavbar />
      <main className="w-full h-[calc(100vh-80px)]">
        <AppContainer className="w-full h-full grid-cols-3 grid py-6">
          <ContactDrawer {...props} />
          <MessageContainer {...props} />
        </AppContainer>
      </main>
    </>
  );
};

export default ChatPage;
