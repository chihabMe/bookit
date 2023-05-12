import { MenuItem } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { prisma } from "~/server/db";
const MenuItemPage = ({ menuItem }: { menuItem: MenuItem }) => {
  return (
    <>
      <Head>
        <title>{menuItem.name}</title>
      </Head>
      <main>{menuItem.name}</main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
      const menuItem = prisma
    return {
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination:"/505",
        permanent:false

      },
    };
  }
};
