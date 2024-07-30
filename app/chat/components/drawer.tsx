"use client";
import { constructURL } from "@/core/constructURL";
import { NextPage } from "@/core/type";
import { changeModelStatus } from "@/redux/model/controller";
import { store } from "@/redux/store";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Input,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";

const messagingChatList = [
  {
    id: 1,
    name: "Tony Reichert",
    message: "Hi, I'm having trouble logging into my account. Can you help?",
    count: 6,
    time: "12:34",
  },
  {
    id: 2,
    name: "Jordan Davi",
    message:
      "I keep getting an error message when I try to checkout my cart. The error code is 5003.m",
    count: 2,
    time: "18:40",
  },
  {
    id: 3,
    name: "Taylor Smith",
    message:
      "I noticed a charge on my credit card from your service, but I don’t remember authorizing it. Can you explain what it's for?",
    count: 0,
    time: "12:19",
    active: true,
  },
  {
    id: 4,
    name: "Casey Williams",
    message:
      "I've forgotten my password and can't seem to reset it using the website.",
    count: 1,
    time: "22:04",
  },
  {
    id: 5,
    name: "Robin Rodriguez",
    message:
      "Hey there, I just received my order, but the item is damaged. What can I do about this?",
    count: 4,
    time: "17:05",
  },
  {
    id: 6,
    name: "Brian Kim",
    message:
      "I've been on hold for over 30 minutes trying to reach customer service. Is there a faster way to get help?",
    count: 0,
    time: "20:11",
  },
  {
    id: 7,
    name: "Michael Hunt",
    message:
      "I was charged for a subscription renewal, but I had canceled it last week. Can you check what happened?",
    count: 3,
    time: "22:35",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    message:
      "I'm having difficulty installing the software I purchased from your site. Is there a guide or customer support line I can call?",
    count: 2,
    time: "15:13",
  },
  {
    id: 9,
    name: "Frank Harrison",
    message:
      "My promo code isn't working at checkout even though it's supposed to be valid until the end of the month. Can you assist?",
    count: 0,
    time: "11:35",
  },
  {
    id: 10,
    name: "Emma Adams",
    message:
      "I've changed my email address and need to update my account details. How can I do this securely?",
    count: 0,
    time: "19:04",
  },
  {
    id: 11,
    name: "Tony Reichert",
    message: "Hi, I'm having trouble logging into my account. Can you help?",
    count: 6,
    time: "12:34",
  },
  {
    id: 12,
    name: "Jordan Davi",
    message:
      "I keep getting an error message when I try to checkout my cart. The error code is 5003.m",
    count: 2,
    time: "18:40",
  },
  {
    id: 13,
    name: "Taylor Smith",
    message:
      "I noticed a charge on my credit card from your service, but I don’t remember authorizing it. Can you explain what it's for?",
    count: 0,
    time: "12:19",
  },
  {
    id: 14,
    name: "Casey Williams",
    message:
      "I've forgotten my password and can't seem to reset it using the website.",
    count: 1,
    time: "22:04",
  },
  {
    id: 15,
    name: "Robin Rodriguez",
    message:
      "Hey there, I just received my order, but the item is damaged. What can I do about this?",
    count: 4,
    time: "17:05",
  },
  {
    id: 16,
    name: "Brian Kim",
    message:
      "I've been on hold for over 30 minutes trying to reach customer service. Is there a faster way to get help?",
    count: 0,
    time: "20:11",
  },
  {
    id: 17,
    name: "Michael Hunt",
    message:
      "I was charged for a subscription renewal, but I had canceled it last week. Can you check what happened?",
    count: 3,
    time: "22:35",
  },
  {
    id: 18,
    name: "Samantha Brooks",
    message:
      "I'm having difficulty installing the software I purchased from your site. Is there a guide or customer support line I can call?",
    count: 2,
    time: "15:13",
  },
  {
    id: 19,
    name: "Frank Harrison",
    message:
      "My promo code isn't working at checkout even though it's supposed to be valid until the end of the month. Can you assist?",
    count: 0,
    time: "11:35",
  },
  {
    id: 20,
    name: "Emma Adams",
    message:
      "I've changed my email address and need to update my account details. How can I do this securely?",
    count: 0,
    time: "19:04",
  },
];

const ContactDrawer: FC<NextPage> = ({ searchParams }) => {
  return (
    <div className="border border-divider rounded-l-xl overflow-visible">
      <header className={"flex w-full items-center justify-between py-4 px-6"}>
        <div
          className={
            "flex w-full items-center text-large font-bold text-foreground justify-start"
          }
        >
          <h2 className="text-large font-bold text-foreground">Chats</h2>
          <Chip
            classNames={{
              base: "h-[18px] ml-2 bg-default-100",
              content: "text-default-600 text-[10px] font-medium",
            }}
            size="sm"
            variant="flat"
          >
            24
          </Chip>
          <div className="flex-1" />
          <Button
            startContent={<FaPlus />}
            size="sm"
            onClick={() => {
              store.dispatch(changeModelStatus("new-contact"));
            }}
          >
            New Contact
          </Button>
        </div>
      </header>
      <div className="pb-4 px-6">
        <Input
          aria-label="Search"
          labelPlacement="outside"
          placeholder="Search..."
          radius="md"
          startContent={<RiSearchLine className="text-default-500 text-lg" />}
          variant="flat"
        />
      </div>
      <div className="flex h-full max-h-[calc(100vh-250px)] flex-col gap-6 youtube-scroll-bar px-3">
        <Listbox
          classNames={{
            base: "p-0",
          }}
          items={messagingChatList}
          variant="flat"
        >
          {messagingChatList.map((e, key) => {
            return (
              <ListboxItem
                key={key}
                aria-checked={e.id == searchParams?.id}
                className={"mb-2 px-4 aria-checked:bg-default-100"}
                endContent={
                  <div className="text-small text-default-400">{e.time}</div>
                }
                textValue={e.name}
                as={Link}
                href={constructURL("/chat", {
                  id: e.id,
                })}
              >
                <div className="flex items-center gap-2 py-1">
                  {e.count == 0 ? (
                    <Avatar alt={e.name} className="flex-shrink-0" size="sm" />
                  ) : (
                    <Badge color="danger" content={e.count}>
                      <Avatar
                        alt={e.name}
                        className="flex-shrink-0"
                        size="sm"
                      />
                    </Badge>
                  )}
                  <div className="ml-2 min-w-0 flex-1">
                    <div className="text-small font-medium text-default-foreground">
                      {e.name}
                    </div>
                    <div className="truncate text-small text-default-500">
                      {e.message}
                    </div>
                  </div>
                </div>
              </ListboxItem>
            );
          })}
        </Listbox>
      </div>
    </div>
  );
};

export default ContactDrawer;
