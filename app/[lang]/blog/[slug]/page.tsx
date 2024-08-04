import {
  getArticlesData,
  getLocalesData,
  getSingleArticleData,
} from "@/app/[lang]/apiService/apiService";

import ArticleDetails from "@/app/[lang]/components/ArticleDetails";
import { Metadata } from "next";
import { LocaleCode } from "../../apiService/types";

type Props = {
  params: { slug: string; lang: LocaleCode };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = params;

  const articleData = await getSingleArticleData({ lang, slug });

  const { author, description, updatedAt, title } =
    articleData.articles.data[0].attributes;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: updatedAt,
      authors: author.data.attributes.name,
    },
  };
}

export default async function SingleArticle({ params }: Props) {
  return <ArticleDetails slug={params.slug} lang={params.lang} />;
}

export async function generateStaticParams() {
  const localesData = await getLocalesData();

  const data = await Promise.all(
    localesData.i18NLocales.data.map(async (locale) => {
      const articlesData = await getArticlesData({
        locale: locale.attributes.code,
      });

      return articlesData.articles.data.map((article) => ({
        slug: article.attributes.slug,
        lang: locale.attributes.code,
      }));
    })
  );

  return data.flat();
}
