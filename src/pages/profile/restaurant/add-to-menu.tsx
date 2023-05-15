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
  CheckIcon,
} from "@heroicons/react/24/solid";
import Input from "~/components/ui/Input";
import { MenuCategory } from "@prisma/client";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { toastSuccess } from "~/helpers/toasters";
import Spinner from "~/components/ui/Spinner";
const initialState = {
  name: "",
  description: "",
  price: "",
};

const AddToMenu = ({ categories }: { categories: MenuCategory[] }) => {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [image, setImage] = useState<File | null>(null);
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
  const getPreSignedURLMutation =
    api.upload.getPreSignedUploadURL.useMutation();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) return;

    try {
      const { singedURL: preSignedURLData } =
        await getPreSignedURLMutation.mutateAsync({
          originalName: image.name,
        });

      if (preSignedURLData) {
        const url = preSignedURLData;

        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: image,
        });
        const imageURL = url.split("?")[0];
        if (imageURL) {
          await addMenuItem.mutateAsync({
            ...form,
            imageURL,
            categoryId: category,
          });
        }
        toastSuccess({ message: "added" });
        setForm(initialState);
        setImage(null);
        // You can continue with the form submission or perform other operations here
        // For example, addMenuItem.mutate(formData);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const loading = addMenuItem.isLoading || getPreSignedURLMutation.isLoading;
  return (
    <>
      <Head>
        <title>reservations</title>
      </Head>
      <main>
        <section className="mx-auto mt-[150px] flex w-full max-w-[500px] flex-col gap-2">
          <form onSubmit={(e)=>{handleFormSubmit(e).catch(err=>console.error(err))}} className="flex flex-col gap-6 ">
            <Input
              placeholder="name"
              type="text"
              name="name"
              onChange={handleChange}
              className="!h-12 rounded-lg "
              value={form.name}
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
              value={form.price}
            />
            <Textarea
              placeholder="description"
              name="description"
              onChange={handleChange}
              value={form.description}
            />
            <AddMenuItemImages
              file={image}
              handleFileChange={handleImageChange}
            />
            <Button
              disabled={loading}
              className="flex items-center justify-center gap-2 py-4 capitalize  "
              type="submit"
            >
              {loading && (
                <>
                  <span>saving</span>
                  <Spinner className={` !h-4 !w-4 !text-white`} />
                </>
              )}
              {!loading && <span>save</span>}
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

const AddMenuItemImages = ({
  handleFileChange,
  file,
}: {
  handleFileChange: (file: File) => void;
  file: File | null;
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
        {!file && <PlusCircleIcon className="h-6 w-6 text-white" />}
        {file && <CheckIcon className="h-6 w-6 text-white" />}
        <span>{file ? "added" : "add image"}</span>
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
