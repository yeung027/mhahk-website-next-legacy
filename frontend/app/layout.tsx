import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Mental Health Association of Hong Kong 香港心理衞生會",
  description: "The Mental Health Association of Hong Kong 香港心理衞生會",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body
        className={`antialiased h-screen w-full flex flex-col items-center bg-[#f9f9f9]`}
      >
        <div className={"h-fit w-full xl:w-[1024px] flex flex-col "}>
          <main className={"min-h-screen xl:shadow-[0_1px_6px_rgba(0,0,0,0.1)] bg-white"}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
