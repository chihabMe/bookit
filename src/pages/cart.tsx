import Head from "next/head";
import Cart from "~/components/layout/Cart";

const CartPage = () => {
  return (
    <>
      <Head>
        <title>cart page</title>
      </Head>
      <main className=" flex min-h-screen items-center justify-center ">
        <section className="mx-auto w-full max-w-[700px] ">
          <Cart />
        </section>
      </main>
    </>
  );
};
export default CartPage;
