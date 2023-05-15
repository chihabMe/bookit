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

const CommentItem = ({ comment }: { comment: ICommentItemWithUser }) => {
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pb-8 pt-0"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="candice wu"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {comment.user}
            </Typography>
            <div className="5 flex items-center gap-0">
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
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
export const CommentItemSkelaton = () => {
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem] h-[300px]">
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
