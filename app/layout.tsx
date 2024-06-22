import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import AppHeader from "./_components/AppHeader";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

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
        </ThemeProvider>
      </body>
    </html>
  );
}
