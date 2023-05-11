import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  PlusIcon,
  StarIcon,
  HeartIcon as SolidHeart,
  WifiIcon,
  HomeIcon,
  TvIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as OutlinedHeart } from "@heroicons/react/24/outline";
import { MenuItem } from "@prisma/client";
import Button from "./Button";
import Image from "next/image";
import useCart from "~/hooks/useCart";
import { useState } from "react";
import { toastSuccess } from "~/helpers/toasters";
import Skeleton from "react-loading-skeleton";

const MenuItemCartV1 = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();
  const stars = [];
  for (let i = 1; i <= 4; i++) {
    stars.push(<StarIcon className="h-3 w-3 text-primary" />);
  }
  const addToCartHandler = () => {
    console.log("add op <=>");
    addItem({ ...item, quantity: 1 });
  };
  const [liked, setLiked] = useState(false);
  const handleLikeClick = () => setLiked((prev) => !prev);
  return (
    <div className="!shadow-xs !w-[200px] w-full   max-w-[26rem] rounded-[20px]  p-2    shadow-lg transition-all duration-100   ">
      <div className="  relative flex w-full flex-col items-center  !py-1  !shadow-none ">
        <Button
          onClick={handleLikeClick}
          className="!absolute !right-[0px]  !top-[5px] rounded-full !bg-transparent p-2 hover:ring-2 hover:ring-red-300 active:ring-1 "
        >
          {!liked && <OutlinedHeart className="h-6 w-6 text-red-400" />}
          {liked && <SolidHeart className="h-6 w-6 text-red-400" />}
        </Button>
        <Image
          alt={`${item.name} image`}
          src={"https://picsum.photos/150/150"}
          width={130}
          height={130}
          className="   rounded-full "
        />
      </div>
      <div className="flex flex flex-col flex-col    !pt-2">
        <span className="font-bold capitalize text-title dark:text-title-dark">
          {item.name}
        </span>
      </div>
      <div className="   pt-0 ">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="flex gap-1 ">{stars}</span>
            <span className="  font-bold text-title">
              $ {item.price.toString()}
            </span>
          </div>
          <Button
            onClick={addToCartHandler}
            size="sm"
            className="  flex  h-[34px] w-[34px] items-center  justify-center !rounded-full !p-0 hover:ring-1 hover:ring-primary active:ring-0  "
          >
            <PlusIcon className="h-3 w-3 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const MenuItemCart = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();
  const stars = [];
  for (let i = 1; i <= 4; i++) {
    stars.push(<StarIcon className="h-3 w-3 text-primary" />);
  }
  const addToCartHandler = () => {
    addItem({ ...item, quantity: 1 });
    toastSuccess({ message: "added to cart" });
  };
  const [liked, setLiked] = useState(false);
  const handleLikeClick = () => setLiked((prev) => !prev);
  return (
    <div className="!shadow-xs group relative m-1  mx-auto w-full  max-w-[250px] cursor-pointer rounded-[20px]        p-2    shadow-lg     ">
      <div className="   flex  min-h-[120px] w-full flex-col items-center  !py-1  !shadow-none ">
        <Button
          onClick={handleLikeClick}
          className="!absolute !right-[0px]  !top-[5px] rounded-full !bg-transparent p-2 hover:ring-2 hover:ring-red-300 active:ring-1 "
        >
          {!liked && <OutlinedHeart className="h-6 w-6 text-red-400" />}
          {liked && <SolidHeart className="h-6 w-6 text-red-400" />}
        </Button>
        <Image
          alt={`${item.name} image`}
          src={item.image ?? ""}
          width={110}
          height={110}
          className="   rounded-full     "
        />
      </div>
      <div className="flex flex flex-col items-center     !pt-4">
        <span className="font-bold capitalize text-title dark:text-title-dark">
          {item.name}
        </span>
      </div>
      <div className="flex flex flex-col items-center     !py-2">
        <span className="font-bold capitalize text-primary ">
          $ {item.price.toString()}
        </span>
      </div>
      <div className="   flex justify-between ">
        <div className="flex items-center gap-2">
          <StarIcon className="h-4 w-4 text-primary" />
          <span className=" text-sm font-bold text-title dark:text-title-dark">
            {4.5}
          </span>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={addToCartHandler}
            size="sm"
            className="  flex  h-[34px] w-[34px] items-center  justify-center !rounded-full !p-0 hover:ring-1 hover:ring-primary active:ring-0  "
          >
            <PlusIcon className="h-3 w-3 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MenuItemCartSkelton = () => {
  return (
    <div className="!shadow-xs group relative m-1  mx-auto w-full  max-w-[250px] cursor-pointer rounded-[20px]        p-2    shadow-lg     ">
      <div className="   flex  min-h-[120px] w-full flex-col items-center  !py-1  !shadow-none ">
        <Skeleton circle width={110} height={110} />
      </div>
      <div className="flex flex flex-col items-center     !pt-4">
        <span className="font-bold capitalize text-title">
          <Skeleton />
        </span>
      </div>
      <div className="flex flex flex-col items-center     !py-2">
        <span className="font-bold capitalize text-primary ">
          <Skeleton count={3} width={100} />
        </span>
      </div>
      <div className="   flex justify-between ">
        <div className="flex items-center gap-2"></div>

        <div className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default MenuItemCart;
