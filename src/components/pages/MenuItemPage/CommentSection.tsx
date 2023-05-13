import { api } from "~/utils/api";
import AddComment from "./AddComment";
import CommentItem, { CommentItemSkelaton } from "./CommentItem";
import { Comment } from "@prisma/client";
export type ICommentItemWithUser = Comment & {
  user: {
    name: string | null;
  };
};

const CommentsSection = ({ menuItemId }: { menuItemId: string }) => {
  const commentsQuery = api.comments.getAllComments.useQuery({
    menuItemId: menuItemId,
  });
  if (commentsQuery.isLoading) return <CommentsSectionSkelaton />;
  if (!commentsQuery.data) return <div>{commentsQuery.error?.message}</div>;
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col  gap-2">
      <AddComment />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2  ">
        {commentsQuery.data.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </section>
  );
};
const CommentsSectionSkelaton = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col  gap-2">
      <AddComment />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2  ">
        <CommentItemSkelaton />
        <CommentItemSkelaton />
        <CommentItemSkelaton />
        <CommentItemSkelaton />
      </div>
    </section>
  );
};
export default CommentsSection;
