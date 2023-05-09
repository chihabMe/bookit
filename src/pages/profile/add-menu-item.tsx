import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

const addmenuitempage = () => {
  return (
    <>
      <Head>
        <title>add item</title>
      </Head>
      <main>
        <h1>add item</h1>
      </main>
    </>
  );
};
export default addmenuitempage;
