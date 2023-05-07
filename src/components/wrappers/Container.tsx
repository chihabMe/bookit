import { useSession } from "next-auth/react";
import Head from "next/head";
import { ReactNode } from "react";
import Spinner from "../ui/Spinner";
import { useRouter } from "next/router";
import { UserRoles } from "@prisma/client";

const Container = ({ children }: { children: ReactNode }) => {
  const { status, data: user } = useSession();
  const router = useRouter();
  const isInProfileChoseType =
    router.pathname == "/profile/chose-type" ||
    router.pathname.startsWith("/auth");
  if (status == "loading")
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  if (
    !isInProfileChoseType &&
    user &&
    user.user.role &&
    user.user.role == UserRoles.none
  ) {
    router.push("/profile/chose-type").catch((err) => console.log(err));
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

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
