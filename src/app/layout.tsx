import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import GoogleTag from "@/components/system/GoogleTag/GoogleTag";
import "./globals.css";
import GoogleTagManager, {
  NoScriptTagManager,
} from "@/components/system/GoogleTag/GoogleTagManager";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Brasa Solar",
  description: "Especializados em fornecer soluções de energia solar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
        <GoogleTag />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NoScriptTagManager />
        {children}
      </body>
    </html>
  );
}
