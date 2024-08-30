import Script from "next/script";
import Initializer from "./Initializer";
import { appMetaData } from "@/constants/metaData";
import { appFont } from "@/theme/theme";
import "../theme/globals.css";

export const metadata = appMetaData.main;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootClassName = `${appFont.className} light text-foreground bg-background">`;

  return (
    <html lang="en" className={rootClassName}>
      <body className={rootClassName}>
        <Initializer>{children}</Initializer>
      </body>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-EY02R8QWF9`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EY02R8QWF9');
        `,
        }}
      ></Script>
    </html>
  );
}
