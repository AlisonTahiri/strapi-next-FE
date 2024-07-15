import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  publishedAt: string;
};

export default function MainCard({
  title,
  description,
  imageSrc,
  imageAlt,
  publishedAt,
  slug,
  width,
  height,
}: Props) {
  return (
    <Link
      href={"/blog/" + slug}
      className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
    >
      <Image
        width={width}
        height={height}
        src={imageSrc}
        alt={imageAlt}
        className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
      />
      <div className="p-6 space-y-2 lg:col-span-5">
        <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
          {title}
        </h3>

        <span className="text-xs dark:text-gray-600">{publishedAt}</span>
        <p>{description}</p>
      </div>
    </Link>
  );
}
