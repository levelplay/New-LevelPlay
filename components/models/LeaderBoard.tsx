import React from "react";
import { closeModel } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  User,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

const LeaderBoardModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);

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
          <div className="flex items-end justify-center">
            <Avatar
              className="w-12 h-12 translate-x-[16px]"
              name="Demi Wilkinson"
            />
            <Avatar
              className="w-14 h-14 z-10"
              name="Demi Wilkinson"
              isBordered
            />
            <Avatar
              className="w-12 h-12 translate-x-[-16px]"
              name="Demi Wilkinson"
            />
          </div>
          <div className="flex flex-col gap-1 py-4">
            <h5 className="text-lg font-semibold text-center">
              Watch LeaderBoard
            </h5>
            <p className="text-sm text-center text-foreground-400">
              You’ve created a new project! Invite colleagues to collaborate on
              this project.
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="pb-6 pt-0">
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => {
              return (
                <div className="flex justify-between items-center" key={e}>
                  <User name="Demi Wilkinson" description="230 Wins" />
                  <p className="text-sm text-foreground-400">1st</p>
                </div>
              );
            })}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LeaderBoardModel;
