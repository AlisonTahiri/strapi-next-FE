import BlogCards from "@/app/components/BlogCards";
import { getCategoriesData } from "@/app/apiService/apiService";
import type { Category } from "@/app/apiService/types";
import { Metadata } from "next";

type Props = {
  params: { category: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { category } = params;
  return {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Articles from Blogy for the ${params.category} category.`,
  };
}

export default async function Category({ params: { category } }: Props) {
  return (
    <main className="prose max-w-none">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <h1 className="capitalize">{category}</h1>
          <BlogCards categoryName={category} />
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const categoriesData = await getCategoriesData();

  return categoriesData.categories.data.map((category: Category) => ({
    category: category.attributes.name,
  }));
}
