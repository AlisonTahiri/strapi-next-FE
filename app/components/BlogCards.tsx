import { getArticlesData } from "@/app/apiService/apiService";
import { Article } from "@/app/apiService/types";
import Card from "@/app/components/Card";
import MainCard from "@/app/components/MainCard";
import React from "react";

type Props = {
  categoryName?: string;
};

export default async function BlogCards({ categoryName }: Props) {
  const articlesData = await getArticlesData({ categoryName });

  if (!articlesData.articles.data.length)
    return (
      <div>
        There are no Articles {categoryName && `in this category`} at this time.
        Please try again later!
      </div>
    );

  const firstArticle = articlesData.articles.data[0] as Article;
  return (
    <>
      <MainCard
        description={firstArticle.attributes.description}
        imageAlt={firstArticle.attributes.cover.data.attributes.alternativeText}
        width={
          firstArticle.attributes.cover.data.attributes.formats.medium.width
        }
        height={
          firstArticle.attributes.cover.data.attributes.formats.medium.height
        }
        imageSrc={
          firstArticle.attributes.cover.data.attributes.formats.medium.url
        }
        slug={firstArticle.attributes.slug}
        title={firstArticle.attributes.title}
        updatedAt={firstArticle.attributes.updatedAt}
      />
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articlesData.articles.data.slice(1).map((article: Article) => {
          const { author, cover, description, updatedAt, slug, title } =
            article.attributes;
          return (
            <Card
              key={article.id}
              description={description}
              imageAlt={cover.data.attributes.alternativeText}
              width={cover.data.attributes.formats.small.width}
              height={cover.data.attributes.formats.small.height}
              imageSrc={cover.data.attributes.formats.small.url}
              slug={slug}
              title={title}
              updatedAt={updatedAt}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
        >
          Load more posts...
        </button>
      </div>
    </>
  );
}
