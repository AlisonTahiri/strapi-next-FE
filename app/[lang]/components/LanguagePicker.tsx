"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleCode, Locales } from "../apiService/types";
import clsx from "clsx";

export default function LanguagePicker({
  localesData,
}: {
  localesData: Locales;
}) {
  const pathName = usePathname();

  const pathNameParts = pathName.split("/");
  if (pathNameParts[2] === "blog") {
    const currentArticleData = "";
    console.log("BLOG");
  }
  console.log(pathName.split("/"));
  return (
    <ul className="flex gap-1">
      {localesData.i18NLocales.data.map((locale) => (
        <li key={locale.id}>
          <Link
            className={clsx(
              "p-3 hover:bg-gray-300 rounded",
              pathName.startsWith("/" + locale.attributes.code) &&
                "pointer-events-none"
            )}
            href={"#"}
          >
            {locale.attributes.code}
          </Link>
        </li>
      ))}
    </ul>
  );
}
