import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { CartContextProvider } from "~/context/cart.context";
import Header from "~/components/layout/Header";
import Container from "~/components/wrappers/Container";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </CartContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
