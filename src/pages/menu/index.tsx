import { NextPage } from "next";
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
      <main>
        <Menu />
      </main>
    </>
  );
};
MenuPage.PageLayout = CartLayout;
export default MenuPage;
