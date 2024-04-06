import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomLayer from "@/theme/CustomLayer";
import Script from "next/script";
import "../theme/globals.css";
import { appMetaData } from "@/constants/metaData";
import { appFont } from "@/theme/theme";
import SafetyLayer from "@/components/layout/SafetyLayer";
import SplashScreen from "@/components/layout/SplashScreen";

export const metadata = appMetaData.main;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark text-foreground bg-background w-full min-h-full"
    >
      <body
        className={`${appFont.className} dark text-foreground bg-background`}
      >
        <SafetyLayer isReverse>
          <SplashScreen />
        </SafetyLayer>
        <CustomLayer>{children}</CustomLayer>
      </body>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-6KYK89VWZH`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6KYK89VWZH');
        `,
        }}
      ></Script>
    </html>
  );
}
