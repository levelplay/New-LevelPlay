"use client";
import { socket } from "@/components/core/SocketComponent";
import { AppContainer } from "@/components/layout/AppContainer";
import {
  addCommunityMessage,
  addMessage,
  getCommunityChat,
  loadCommunityChat,
} from "@/redux/chat/controller";
import { RootReducerType, store } from "@/redux/store";
import { Textarea, Button, Spinner, Avatar } from "@nextui-org/react";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";
import { useSelector } from "react-redux";

const ChatContainer = () => {
  const loading = useSelector((e: RootReducerType) => e?.chat?.lazyLoading);
  const [message, setMessage] = useState<string>("");
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const user = useSelector((e: RootReducerType) => e?.auth?.user);
  const chatData = useSelector((e: RootReducerType) => e?.chat?.communityChat);

  function isScrolledToBottom() {
    if (scrollContainer.current) {
      const scrollTop = scrollContainer.current.scrollTop;
      const scrollHeight = scrollContainer.current.scrollHeight;
      const clientHeight = scrollContainer.current.clientHeight;
      return Math.abs(scrollHeight - scrollTop - clientHeight) < 100;
    }
    return false;
  }

  useEffect(() => {
    store.dispatch(getCommunityChat());
    socket.on("newChatGloble", async (e) => {
      await store.dispatch(addMessage(e));
      if (scrollContainer.current && isScrolledToBottom()) {
        scrollContainer.current.scrollTop =
          scrollContainer.current.scrollHeight;
      }
    });
  }, []);

  return (
    <>
      <div
        ref={scrollContainer}
        className="grid w-full overflow-visible scroll-smooth flex-1 youtube-scroll-bar"
      >
        <AppContainer
          ref={scrollContainer}
          className="flex flex-col gap-6 py-4"
        >
          {loading ? (
            <div className="flex-1 flex items-center pt-2 justify-center">
              <Spinner label="loading..." />
            </div>
          ) : (
            <div
              aria-checked={(chatData?.length ?? 0) < 9}
              className="flex justify-center pt-2 items-center aria-checked:hidden"
            >
              <Button
                color="primary"
                startContent={<IoReload />}
                onClick={() => {
                  store.dispatch(loadCommunityChat(chatData?.length));
                }}
              >
                Load More
              </Button>
            </div>
          )}
          {(chatData ?? []).map((e, key) => {
            return (
              <div
                key={key}
                aria-checked={e.userId?._id == user?._id}
                className={"flex gap-3 aria-checked:flex-row-reverse"}
              >
                <div className="relative flex-none">
                  <Avatar name={e?.userId?.username} src={e?.userId?.pic} />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <div className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600">
                    <div className="flex">
                      <div className="w-full text-small font-semibold text-default-foreground">
                        {e?.userId?.username}
                      </div>
                      <div className="flex-end text-small whitespace-nowrap text-default-400">
                        {format(new Date(e.createdAt), "dd,mm,yyyy - hh:mm")}
                      </div>
                    </div>
                    <div className="mt-2 text-small text-default-900">
                      {e.message}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </AppContainer>
      </div>
      <AppContainer className="pb-4 pt-0">
        <Textarea
          aria-label="message"
          classNames={{
            innerWrapper: "items-center",
            label: "hidden",
            input: "py-0 text-medium",
            inputWrapper: "h-15 py-[10px] pl-4 pr-3",
          }}
          endContent={
            <div className="flex h-10 flex-col justify-center">
              <Button
                isIconOnly
                className="bg-foreground"
                radius="lg"
                isDisabled={!message}
                onClick={async () => {
                  socket.emit("chat-globle", {
                    message: message,
                    id: user?._id,
                  });
                  const currentDate = new Date().toISOString();
                  await store.dispatch(
                    addCommunityMessage({
                      userId: user,
                      message: message,
                      createdAt: currentDate,
                    })
                  );
                  setMessage("");
                  if (scrollContainer.current) {
                    scrollContainer.current.scrollTop =
                      scrollContainer.current.scrollHeight;
                  }
                }}
              >
                <FaArrowUp className="cursor-pointer text-default-50 text-xl" />
              </Button>
            </div>
          }
          placeholder="Type a message"
          radius="lg"
          minRows={0}
          rows={0}
          maxRows={5}
          variant="bordered"
          value={message}
          onValueChange={setMessage}
        />
      </AppContainer>
    </>
  );
};

export default ChatContainer;
