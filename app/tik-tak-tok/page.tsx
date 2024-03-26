"use client";
import GameNavBar from "@/components/layout/GameNavBar";
import SafetyLayer from "@/components/layout/SafetyLayer";
import { circleMark, crossMark, emptyMark } from "@/public/images";
import { store } from "@/redux/store";
import { showSuccessThunk } from "@/redux/toast/controller";
import { Avatar, User } from "@nextui-org/react";
import { DRAW_MODES } from "@pixi/core";
import "@pixi/events";
import { Container, Graphics, Sprite, Stage } from "@pixi/react";
import React, { FC, useEffect, useMemo, useState } from "react";

// config
const boxWidth = 125;
const dividerWidth = 10;
const iconWidth = 95;
const boxPadding = 15;
const playerIcon = [emptyMark.src, circleMark.src, crossMark.src];
const deviceWidth = typeof window == "undefined" ? 0 : window.innerWidth;
const deviceHeight = typeof window == "undefined" ? 0 : window.innerHeight;

const playerWin=(moves: number[][], player: number)=>{
  if(moves[0][0] == player &&  moves[0][1] == player && moves[0][2] == player   ){
    return true;
  }
  if(moves[1][0] == player &&  moves[1][1] == player && moves[1][2] == player   ){
    return true;
  }
  if(moves[2][0] == player &&  moves[2][1] == player && moves[2][2] == player   ){
    return true;
  }
  if(moves[0][0] == player &&  moves[1][0] == player && moves[2][0] == player   ){
    return true;
  }
  if(moves[0][1] == player &&  moves[1][1] == player && moves[2][1] == player   ){
    return true;
  }
  if(moves[0][2] == player &&  moves[1][2] == player && moves[2][2] == player   ){
    return true;
  }
  if(moves[0][0] == player &&  moves[1][1] == player && moves[2][2] == player   ){
    return true;
  }
  if(moves[0][2] == player &&  moves[1][1] == player && moves[2][0] == player   ){
    return true;
  }
  return false;
}

const TikTakTokGame = () => {
  const [turn, setTurn] = useState<number>(1);
  const defultData= [
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
        activeUser={turn}
        onTimeUp={() => {}}
        users={[
          {
            title: "Demi Wilkinson",
            description: "example@gmail.com",
          },
          {
            title: "Demi Wilkinson",
            description: "example@gmail.com",
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
              deviceWidth / 2 - boxWidth * 1.5,
              deviceHeight / 2 - boxWidth,
            ]}
          >
            {[1, 2].map((e, key) => {
              return (
                <Graphics
                  key={key}
                  draw={(g) => {
                    g.clear();
                    g.beginFill(0xfcc829, 1);
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
                    g.beginFill(0xfcc829, 1);
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
                          const userIcon = turn;
                          const currentData = [...containerData];
                          currentData[p_key][c_key] = userIcon;
                          setContainerData(currentData);
                          const win = playerWin(currentData, turn);
                          if(win){
                            store.dispatch(showSuccessThunk(`Player ${ turn } win.`));
                            setContainerData([...defultData]);
                          }
                          if(turn==1){
                            setTurn(2);
                          }else{
                            setTurn(1);
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
    </main>
  );
};

export default TikTakTokGame;
