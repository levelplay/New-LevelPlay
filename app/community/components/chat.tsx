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
  const currMode = useSelector((e: RootReducerType) => e?.model?.mode);

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
    async function fetchChatData() {
      const result = await store.dispatch(getCommunityChat());
      if (result.success && scrollContainer.current) {
        scrollContainer.current.scrollTop =
          scrollContainer.current.scrollHeight;
      }
    }

    fetchChatData();

    const handleNewChat = async (e: any) => {
      await store.dispatch(addCommunityMessage(e));
      if (scrollContainer.current && isScrolledToBottom()) {
        scrollContainer.current.scrollTop =
          scrollContainer.current.scrollHeight;
      }
    };

    socket.on("newChatGloble", handleNewChat);

    return () => {
      socket.off("newChatGloble", handleNewChat); // Clean up the socket listener
    };
  }, []);

  return (
    <>
      <div
        ref={scrollContainer}
        className="grid w-full overflow-visible scroll-smooth flex-1 youtube-scroll-bar border-divider border max-md:border-0 rounded-[20px]"
      >
        <AppContainer className="flex flex-col gap-6 py-4">
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
                size="lg"
                startContent={<IoReload />}
                onClick={() => {
                  store.dispatch(loadCommunityChat(chatData?.length));
                }}
              >
                Load More
              </Button>
            </div>
          )}
          {(chatData ? [...chatData] : [])
            .sort((a, b) => {
              const aDate = new Date(a.createdAt).getTime();
              const bDate = new Date(b.createdAt).getTime();
              return aDate - bDate;
            })
            .map((e, key) => {
              return (
                <div
                  key={key}
                  aria-checked={e.userId?._id == user?._id}
                  className={
                    "flex gap-3 max-w-2xl min-w-96 mr-auto aria-checked:flex-row-reverse aria-checked:ml-auto aria-checked:mr-0 max-sm:min-w-0 max-sm:w-full"
                  }
                >
                  <div className="relative flex-none">
                    <Avatar className="w-14 h-14" color="primary" name={e?.userId?.username} src={e?.userId?.pic} />
                  </div>
                  <div className="flex w-full flex-col gap-4">
                    <div className={`relative w-full rounded-medium p-4 bg-primary bg-opacity-60`}>
                      <div className={`flex gap-2 items-center`}>
                        <div className="w-full text-lg font-semibold flex-1 text-secondary">
                          {e?.userId?.username}
                        </div>
                        <div className="flex-end text-sm text-right text-secondary opacity-80">
                          {format(new Date(e.createdAt), "dd,MM,yy - hh:mm")}
                        </div>
                      </div>
                      <div className="mt-2 text-base text-secondary opacity-80">
                        {e.message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </AppContainer>
        <AppContainer className="py-4 sticky bottom-0 bg-background flex items-center justify-center">
          <Textarea
            aria-label="message"
            className="max-w-4xl"
            color="primary"
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
                  radius="lg"
                  color="primary"
                  isDisabled={!(message.trim().length > 0)}
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
      </div>
    </>
  );
};

export default ChatContainer;
