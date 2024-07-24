import { articlesQuery, categoriesQuery, singleArticlesQuery } from "./query";

const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export async function getArticlesData({
  categoryName,
}: {
  categoryName?: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Fetching articles....");
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
    next: { revalidate: 20 },
  }).then((res) => res.json());

  return data;
}

export async function getSingleArticleData(slug: string) {
  const variables = {
    slug,
  };
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Fetching article details....");
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
    next: { revalidate: 20 },
  }).then((res) => res.json());

  return data;
}

export async function getCategoriesData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Fetching categories....");
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: categoriesQuery,
    }),
    next: { revalidate: 2 },
  }).then((res) => res.json());

  return data;
}
