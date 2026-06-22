import React from "react";
import { Rubik_Mono_One, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  variable: "--font-rubik-mono-one",
  display: "swap",
  weight: "400",
});

const syne = Syne({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Tortu're toi les méninges - L'aventure à domicile",
  description:
    "Des escape games immersifs livrés à domicile pour des moments inoubliables",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`min-h-screen flex flex-col bg-[#fffcf6] ${rubikMonoOne.variable} ${syne.variable} ${dmSans.variable}`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 bg-[#f7dba7]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
