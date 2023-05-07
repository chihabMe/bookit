import { Head, Html, Main, NextScript } from "next/document";

const Docuemnt = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className=" bg-orange-50  font-roboto dark:bg-bg-dark">
        <NextScript />
        <Main />
      </body>
    </Html>
  );
};

export default Docuemnt;
