import { MenuItem } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import Head from "next/head";
import Image from "next/image";
import Button from "~/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import useCart from "~/hooks/useCart";
import { ICartItem } from "~/context/cart.context";
import { ChangeEvent, FormEvent, useState } from "react";

import {
  Card,
  Rating,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Textarea,
} from "@material-tailwind/react";

import { StarIcon } from "@heroicons/react/24/solid";
import CommentsSection from "~/components/pages/MenuItemPage/CommentSection";
interface MenuItemPageProps {
  menuItem: MenuItem & { price: string; createdAt: string; updatedAt: string }; // Convert price to a JSON serializable type
}

const MenuItemPage: NextPage<MenuItemPageProps> = ({ menuItem }) => {
  const [qt, setQt] = useState(1);
  const [rated, setRated] = useState(0);
  const { addItem } = useCart();
  const handleQtChange = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);
    setQt(quantity);
  };

  return (
    <>
      <Head>
        <title>{menuItem.name}</title>
      </Head>
      <main className="text-gray-400">
        <section className="bg-blueGray-100 rounded-b-10xl overflow-hidden pb-24 pt-12">
          <div className="container mx-auto px-4">
            <div className="-mx-4 flex flex-wrap">
              <div className="mb-16 w-full px-4 lg:mb-0 lg:w-1/2">
                <div className="  flex flex-wrap items-center justify-between  lg:items-start lg:justify-start xl:items-center">
                  <div className="flex !w-full  w-full min-w-max items-center justify-center     text-center sm:w-auto sm:flex-col">
                    <Image
                      className=" mt-6 h-[350px]  w-[550px] !rounded-xl "
                      width={550}
                      height={350}
                      src={menuItem.image ?? ""}
                      alt={` ${menuItem.name}  image`}
                    />
                  </div>
                </div>
              </div>
              <div className=" w-full  px-4  lg:w-1/2">
                <div className="mb-6 max-w-md">
                  <h2 className="font-heading mb-4 mt-6 text-4xl font-medium text-title dark:text-title-dark md:text-6xl lg:text-7xl">
                    {menuItem.name}
                  </h2>
                  <p className="mb-6 flex items-center">
                    <span className="mr-2 text-sm font-medium text-blue-500 text-primary">
                      $
                    </span>
                    <span className="text-3xl font-medium text-blue-500 text-primary ">
                      {menuItem.price}
                    </span>
                  </p>
                  <h1 className="py-2 text-xl font-medium capitalize text-title dark:text-title-dark">
                    description:
                  </h1>
                  <p className="px-2  text-lg text-sm text-text dark:text-text-dark">
                    {menuItem.description}
                  </p>
                </div>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 inline-flex">
                    <button className="mr-1"></button>
                    <button>
                      <div className="flex items-center gap-2">
                        <Rating
                          value={rated}
                          onChange={(value) => setRated(value)}
                        />
                      </div>
                    </button>
                  </div>
                  <span className="text-md font-bold text-text dark:text-text-dark ">
                    4.59
                  </span>
                </div>
                <div className="mb-10">
                  <h4 className="font-heading mb-3 font-medium text-text dark:text-text-dark">
                    quantity
                  </h4>
                  <input
                    value={qt}
                    onChange={handleQtChange}
                    className="w-24 rounded-xl border-2 border-primary bg-white px-3 py-2 text-center text-primary outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    type="text"
                    placeholder="1"
                  />
                </div>
                <div className="-mx-2 mb-12 flex flex-wrap">
                  <Button
                    onClick={() => {
                      addItem(
                        {
                          ...menuItem,
                          price: menuItem.price.toString(),
                        } as ICartItem,
                        qt
                      );
                    }}
                    className="px-8 py-4"
                  >
                    add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CommentsSection menuItemId={menuItem.id} />
      </main>
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
