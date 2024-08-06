import Link from "next/link";
import { getCategoriesData } from "../apiService/apiService";
import { LocaleCode } from "../apiService/types";

export default async function CategoriesPicker({ lang }: { lang: LocaleCode }) {
  const categoriesData = await getCategoriesData({ locale: lang });
  return (
    <ul className="flex gap-2">
      {categoriesData.categories.data.map((category) => (
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
  );
}
