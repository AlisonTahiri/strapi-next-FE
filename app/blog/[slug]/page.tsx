import {
  getArticlesData,
  getSingleArticleData,
} from "@/app/apiService/apiService";
import { Article } from "@/app/apiService/types";
import type { SingleArticle } from "@/app/apiService/types";
import Image from "next/image";
import Markdown from "react-markdown";

export default async function SingleArticle({
  params,
}: {
  params: { slug: string };
}) {
  const articleData = await getSingleArticleData(params.slug);

  if (!articleData.articles.data.length)
    return <div>Could not find the article you are looking for.</div>;

  const { author, body, cover, description, publishedAt, slug, title } =
    articleData.articles.data[0].attributes as SingleArticle["attributes"];

  return (
    <article className="prose lg:prose-xl container p-4 mx-auto">
      <h1>{title}</h1>

      <Image
        alt={cover.data.attributes.alternativeText}
        src={cover.data.attributes.formats.large.url}
        height={cover.data.attributes.formats.large.height}
        width={cover.data.attributes.formats.large.width}
        className="w-full h-[620px] object-cover"
      />

      <Markdown>{body}</Markdown>
      {/* <pre>{JSON.stringify(articleData, null, 2)}</pre> */}
    </article>
  );
}

export async function generateStaticParams() {
  const articlesData = await getArticlesData();

  return articlesData.articles.data.map((article: Article) => ({
    slug: article.attributes.slug,
  }));
}
