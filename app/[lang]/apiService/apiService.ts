import {
  articlesQuery,
  categoriesQuery,
  localesQuery,
  singleArticlesQuery,
} from "./query";
import {
  ArticlesDataType,
  LocaleCode,
  Locales,
  SingleArticleDataType,
} from "./types";

const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export async function getArticlesData({
  categoryName,
  page = 1,
  pageSize = 10,
  locale,
}: {
  categoryName?: string;
  page?: number;
  pageSize?: number;
  locale: LocaleCode;
}): Promise<ArticlesDataType> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("Fetching articles....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: articlesQuery,
      variables: { categoryName, pageSize, page, locale },
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}

export async function getSingleArticleData({
  lang,
  slug,
}: {
  slug: string;
  lang: LocaleCode;
}): Promise<SingleArticleDataType> {
  const variables = {
    slug,
    locale: lang,
  };
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("Fetching article details....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: singleArticlesQuery,
      variables,
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}

export async function getCategoriesData({ locale }: { locale: LocaleCode }) {
  const variables = {
    locale,
  };
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("Fetching categories....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: categoriesQuery,
      variables,
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}

export async function getLocalesData(): Promise<Locales> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("Fetching categories....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: localesQuery,
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}
