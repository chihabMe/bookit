import { Input } from "@material-tailwind/react";
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
        <section className="flex min-h-screen  gap-2">
          <div className="mt-10 h-full  w-full md:w-1/2 ">
            <div className="pb-4 pt-2">
              <RestaurantsSearchForm />
            </div>
            <RestaurantsSearch />
          </div>
          <div className="  hidden h-screen items-center justify-center bg-blue-50 text-white md:flex md:w-1/2">
            <h1>map</h1>
          </div>
        </section>
      </main>
    </>
  );
};

const RestaurantsSearchForm = () => {
  return (
    <form>
      <Input
        variant="outlined"
        color="orange"
        size="lg"
        label="Search ...."
        placeholder="Search ..."
      />
    </form>
  );
};

export default RestraurantsPage;
