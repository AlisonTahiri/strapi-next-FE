import { getArticlesData } from "./apiService/apiService";
import { Article } from "./apiService/types";
import Card from "./components/Card";

export default async function Home() {
  const articlesData = await getArticlesData();

  return (
    <main className="container p-4 mx-auto">
      <div className="flex gap-4">
        {articlesData.articles.data.map((article: Article) => {
          const { author, body, cover, description, publishedAt, slug, title } =
            article.attributes;
          return (
            <Card
              key={article.id}
              description={description}
              imageAlt={cover.data.attributes.name}
              imageSrc={cover.data.attributes.url}
              slug={slug}
              title={title}
            />
          );
        })}
      </div>
    </main>
  );
}
