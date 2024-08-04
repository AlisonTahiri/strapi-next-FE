import Image from "next/image";
import Link from "next/link";
import { LocaleCode } from "../apiService/types";

type Props = {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  locale: LocaleCode;
  width: number;
  height: number;
  updatedAt: string;
};

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  locale,
  updatedAt,
  slug,
  width,
  height,
}: Props) {
  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
    >
      <Image
        width={width}
        height={height}
        src={imageSrc}
        alt={imageAlt}
        className="object-cover w-full rounded h-44 dark:bg-gray-500"
      />
      <div className="p-6 space-y-2">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {title}
        </h3>
        <span className="text-xs dark:text-gray-600">{updatedAt}</span>
        <p>{description}</p>
      </div>
    </Link>
  );
}
