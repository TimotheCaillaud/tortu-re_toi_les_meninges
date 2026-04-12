import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col bg-[#fffcf6]">
        <Header />
        <main className="flex-1 bg-[#f7dba7]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
