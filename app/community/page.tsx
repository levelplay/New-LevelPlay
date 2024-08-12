import HomeNavbar from "@/components/layout/HomeNavbar";
import React from "react";
import ChatContainer from "./components/chat";

const CommunityChat = () => {
  return (
    <>
      <HomeNavbar/>
      <main className="w-full h-[calc(100vh-80px)] flex flex-col">
        <ChatContainer/>
      </main>
    </>
  );
};

export default CommunityChat;
