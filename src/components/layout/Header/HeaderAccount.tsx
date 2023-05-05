import {
  BellIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useWillChange } from "framer-motion";
import { useRouter } from "next/router";
import Button from "~/components/ui/Button";
import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import useCart from "~/hooks/useCart";
import useWindowSize from "~/hooks/useWindowSize";
import { uiActions } from "~/store/slices/ui.slice";
import { useSession } from "next-auth/react";
import { ChangeEvent, Fragment, ReactNode } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import ThemeToggler from "~/components/ui/ThemeToggler";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
const HeaderAccount = () => {
  const { data: user, status } = useSession();
  const isLoading = status == "loading";
  const router = useRouter();
  const isAuth = status == "authenticated";
  const { getNumberOfItems } = useCart();
  const hideButtons = router.pathname == "/";

  return (
    <div className="flex  items-center gap-4  ">
      <ThemeToggler
        rclassName={` ${
          hideButtons ? "md:!flex !hidden" : ""
        }  relative flex h-12 items-center justify-center rounded-full !bg-transparent  px-1 md:px-4 capitalize !text-text !text-title text-title hover:!text-primary dark:!text-title-dark    dark:!text-title-dark `}
      />
      <Link href="/cart" className={`${hideButtons ? "!hidden md:!flex" : ""}`}>
        <Button
          className={`   relative flex h-12 items-center justify-center rounded-full !bg-transparent px-1  capitalize !text-text !text-title text-title hover:!text-primary dark:!text-title-dark   md:px-4 `}
        >
          <ShoppingBagIcon className="h-6 w-6 md:h-8 md:w-8 " />
          <span className="absolute right-[5px] top-[10px] flex h-5 w-5 items-center justify-center rounded-full bg-primary   text-[9px] font-bold text-white  ">
            {getNumberOfItems()}
          </span>
        </Button>
      </Link>
      {isLoading && <AuthStelaton />}
      {!isLoading && isAuth && <AuthenticatedUserView />}
      {!isLoading && !isAuth && <UnAuthenticatedUserView />}
    </div>
  );
};

const AuthStelaton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton width={95} height={40} />
      <Skeleton width={95} height={40} />
    </div>
  );
};

const AuthenticatedUserView = () => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left ">
        {({ open }) => (
          <div>
            <Menu.Button>
              <Button className=" flex  cursor-pointer items-center gap-3 !bg-transparent px-2 py-2 !capitalize   !text-title dark:!text-title-dark  ">
                <UserIcon className=" h-6 w-6     md:h-8  md:w-8  " />
                <div className="flex items-center gap-2 text-xs font-medium ">
                  <ChevronDownIcon
                    className={`h-4 w-4  ${
                      open ? "rotate-180" : ""
                    } transition-all duration-200`}
                  />
                </div>
              </Button>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className="transparent  absolute right-0 mt-2 w-[220px] origin-top-right divide-y divide-gray-100 rounded-md bg-bg-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-bg-dark"
              >
                <div className="flex flex-col gap-1 px-1 py-2 pt-4">
                  <AuthMenuItem href="/profile">
                    <UserIcon className="h-5 w-5 " />
                    <span>Profile</span>
                  </AuthMenuItem>

                  <AuthMenuItem href="/settings">
                    <Cog6ToothIcon className="h-5 w-5 " />
                    <span>Settings</span>
                  </AuthMenuItem>

                  <AuthMenuItem
                    href="/auth/logout"
                    className="!text-red-300 hover:!bg-red-400 hover:!text-white"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 " />
                    <span>Logout</span>
                  </AuthMenuItem>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  );
};

const AuthMenuItem = ({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  wrapper?: ReactNode;
  href: string;
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={href}>
          <li
            className={`${className!} ${
              active
                ? "bg-primary  text-white"
                : "text-text dark:text-text-dark"
            } group flex flex w-full cursor-pointer items-center items-center gap-2 rounded-full  px-4  py-[13px] transition-all duration-200`}
          >
            {children}
          </li>
        </Link>
      )}
    </Menu.Item>
  );
};

const UnAuthenticatedUserView = () => {
  return (
    <div className="flex gap-4">
      <Link href="/auth/login">
        <Button className="h-12 rounded-full !bg-transparent px-8  capitalize !text-text !text-title text-title hover:!text-primary hover:!text-primary hover:ring-2 hover:ring-primary dark:!text-title-dark ">
          sign in
        </Button>
      </Link>

      <Link href="/auth/register">
        <Button className="h-12 rounded-full px-8 capitalize hover:ring-2 hover:ring-primary active:ring-1  dark:text-text-dark">
          sign up
        </Button>
      </Link>
    </div>
  );
};
export default HeaderAccount;
