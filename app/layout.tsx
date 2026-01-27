import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono, Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrumental",
  weight: ["400"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bluethroat Labs",
  description: "Security research collective focused on making TEE-heavy Web3 protocols secure, robust, and reliable.",
};

import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${geistMono.variable} ${baiJamjuree.variable}`} suppressHydrationWarning>
      <body className={`font-mono antialiased selection:bg-foreground selection:text-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
