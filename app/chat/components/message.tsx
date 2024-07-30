"use client";
import ActionButton from "@/components/input/ActionButton";
import { NextPage } from "@/core/type";
import { noMessage } from "@/public/svg";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { FC, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const messagingChatConversations = [
  {
    message:
      "Hello, I'm having some trouble with a piece of software I recently downloaded from your site. It keeps crashing every time I try to open it.",
    name: "Taylor Smith",
    time: "14:31",
  },
  {
    message: "Every time I attempt to launch the software, it crashes",
    name: "Taylor Smith",
    time: "14:35",
    imageUrl:
      "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/dummy/screenshot-1.png",
  },
  {
    message:
      "Thank you for letting me know, Taylor. Can you tell me which version of the software you're using and what operating system you're on?",
    name: "Kate Moore (Support)",
    time: "14:39",
    isMe: true,
  },
  {
    message:
      "I'm using version 5.2 of the software on Windows 10. It sounds like there might be an issue with the .NET framework on your PC.",
    name: "Taylor Smith",
    time: "15:20",
  },
  {
    message:
      "Thank you for providing those details. It does seem like it could be related to the .NET Framework. To address this, I recommend the following steps:",
    name: "Kate Moore (Support)",
    time: "15:23",
    isMe: true,
  },
  {
    message:
      "Please ensure that you have the latest .NET Framework installed. You can download it directly from the Microsoft website.",
    name: "Kate Moore (Support)",
    time: "15:24",
    isMe: true,
  },
  {
    message:
      "After updating or verifying that you have the latest .NET Framework, please restart your computer.",
    name: "Kate Moore (Support)",
    time: "15:24",
    isMe: true,
  },
  {
    message:
      "Okay, I've updated the .NET Framework and restarted my computer, but the issue persists. The software still crashes upon launching.",
    name: "Taylor Smith",
    time: "16:01",
  },
  {
    message:
      "I'm sorry to hear that the problem continues. Let's try reinstalling the software. Please uninstall the current version, download a fresh copy from our website, and then install that version.",
    name: "Kate Moore (Support)",
    time: "16:05",
    isMe: true,
  },
  {
    message:
      "I've reinstalled the software as you suggested, but unfortunately, it's still not working. It crashes immediately after I open it.",
    name: "Taylor Smith",
    time: "16:25",
  },
  {
    message:
      "Thank you for trying those steps. It seems like a more specific issue with your system. Could you please provide us with the error log that appears when the software crashes? This will help us identify the exact problem.",
    name: "Kate Moore (Support)",
    time: "16:30",
    isMe: true,
  },
  {
    message:
      "Sure, here is the error log. I hope this helps to find a solution.",
    name: "Taylor Smith",
    time: "16:40",
  },
  {
    message:
      "Thank you, Taylor. This is very helpful. Our technical team will review the error log, and I'll get back to you with a solution as soon as possible.",
    name: "Kate Moore (Support)",
    time: "16:45",
    isMe: true,
  },
];

const MessageContainer: FC<NextPage> = ({ searchParams }) => {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="border border-divider col-span-2 rounded-r-xl overflow-hidden grid">
      {searchParams?.id ? (
        <>
          <div className="h-17 flex items-center gap-2 border-b-small border-default-200 p-4 bg-default-50">
            <div className="w-full">
              <div className="text-small font-semibold">Taylor Smith</div>
              <div className="mt-1 text-small text-default-500">
                example123@gmail.com
              </div>
            </div>
            <ActionButton
              options={[
                {
                  children: "Delete",
                  color: "danger",
                },
              ]}
            />
          </div>
          <div className="flex w-full overflow-visible flex-1 flex-col gap-6 px-6 py-4 youtube-scroll-bar">
            {messagingChatConversations.map((e, key) => (
              <div
                key={key}
                aria-checked={e.isMe}
                className={"flex gap-3 aria-checked:flex-row-reverse"}
              >
                <div className="relative flex-none">
                  <Avatar name={e.name} />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <div className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600">
                    <div className="flex">
                      <div className="w-full text-small font-semibold text-default-foreground">
                        {e.name}
                      </div>
                      <div className="flex-end text-small text-default-400">
                        {e.time}
                      </div>
                    </div>
                    <div className="mt-2 text-small text-default-900">
                      {e.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  <Button isIconOnly className="bg-foreground" radius="lg">
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
        <div className="flex flex-col gap-6 justify-center bg-default-50 items-center">
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
