import { cache } from "react";
import { articlesQuery, categoriesQuery, singleArticlesQuery } from "./query";

const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function getArticles({ categoryName }: { categoryName?: string }) {
  console.log({ categoryName });
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: articlesQuery,
      variables: { categoryName },
    }),
    next: { revalidate: 5 },
  }).then((res) => res.json());

  return data;
}

// Cache with react cache since this is a post request.
export const getArticlesData = cache(
  ({ categoryName }: { categoryName?: string }) => getArticles({ categoryName })
);

async function getArticleDetails(slug: string) {
  const variables = {
    slug,
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

// Cache with react cache since this is a post request.
export const getSingleArticleData = cache((slug: string) =>
  getArticleDetails(slug)
);

// Categories services ////////////////////////////////////////////////////////////////

async function getCategories() {
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: categoriesQuery,
    }),
    next: { revalidate: 5 },
  }).then((res) => res.json());

  return data;
}

// Cache with react cache since this is a post request.
export const getCategoriesData = cache(() => getCategories());
