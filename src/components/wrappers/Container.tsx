import Head from "next/head";
import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="food ordering web app" />
        <meta name="keywords" content="food,order" />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="mx-auto w-full max-w-[1300px]">{children}</div>;
    </>
  );
};
export default Container;
