import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import CartLayout from "~/components/layout/CartLayout";
import Header from "~/components/layout/Header";
import Menu from "~/components/pages/MenuPage";
const MenuPage = () => {
  return (
    <>
      <Head>
        <title>menu page</title>
      </Head>
      <main className=" min-h-screen w-full   w-full max-w-[1100px] overflow-y-scroll px-2 pb-[160px] md:py-2">
        <div>
          <Menu />
        </div>
      </main>
    </>
  );
};
MenuPage.PageLayout = CartLayout;
export default MenuPage;
