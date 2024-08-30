"use client";
import React, { FC } from "react";
import { RootReducerType, store } from "@/redux/store";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  User,
  Switch,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { changeMode, changeModelStatus } from "@/redux/model/controller";
import { logout } from "@/redux/auth/controller";
import Link from "next/link";

const UserAvatar = () => {
  const user = useSelector((e: RootReducerType) => e?.auth?.user);
  const currMode = useSelector((e: RootReducerType) => e.model.mode);

  return user ? (
    <div className="flex gap-5">
      <Button color="primary" radius="full" as={Link} href="/community">
        Chat
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            name={user?.username}
            color="primary"
            className=" cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <User description={user.email} name={user?.username} />
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              if (currMode == "dark") {
                store.dispatch(changeMode("light"));
              } else {
                store.dispatch(changeMode("dark"));
              }
            }}
            endContent={
              <Switch
                size="sm"
                color="default"
                onValueChange={(e) => {
                  if (e) {
                    store.dispatch(changeMode("dark"));
                  } else {
                    store.dispatch(changeMode("light"));
                  }
                }}
                isSelected={currMode == "dark"}
              />
            }
          >
            Dark Mode
          </DropdownItem>
          <DropdownItem
            color="danger"
            onClick={() => {
              store.dispatch(logout());
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ) : (
    <>
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
          className=" max-sm:hidden"
          onClick={() => {
            store.dispatch(changeModelStatus("signUp"));
          }}
        >
          Sign up
        </Button>
      </div>
    </>
  );
};

export default UserAvatar;
