import Head from "next/head";
import Image from "next/image";
import Button from "~/components/ui/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Input from "~/components/ui/Input";
const initialState = {
  email: "",
  password: "",
  rePassword: "",
};
const LoginPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    mutate: register,
  } = api.auth.register.useMutation();
  const [form, setForm] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    register(
      {
        email: form.email,
        password: form.password,
        rePassword: form.rePassword,
      },
      {}
    );
  };
  const fieldErrors = error?.data?.zodError?.fieldErrors;

  console.log("errors", error?.data);
  console.log("loading", isLoading);
  console.log("is error", isError);
  return (
    <>
      <Head>
        <title>login page</title>
      </Head>
      <main className="flex flex min-h-screen flex-col items-center justify-center pt-[150px]   ">
        <div className="flex w-full max-w-[350px]  flex-col justify-center gap-4  ">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4 py-4"
          >
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              icon={<EnvelopeIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
              errors={fieldErrors ? fieldErrors["email"] : undefined}
            />
            <Input
              placeholder="Password"
              name="password"
              errors={fieldErrors ? fieldErrors["password"] : undefined}
              onChange={handleChange}
              type="password"
              icon={<LockClosedIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
            />

            <Input
              placeholder="Passwod Confirmation"
              type="password"
              name="rePassword"
              errors={fieldErrors ? fieldErrors["rePassword"] : undefined}
              onChange={handleChange}
              icon={<LockClosedIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
            />
            <Button
              type="submit"
              className="relative mt-2 flex h-12 items-center justify-center gap-2  rounded-lg capitalize hover:ring-2 hover:ring-primary"
            >
              <span>sign up</span>
            </Button>

            <Link
              href="/auth/login"
              className=" mt-2 flex h-12 items-center justify-center gap-2 rounded-lg !bg-transparent text-sm font-medium capitalize !text-title  text-title hover:ring-2 hover:ring-primary dark:!text-title-dark dark:text-title-dark"
            >
              <span>go to login </span>
            </Link>
          </form>
          <div className="flex flex-col gap-4">
            <h1 className="text-center  font-medium text-title dark:text-title-dark">
              or
            </h1>
            <Button className="relative   flex h-12 items-center justify-center gap-2 rounded-lg !bg-white capitalize !text-title text-text  ring-1 ring-gray-400 hover:ring-2">
              <Image
                src="/images/social/google.png"
                alt="google image"
                width={64}
                height={64}
                className="absolute left-[20px] h-7 w-7 rounded-full "
              />
              <span>register with google</span>
            </Button>
            <Button className="hover:ring-2-blue-400 relative flex h-12 items-center justify-center gap-2 rounded-lg !bg-blue-600 capitalize hover:ring-2">
              <Image
                alt="google image"
                src="/images/social/facebook.png"
                width={64}
                height={64}
                className="absolute left-[20px] h-7 w-7 rounded-full"
              />
              <span>register with facebook</span>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
export default LoginPage;
