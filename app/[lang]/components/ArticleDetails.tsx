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
import Nav from "./Nav";
import { LocalesLinks } from "./LanguagesPicker";

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

  const localesLinks: LocalesLinks = localizations.data.map((locale) => ({
    href: `/${locale.attributes.locale}/blog/${locale.attributes.slug}`,
    locale: locale.attributes.locale,
  }));

  return (
    <>
      <Nav lang={lang} localesLinks={localesLinks} />
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
    </>
  );
}
