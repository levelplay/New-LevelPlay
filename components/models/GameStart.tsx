import React, { useState } from "react";
import { closeModel } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { socket } from "../core/SocketComponent";
import { updateLoading } from "@/redux/socket/controller";
import { useRouter } from "next/navigation";
import { showErrorThunk } from "@/redux/toast/controller";
const GameStartModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const user = useSelector((e: RootReducerType) => e?.auth?.user);
  const loading = useSelector((e: RootReducerType) => e.game.loading);
  const [users, setuser] = useState("");
  const [tempUsers, setTempUser] = useState("");
  const { push } = useRouter();
  return (
    <Modal
      isOpen={state == "game-start"}
      onClose={() => {
        store.dispatch(closeModel());
      }}
    >
      <ModalContent>
        <ModalHeader className="flex-col pt-6">
          <div className="flex flex-col items-start gap-1">
            <h5 className="text-lg font-semibold">Play Multiple Game</h5>
            <p className="text-sm text-foreground-400">
              You’ve created a new project! Invite colleagues to collaborate on
              this project.
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="pb-6 pt-2">
          <div className="flex flex-col gap-4">
            <div
              className="flex justify-between items-center"
              key={user?.username || ""}
            >
              <User name={user?.username || ""} description={user?.email} />
            </div>
          </div>
          <Input
            className="pt-5"
            placeholder="Enter Username"
            variant="flat"
            onChange={(e) => {
              setTempUser(e.target.value);
            }}
            endContent={
              <Button
                color="primary"
                size="sm"
                isLoading={loading}
                onClick={() => {
                  if (tempUsers != "") {
                    store.dispatch(updateLoading(true));
                    socket.emit("pair", JSON.stringify({ user: users }));
                  } else {
                    store.dispatch(showErrorThunk("Please enter username"));
                  }
                }}
              >
                Invite
              </Button>
            }
            labelPlacement="outside"
            label="Invite Friend"
            fullWidth
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              push("/tik-tak-tok");
              store.dispatch(closeModel());
            }}
            isLoading={loading}
            variant="faded"
            className="flex-1"
          >
            Single Play
          </Button>
          <Button
            isLoading={loading}
            onClick={(e) => {
              store.dispatch(updateLoading(true));
              socket.emit("pair", JSON.stringify({ user: "" }));
            }}
            color="primary"
            className="flex-1"
          >
            Random Play
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameStartModel;
