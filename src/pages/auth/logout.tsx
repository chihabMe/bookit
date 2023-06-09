import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "~/components/ui/Spinner";

const LogoutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const next = router.query.next as string;
  useEffect(() => {
    signOut({
      callbackUrl: next ?? "/",
      redirect: true,
    }).catch((err) => console.error(err));
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Spinner />
    </main>
  );
};
LogoutPage.hideAside = true;
export default LogoutPage;
