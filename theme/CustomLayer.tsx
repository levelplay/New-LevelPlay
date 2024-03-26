"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import ModelsGroup from "@/components/models";
import AppToast from "@/components/layout/Toast";
import { SocketComponent } from "@/components/core/SocketComponent";

interface DataModel {
  children: React.ReactNode;
}

const CustomLayer: React.FC<DataModel> = ({ children }) => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <ModelsGroup />
        <AppToast />
        <SocketComponent/>
        {children}
      </NextUIProvider>
    </Provider>
  );
};

export default CustomLayer;
