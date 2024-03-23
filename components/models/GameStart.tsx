import React from "react";
import { closeModel } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import {
  Avatar,
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

const GameStartModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const users = ["Demi Wilkinson", "Demi Wilkinson"];

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
            {users.map((e, key) => {
              return (
                <div className="flex justify-between items-center" key={e}>
                  <User name={e} description="230 Wins" />
                  {key == 0 ? (
                    <></>
                  ) : (
                    <Button variant="light" color="danger">
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <Input
            className="pt-5"
            placeholder="Search user"
            variant="flat"
            labelPlacement="outside"
            label="Invite Friend"
            fullWidth
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="faded" className="flex-1">
            Single Play
          </Button>
          <Button color="primary" className="flex-1">
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameStartModel;
