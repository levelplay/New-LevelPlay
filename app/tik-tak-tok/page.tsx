"use client";
import { socket } from "@/components/core/SocketComponent";
import GameNavBar from "@/components/layout/GameNavBar";
import SafetyLayer from "@/components/layout/SafetyLayer";
import {
  circleDark,
  crossDark,
  circleLight,
  crossLight,
  emptyMark,
} from "@/public/images";
import { changeModelStatus } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import { Button } from "@nextui-org/react";
import "@pixi/events";
import { Container, Graphics, Sprite, Stage } from "@pixi/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// config
const deviceWidth = typeof window == "undefined" ? 0 : window.innerWidth;
const deviceHeight = typeof window == "undefined" ? 0 : window.innerHeight;
const boxWidth = deviceWidth < 600 ? 100 : 125;
const dividerWidth = deviceWidth < 600 ? 8 : 10;
const iconWidth = deviceWidth < 600 ? 76 : 95;
const boxPadding = deviceWidth < 600 ? 12 : 15;

const playerWin = (moves: number[][], player: number) => {
  if (moves[0][0] == player && moves[0][1] == player && moves[0][2] == player) {
    return true;
  }
  if (moves[1][0] == player && moves[1][1] == player && moves[1][2] == player) {
    return true;
  }
  if (moves[2][0] == player && moves[2][1] == player && moves[2][2] == player) {
    return true;
  }
  if (moves[0][0] == player && moves[1][0] == player && moves[2][0] == player) {
    return true;
  }
  if (moves[0][1] == player && moves[1][1] == player && moves[2][1] == player) {
    return true;
  }
  if (moves[0][2] == player && moves[1][2] == player && moves[2][2] == player) {
    return true;
  }
  if (moves[0][0] == player && moves[1][1] == player && moves[2][2] == player) {
    return true;
  }
  if (moves[0][2] == player && moves[1][1] == player && moves[2][0] == player) {
    return true;
  }
  return false;
};

const isdraw = (moves: number[][]) => {
  let draw = moves[0].includes(0);
  if (draw) {
    return false;
  }
  draw = moves[1].includes(0);
  if (draw) {
    return false;
  }
  draw = moves[2].includes(0);
  if (draw) {
    return false;
  }
  return true;
};

const TikTakTokGame = (data: any) => {
  const router = useRouter();
  console.log(data);
  const [turn, setTurn] = useState<number>(1);
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  const username = data.searchParams["username"];
  const player = data.searchParams["player"];
  const user = useSelector((e: RootReducerType) => e.auth.user);
  const currMode = useSelector((e: RootReducerType) => e.model.mode);
  const playerIcon =
    currMode == "dark"
      ? [emptyMark.src, crossDark.src, circleDark.src]
      : [emptyMark.src, crossLight.src, circleLight.src];
  const [containerData, setContainerData] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const onAction = (c_item: number, c_key: number, p_key: number) => {
    if (c_item == 0) {
      const currentData = [...containerData];
      const userIcon = turn;
      if (player) {
        if (currentTurn == turn) {
          currentData[p_key][c_key] = userIcon;
          socket.emit("turn", JSON.stringify({ turn, data: currentData }));
          setContainerData(currentData);
          const draw = isdraw(currentData);
          if (draw) {
            store.dispatch(
              changeModelStatus("game-end", {
                status: "draw",
                player: turn,
                username: username,
              })
            );
          }
          if (currentTurn == 1) {
            setCurrentTurn(2);
          } else {
            setCurrentTurn(1);
          }
        }
        return;
      }
      currentData[p_key][c_key] = userIcon;
      setContainerData(currentData);
      const win = playerWin(currentData, turn);
      const draw = isdraw(currentData);
      if (draw) {
        store.dispatch(
          changeModelStatus("game-end", {
            status: "draw",
            player: turn,
            username: username,
          })
        );
        router.replace("/");
      }
      if (win) {
        store.dispatch(
          changeModelStatus("game-end", {
            status: "win",
            player: turn,
            username: username,
          })
        );
        router.replace("/");
      }
      if (turn == 1) {
        setTurn(2);
      } else {
        setTurn(1);
      }
    }
  };

  const onTimeUp = () => {
    if (player) {
      if (currentTurn == turn) {
        socket.emit("turn", JSON.stringify({ turn, data: containerData }));
        if (currentTurn == 1) {
          setCurrentTurn(2);
        } else {
          setCurrentTurn(1);
        }
      }
    } else {
      if (turn == 1) {
        setTurn(2);
      } else {
        setTurn(1);
      }
    }
  };

  useEffect(() => {
    if (player == "player2") {
      setTurn(2);
    }
    socket.on("gameRes", (e) => {
      const data = JSON.parse(e);
      setContainerData(data.data);
      const draw = isdraw(data.data);
      if (draw) {
        store.dispatch(
          changeModelStatus("game-end", {
            status: "draw",
            player: turn,
            username: username,
          })
        );
        router.replace("/");
      }
      setCurrentTurn(data.turn);
    });
    socket.on("gameWin", (e) => {
      store.dispatch(
        changeModelStatus("game-end", {
          status: "win",
          player: turn,
          username: username,
        })
      );
      router.replace("/");
    });
    socket.on("gameLose", (e) => {
      store.dispatch(
        changeModelStatus("game-end", {
          status: "lose",
          player: turn,
          username: username,
        })
      );
      router.replace("/");
    });
  });

  return (
    <main className="relative">
      <GameNavBar
        activeUser={player ? currentTurn : turn}
        onTimeUp={onTimeUp}
        users={[
          {
            title: player
              ? player == "player1"
                ? user?.username
                : username
              : "P1",
          },
          {
            title: (player
              ? player == "player2"
                ? user?.username
                : username
              : "P2") as string,
          },
        ]}
      />
      <SafetyLayer>
        <Stage
          className="!w-full !h-screen"
          width={deviceWidth}
          height={deviceHeight}
          options={{
            hello: true,
            backgroundColor: currMode == "dark" ? 0x000000 : 0xffffff,
          }}
        >
          <Container
            position={[
              deviceWidth / 2 - boxWidth * 1.6,
              deviceHeight / 2 - boxWidth * 1.6,
            ]}
          >
            {[1, 2].map((e, key) => {
              return (
                <Graphics
                  key={key}
                  draw={(g) => {
                    g.clear();
                    g.beginFill(currMode == "dark" ? 0xffffff : 0x000000, 1);
                    g.drawRoundedRect(
                      0,
                      boxWidth * e + dividerWidth * key,
                      boxWidth * 3 + dividerWidth * 2,
                      dividerWidth,
                      5
                    );
                  }}
                />
              );
            })}
            {[1, 2].map((e, key) => {
              return (
                <Graphics
                  key={key}
                  draw={(g) => {
                    g.clear();
                    g.beginFill(currMode == "dark" ? 0xffffff : 0x000000, 1);
                    g.drawRoundedRect(
                      boxWidth * e + dividerWidth * key,
                      0,
                      dividerWidth,
                      boxWidth * 3 + dividerWidth * 2,
                      5
                    );
                  }}
                />
              );
            })}
            {containerData.map((p_item, p_key) => {
              return (
                <>
                  {p_item.map((c_item, c_key) => {
                    return (
                      <Sprite
                        key={`${p_key}${c_key}`}
                        interactive={true}
                        ontap={() => {
                          onAction(c_item, c_key, p_key);
                        }}
                        onclick={() => {
                          onAction(c_item, c_key, p_key);
                        }}
                        x={boxWidth * c_key + dividerWidth * c_key + boxPadding}
                        y={boxWidth * p_key + dividerWidth * p_key + boxPadding}
                        width={iconWidth}
                        height={iconWidth}
                        image={playerIcon[c_item]}
                      />
                    );
                  })}
                </>
              );
            })}
          </Container>
        </Stage>
      </SafetyLayer>
      <div className="absolute w-full py-4 bottom-0 left-0 flex justify-center items-center dark bg-[#1A1A1A] ">
        <Button
          onClick={(e) => {
            socket.emit("quit", "");
            router.replace("/");
          }}
          size="lg"
          color="danger"
          className=" w-48 bg-[#C90000]"
        >
          Quit
        </Button>
      </div>
    </main>
  );
};

export default TikTakTokGame;
