'use client'
import React, { FC, ReactNode, useEffect, useState } from "react";
interface DataModel {
  children: ReactNode;
  isReverse?: boolean;
}

const SafetyLayer: FC<DataModel> = ({ children, isReverse = false }) => {
  const [loading, setLoading] = useState<boolean>(!isReverse);

  useEffect(() => {
    setLoading(!loading);
  }, []);

  return loading ? <></> : children;
};

export default SafetyLayer;
