"use client";
import { RootReducerType, store } from "@/redux/store";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import {
  showChallengeThunk,
  showErrorThunk,
  showSuccessThunk,
} from "@/redux/toast/controller";
import { FaCheck } from "react-icons/fa6";
import { socket } from "../core/SocketComponent";

const AppToast = () => {
  const state: any = useSelector<RootReducerType>((state) => state.toast);
  const [errorMessage, setErrorMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [challengeMessage, setChallengeMessage] = useState(false);
  const activeTime = 5000;
  const challengeUser: any = state?.challenge
    ? JSON.parse(state?.challenge)
    : {};

  useEffect(() => {
    if (state.error != "") {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
        store.dispatch(showErrorThunk(""));
      }, activeTime);
    }
  }, [state.error]);

  useEffect(() => {
    if (state.success != "") {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        store.dispatch(showSuccessThunk(""));
      }, activeTime);
    }
  }, [state.success]);

  useEffect(() => {
    if (state.warning != "") {
      setWarningMessage(true);
      setTimeout(() => {
        setWarningMessage(false);
        store.dispatch(showErrorThunk(""));
      }, activeTime);
    }
  }, [state.warning]);

  useEffect(() => {
    if (state.challenge != "") {
      setChallengeMessage(true);
      setTimeout(() => {
        setChallengeMessage(false);
        store.dispatch(showChallengeThunk(""));
      }, 30000);
    }
  }, [state.challenge]);

  return (
    <>
      <div
        id="toast-success"
        className="flex items-center max-w-full w-fit max-sm:w-[calc(100%-48px)] px-3 py-2 pr-4 gap-3 text-gray-500 bg-white rounded-lg shadow-md fixed bottom-6 left-6 scale-0 opacity-0 aria-checked:scale-100 aria-checked:opacity-100 duration-100 z-[1000000]"
        aria-checked={successMessage}
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="text-sm font-normal flex-1">{state.success}</div>
      </div>
      <div
        id="toast-danger"
        aria-checked={errorMessage}
        className="flex items-center max-w-full w-fit max-sm:w-[calc(100%-48px)] px-3 py-2 pr-4 gap-3 text-gray-500 bg-white rounded-lg  shadow-md fixed bottom-6 left-6 scale-0 opacity-0 aria-checked:scale-100 aria-checked:opacity-100 duration-100 z-[1000000]"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="text-sm font-normal flex-1">{state.error}</div>
      </div>

      <div
        id="toast-warning"
        aria-checked={warningMessage}
        className="flex items-center max-w-full w-fit max-sm:w-[calc(100%-48px)] px-3 py-2 pr-4 gap-3 text-gray-500 bg-white rounded-lg  shadow-md fixed bottom-6 left-6 scale-0 opacity-0 aria-checked:scale-100 aria-checked:opacity-100 duration-100 z-[1000000]"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
        <div className="text-sm font-normal flex-1">{state.warning}</div>
      </div>
      <div
        id="toast-challenge"
        aria-checked={challengeMessage}
        className="flex justify-center overflow-hidden bg-secondary min-w-60 flex-col max-w-full w-fit max-sm:w-[calc(100%-32px)] pb-4 gap-2 text-gray-500 rounded-lg  shadow-md fixed bottom-6 left-6 max-sm:bottom-4 max-sm:left-4 max-sm:right-4  scale-0 opacity-0 aria-checked:scale-100 aria-checked:opacity-100 duration-100 z-[1000000]"
      >
        {/* <div className="inline-flex items-center justify-center text-2xl flex-shrink-0 w-8 h-8 text-orange-500 bg-gray-100 rounded-lg">
          <FaFantasyFlightGames />
        </div> */}
        <div className="w-full h-7 px-4 gap-1.5 flex items-center bg-primary">
          <span className="h-2 w-2 rounded-full bg-danger" />
          <span className="h-2 w-2 rounded-full bg-warning" />
          <span className="h-2 w-2 rounded-full bg-success" />
        </div>
        <div className="text-base font-medium px-4 text-ellipsis overflow-hidden whitespace-nowrap text-foreground">
          {challengeUser?.username}
        </div>
        <div className="flex gap-2 justify-end w-full px-4">
          <Button
            color="danger"
            variant="flat"
            size="sm"
            radius="full"
            className="text-lg"
            isIconOnly
            onClick={() => {
              setChallengeMessage(false);
              store.dispatch(showChallengeThunk(""));
              socket.emit(
                "reject",
                JSON.stringify({ user: challengeUser.email, accept: true })
              );
            }}
          >
            <MdClose />
          </Button>
          <Button
            color="success"
            size="sm"
            variant="flat"
            radius="full"
            className="text-lg"
            isIconOnly
            onClick={() => {
              setChallengeMessage(false);
              store.dispatch(showChallengeThunk(""));
              socket.emit(
                "challenge",
                JSON.stringify({ user: challengeUser.email, accept: true })
              );
            }}
          >
            <FaCheck />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppToast;
