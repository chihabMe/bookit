import { Textarea } from "@material-tailwind/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Button from "~/components/ui/Button";
import { Select, Option } from "@material-tailwind/react";
import {
  PlusIcon as AddIcon,
  PlusCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import Input from "~/components/ui/Input";
import { MenuCategory } from "@prisma/client";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
const initialState = {
  name: "",
  description: "",
  price: "",
};
const AddToMenu = ({ categories }: { categories: MenuCategory[] }) => {
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState<null | File>(null);
  const [category, setCategory] = useState<string>("");
  const handleImageChange = (image: File) => setImage(image);
  const handleCategoryChange = (cat?: string) => {
    if (cat) setCategory(cat);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addMenuItem = api.menu.addItemToTheMenu.useMutation();
  const uploadImage = async (url?: string) => {
    const data = new FormData();
    if (image && url) {
      try {
        data.append("file", image);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: data,
        });
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addMenuItem.mutate(
      { ...form, categoryId: category },
      {
        onSuccess: (e) => {
          uploadImage(addMenuItem.data);
        },
      }
    );
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
              type="text"
              name="price"
              onChange={handleChange}
              className="!h-12 rounded-lg "
            />
            <Textarea
              placeholder="description"
              name="description"
              onChange={handleChange}
            />
            <AddMenuItemImages handleFileChange={handleImageChange} />
            <Button
              className="flex items-center justify-center gap-2 py-4 capitalize  "
              type="submit"
            >
              <span>save</span>
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

const AddMenuItemImages = ({
  handleFileChange,
}: {
  handleFileChange: (file: File) => void;
}) => {
  const imageFileInput = useRef<null | HTMLInputElement>(null);
  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log("uploading....");
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) handleFileChange(file);
    }
  };
  const openFileUpload = () => {
    if (imageFileInput.current) imageFileInput.current?.click();
  };

  return (
    <div className="cursor-pointer" onClick={openFileUpload}>
      <input
        className="hidden"
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleImageFileChange}
        name="image"
        ref={imageFileInput}
      />
      <Button className="flex items-center justify-center gap-2 px-2 py-1.5 capitalize  ">
        <PlusCircleIcon className="h-6 w-6 text-white" />
        <span>add image</span>
      </Button>
    </div>
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
