import { NextPage } from "next";
import Head from "next/head";
import Menu from "~/components/pages/MenuPage";
const MenuPage: NextPage = () => {
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
export default MenuPage;
