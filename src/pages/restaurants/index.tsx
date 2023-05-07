import { NextPage } from "next";
import Head from "next/head";
import RestaurantsSearch from "~/components/pages/Restaurants/RestaurantsSearch";

export const RestraurantsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>restaurants</title>
      </Head>
      <main className="min-h-screen w-full">
        <section className="min-h-screen">
          <RestaurantsSearch />
        </section>
      </main>
    </>
  );
};
export default RestraurantsPage;
