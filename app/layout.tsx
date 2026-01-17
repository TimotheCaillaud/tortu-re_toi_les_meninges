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
      <body className="min-h-screen bg-[#fffcf6]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
