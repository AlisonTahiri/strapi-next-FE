import React from "react";
import BlogCards from "../components/BlogCards";
import {
  getArticlesData,
  getLocalesData,
  getMainPageData,
} from "../apiService/apiService";
import { LocaleCode } from "../apiService/types";
import Nav from "../components/Nav";
import { LocalesLinks } from "../components/LanguagesPicker";

const pageSize = Number(process.env.HOMEPAGE_SIZE) || 9;

export default async function HomePage({
  params: { lang, page },
}: {
  params: { page: string; lang: LocaleCode };
}) {
  const localesData = await getLocalesData();
  const mainPageData = await getMainPageData({ locale: lang });

  const { title } = mainPageData.mainPage.data.attributes;

  const localesLinks: LocalesLinks = localesData.i18NLocales.data
    .filter((locale) => !(locale.attributes.code === lang)) // remove current locale from link
    .map((locale) => ({
      locale: locale.attributes.code,
      href: `/${locale.attributes.code}/1`, // redirect to first page for better UX.
    }));

  return (
    <>
      <Nav lang={lang} localesLinks={localesLinks} />

      <main className="prose max-w-none">
        <section>
          <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <h1>{title}</h1>
            <BlogCards page={Number(page)} pageSize={pageSize} locale={lang} />
          </div>
        </section>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const localesData = await getLocalesData();

  const data = await Promise.all(
    localesData.i18NLocales.data.map(async (locale) => {
      const articlesData = await getArticlesData({
        locale: locale.attributes.code,
      });

      const articlesNumber = articlesData.articles.data.length;
      const totalPages = Math.ceil(articlesNumber / pageSize);

      const pages = [];

      for (let i = 0; i < totalPages; i++) {
        pages.push({ page: (i + 1).toString(), lang: locale.attributes.code });
      }

      return pages;
    })
  );

  return data.flat();
}
