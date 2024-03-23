"use client";
import GameNavBar from "@/components/layout/GameNavBar";
import SafetyLayer from "@/components/layout/SafetyLayer";
import { circleMark, crossMark } from "@/public/images";
import { Avatar, User } from "@nextui-org/react";
import { DRAW_MODES } from "@pixi/core";
import { Container, Graphics, SimpleMesh, Sprite, Stage } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";

const TikTakTokGame = () => {
  const [turn, setTurn] = useState();
  const boxWidth = 125;
  const dividerWidth = 10;
  const iconWidth = 95;
  const boxPadding = 15;

  const containerIdData = [
    ["top-left", "top-center", "top-right"],
    ["mid-left", "mid-mid", "center-right"],
    ["bottom-left", "bottom-center", "bottom-right"],
  ];

  return typeof window == "undefined" ? (
    <></>
  ) : (
    <main>
      <GameNavBar
        activeUser={turn}
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
          width={window.innerWidth}
          height={window.innerHeight}
          options={{ backgroundColor: "#141414" }}
        >
          <Container
            position={[
              window.innerWidth / 2 - boxWidth * 1.5,
              window.innerHeight / 2 - boxWidth,
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
            {containerIdData.map((e, p_key) => {
              return e.map((e, c_key) => {
                return (
                  <>
                    <Container
                      key={`${p_key}${c_key}`}
                      width={boxWidth}
                      height={boxWidth}
                      position={[
                        boxWidth * c_key + dividerWidth * c_key,
                        boxWidth * p_key + dividerWidth * p_key,
                      ]}
                    >
                      <Sprite
                        x={boxPadding}
                        y={boxPadding}
                        width={iconWidth}
                        height={iconWidth}
                        image={crossMark.src}
                      />
                    </Container>
                  </>
                );
              });
            })}
          </Container>
        </Stage>
      </SafetyLayer>
    </main>
  );
};

export default TikTakTokGame;
