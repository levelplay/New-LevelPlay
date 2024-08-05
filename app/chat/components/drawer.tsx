"use client";
import { constructURL } from "@/core/constructURL";
import { NextPage } from "@/core/type";
import { changeModelStatus } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import {
  Avatar,
  Button,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  Spinner,
} from "@nextui-org/react";
import { format } from "date-fns";
import Link from "next/link";
import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const ContactDrawer: FC<NextPage> = ({ searchParams }) => {
  const loading = useSelector((e: RootReducerType) => e?.chat?.detailLoading);
  const contactData = useSelector((e: RootReducerType) => e?.chat?.data);
  const [search, setSearch] = useState<string>("");

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
            {contactData?.contacts?.length ?? 0}
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
          value={search}
          onValueChange={setSearch}
        />
      </div>
      <div className="flex h-full max-h-[calc(100vh-250px)] flex-col gap-6 youtube-scroll-bar px-3">
        {loading ? (
          <div className="flex-1 flex items-center pt-4 justify-center">
            <Spinner label="loading..." />
          </div>
        ) : (
          <Listbox
            classNames={{
              base: "p-0",
            }}
            emptyContent={"Contact Not Found!"}
            items={contactData?.contacts ?? []}
            variant="flat"
          >
            {(contactData?.contacts ?? [])
              .filter((e) => e.otherUser.username.includes(search))
              .map((e, key) => {
                const messages = contactData?.chats.filter(
                  (a) => a.contactId == e?._id
                )[0];

                const data = messages ?? {
                  createdAt: e.createdAt,
                  message: `${e.otherUser.email} has been added in your contact list`,
                };

                return (
                  <ListboxItem
                    key={key}
                    aria-checked={e?._id == searchParams?.contactId}
                    className={"mb-2 px-4 aria-checked:bg-default-100"}
                    endContent={
                      <div className="text-small text-default-400">
                        {format(new Date(data.createdAt), "hh:mm a")}
                      </div>
                    }
                    textValue={e?.otherUser?.username}
                    as={Link}
                    href={constructURL("/chat", {
                      email: e?.otherUser?.email,
                      id: e?.otherUser?._id,
                      name: e?.otherUser?.username,
                      contactId: e?._id,
                    })}
                    onClick={() => {}}
                  >
                    <div className="flex items-center gap-2 py-1">
                      <Avatar
                        alt={e?.otherUser?.username}
                        name={e?.otherUser?.username}
                        src={e?.otherUser?.pic}
                        className="flex-shrink-0"
                        size="sm"
                      />
                      <div className="ml-2 min-w-0 flex-1">
                        <div className="text-small font-medium text-default-foreground">
                          {e?.otherUser?.username}
                        </div>
                        <div className="truncate text-small text-default-500">
                          {data.message}
                        </div>
                      </div>
                    </div>
                  </ListboxItem>
                );
              })}
          </Listbox>
        )}
      </div>
    </div>
  );
};

export default ContactDrawer;
