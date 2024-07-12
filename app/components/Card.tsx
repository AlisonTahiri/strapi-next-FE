import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
};

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  slug,
}: Props) {
  return (
    <Link
      href={"/blog/" + slug}
      className="flex flex-col gap-2 p-4 rounded-md max-w-56 lg:max-w-sm dark:bg-slate-800"
    >
      <div className="text-2xl">{title}</div>
      <Image width={220} height={200} src={imageSrc} alt={imageAlt} />
      <div className="dark:text-slate-100">{description}</div>
    </Link>
  );
}
