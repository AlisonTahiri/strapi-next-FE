import React from "react";
import {
  getArticlesData,
  getSingleArticleData,
} from "../apiService/apiService";
import Image from "next/image";
import Markdown from "react-markdown";

export default async function ArticleDetails({ slug }: { slug: string }) {
  const articleData = await getSingleArticleData(slug);

  if (!articleData.articles.data.length)
    return <div>Could not find the article you are looking for.</div>;

  const { author, body, cover, description, updatedAt, title } =
    articleData.articles.data[0].attributes;
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
    </article>
  );
}
