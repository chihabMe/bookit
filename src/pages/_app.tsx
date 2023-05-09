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
import ToasterWrapper from "~/components/wrappers/ToasterWrapper";
import NextPrograssBar from "nextjs-progressbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeProvider } from "next-themes";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "~/components/layout/Footer";

type IComponentWithPageLayout = AppProps["Component"] & {
  hideAside?: boolean;
  PageLayout?: React.ComponentType<{ children: ReactNode }>;
  showFooter?: boolean;
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
          <SkeletonTheme baseColor="#fff" highlightColor="#ffdda0">
            <NextPrograssBar color="orange" options={{ showSpinner: false }} />
            <ThemeProvider attribute="class">
              <Container>
                <ToasterWrapper>
                  <div className="flex w-full gap-2">
                    {!ComponentWithPageLayout.hideAside && <LeftAside />}
                    <div className="    w-full  px-2 pb-[160px] md:py-2">
                      {ComponentWithPageLayout.PageLayout && (
                        <ComponentWithPageLayout.PageLayout>
                          <ComponentWithPageLayout {...pageProps} />
                        </ComponentWithPageLayout.PageLayout>
                      )}
                      {!ComponentWithPageLayout.PageLayout && (
                        <ComponentWithPageLayout {...pageProps} />
                      )}
                    </div>
                  </div>
                </ToasterWrapper>
              </Container>
              {ComponentWithPageLayout.showFooter && <Footer />}
            </ThemeProvider>
          </SkeletonTheme>
        </CartContextProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
