"use client"
import { Geist, Geist_Mono } from "next/font/google";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
        <Provider>
          {children}
        </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
