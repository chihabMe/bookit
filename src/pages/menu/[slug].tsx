import { MenuItem } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import Head from "next/head";

interface MenuItemPageProps {
  menuItem: MenuItem & { price: string; createdAt: string; updatedAt: string }; // Convert price to a JSON serializable type
}

const MenuItemPage: NextPage<MenuItemPageProps> = ({ menuItem }) => {
  return (
    <>
      <Head>
        <title>{menuItem.name}</title>
      </Head>
      <main className="text-gray-400">{menuItem.description}</main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MenuItemPageProps> = async (
  ctx
) => {
  try {
    const slug = ctx.query.slug as string;
    const menuItem = await prisma.menuItem.findFirst({
      where: {
        slug,
      },
    });
    if (!menuItem) {
      return {
        notFound: true,
      };
    }

    // Convert createdAt, updatedAt, and price to strings
    const props: MenuItemPageProps = {
      menuItem: {
        ...menuItem,
        createdAt: menuItem.createdAt.toString(),
        updatedAt: menuItem.updatedAt.toString(),
        price: menuItem.price.toString(),
      },
    };

    return {
      props,
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
