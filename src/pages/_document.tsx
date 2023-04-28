import { Head, Html, Main, NextScipt, NextScript } from "next/document";

const Docuemnt = () => {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="food ordering web app" />
        <meta name="keywords" content="food,order" />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-light dark:bg-dark">
        <NextScript />
        <Main />
      </body>
    </Html>
  );
};

export default Docuemnt;
