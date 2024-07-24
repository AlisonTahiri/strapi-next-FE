import { getArticlesData } from "@/app/apiService/apiService";
import { Article } from "@/app/apiService/types";
import ArticleDetails from "@/app/components/ArticleDetails";
import { SingleArticleSkeleton } from "@/app/components/skeletons";
import { Suspense } from "react";

// TODO: Add Metadata
export default async function SingleArticle({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<SingleArticleSkeleton />}>
      <ArticleDetails slug={params.slug} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const articlesData = await getArticlesData({});

  return articlesData.articles.data.map((article: Article) => ({
    slug: article.attributes.slug,
  }));
}
