// import "@uploadthing/react/styles.css";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppHeader from "@/components/custom/AppHeader";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Invoice App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} relative flex min-h-screen flex-col bg-skin-whisper text-skin-black antialiased`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <AppHeader />

          <div className="grid flex-1 px-8 py-12">
            <main className="relative mx-auto w-full max-w-3xl">
              {children}
            </main>
          </div>

          <div id="modal-root"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
