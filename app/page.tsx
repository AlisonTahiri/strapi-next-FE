import { getArticlesData } from "./apiService/apiService";
import { Article } from "./apiService/types";
import Card from "./components/Card";
import MainCard from "./components/MainCard";

export default async function Home() {
  const articlesData = await getArticlesData();

  const firstArticle = articlesData.articles.data[0] as Article;

  return (
    <main className="container p-4 mx-auto">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <MainCard
            description={firstArticle.attributes.description}
            imageAlt={
              firstArticle.attributes.cover.data.attributes.alternativeText
            }
            width={
              firstArticle.attributes.cover.data.attributes.formats.medium.width
            }
            height={
              firstArticle.attributes.cover.data.attributes.formats.medium
                .height
            }
            imageSrc={
              firstArticle.attributes.cover.data.attributes.formats.medium.url
            }
            slug={firstArticle.attributes.slug}
            title={firstArticle.attributes.title}
            publishedAt={firstArticle.attributes.publishedAt}
          />
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articlesData.articles.data.slice(1).map((article: Article) => {
              const { author, cover, description, publishedAt, slug, title } =
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
                  publishedAt={publishedAt}
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
        </div>
      </section>
    </main>
  );
}
