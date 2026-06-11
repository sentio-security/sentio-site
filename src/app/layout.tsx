import type { Metadata } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "sentio — solana security scanner",
  description:
    "sentio catches common Rust security mistakes before they reach production. Fast, zero-config, CLI-first.",
  icons: {
    icon: "/sentio-logo.png",
    apple: "/sentio-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
