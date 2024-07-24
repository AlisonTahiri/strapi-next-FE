import { Suspense } from "react";

import BlogCards from "./components/BlogCards";

// TODO: Add Metadata

export default async function Home() {
  return (
    <main className="prose  max-w-none">
      <section>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <h1>Welcome to Blogy!</h1>
          <BlogCards />
        </div>
      </section>
    </main>
  );
}
