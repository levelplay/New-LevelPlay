import React, { useState } from "react";
import { closeModel } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  User,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher } from "@/core/http";

const LeaderBoardModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const { data, error, isLoading } = useSWR("/me/leaderboard", fetcher);
  const userData = data?.data?.users ?? [];
  const positions = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ];

  return (
    <Modal
      isOpen={state == "leader-board"}
      scrollBehavior="inside"
      onClose={() => {
        store.dispatch(closeModel());
      }}
    >
      <ModalContent>
        <ModalHeader className="flex-col pt-6">
          {data?.data?.users ? (
            <div className="flex items-end justify-center">
              <Avatar
                className="w-12 h-12 translate-x-[16px]"
                name={data?.data?.users[1]?.username || ''}
              />
              <Avatar
                className="w-14 h-14 z-10"
                name={data?.data?.users[0]?.username || ''}
                isBordered
              />
              <Avatar
                className="w-12 h-12 translate-x-[-16px]"
                name={data?.data?.users[2]?.username || ''}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-col gap-1 py-4">
            <h5 className="text-lg font-semibold text-center">
              Watch LeaderBoard
            </h5>
            <p className="text-sm text-center text-foreground-400">
            The leaderboard resets every 5 minutes. Your current progress will reset in {data.data.diff}
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="pb-6 pt-0">
          <div className="flex flex-col gap-4">
            {isLoading ? <div className="flex item-center justify-center h-16">
              <Spinner label="loading..." />
            </div> : userData.length == 0 ? <div className="flex item-center justify-center h-12 underline">
              <p>No Data Found!</p>
            </div> : userData.map(
              (e: any, key: any) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={e.username}
                  >
                    <User name={e.username} description={`${e.win} Wins`} />
                    <p className="text-sm text-foreground-400">
                      {positions[key]}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LeaderBoardModel;
