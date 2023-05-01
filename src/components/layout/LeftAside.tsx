import {
  HomeIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  UserIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import useCart from "~/hooks/useCart";
import { useSession } from "next-auth/react";
import useAppDispatch from "~/hooks/useAppDispatch";
import useWindowSize from "~/hooks/useWindowSize";
import { uiActions } from "~/store/slices/ui.slice";

const LeftAside = () => {
  const { data: user, status } = useSession();
  const isLoading = status == "loading";
  const isAuth = status == "authenticated";
  const dispatch = useAppDispatch();
  const { getNumberOfItems } = useCart();
  const windowSize = useWindowSize();
  const router = useRouter();

  const toggleCart = () => {
    if (
      (windowSize.width && windowSize.width < 500) ||
      router.pathname == "/"
    ) {
      router
        .push("/cart")
        .then()
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("open open");
      dispatch(uiActions.toggleCart());
    }
  };
  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-50 flex w-full  bg-bg-light px-4 py-4 dark:bg-bg-dark md:static md:z-50 md:block md:h-full md:w-[100px] 
"
    >
      <ul className="mx-auto flex gap-4 md:flex-col">
        <LeftAsideItem href="/" Icon={<HomeIcon className="h-8 w-8" />} />
        <li>
          <Button
            onClick={toggleCart}
            className=" relative cursor-pointer !rounded-full !bg-transparent !p-4 px-2 py-2
        !text-gray-700 text-text transition-all duration-100 hover:!bg-primary hover:!text-white 
          "
          >
            <ShoppingBagIcon className="h-6 w-6 md:h-8 md:w-8 " />
            <span className="absolute right-[5px] top-[10px] flex h-5 w-5 items-center justify-center rounded-full bg-primary   text-[9px] font-bold text-white  ">
              {getNumberOfItems()}
            </span>
          </Button>
        </li>
        {!isLoading && isAuth && <AuthenticatedView />}
        {!isLoading && !isAuth && <UnAuthenticatedView />}
      </ul>
    </aside>
  );
};

const AuthenticatedView = () => {
  return (
    <>
      <LeftAsideItem
        href="/profile/messages"
        Icon={<ChatBubbleOvalLeftIcon className="h-8 w-8" />}
      />
      <LeftAsideItem href="/profile" Icon={<UserIcon className="h-8 w-8" />} />
      <LeftAsideItem
        href="/profile/favorite"
        Icon={<HeartIcon className="h-8 w-8" />}
      />
      <LeftAsideItem
        href="/profile/settings"
        Icon={<Cog6ToothIcon className="h-8 w-8" />}
      />
    </>
  );
};

const UnAuthenticatedView = () => {
  return (
    <>
      <LeftAsideItem
        href="/auth/login"
        Icon={<ArrowRightOnRectangleIcon className="h-8 w-8" />}
      />
    </>
  );
};
const LeftAsideItem = ({ Icon, href }: { Icon: ReactNode; href: string }) => {
  const router = useRouter();
  const isActive = router.pathname == href;
  console.log(isActive);
  return (
    <li>
      <Link href={href}>
        <Button
          className={`!rounded-full !p-4 transition-all duration-100 hover:!bg-primary hover:!text-white  ${
            isActive ? "!bg-primary" : "!bg-transparent !text-gray-700"
          }  `}
        >
          {Icon}
        </Button>
      </Link>
    </li>
  );
};

export default LeftAside;
