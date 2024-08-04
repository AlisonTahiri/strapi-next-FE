import Link from "next/link";
import React from "react";
import { getCategoriesData } from "../apiService/apiService";
import { Category, LocaleCode } from "../apiService/types";
import { getLocalesData } from "../apiService/apiService";

import LanguagePicker from "./LanguagePicker";

export default async function Nav({ lang }: { lang: LocaleCode }) {
  const categoriesData = await getCategoriesData({ locale: lang });
  const localesData = await getLocalesData();
  return (
    <div className="bg-gray-200 fixed w-full">
      <nav className="flex justify-between py-4 px-6 max-w-6xl mx-auto items-center">
        <Link href={"/" + lang}>LOGO</Link>
        {/* <LanguagePicker localesData={localesData} /> */}
        <ul className="flex gap-2">
          {categoriesData.categories.data.map((category: Category) => (
            <li key={category.attributes.name} className="capitalize">
              <Link
                href={`/${lang}/categories/${category.attributes.name}/1`}
                className="p-3 hover:bg-gray-300 rounded"
              >
                {category.attributes.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
