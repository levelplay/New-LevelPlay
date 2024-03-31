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
import { defeatLogo, victoryLogo } from "@/public/images";
import { useSearchParams } from "next/navigation";
import { socket } from "../core/SocketComponent";
import { updateLoading } from "@/redux/socket/controller";

const GameEndModel = () => {
  const { router } = useAppTheme();
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.game?.loading);
  const stateData = useSelector((e: RootReducerType) => e?.model?.data);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
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
            <>
              <Image
                src={victoryLogo}
                alt="Victory-Logo"
                width={200}
                height={100}
                className="h-auto w-[90%]"
              />
              <h6 className=" text-xl text-center"> User Name win</h6>
            </>
          ) : (
            <>
              <Image
                src={defeatLogo}
                alt="Defeat-Logo"
                width={200}
                height={100}
                className="h-auto w-[90%]"
              />
              <h6 className=" text-xl text-center"> User Name win</h6>
            </>
          )}
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
              socket.emit("pair", JSON.stringify({ user: username }));
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
