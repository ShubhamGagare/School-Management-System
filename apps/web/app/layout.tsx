import "./globals.css";
import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { Providers } from "../providers";
import AppbarClient from "../components/clients/AppbarClient";
import RecoidContextProvider from "./recoilContextProvider";

//const inter = Inter({  subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  title: "EduTrack",
  description: "School information system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
      <RecoidContextProvider>
        <body >
    

          {children}</body>
        </RecoidContextProvider>
      </Providers>
    </html>
  );
}