import { User } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile(form, {
      onError: () => {
        toastError({ message: "profile update failed." });
      },
      onSuccess: () => {
        toastSuccess({ message: "profile updated successfully" });
        router.push("/profile").catch((err) => console.error(err));
      },
    });
  };
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="mx-auto   w-full max-w-[400px] ">
        <form onSubmit={handleFormSubmit} className=" flex flex-col gap-4">
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
export default ProfileEditPage;

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
