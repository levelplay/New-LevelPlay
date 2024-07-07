'use client'
import { FC, useEffect, useState } from "react"
import { format } from "date-fns";

interface TimerDataModal {
  data: {
    time: string,
    current: string,
  };
  onComplete: () => void;
}

const Timer: FC<TimerDataModal> = ({ data, onComplete }) => {
  const [futureTime, setFutureTime] = useState<string>();
  const [currentTime, setCurrentTime] = useState<string>();
  const [diffTime, setDiffTime] = useState<string>();

  useEffect(() => {
    setCurrentTime(data.current);
    setFutureTime(data.time);
  }, [data]);

  useEffect(() => {
    if (currentTime && futureTime) {
      const timerId = setTimeout(() => {
        const future = new Date(futureTime);
        const current = new Date(currentTime);
        const newCurrent = new Date(current.getTime() + 1000); // Adding 1000 ms to decrement the time

        const timeDifference = future.getTime() - newCurrent.getTime();
        const newDiff = new Date(timeDifference);

        if (timeDifference <= 0) {
          onComplete();
          clearTimeout(timerId);
        } else {
          setCurrentTime(newCurrent.toISOString());
          setDiffTime(newDiff.toISOString());
        }
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [currentTime, futureTime, onComplete]);

  return diffTime ? (
    <span>
      {format(new Date(diffTime), "mm:ss")}
    </span>
  ) : (<></>)
}

export default Timer;