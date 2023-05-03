import Head from "next/head";
import Image from "next/image";
import Button from "~/components/ui/Button";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>login page</title>
      </Head>
      <main className="flex flex justify-center pt-[100px]   ">
        <div className="flex w-full max-w-[400px] flex-col gap-4 ">
          <Button className="relative  flex h-14 items-center justify-center gap-2 rounded-full !bg-white capitalize text-text  ring-1 ring-gray-400 hover:ring-2">
            <Image
              src="/images/social/google.png"
              alt="google image"
              width={64}
              height={64}
              className="absolute left-[20px] h-7 w-7 rounded-full"
            />
            <span>login with google</span>
          </Button>
          <Button className="hover:ring-2-blue-400 relative flex h-14 items-center justify-center gap-2 rounded-full !bg-blue-600 capitalize hover:ring-2">
            <Image
              alt="google image"
              src="/images/social/facebook.png"
              width={64}
              height={64}
              className="absolute left-[20px] h-7 w-7 rounded-full"
            />
            <span>login with facebook</span>
          </Button>
          <Button className="relative flex h-14 items-center justify-center gap-2  rounded-full capitalize hover:ring-2 hover:ring-primary">
            <EnvelopeIcon className="absolute left-[20px] h-6 w-6 text-white" />
            <span>login with magic link</span>
          </Button>
        </div>
      </main>
    </>
  );
};
export default LoginPage;