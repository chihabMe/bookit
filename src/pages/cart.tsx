import Head from "next/head";
import Cart from "~/components/layout/Cart";

const CartPage = () => {
  return (
    <>
      <Head>
        <title>cart page</title>
      </Head>
      <main className="  min-h-screen  pt-[10px] ">
        <section className="mx-auto w-full max-w-[700px] ">
          <Cart />
        </section>
      </main>
    </>
  );
};
export default CartPage;
