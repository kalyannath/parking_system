
import type { Metadata } from "next";
import "./globals.css";
import AppNavBar from "./components/navbar";
import { NextUIProv } from "./providers/NextUIProv";
import ReduxProvider from "./redux/reduxProvider";
import MainBody from "./components/mainBody";
import { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} text-foreground bg-background border-box transition-all duration-[500ms]`}>
        <NextUIProv>
          <ReduxProvider>
            <Toaster />
            <main className="h-screen w-screen flex flex-col box-border py-0 m-0">
              <AppNavBar />
              <MainBody>{children}</MainBody>
            </main>
          </ReduxProvider>
        </NextUIProv>
      </body>
    </html>
  );
}
