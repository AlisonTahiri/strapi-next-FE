import React from "react";
import {
  getArticlesData,
  getLocalesData,
  getSingleArticleData,
} from "../apiService/apiService";
import Image from "next/image";
import Markdown from "react-markdown";
import { LocaleCode } from "../apiService/types";
import Link from "next/link";
import clsx from "clsx";

export default async function ArticleDetails({
  slug,
  lang,
}: {
  slug: string;
  lang: LocaleCode;
}) {
  const articleData = await getSingleArticleData({ lang, slug });

  if (!articleData.articles.data.length)
    return <div>Could not find the article you are looking for.</div>;

  const { author, body, cover, description, updatedAt, title, localizations } =
    articleData.articles.data[0].attributes;
  return (
    <>
      <article className="prose lg:prose-xl container p-4 mx-auto">
        <div className="flex justify-between items-stretch">
          <h1>{title}</h1>
          <ul className="flex gap-1">
            {localizations.data.map((locale) => {
              return (
                <li key={locale.attributes.locale}>
                  <Link
                    className={clsx(
                      "p-3 hover:bg-gray-300 rounded",
                      locale.attributes.locale === lang && "pointer-events-none"
                    )}
                    href={`/${locale.attributes.locale}/blog/${locale.attributes.slug}`}
                  >
                    {locale.attributes.locale}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Image
          alt={cover.data.attributes.alternativeText}
          src={cover.data.attributes.formats.large.url}
          height={cover.data.attributes.formats.large.height}
          width={cover.data.attributes.formats.large.width}
          className="w-full h-[620px] object-cover"
        />

        <Markdown>{body}</Markdown>
      </article>
    </>
  );
}
