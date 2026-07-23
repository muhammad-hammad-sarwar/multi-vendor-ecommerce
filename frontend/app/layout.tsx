import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import AppProvider from "@/redux/Provider";
import ReduxAppInit from "@/redux/ReduxAppInit";
import InitSocket from "./socket/Init.socket";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MultiVendor Ecommerce",
  description: "Get Started with your Ecommerce journey as a buyer or seller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppProvider>
          <ToastContainer position="bottom-center" theme="colored" />
          {children}
          <ReduxAppInit />
          <InitSocket />
        </AppProvider>
      </body>
    </html>
  );
}
