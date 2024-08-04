import React from "react";
import BlogCards from "../components/BlogCards";
import { getArticlesData, getLocalesData } from "../apiService/apiService";
import { LocaleCode } from "../apiService/types";

const pageSize = Number(process.env.HOMEPAGE_SIZE) || 9;

export default function HomePage({
  params,
}: {
  params: { page: string; lang: LocaleCode };
}) {
  return (
    <main className="prose  max-w-none">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <h1>
            {params.lang === "en"
              ? "Welcome to Blogy!"
              : "Miresevini ne Blogy!"}
          </h1>
          <BlogCards
            page={Number(params.page)}
            pageSize={pageSize}
            locale={params.lang}
          />
        </div>
      </section>
    </main>
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
