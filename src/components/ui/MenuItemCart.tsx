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

const MenuItemCart = ({ item }: { item: MenuItem }) => {
  const stars = [];
  for (let i = 1; i <= 4; i++) {
    stars.push(<StarIcon className="h-3 w-3 text-primary" />);
  }
  return (
    <Card className="w-full max-w-[26rem]   shadow-lg">
      <CardHeader className="flex flex-col items-center !py-1 " floated={false}>
        <Image
          alt={`${item.name} image`}
          src={"https://picsum.photos/150/150"}
          width={150}
          height={150}
          className=" !w-100 !h-100 rounded-full "
        />
      </CardHeader>
      <CardBody className="flex flex flex-col flex-col    !pt-1">
        <span className="font-bold capitalize text-title">{item.name}</span>
      </CardBody>
      <CardFooter className="pt-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="flex gap-1 ">{stars}</span>
            <span className="  font-bold text-title">
              $ {item.price.toString()}
            </span>
          </div>
          <Button size="sm" className="   !rounded-full  ">
            <PlusIcon className="h-3 w-3 text-white" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default MenuItemCart;
