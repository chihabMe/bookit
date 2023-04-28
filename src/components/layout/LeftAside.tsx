import {
  HomeIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter } from "next/router";

const LeftAside = () => {
  return (
    <aside className="h-full w-[100px] px-4 pt-4">
      <ul className="flex flex-col gap-4">
        <LeftAsideItem href="/" Icon={<HomeIcon className="h-6 w-6" />} />
        <LeftAsideItem
          href="/profile/messages"
          Icon={<ChatBubbleOvalLeftIcon className="h-6 w-6" />}
        />
        <LeftAsideItem
          href="/profile"
          Icon={<UserIcon className="h-6 w-6" />}
        />
        <LeftAsideItem
          href="/profile/favorite"
          Icon={<HeartIcon className="h-6 w-6" />}
        />
        <LeftAsideItem
          href="/profile/settings"
          Icon={<Cog6ToothIcon className="h-6 w-6" />}
        />
      </ul>
    </aside>
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