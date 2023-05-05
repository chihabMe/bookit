import Head from "next/head";
import Image from "next/image";
import Button from "~/components/ui/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  ChangeEvent,
  FormEvent,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import Input from "~/components/ui/Input";
import { toastSuccess } from "~/helpers/toasters";
import { HandleThunkActionCreator } from "react-redux";
const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const [isAuth, setIsAuth] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const router = useRouter();
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    console.log(form);
    const resposne = await signIn("credentials", {
      redirect: false,

      email: form.email,
      password: form.password,
    });
    if (resposne?.ok) {
      toastSuccess({
        message: "logged in successfully",
      });
      router.push("/").catch((err) => console.log(err));
    }
    if (resposne?.error) setIsError(true);
  };
  // useEffect(() => {
  //   // if (isAuth) router.push("/").catch((err) => console.log(err));
  // }, [isAuth]);
  return (
    <>
      <Head>
        <title>login page</title>
      </Head>
      <main className="flex flex min-h-screen flex-col items-center justify-center pt-[150px]   ">
        <div className="flex w-full max-w-[350px]  flex-col justify-center gap-4  ">
          <form
            onSubmit={(e) => {
              handleSubmit(e).catch((err) => console.log(err));
            }}
            className="flex w-full flex-col gap-4 py-4"
          >
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              icon={<EnvelopeIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
              errors={isError ? ["Invalid "] : undefined}
            />
            <Input
              placeholder="Password"
              name="password"
              onChange={handleChange}
              type="password"
              icon={<LockClosedIcon className="h-4 w-4" />}
              className="!h-12 rounded-lg "
              errors={isError ? ["Invalid "] : undefined}
            />

            <Button
              type="submit"
              className="relative mt-2 flex h-12 items-center justify-center gap-2  rounded-lg capitalize hover:ring-2 hover:ring-primary"
            >
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
