import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { CartContextProvider } from "~/context/cart.context";
import Header from "~/components/layout/Header";
import Container from "~/components/wrappers/Container";
import LeftAside from "~/components/layout/LeftAside";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Container>
          <div className="flex w-full gap-2">
            <LeftAside />
            <div className="max-h-screen w-full overflow-y-scroll px-2 py-2 ">
              <Header />
              <Component {...pageProps} />
            </div>
          </div>
        </Container>
      </CartContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
