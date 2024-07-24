import { getArticlesData } from "@/app/apiService/apiService";
import { Article } from "@/app/apiService/types";
import ArticleDetails from "@/app/components/ArticleDetails";

// TODO: Add Metadata
export default async function SingleArticle({
  params,
}: {
  params: { slug: string };
}) {
  return <ArticleDetails slug={params.slug} />;
}

export async function generateStaticParams() {
  const articlesData = await getArticlesData({});

  return articlesData.articles.data.map((article: Article) => ({
    slug: article.attributes.slug,
  }));
}
