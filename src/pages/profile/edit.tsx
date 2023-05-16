import { CheckIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { User } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import Spinner from "~/components/ui/Spinner";
import exclude from "~/helpers/exclude";
import { toastError, toastSuccess } from "~/helpers/toasters";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
const ProfileEditPage = ({ user }: { user: User }) => {
  const [form, setForm] = useState({
    phone: user.phone,
    location: user.location,
    name: user.name,
  });
  const {
    mutate: updateProfile,
    isLoading,
    isError,
    error,
  } = api.profile.updateProfile.useMutation();
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (image: File) => setImage(image);

  const getPreSignedURLMutation =
    api.upload.getPreSignedUploadURL.useMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
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
          updateProfile(
            { ...form, image: imageURL },
            {
              onError: () => {
                toastError({ message: "profile update failed." });
              },
              onSuccess: () => {
                toastSuccess({ message: "profile updated successfully" });
                router.push("/profile").catch((err) => console.error(err));
              },
            }
          );
        }
        toastSuccess({ message: "updated" });
        setImage(null);
        // You can continue with the form submission or perform other operations here
        // For example, addMenuItem.mutate(formData);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="mx-auto   w-full max-w-[400px] ">
        <form
          onSubmit={(e) => {
            handleFormSubmit(e).catch((err) => console.error(err));
          }}
          className=" flex flex-col gap-4"
        >
          <Input
            placeholder="Enter your name"
            value={form["name"] as string}
            type="text"
            name="name"
            onChange={handleChange}
            className="!h-12 rounded-lg "
          />
          <Input
            placeholder="Enter your location"
            name="location"
            value={form["location"] as string}
            onChange={handleChange}
            type="text"
            className="!h-12 rounded-lg "
          />

          <Input
            placeholder="Enter your phone number"
            name="phone"
            value={form["phone"] as string}
            onChange={handleChange}
            type="text"
            className="!h-12 rounded-lg "
          />

          <AddMenuItemImages
            file={image}
            handleFileChange={handleImageChange}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-4 flex items-center justify-center gap-2"
          >
            {isLoading && <Spinner className="!h-4 !w-4 !text-white" />}
            <span>save</span>
          </Button>
        </form>
      </section>
    </main>
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const session = await getSession(ctx);
    if (!session)
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });
    if (!user)
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };

    return {
      props: {
        user: exclude(user, ["createdAt", "updatedAt", "password"]),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};

export default ProfileEditPage;
