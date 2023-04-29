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
  HeartIcon,
  WifiIcon,
  HomeIcon,
  TvIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { MenuItem } from "@prisma/client";
import Button from "./Button";
import Image from "next/image";
import useCart from "~/hooks/useCart";

const MenuItemCart = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();
  const stars = [];
  for (let i = 1; i <= 4; i++) {
    stars.push(<StarIcon className="h-3 w-3 text-primary" />);
  }
  const addToCartHandler = () => {
    console.log("add op <=>");
    addItem({ ...item, quantity: 1 });
  };
  return (
    <Card className="!w-[270px] w-full max-w-[26rem]   rounded-[20px] shadow-lg transition-all duration-100   hover:ring-2 hover:ring-primary">
      <CardHeader className="flex flex-col items-center !py-1 " floated={false}>
        <Image
          alt={`${item.name} image`}
          src={"https://picsum.photos/150/150"}
          width={140}
          height={140}
          className="   rounded-full "
        />
      </CardHeader>
      <CardBody className="flex flex flex-col flex-col    !pt-2">
        <span className="font-bold capitalize text-title">{item.name}</span>
      </CardBody>
      <CardFooter className="   pt-0 ">
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
            className="   !rounded-full  "
          >
            <PlusIcon className="h-3 w-3 text-white" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default MenuItemCart;
