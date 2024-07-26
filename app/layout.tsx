import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

const url = process.env.URL || (process.env.VERCEL_URL as string);

export const metadata: Metadata = {
  title: {
    template: "%s | Blogy",
    default: "The Blogy Blog",
  },
  description: "This is the description of the Blogy Blog.",
  metadataBase: new URL(url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {/* Div below compensate for nav height */}
        <div className="h-[72px]" />
        {children}
      </body>
    </html>
  );
}
