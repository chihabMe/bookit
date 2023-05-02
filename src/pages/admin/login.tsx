import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const AdminLoginPage = () => {
  return (
    <main className="min-h-screen w-full">
      <section className="flex flex min-h-screen  w-full flex-col items-center justify-center gap-6 ">
        <h1 className="dark:font-title-dark py-4 text-2xl font-bold capitalize text-text">
          sign in
        </h1>
        <form className="flex w-full max-w-[320px] flex-col gap-4">
          <Input
            placeholder="email"
            icon={<EnvelopeIcon className="h-4 w-4" />}
          />
          <Input
            placeholder="password"
            type="password"
            icon={<LockClosedIcon className="h-4 w-4" />}
          />
          <Button className="mt-4 h-11 capitalize">sign up</Button>
        </form>
      </section>
    </main>
  );
};
AdminLoginPage.hideAside = true;
export default AdminLoginPage;
