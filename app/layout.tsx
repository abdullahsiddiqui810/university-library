import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { auth } from "@/auth";
import SessionWrapper from "@/components/SessionWrapper";

const ibmPlexSans = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Bookwise",
  description:
    "Bookwise is a book borrowing university library management solution.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} ${bebasNeue.variable}`}>
        <SessionWrapper session={session}>
          {children}
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
