import { Spinner, Textarea } from "@material-tailwind/react";
import { type ChangeEvent, type FormEvent, useState } from "react";

import Button from "~/components/ui/Button";
import { toastError, toastSuccess } from "~/helpers/toasters";
import { api } from "~/utils/api";
const AddComment = ({menuItemId}:{menuItemId:string}) => {
  const addCommentMutation = api.comments.addComment.useMutation();
  const [body, setBody] = useState("");
  const utils = api.useContext()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCommentMutation.mutate(
      {
        body,
        menuItemId
      },
      {
        onSuccess: () => {
          toastSuccess({ message: "commented" });
          setBody("");
          utils.comments.invalidate().catch(err=>console.log(err));
        },
        onError: (err) => {
          toastError({ message: err.message });
        },
      }
    );
  };
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4 w-full max-w-[600px] rounded-lg rounded-t-lg border border-gray-200  bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <Textarea
            onChange={handleBodyChange}
            value={body}
            color="orange"
            id="comment"
            className="h-[150px]"
            placeholder="Write a comment..."
            required
          ></Textarea>
        </div>
        <Button
          type="submit"
          className="ml-4 flex items-center justify-center gap-2 px-8 py-[14px] capitalize"
        >
          {addCommentMutation.isLoading && <Spinner className="!h-4 !w-4" />}
          write a review
        </Button>
      </form>
    </div>
  );
};
export default AddComment;
