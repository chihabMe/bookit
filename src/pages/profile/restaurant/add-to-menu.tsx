import { Textarea } from "@material-tailwind/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "~/components/ui/Button";
import { Select, Option } from "@material-tailwind/react";
import { PlusIcon as AddIcon } from "@heroicons/react/24/solid";
import Input from "~/components/ui/Input";
import { MenuCategory } from "@prisma/client";
import { prisma } from "~/server/db";
const initialState = {
  name: "",
  description: "",
  price: "",
};
const AddToMenu = ({ categories }: { categories: MenuCategory[] }) => {
  const [form, setForm] = useState(initialState);
  const [category, setCategory] = useState<string>("");
  const handleCategoryChange = (cat?: string) => {
    if (category) setCategory(cat);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = (e: FormEvent) => {
    console.log(form);
  };
  return (
    <>
      <Head>
        <title>reservations</title>
      </Head>
      <main>
        <section className="mx-auto mt-[150px] flex w-full max-w-[500px] flex-col gap-2">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 ">
            <Input
              placeholder="name"
              type="text"
              name="name"
              onChange={handleChange}
              className="!h-12 rounded-lg "
            />
            <div className="">
              <Select
                label="Category"
                onChange={handleCategoryChange}
                color="orange"
                className="h-12"
              >
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Input
              placeholder="price"
              type="number"
              name="price"
              onChange={handleChange}
              className="!h-12 rounded-lg "
            />
            <Textarea
              placeholder="description"
              name="description"
              onChange={handleChange}
            />
            <Button
              className="flex items-center justify-center gap-2 py-4 capitalize  "
              type="submit"
            >
              <span>add</span>
              <AddIcon className="h-4 w-4" />
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    if (!session || session.user.role == "customer")
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    const categories = await prisma.menuCategory.findMany({
      select: {
        name: true,
        id: true,
      },
    });
    return {
      props: {
        categories,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: "/505",
        permanent: false,
      },
    };
  }
};
export default AddToMenu;
