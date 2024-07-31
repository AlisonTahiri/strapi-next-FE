import { articlesQuery, categoriesQuery, singleArticlesQuery } from "./query";

const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export async function getArticlesData({
  categoryName,
  page = 1,
  pageSize = 10,
}: {
  categoryName?: string;
  page?: number;
  pageSize?: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("Fetching articles....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: articlesQuery,
      variables: { categoryName, pageSize, page },
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}

export async function getSingleArticleData(slug: string) {
  const variables = {
    slug,
  };
  await new Promise((resolve) => setTimeout(resolve, 3000));
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

export async function getCategoriesData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log("Fetching categories....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: categoriesQuery,
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}
