"use client";
import { socket } from "@/components/core/SocketComponent";
import GameNavBar from "@/components/layout/GameNavBar";
import SafetyLayer from "@/components/layout/SafetyLayer";
import { circleMark, crossMark, emptyMark } from "@/public/images";
import { changeModelStatus } from "@/redux/model/controller";
import { RootReducerType, store } from "@/redux/store";
import { Button } from "@nextui-org/react";
import "@pixi/events";
import { Container, Graphics, Sprite, Stage } from "@pixi/react";
import { useSearchParams } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// config
const boxWidth = 125;
const dividerWidth = 10;
const iconWidth = 95;
const boxPadding = 15;
const playerIcon = [emptyMark.src, circleMark.src, crossMark.src];
const deviceWidth = typeof window == "undefined" ? 0 : window.innerWidth;
const deviceHeight = typeof window == "undefined" ? 0 : window.innerHeight;

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

const TikTakTokGame = () => {
  const [turn, setTurn] = useState<number>(1);
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const player = searchParams.get("player");
  const user = useSelector((e: RootReducerType) => e.auth.user);
  const router = useRouter();
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
          changeModelStatus("game-end", { status: "draw", player: turn })
        );
      }
      setCurrentTurn(data.turn);
    });
    socket.on("gameWin", (e) => {
      store.dispatch(
        changeModelStatus("game-end", { status: "win", player: turn })
      );
      router.replace('/')
    });
    socket.on("gameLose", (e) => {
      store.dispatch(
        changeModelStatus("game-end", { status: "lose", player: turn })
      );
      router.replace('/')
    });
  });
  const defultData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [containerData, setContainerData] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  return (
    <main>
      <GameNavBar
        activeUser={player ? currentTurn : turn}
        onTimeUp={() => {
          if (player) {
            if (currentTurn == turn) {
              socket.emit(
                "turn",
                JSON.stringify({ turn, data: containerData })
              );
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
        }}
        users={[
          {
            title: "Player 1",
            description: (player
              ? player == "player1"
                ? user?.username
                : username
              : "") as string,
          },
          {
            title: "Player 2",
            description: (player
              ? player == "player2"
                ? user?.username
                : username
              : "") as string,
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
            backgroundColor: 0x141414,
          }}
        >
          <Container
            position={[
              deviceWidth / 2 - boxWidth * 1.6,
              deviceHeight / 2 - boxWidth * 1.3,
            ]}
          >
            {[1, 2].map((e, key) => {
              return (
                <Graphics
                  key={key}
                  draw={(g) => {
                    g.clear();
                    g.beginFill(0xffffff, 1);
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
                    g.beginFill(0xffffff, 1);
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
                        onclick={() => {
                          if (c_item == 0) {
                            const currentData = [...containerData];
                            const userIcon = turn;
                            if (player) {
                              if (currentTurn == turn) {
                                currentData[p_key][c_key] = userIcon;
                                socket.emit(
                                  "turn",
                                  JSON.stringify({ turn, data: currentData })
                                );
                                setContainerData(currentData);
                                const draw = isdraw(currentData);
                                if (draw) {
                                  store.dispatch(
                                    changeModelStatus("game-end", {
                                      status: "draw",
                                      player: turn,
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
                                })
                              );
                            }
                            if (win) {
                              store.dispatch(
                                changeModelStatus("game-end", {
                                  status: "win",
                                  player: turn,
                                })
                              );
                            }
                            if (turn == 1) {
                              setTurn(2);
                            } else {
                              setTurn(1);
                            }
                          }
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
      <div className=" absolute w-full py-6 bottom-0 left-0 flex justify-center items-center z">
        <Button onClick={(e)=>{
          socket.emit('quit', '');
          router.replace('/');
        }} color="danger" className=" w-40">Quit</Button>
      </div>
    </main>
  );
};

export default TikTakTokGame;
