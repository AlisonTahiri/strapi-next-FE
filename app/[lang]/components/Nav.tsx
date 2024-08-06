import Link from "next/link";
import React from "react";
import { LocaleCode } from "../apiService/types";
import CategoriesPicker from "./CategoriesPicker";
import LanguagesPicker, { LocalesLinks } from "./LanguagesPicker";

export default function Nav({
  lang,
  localesLinks,
}: {
  lang: LocaleCode;
  localesLinks: LocalesLinks;
}) {
  return (
    <>
      <div className="bg-gray-200 fixed w-full">
        <nav className="flex justify-between py-4 px-6 max-w-6xl mx-auto items-center">
          <Link href={"/" + lang}>LOGO</Link>
          <LanguagesPicker localesLinks={localesLinks} />
          <CategoriesPicker lang={lang} />
        </nav>
      </div>
      {/* Div below compensate for nav height */}
      <div className="h-[72px]" />
    </>
  );
}
