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
import { FaCheck } from "react-icons/fa6";
import { MdOutlineClose, MdOutlineQuestionMark } from "react-icons/md";

const GameEndModel = () => {
  const { router } = useAppTheme();
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.game?.loading);
  const stateData = useSelector((e: RootReducerType) => e?.model?.data);
  const user = useSelector((e: RootReducerType) => e?.auth.user);

  const components: any = {
    win: (
      <>
        <div className="flex justify-center items-center bg-primary text-secondary border-secondary/60 border-3 absolute top-[-22%] left-1/2 translate-x-[-50%] w-24 h-24 rounded-full text-6xl">
          <FaCheck />
        </div>
        <div />
        <h6 className="text-2xl text-center text-foreground font-bold">
          Success
        </h6>
        <p className="text-center text-sm ">Successfully complete the game</p>
      </>
    ),
    lose: (
      <>
        <div className="flex justify-center items-center bg-primary text-secondary border-secondary/60 border-3 absolute top-[-22%] left-1/2 translate-x-[-50%] w-24 h-24 rounded-full text-6xl">
          <MdOutlineClose />
        </div>
        <div />
        <h6 className="text-2xl text-center text-foreground font-bold">
          Defeat
        </h6>
        <p className="text-center text-sm ">Fail to complete the game.</p>
      </>
    ),
    draw: (
      <>
        <div className="flex justify-center items-center bg-primary text-secondary border-secondary/60 border-3 absolute top-[-22%] left-1/2 translate-x-[-50%] w-24 h-24 rounded-full text-6xl">
          <MdOutlineQuestionMark />
        </div>
        <div />
        <h6 className="text-2xl text-center text-foreground font-bold">Draw</h6>
        <p className="text-center text-sm ">The game has draw end.</p>
      </>
    ),
  };

  return (
    <Modal
      isOpen={state == "game-end"}
      backdrop="blur"
      hideCloseButton
      size="sm"
      radius="lg"
    >
      <ModalContent className="overflow-visible border border-black dark:border-white">
        <ModalBody className="py-0 flex justify-center items-center flex-col gap-5 pt-12">
          {components[stateData?.status ?? 2]}
        </ModalBody>
        <ModalFooter className="gap-4 p-4 pt-8">
          <Button
            onClick={() => {
              store.dispatch(closeModel());
            }}
            isLoading={loading}
            color="primary"
            variant="bordered"
            className="flex-1"
            fullWidth
          >
            Back
          </Button>
          <Button
            isLoading={loading}
            onClick={() => {
              if (stateData?.username) {
                store.dispatch(updateLoading(true));
                socket.emit(
                  "pair",
                  JSON.stringify({ user: stateData?.username })
                );
              } else {
                router.push("/tik-tak-tok");
                store.dispatch(closeModel());
              }
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
