import { MenuItem } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import Head from "next/head";
import Image from "next/image";
import Button from "~/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import useCart from "~/hooks/useCart";
import { ICartItem } from "~/context/cart.context";
import { ChangeEvent, useState } from "react";

interface MenuItemPageProps {
  menuItem: MenuItem & { price: string; createdAt: string; updatedAt: string }; // Convert price to a JSON serializable type
}

const MenuItemPage: NextPage<MenuItemPageProps> = ({ menuItem }) => {
  const [qt, setQt] = useState(1);
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
                <div className="-mx-4 flex flex-wrap items-center justify-between lg:items-start lg:justify-start xl:items-center">
                  <div className="flex w-full min-w-max items-center justify-center px-4 text-center sm:w-auto sm:flex-col">
                    <a
                      className="hover:text-darkBlueGray-400 mr-4 inline-block -rotate-90 transform sm:mb-12 sm:mr-0 sm:transform-none"
                      href="#"
                    ></a>
                    <a className="h-30 mb-4 mr-2 block sm:mr-0" href="#">
                      <Image
                        className="h-full w-full"
                        width={700}
                        height={700}
                        src={menuItem.image ?? ""}
                        alt={` ${menuItem.name}  image`}
                      />
                    </a>
                    <a
                      className="h-30 mb-4 mr-2 hidden sm:mr-0 sm:block"
                      href="#"
                    >
                      <img
                        className="h-full w-full"
                        src="uinel-assets/images/ecommerce-product-info/placeholder2.png"
                        alt=""
                      />
                    </a>
                    <a
                      className="h-30 border-blueGray-500 mb-4 mr-2 hidden rounded-xl border-2 sm:mr-0 sm:block"
                      href="#"
                    >
                      <img
                        className="h-full w-full"
                        src="uinel-assets/images/ecommerce-product-info/placeholder4.png"
                        alt=""
                      />
                    </a>
                    <a
                      className="h-30 mb-4 mr-4 block sm:mb-12 sm:mr-0"
                      href="#"
                    >
                      <img
                        className="h-full w-full"
                        src="uinel-assets/images/ecommerce-product-info/placeholder3.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="w-full px-4 sm:w-9/12">
                    <img
                      className="mb-5"
                      src="uinel-assets/images/ecommerce-product-info/ph-photo1.png"
                      alt=""
                    />
                    <p className="text-sm text-gray-300">
                      Roll over image to zoom in
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="mb-6 max-w-md">
                  <h2 className="font-heading mb-4 mt-6 text-5xl font-medium text-title dark:text-title-dark md:text-7xl lg:text-8xl">
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
                    <button className="mr-1">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                          fill="#C1C9D3"
                        ></path>
                      </svg>
                    </button>
                    <button className="mr-1">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                          fill="#C1C9D3"
                        ></path>
                      </svg>
                    </button>
                    <button className="mr-1">
                      <svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                          fill="#C1C9D3"
                        ></path>
                      </svg>
                    </button>
                    <button>
                      <svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                          fill="#C1C9D3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <span className="text-md text-gray-400">4.59</span>
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
                <div>
                  <h4 className="font-heading mb-6 font-medium">
                    More information
                  </h4>
                  <button className="border-blueGray-200 hover:border-blueGray-300 mb-4 flex w-full items-center justify-between rounded-2xl border-2 py-4 pl-6 pr-6 leading-7 lg:pl-12">
                    <h3 className="font-heading text-lg font-medium">
                      Shipping &amp; returns
                    </h3>
                    <span>
                      <svg
                        width="12"
                        height="8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                  </button>
                  <button className="border-blueGray-200 hover:border-blueGray-300 flex w-full items-center justify-between rounded-2xl border-2 py-4 pl-6 pr-6 leading-7 lg:pl-12">
                    <h3 className="font-heading text-lg font-medium">
                      Product details
                    </h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
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
