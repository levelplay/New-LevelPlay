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
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { changeModelStatus } from "@/redux/model/controller";
import { logout } from "@/redux/auth/controller";

const UserAvatar = () => {
  const user = useSelector((e: RootReducerType) => e?.auth?.user);

  return user ? (
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
            store.dispatch(changeModelStatus("game-start"));
          }}
        >
          Play Now
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            store.dispatch(changeModelStatus("leader-board"));
          }}
        >
          Leaderboard
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
  ) : (
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
        onClick={() => {
          store.dispatch(changeModelStatus("signUp"));
        }}
      >
        Sign up
      </Button>
    </div>
  );
};

export default UserAvatar;
