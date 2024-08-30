import React, { FC, useState } from "react";
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
import Timer from "../core/Timer";
import { showErrorThunk, showSuccessThunk } from "@/redux/toast/controller";

interface DataModal {
  data: any;
  isLoading: boolean;
}

const LeaderBoardModel: FC<DataModal> = ({ data, isLoading }) => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
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
        <ModalHeader className="flex-col pt-10 pb-0">
          {data?.data?.users ? (
            <div className="flex justify-center gap-5">
              <Avatar
                color="primary"
                className="w-16 h-16 bg-transparent text-primary"
                name={data?.data?.users[1]?.username || ""}
                isBordered
              />
              <Avatar
                color="primary"
                className="w-16 h-16 bg-transparent text-primary"
                name={data?.data?.users[0]?.username || ""}
                isBordered
              />
              <Avatar
                color="primary"
                className="w-16 h-16 bg-transparent text-primary"
                name={data?.data?.users[2]?.username || ""}
                isBordered
              />
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-col gap-3 pt-6 pb-8">
            <h5 className="text-2xl font-bold text-center">
              Watch LeaderBoard
            </h5>
            <p className="text-lg text-center font-normal text-foreground/70">
              Most wins gets R100 in{" "}
              {data?.data ? (
                <Timer
                  data={data?.data}
                  onComplete={() => {
                    store.dispatch(
                      showErrorThunk("Dear users round has been over")
                    );
                    if (userData.length > 0) {
                      setTimeout(() => {
                        store.dispatch(
                          showSuccessThunk(
                            `This round winner is ${userData[0]?.username}`
                          )
                        );
                      }, 4000);
                    }
                  }}
                />
              ) : (
                <></>
              )}
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="pb-8 pt-0">
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex item-center justify-center h-16">
                <Spinner label="loading..." />
              </div>
            ) : userData.length == 0 ? (
              <div className="flex item-center text-xl font-bold justify-center underline">
                <p>No Data Found!</p>
              </div>
            ) : (
              userData.map((e: any, key: any) => {
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
              })
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LeaderBoardModel;
