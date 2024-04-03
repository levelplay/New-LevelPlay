import React from "react";
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
import { gameDraw, gameWin, gameLose } from "@/public/images";
import { socket } from "../core/SocketComponent";
import { updateLoading } from "@/redux/socket/controller";

const GameEndModel = () => {
  const { router } = useAppTheme();
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.game?.loading);
  const stateData = useSelector((e: RootReducerType) => e?.model?.data);

  const components: any = {
    win: (
      <>
        <Image
          src={gameWin}
          alt="Victory-Logo"
          width={200}
          height={100}
          className="h-auto w-[90%]"
        />
        <h6 className=" text-xl text-center">
          {" "}
          {stateData?.username ?? `Player ${stateData?.player}`} win
        </h6>
      </>
    ),
    lose: (
      <>
        <Image
          src={gameLose}
          alt="Defeat-Logo"
          width={200}
          height={100}
          className="h-auto w-[90%]"
        />
        <h6 className=" text-xl text-center">
          {" "}
          {stateData?.username ?? `Player ${stateData?.player}`} defeat
        </h6>
      </>
    ),
    draw: (
      <Image
        src={gameDraw}
        alt="Defeat-Logo"
        width={200}
        height={100}
        className="h-auto w-[90%]"
      />
    ),
  };

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
          {components[stateData?.status ?? 2]}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              router.push("/");
              store.dispatch(closeModel());
            }}
            isLoading={loading}
            color="primary"
            variant="flat"
            className="flex-1"
            fullWidth
          >
            Back
          </Button>
          <Button
            isLoading={loading}
            onClick={() => {
              store.dispatch(updateLoading(true));
              socket.emit(
                "pair",
                JSON.stringify({ user: stateData?.username })
              );
            }}
            color="primary"
            className="flex-1"
            fullWidth
          >
            Rematch
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameEndModel;
