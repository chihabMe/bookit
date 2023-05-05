import {
  HomeIcon,
  HeartIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowDownCircleIcon as LogoutIcon,
  ShoppingBagIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import useCart from "~/hooks/useCart";
import { signOut, useSession } from "next-auth/react";
import useAppDispatch from "~/hooks/useAppDispatch";
import useWindowSize from "~/hooks/useWindowSize";
import { uiActions } from "~/store/slices/ui.slice";
import ThemeToggler from "../ui/ThemeToggler";

const LeftAside = () => {
  const { data: user, status } = useSession();
  const isLoading = status == "loading";
  const isAuth = status == "authenticated";
  const dispatch = useAppDispatch();
  const { getNumberOfItems } = useCart();
  const windowSize = useWindowSize();
  const router = useRouter();
  const hideAside =
    router.pathname == "/" || router.pathname.startsWith("/auth");

  const toggleCart = () => {
    if (
      (windowSize.width && windowSize.width < 500) ||
      router.pathname != "/menu"
    ) {
      router
        .push("/cart")
        .then()
        .catch((err) => {
          console.error(err);
        });
    } else {
      dispatch(uiActions.toggleCart());
    }
  };
  return (
    <aside
      className={` ${
        hideAside ? "md:!hidden" : ""
      } fixed bottom-0 left-0 right-0 z-50 flex w-full bg-bg-light bg-bg-light  px-4 py-4 dark:bg-bg-dark  md:static md:z-50 md:block md:h-full md:w-[100px] 
`}
    >
      <ul className="mx-auto flex gap-0 md:flex-col">
        <LeftAsideItem
          href="/"
          Icon={<HomeIcon className="h-6 w-6 md:h-8 md:w-8 " />}
        />
        <li>
          <Button
            onClick={toggleCart}
            className={` 
relative cursor-pointer !rounded-full !bg-transparent !p-4 px-2 py-2
        !text-text  transition-all duration-100 hover:!bg-primary hover:!text-white dark:!text-title-dark 
          `}
          >
            <ShoppingBagIcon className="h-6 w-6 md:h-8 md:w-8 " />
            <span className="absolute right-[5px] top-[10px] flex h-5 w-5 items-center justify-center rounded-full bg-primary   text-[9px] font-bold text-white  ">
              {getNumberOfItems()}
            </span>
          </Button>
        </li>
        <LeftAsideItem
          href="/profile"
          Icon={<UserIcon className="h-6 w-6 md:h-8 md:w-8 " />}
        />
        <li className="">
          <ThemeToggler />
        </li>

        <LeftAsideItem
          href="/profile/favorite"
          Icon={<HeartIcon className="h-6 w-6 md:h-8 md:w-8 " />}
        />
        {!isLoading && !isAuth && <UnAuthenticatedView />}
        {!isLoading && isAuth && <AuthenticatedView />}
      </ul>
    </aside>
  );
};

const AuthenticatedView = () => {
  return (
    <>
      <li>
        <Link href="/auth/logout">
          <Button
            className="  relative cursor-pointer !rounded-full !bg-transparent !p-4 px-2 py-2
        !text-red-400   transition-all  duration-100   
          "
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 md:h-8 md:w-8 " />
          </Button>
        </Link>
      </li>
    </>
  );
};

const UnAuthenticatedView = () => {
  return <></>;
};
const LeftAsideItem = ({ Icon, href }: { Icon: ReactNode; href: string }) => {
  const router = useRouter();
  const isActive = router.pathname == href;
  return (
    <li>
      <Link href={href}>
        <Button
          className={`!rounded-full !p-4 transition-all duration-100 hover:!bg-primary hover:!text-white  ${
            isActive
              ? "!bg-primary"
              : "!bg-transparent !text-text dark:!text-title-dark"
          }  `}
        >
          {Icon}
        </Button>
      </Link>
    </li>
  );
};

export default LeftAside;
