import { cache } from "react";
import { articlesQuery } from "./query";

const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";

async function getArticles() {
  const { data } = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: articlesQuery,
    }),
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return data;
}

export const getArticlesData = cache(() => getArticles());
