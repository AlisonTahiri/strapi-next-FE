import Link from "next/link";
import React from "react";
import { getCategoriesData } from "../apiService/apiService";
import { Category } from "../apiService/types";

export default async function Nav() {
  const categoriesData = await getCategoriesData();

  return (
    <div className="bg-gray-200 fixed w-full">
      <nav className="flex justify-between py-4 px-6 max-w-6xl mx-auto items-center">
        <Link href="/">LOGO</Link>

        <ul className="flex gap-2">
          {categoriesData.categories.data.map((category: Category) => (
            <Link
              key={category.attributes.name}
              href={"/categories/" + category.attributes.name + "/1"}
            >
              <li className="cursor-pointer p-2 hover:bg-gray-300 capitalize">
                {category.attributes.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}
