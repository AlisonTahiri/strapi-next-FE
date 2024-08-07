import {
  articlesQuery,
  categoriesQuery,
  localesQuery,
  mainPageQuery,
  singleArticlesQuery,
} from "./query";
import {
  ArticlesDataType,
  CategoriesDataType,
  LocaleCode,
  Locales,
  MainPageDataType,
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

export async function getCategoriesData({
  locale,
}: {
  locale: LocaleCode;
}): Promise<CategoriesDataType> {
  const variables = {
    locale,
  };

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

export async function getMainPageData({
  locale,
}: {
  locale: LocaleCode;
}): Promise<MainPageDataType> {
  const variables = {
    locale,
  };
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: mainPageQuery,
      variables,
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}
