"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleCode } from "../apiService/types";
import clsx from "clsx";

export default function LanguageLink({
  locale,
  href,
}: {
  locale: LocaleCode;
  href: string;
}) {
  const pathName = usePathname();

  return (
    <li key={locale}>
      <Link
        className={clsx(
          "p-3 hover:bg-gray-300 rounded",
          pathName.startsWith("/" + locale) && "pointer-events-none"
        )}
        href={href}
      >
        {locale}
      </Link>
    </li>
  );
}
