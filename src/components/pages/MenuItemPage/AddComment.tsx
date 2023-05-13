import { Textarea } from "@material-tailwind/react";
import { FormEvent } from "react";
const AddComment = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <form className="mb-6">
        <div className="mb-4 w-full max-w-[600px] rounded-lg rounded-t-lg border border-gray-200  bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <Textarea
            color="orange"
            id="comment"
            className="h-[150px]"
            placeholder="Write a comment..."
            required
          ></Textarea>
        </div>
        <Button type="submit" className="ml-4 px-8 py-[14px] capitalize">
          write a review
        </Button>
      </form>
    </div>
  );
};
export default AddComment;
