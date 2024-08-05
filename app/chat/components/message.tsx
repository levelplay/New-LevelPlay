"use client";
import Image from "next/image";
import ActionButton from "@/components/input/ActionButton";
import { socket } from "@/components/core/SocketComponent";
import { NextPage } from "@/core/type";
import { noMessage } from "@/public/svg";
import {
  addMessage,
  getChat,
  getContact,
  removeContact,
} from "@/redux/chat/controller";
import { RootReducerType, store } from "@/redux/store";
import { useAppTheme } from "@/theme/apptheme";
import { Avatar, Button, Spinner, Textarea } from "@nextui-org/react";
import { FC, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const MessageContainer: FC<NextPage> = ({ searchParams }) => {
  const { router } = useAppTheme();
  const [message, setMessage] = useState<string>("");
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const user = useSelector((e: RootReducerType) => e?.auth?.user);
  const chatData = useSelector((e: RootReducerType) => e?.chat?.chat);
  const loading = useSelector((e: RootReducerType) => e?.chat?.lazyLoading);

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
    async function fetchData() {
      await store.dispatch(getChat(searchParams.contactId));
      if (scrollContainer.current) {
        scrollContainer.current.scrollTop =
          scrollContainer.current.scrollHeight;
      }
    }
    fetchData();
  }, [searchParams.contactId]);

  useEffect(() => {
    store.dispatch(getContact());
    console.log("socket is on");
    socket.on("newChat", async (e) => {
      await store.dispatch(addMessage(e));
      if (scrollContainer.current && isScrolledToBottom()) {
        scrollContainer.current.scrollTop =
          scrollContainer.current.scrollHeight;
      }
    });
  }, []);

  return (
    <div
      className="border border-divider col-span-2 rounded-r-xl overflow-hidden flex flex-col"
      onClick={() => {
        console.log(isScrolledToBottom());
      }}
    >
      {searchParams?.contactId ? (
        <>
          <div className="h-17 flex items-center gap-2 border-b-small border-default-200 p-4 bg-default-50">
            <div className="w-full">
              <div className="text-small font-semibold">
                {searchParams?.name}
              </div>
              <div className="mt-1 text-small text-default-500">
                {searchParams?.email}
              </div>
            </div>
            <ActionButton
              options={[
                {
                  children: "Remove Chat",
                  color: "danger",
                  onClick: async () => {
                    const result = await store.dispatch(
                      removeContact(searchParams?.contactId)
                    );
                    if (result.success) {
                      router.push("/chat");
                    }
                  },
                },
              ]}
            />
          </div>
          <div
            ref={scrollContainer}
            className="flex w-full overflow-visible scroll-smooth flex-1 flex-col gap-6 px-6 py-4 youtube-scroll-bar"
          >
            {loading ? (
              <div className="flex-1 flex items-center pt-4 justify-center">
                <Spinner label="loading..." />
              </div>
            ) : (
              <></>
            )}
            {(chatData ?? []).map((e, key) => {
              return (
                <div
                  key={key}
                  aria-checked={e.senderId?._id == user?._id}
                  className={"flex gap-3 aria-checked:flex-row-reverse"}
                >
                  <div className="relative flex-none">
                    <Avatar
                      name={e?.senderId?.username}
                      src={e?.senderId?.pic}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-4">
                    <div className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600">
                      <div className="flex">
                        <div className="w-full text-small font-semibold text-default-foreground">
                          {e?.senderId?.username}
                        </div>
                        <div className="flex-end text-small whitespace-nowrap text-default-400">
                          {format(new Date(e.createdAt), "hh:mm a")}
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
          </div>
          <div className="p-3 pt-0">
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
                      socket.emit("chat", {
                        ...searchParams,
                        message: message,
                      });
                      const currentDate = new Date().toISOString();
                      await store.dispatch(
                        addMessage({
                          senderId: user,
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
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 flex-1 justify-center bg-default-50 items-center">
          <Image
            src={noMessage}
            alt="no message"
            width={400}
            height={400}
            className="h-auto w-72"
          />
          <p className="text-lg">please select chat</p>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
