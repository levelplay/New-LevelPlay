import React, { useState } from "react";
import { closeModel } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useAppTheme } from "@/theme/apptheme";
import Image from "next/image";
import { defeatLogo, victoryLogo } from "@/public/images";

const GameEndModel = () => {
  const { router } = useAppTheme();
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const stateData = useSelector((e: RootReducerType) => e?.model?.data);

  return (
    <Modal
      isOpen={state == "game-end"}
      classNames={{
        base: "bg-black",
      }}
      size="sm"
      radius="lg"
    >
      <ModalContent>
        <ModalBody className="py-6 pb-4 flex justify-center items-center">
          {stateData?.status == "win" ? (
            <Image
              src={victoryLogo}
              alt="Victory-Logo"
              width={200}
              height={100}
              className="h-auto w-[90%]"
            />
          ) : (
            <Image
              src={defeatLogo}
              alt="Defeat-Logo"
              width={200}
              height={100}
              className="h-auto w-[90%]"
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              router.push("/");
              store.dispatch(closeModel());
            }}
            color="primary"
            className="flex-1"
          >
            Go Back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameEndModel;
