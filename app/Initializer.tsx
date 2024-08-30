"use client";
import AppToast from "@/components/layout/Toast";
import SafetyLayer from "@/components/layout/SafetyLayer";
import SplashScreen from "@/components/layout/SplashScreen";
import ModelsGroup from "@/components/models";
import { NextUIProvider } from "@nextui-org/react";
import { RootReducerType, store } from "@/redux/store";
import { Provider, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { appFont, modeLocalVariable } from "@/theme/theme";
import { changeMode } from "@/redux/model/controller";
import { modeVariantType } from "@/redux/model/type";
import { SocketComponent } from "@/components/core/SocketComponent";

interface DataModel {
  children: React.ReactNode;
}

const Initializer: React.FC<DataModel> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ThemeLayer>{children}</ThemeLayer>
      </Provider>
    </>
  );
};

const ThemeLayer: React.FC<DataModel> = ({ children }) => {
  const [mode, setMode] = useState<modeVariantType>("light");
  const currMode = useSelector((e: RootReducerType) => e?.model?.mode);

  useEffect(() => {
    const mode = localStorage.getItem(modeLocalVariable);
    if (mode) {
      store.dispatch(changeMode(mode as any));
    }
  }, []);

  useEffect(() => {
    const changeModes = () => {
      const mode = localStorage.getItem(modeLocalVariable);
      if (!mode) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setMode("dark");
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          setMode("light");
        }
      }
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", changeModes);

    // Initial setup
    changeModes();

    // Clean up the event listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", changeModes);
    };
  }, []);

  useEffect(() => {
    if (currMode) {
      setMode(currMode);
    }
  }, [currMode]);

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    const bodyElement = document.getElementsByTagName("body")[0];
    const newClassName = `${mode} ${appFont.className} text-foreground bg-background`;
    htmlElement.className = newClassName;
    bodyElement.className = newClassName;
  }, [mode]);

  return (
    <>
      <SafetyLayer isReverse>
        <SplashScreen />
      </SafetyLayer>
      <NextUIProvider>
        <ModelsGroup />
        <AppToast />
        <SocketComponent />
        {children}
      </NextUIProvider>
    </>
  );
};

export default Initializer;
