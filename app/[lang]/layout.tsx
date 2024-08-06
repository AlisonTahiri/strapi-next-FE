import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "./components/Nav";
import { LocaleCode } from "./apiService/types";
import { getLocalesData } from "./apiService/apiService";

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
  params,
}: {
  children: React.ReactNode;
  params: { lang: LocaleCode };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        {/* <Nav lang={params.lang} /> */}
        {children}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  const localesData = await getLocalesData();

  return localesData.i18NLocales.data.map((locale) => ({
    lang: locale.attributes.code,
  }));
}
