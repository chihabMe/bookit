import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import MenuItemCart from "~/components/ui/MenuItemCart";
import CartLayout from "~/components/layout/CartLayout";
import Button from "~/components/ui/Button";

const Home = () => {
  return (
    <>
      <Head>
        <title>bookit </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className=" mx-auto mt-[60px] w-full max-w-[1000px]">
          <div className="flex w-[400px] flex-col gap-[8px] text-5xl font-bold capitalize text-text dark:text-text-dark">
            <h1>the fastest</h1>
            <h1>delevery</h1>
            <h1 className="text-primary">in your city</h1>

            <div className="py-4">
              <p className="text-xs font-medium text-text dark:text-text-dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                end of text
              </p>
            </div>
            <div className="mt-8 flex gap-8">
              <Link href="/menu">
                <Button className=" animate-pluse h-12 rounded-lg px-8 capitalize text-white !shadow-md shadow">
                  order now
                </Button>
              </Link>
              <Link href="/book">
                <Button className="flex flex  h-12 items-center rounded-lg !bg-transparent capitalize text-text   hover:text-primary hover:ring-2 hover:ring-primary">
                  book a place
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
Home.PageLayout = CartLayout;

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
