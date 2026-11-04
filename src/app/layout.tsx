import type { Metadata } from "next";
import { Paytone_One, Anton, Geist, Geist_Mono } from "next/font/google";
import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";

const paytoneOne = Paytone_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-paytone",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pringles — Pop. Crunch. Repeat.",
  description: "Continuous 3D slide experience featuring iconic Pringles flavors.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${paytoneOne.variable} ${anton.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-transparent">
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
