import Head from "next/head";
import Image from "next/image";
import Button from "~/components/ui/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>login page</title>
      </Head>
      <main className="flex flex min-h-screen flex-col items-center justify-center pt-[150px]   ">
        <div className="flex w-full max-w-[350px]  flex-col justify-center gap-4  ">
          <form className="flex w-full flex-col gap-4 py-4">
            <Input
              placeholder="Email"
              type="email"
              icon={<EnvelopeIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
            />
            <Input
              placeholder="Password"
              type="password"
              icon={<LockClosedIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
            />

            <Button className="relative mt-2 flex h-12 items-center justify-center gap-2  rounded-lg capitalize hover:ring-2 hover:ring-primary">
              <span>sign in</span>
            </Button>

            <Link
              href="/auth/register"
              className=" mt-2 flex h-12 items-center justify-center gap-2 rounded-lg !bg-transparent text-sm font-medium capitalize !text-title  text-title hover:ring-2 hover:ring-primary dark:!text-title-dark dark:text-title-dark"
            >
              <span>create a new account</span>
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
              <span>login with google</span>
            </Button>
            <Button className="hover:ring-2-blue-400 relative flex h-12 items-center justify-center gap-2 rounded-lg !bg-blue-600 capitalize hover:ring-2">
              <Image
                alt="google image"
                src="/images/social/facebook.png"
                width={64}
                height={64}
                className="absolute left-[20px] h-7 w-7 rounded-full"
              />
              <span>login with facebook</span>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
export default LoginPage;
