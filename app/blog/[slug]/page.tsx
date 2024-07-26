import {
  getArticlesData,
  getSingleArticleData,
} from "@/app/apiService/apiService";
import { Article, type SingleArticle } from "@/app/apiService/types";
import ArticleDetails from "@/app/components/ArticleDetails";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const articleData = await getSingleArticleData(slug);

  const { author, description, updatedAt, title } = articleData.articles.data[0]
    .attributes as SingleArticle["attributes"];

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
  return <ArticleDetails slug={params.slug} />;
}

export async function generateStaticParams() {
  const articlesData = await getArticlesData({});

  return articlesData.articles.data.map((article: Article) => ({
    slug: article.attributes.slug,
  }));
}
