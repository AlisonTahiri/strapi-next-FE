import React from "react";
import LanguageLink from "./LanguageLink";
import { LocaleCode } from "../apiService/types";

export type LocalesLinks = { locale: LocaleCode; href: string }[];

export default function LanguagesPicker({
  localesLinks,
}: {
  localesLinks: LocalesLinks;
}) {
  return (
    <ul>
      {localesLinks.map((link) => (
        <LanguageLink key={link.locale} href={link.href} locale={link.locale} />
      ))}
    </ul>
  );
}
