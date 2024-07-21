import BlogCards from "@/app/components/BlogCards";
import {
  getArticlesData,
  getCategoriesData,
} from "@/app/apiService/apiService";
import type { Category } from "@/app/apiService/types";

import { CardsSkeleton } from "@/app/components/skeletons";
import React, { Suspense } from "react";

export default async function Category({
  params: { category },
}: {
  params: { category: string };
}) {
  return (
    <main className="prose max-w-none">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <h1 className="capitalize">{category}</h1>

          <Suspense fallback={<CardsSkeleton />}>
            <BlogCards categoryName={category} />
          </Suspense>
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
