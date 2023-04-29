import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { CartContextProvider } from "~/context/cart.context";
import Header from "~/components/layout/Header";
import Container from "~/components/wrappers/Container";
import LeftAside from "~/components/layout/LeftAside";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ReactNode } from "react";
import store from "~/store";

type IComponentWithPageLayout = AppProps["Component"] & {
  PageLayout?: React.ComponentType<{ children: ReactNode }>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  pageProps: { session, ...pageProps },
  Component,
}) => {
  const ComponentWithPageLayout = Component as IComponentWithPageLayout;
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <CartContextProvider>
          <Container>
            <div className="flex w-full gap-2">
              <LeftAside />
              <div className=" scrollbar-hide  max-h-screen w-full overflow-y-scroll px-2 pb-[160px] md:py-2">
                <Header />
                {ComponentWithPageLayout.PageLayout && (
                  <ComponentWithPageLayout.PageLayout>
                    <Component {...pageProps} />
                  </ComponentWithPageLayout.PageLayout>
                )}
                {!ComponentWithPageLayout.PageLayout && (
                  <ComponentWithPageLayout />
                )}
              </div>
            </div>
          </Container>
        </CartContextProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
