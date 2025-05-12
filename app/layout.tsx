import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
export const metadata: Metadata = {
  title: "Oguz Saglyk",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"tk-TM"}>
      <body
        className={cn(
          "min-h-screen bg-gray-100 font-sans antialiased text-black"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
