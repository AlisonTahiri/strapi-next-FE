import BlogCards from "@/app/[lang]/components/BlogCards";
import {
  getArticlesData,
  getCategoriesData,
  getLocalesData,
} from "@/app/[lang]/apiService/apiService";
import type { LocaleCode } from "@/app/[lang]/apiService/types";
import { Metadata } from "next";
import Nav from "@/app/[lang]/components/Nav";
import { LocalesLinks } from "@/app/[lang]/components/LanguagesPicker";

type Props = {
  params: { category: string; page: string; lang: LocaleCode };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, lang } = params;

  const categoriesData = await getCategoriesData({ locale: lang });

  const targetCategoryArray = categoriesData.categories.data.filter(
    (c) => c.attributes.name === category
  );
  const targetCategoryObj = targetCategoryArray[0];

  return {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: targetCategoryObj.attributes.metaDescription,
  };
}

const pageSize = Number(process.env.CATEGORY_PAGE_SIZE) || 7;

export default async function Category({
  params: { category, page, lang },
}: Props) {
  const categoriesData = await getCategoriesData({ locale: lang });

  const targetCategoryArray = categoriesData.categories.data.filter(
    (c) => c.attributes.name === category
  );
  const targetCategoryObj = targetCategoryArray[0];

  const localesLinks: LocalesLinks =
    targetCategoryObj.attributes.localizations.data.map((locale) => ({
      href: `/${locale.attributes.locale}/categories/${locale.attributes.name}/${page}`,
      locale: locale.attributes.locale,
    }));

  return (
    <>
      <Nav lang={lang} localesLinks={localesLinks} />
      <main className="prose max-w-none">
        <section>
          <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <h1 className="capitalize">{category}</h1>
            <BlogCards
              categoryName={category}
              pageSize={pageSize}
              page={Number(page) || 1}
              locale={lang}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const localesData = await getLocalesData();

  const params = await Promise.all(
    localesData.i18NLocales.data.map(async (locale) => {
      const categoriesData = await getCategoriesData({
        locale: locale.attributes.code,
      });

      const data = await Promise.all(
        categoriesData.categories.data.map(async (category) => {
          const articlesData = await getArticlesData({
            categoryName: category.attributes.name,
            locale: locale.attributes.code,
          });

          const articlesNumber = articlesData.articles.data.length;
          const totalPages = Math.ceil(articlesNumber / pageSize);

          const params: { category: string; page: string; lang: LocaleCode }[] =
            [];

          for (let i = 0; i < totalPages; i++) {
            params.push({
              category: category.attributes.name,
              page: (i + 1).toString(),
              lang: locale.attributes.code,
            });
          }

          return params;
        })
      );

      return data;
    })
  );

  return params.flat(3);
}
