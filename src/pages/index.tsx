import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import MenuItemCart from "~/components/ui/MenuItemCart";
import CartLayout from "~/components/layout/CartLayout";
import Button from "~/components/ui/Button";
import Header from "~/components/layout/Header";
import Image from "next/image";
import Footer from "~/components/layout/Footer";

const Home = () => {
  return (
    <>
      <Head>
        <title>bookit </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className=" mt-[50px] flex  w-full flex-col     px-4 md:mt-0 md:mt-[60px]">
        <section className="   mx-auto mt-[30px] flex   w-full  w-full max-w-[1100px]       pb-[50px] md:flex-row md:justify-between">
          <div className="flex w-[400px] flex-col gap-[8px] text-2xl font-bold capitalize text-text dark:text-text-dark sm:text-4xl md:text-5xl">
            <h1>the fastest</h1>
            <h1>delevery</h1>
            <h1 className="text-primary">in your city</h1>

            <div className="py-4">
              <p className="w-[250px] text-xs font-medium text-text dark:text-text-dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              </p>
            </div>
            <div className="mt-8 flex items-center  gap-8 ">
              <Link href="/menu">
                <Button className=" animate-pluse h-12 rounded-full  px-8 capitalize text-white !shadow-md shadow hover:ring-2 hover:ring-primary">
                  order now
                </Button>
              </Link>
              <Link href="/book">
                <Button className="  h-12 items-center  rounded-full !bg-transparent  capitalize !text-text  hover:!text-primary  hover:text-primary hover:ring-2   hover:ring-primary active:ring-1 dark:!text-text-dark">
                  book a place
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              alt="delevery man"
              width={450}
              height={450}
              src="/images/delevery.png"
            />
          </div>
        </section>
        <section className="flex min-h-screen w-full flex-col-reverse items-start    py-8 lg:flex-row  lg:items-center lg:justify-between">
          <div>
            <h1 className="py-4 text-4xl font-bold text-title dark:text-title-dark">
              Everything you
              <br />
              crave, delivered.
            </h1>
            <h2 className="py-2 text-2xl font-bold text-title dark:text-title-dark">
              Your favorite local restaurants
            </h2>
            <p className="w-full max-w-[430px] py-2 font-bold text-text dark:text-text-dark">
              Get a slice of pizza or the whole pie delivered, or pick up house
              lo mein from the Chinese takeout spot you have been meaning to
              try.
            </p>
            <Link href="/menu">
              <Button className="mt-8 rounded-full !px-8 py-4 font-bold capitalize hover:ring-2 hover:ring-primary active:ring-1">
                find restaurnts
              </Button>
            </Link>
          </div>
          <Image
            alt="food image"
            width={800}
            height={800}
            src="/images/pages/home/image1.jpg"
            className="   rounded-md md:!h-[370px]  md:!w-[600px] lg:!h-[500px] lg:!w-[700px] "
          />
        </section>
        <section className="flex min-h-screen w-full flex-col items-start    py-8 lg:flex-row  lg:items-center lg:justify-between">
          <Image
            alt="food image"
            width={800}
            height={800}
            src="/images/pages/home/image2.jpg"
            className="   rounded-md md:!h-[370px]  md:!w-[600px] lg:!h-[500px] lg:!w-[700px] "
          />
          <div>
            <h1 className="py-4 text-4xl font-bold text-title dark:text-title-dark">
              Bookit is
              <br /> delivery for less
            </h1>
            <h2 className="py-2 text-2xl font-bold text-title dark:text-title-dark">
              Limited openings are available
              <br /> so register now to secure your spot
            </h2>
            <p className="w-full max-w-[430px] py-2 font-bold text-text dark:text-text-dark">
              Members get a $0 delivery fee on DashPass orders, 5% back on
              pickup orders, and so much more. Plus, its free for 30 days.
            </p>
            <Link href="/menu">
              <Button className="mt-8 rounded-full !px-8 py-4 font-bold capitalize hover:ring-2 hover:ring-primary active:ring-1">
                register as a delivery man
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

//Home.hideAside = true;

export default Home;
