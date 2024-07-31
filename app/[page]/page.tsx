import React from "react";
import BlogCards from "../components/BlogCards";
import { getArticlesData } from "../apiService/apiService";

const pageSize = Number(process.env.HOMEPAGE_SIZE) || 9;

export default function HomePage({ params }: { params: { page: string } }) {
  return (
    <main className="prose  max-w-none">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <h1>Welcome to Blogy!</h1>
          <BlogCards page={Number(params.page)} pageSize={pageSize} />
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const articlesData = await getArticlesData({});

  const articlesNumber = articlesData.articles.data.length;
  const totalPages = Math.ceil(articlesNumber / pageSize);

  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push({ page: (i + 1).toString() });
  }

  return pages;
}
