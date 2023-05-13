import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

export interface IComment {
  user: string;
  body: string;
  id: string;
  rating: number;
}
const comments: IComment[] = [
  {
    user: "adam",
    body: "When it comes to finding the perfect pizza, I can confidently say that I've discovered a hidden gem. This pizzeria has truly mastered the art of crafting a delicious and satisfying pizza experience that leaves you wanting more. From the moment I stepped inside, the aroma of freshly baked dough and tantalizing toppings filled the air, instantly whetting my appetite.",
    id: "1",
    rating: 4,
  },
  {
    user: "adam",
    body: "When it comes to finding the perfect pizza, I can confidently say that I've discovered a hidden gem. This pizzeria has truly mastered the art of crafting a delicious and satisfying pizza experience that leaves you wanting more. From the moment I stepped inside, the aroma of freshly baked dough and tantalizing toppings filled the air, instantly whetting my appetite.",
    id: "1",
    rating: 4,
  },
  {
    user: "adam",
    body: "When it comes to finding the perfect pizza, I can confidently say that I've discovered a hidden gem. This pizzeria has truly mastered the art of crafting a delicious and satisfying pizza experience that leaves you wanting more. From the moment I stepped inside, the aroma of freshly baked dough and tantalizing toppings filled the air, instantly whetting my appetite.",
    id: "1",
    rating: 4,
  },
  {
    user: "adam",
    body: "When it comes to finding the perfect pizza, I can confidently say that I've discovered a hidden gem. This pizzeria has truly mastered the art of crafting a delicious and satisfying pizza experience that leaves you wanting more. From the moment I stepped inside, the aroma of freshly baked dough and tantalizing toppings filled the air, instantly whetting my appetite.",
    id: "1",
    rating: 4,
  },
];

const CommentsSection = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col  gap-2">
      <AddComment />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2  ">
        {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
