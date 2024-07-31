import BlogCards from "./components/BlogCards";

export default async function Home() {
  const pageSize = Number(process.env.HOMEPAGE_SIZE) || 9;
  return (
    <main className="prose  max-w-none">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <h1>Welcome to Blogy!</h1>
          <BlogCards pageSize={pageSize} page={1} />
        </div>
      </section>
    </main>
  );
}
