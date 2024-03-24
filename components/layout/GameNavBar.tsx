"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { AppContainer } from "./AppContainer";
import { User } from "@nextui-org/react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
interface DataModel {
  users: {
    image?: string;
    title: string;
    description: string;
  }[];
  activeUser: number;
  onTimeUp: () => void;
}

const GameNavBar: FC<DataModel> = ({ users, activeUser, onTimeUp }) => {
  const [time, setTime] = useState(0);
  Chart.register(ArcElement);

  useEffect(() => {
    setTimeout(() => {
      if (time == 0) {
        onTimeUp();
      } else {
        setTime(time - 1);
      }
    }, 1000);
  }, [time]);

  useEffect(() => {
    if (activeUser) {
      setTime(60);
    }
  }, [activeUser]);

  return (
    <header className="w-full bg-opacity-80 backdrop-blur absolute left-0 top-0 bg-[hsla(0,0%,10%,0.9)]">
      <AppContainer className="flex items-center justify-center h-28 gap-16">
        {users.map((e, key) => {
          return (
            <User
              key={key}
              name={e.title}
              style={{ order: key }}
              description={e.description}
              avatarProps={{
                className: "w-12 h-12",
                isBordered: true,
                color: key == activeUser - 1 ? "primary" : "default",
              }}
            />
          );
        })}
        <div className="relative w-20 h-20 flex justify-center items-center order-[0.5]">
          <Doughnut
            className="absolute top-0 left-0 !w-full !h-full"
            data={{
              labels: ["Pending Payment", "Clear Payment"],
              datasets: [
                {
                  label: "Payment",
                  data: [60 - time, time],
                  backgroundColor: ["#fcc829", "#e5e5e5"],
                  borderWidth: 0,
                },
              ],
            }}
          />
          <p className=" text-lg font-medium">{time}</p>
        </div>
      </AppContainer>
    </header>
  );
};

export default GameNavBar;
