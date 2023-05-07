import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

const MenuItemPage = () => {
  return (
    <>
      <Head>
        <title>menu items</title>
      </Head>
      <main>
        <h1>add item</h1>
      </main>
    </>
  );
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    if (!session || session.user.role == "customer")
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    return {
      props: {},
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: "/505",
        permanent: false,
      },
    };
  }
};
export default MenuItemPage;
