import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ICommentItemWithUser } from "./CommentSection";
import Skeleton from "react-loading-skeleton";
import { getValueFromEnum } from "~/helpers/prismaEnumsConverters";
import Image from "next/image";

const CommentItem = ({ comment }: { comment: ICommentItemWithUser }) => {
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pb-8 pt-0"
      >
        <Image
          src={comment.user.image ?? ""}
          alt="user profile image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <Avatar size="lg" variant="circular" src="" alt="candice wu" />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {comment.user.name ?? "none"}
            </Typography>
            <div className="5 flex items-center gap-0">
              <RatingStars value={getValueFromEnum(comment.rate) ?? 0} />
            </div>
          </div>
          <Typography color="blue-gray"></Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>{comment.body}</Typography>
      </CardBody>
    </Card>
  );
};

const RatingStars = ({ value }: { value: number }) => {
  const stars = [];
  for (let i = 0; i < value; i++) {
    stars.push(<StarIcon className="h-5 w-5 text-yellow-700" key={i} />);
  }

  return <>{stars}</>;
};
export const CommentItemSkelaton = () => {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-[300px] w-full max-w-[26rem]"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pb-8 pt-0"
      >
        <Skeleton width={60} height={60} circle />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              <Skeleton width={150} height={40} />
            </Typography>
            <div className="5 flex items-center gap-0">
              <Skeleton width={60} height={40} />
              <Skeleton width={60} height={40} />
              <Skeleton width={60} height={40} />
              <Skeleton width={60} height={40} />
              <Skeleton width={60} height={40} />
            </div>
          </div>
          <Typography color="blue-gray"></Typography>
        </div>
      </CardHeader>
    </Card>
  );
};

// <CardBody className="mb-6 p-0"></CardBody>
export default CommentItem;
