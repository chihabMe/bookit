const Title = ({ text }: { text: string }) => {
  return (
    <h2 className="py-2 text-2xl font-bold capitalize text-title dark:text-title-dark">
      {text}
    </h2>
  );
};
export default Title;
