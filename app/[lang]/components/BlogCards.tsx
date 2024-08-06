import { getArticlesData } from "@/app/[lang]/apiService/apiService";
import Card from "@/app/[lang]/components/Card";
import MainCard from "@/app/[lang]/components/MainCard";
import React from "react";
import Pagination from "./Pagination";
import { LocaleCode } from "../apiService/types";
import { formatDate } from "@/app/utils/formatDate";

type Props = {
  categoryName?: string;
  page: number;
  pageSize: number;
  locale: LocaleCode;
};

export default async function BlogCards({
  categoryName,
  locale,
  page,
  pageSize,
}: Props) {
  const articlesData = await getArticlesData({
    categoryName,
    page,
    pageSize,
    locale,
  });

  if (!articlesData.articles.data.length)
    return (
      <div>
        There are no Articles {categoryName && `in this category`} at this time.
        Please try again later!
      </div>
    );
  const pagination = articlesData.articles.meta.pagination;

  const firstArticle = articlesData.articles.data[0];
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
        locale={locale}
        slug={firstArticle.attributes.slug}
        title={firstArticle.attributes.title}
        updatedAt={formatDate({
          locale,
          date: new Date(firstArticle.attributes.updatedAt),
        })}
      />
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articlesData.articles.data.slice(1).map((article) => {
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
              locale={locale}
              slug={slug}
              title={title}
              updatedAt={formatDate({
                locale,
                date: new Date(updatedAt),
              })}
            />
          );
        })}
      </div>
      {pagination.total > pageSize && (
        <Pagination
          currentPage={page || 1}
          pageSize={pageSize}
          totalPages={pagination.pageCount}
        />
      )}
    </>
  );
}
