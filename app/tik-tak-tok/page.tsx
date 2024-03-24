"use client";
import GameNavBar from "@/components/layout/GameNavBar";
import SafetyLayer from "@/components/layout/SafetyLayer";
import { circleMark, crossMark } from "@/public/images";
import { Container, Graphics, Sprite, Stage } from "@pixi/react";
import React, { useEffect, useState } from "react";

const TikTakTokGame = () => {
  const [turn, setTurn] = useState();
  const [containerData, setContainerData] = useState([
    [1, 2, 1],
    [0, 1, 2],
    [2, 0, 1],
  ]);

  const boxWidth = 125;
  const dividerWidth = 10;
  const iconWidth = 95;
  const boxPadding = 15;
  const playerIcon = ["", circleMark.src, crossMark.src];
  const deviceWidth = typeof window == "undefined" ? 0 : window.innerWidth;
  const deviceHeight = typeof window == "undefined" ? 0 : window.innerHeight;

  return (
    <SafetyLayer>
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
            {containerData.map((e, p_key) => {
              return e.map((c_item, c_key) => {
                return (
                  <Container
                    key={`${p_key}${c_key}`}
                    width={boxWidth}
                    height={boxWidth}
                    position={[
                      boxWidth * c_key + dividerWidth * c_key,
                      boxWidth * p_key + dividerWidth * p_key,
                    ]}
                  >
                    {c_item ? (
                      <Sprite
                        x={boxPadding}
                        y={boxPadding}
                        width={iconWidth}
                        height={iconWidth}
                        image={playerIcon[c_item]}
                      />
                    ) : (
                      <></>
                    )}
                  </Container>
                );
              });
            })}
          </Container>
        </Stage>
      </main>
    </SafetyLayer>
  );
};

export default TikTakTokGame;
