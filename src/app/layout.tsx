import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SOSButton from "@/components/SOSButton";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "乐养E居 - 专业居家养老",
  description: "专业养老护理，就在您身边",
  appleWebApp: {
    capable: true,
    title: "乐养E居",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#E8721C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full max-w-[100vw] mx-auto md:max-w-screen-xl relative overflow-x-hidden">
          {children}
        </main>
        <SOSButton />
        <Footer />
      </body>
    </html>
  );
}
