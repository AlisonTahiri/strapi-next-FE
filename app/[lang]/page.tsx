import { getLocalesData, getMainPageData } from "./apiService/apiService";
import { LocaleCode } from "./apiService/types";
import BlogCards from "./components/BlogCards";
import { LocalesLinks } from "./components/LanguagesPicker";
import Nav from "./components/Nav";

export default async function Home({
  params: { lang },
}: {
  params: { lang: LocaleCode };
}) {
  const pageSize = Number(process.env.HOMEPAGE_SIZE) || 9;

  const localesData = await getLocalesData(); // This is already called in getStaticParams and Memoized, so no need for Promise.all.
  const mainPageData = await getMainPageData({ locale: lang });

  const { title } = mainPageData.mainPage.data.attributes;

  const localesLinks: LocalesLinks = localesData.i18NLocales.data
    .filter((locale) => !(locale.attributes.code === lang)) // remove current locale from link
    .map((locale) => ({
      locale: locale.attributes.code,
      href: `/${locale.attributes.code}/${1}`,
    }));

  return (
    <>
      <Nav lang={lang} localesLinks={localesLinks} />

      <main className="prose  max-w-none">
        <section>
          <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <h1>{title}</h1>
            <BlogCards page={1} pageSize={pageSize} locale={lang} />
          </div>
        </section>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const localesData = await getLocalesData();

  return localesData.i18NLocales.data.map((locale) => ({
    lang: locale.attributes.code,
  }));
}
