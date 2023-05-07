import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Button from "~/components/ui/Button";
import Spinner from "~/components/ui/Spinner";
import { toastError, toastSuccess } from "~/helpers/toasters";
import { api } from "~/utils/api";

// type Roles = Omit<UserRoles, "admin">;
type Roles = "restaurant" | "customer";

const ProfileChoseType = () => {
  const { data: session } = useSession();
  const [userType, setUserType] = useState<Roles>("customer");
  const isCustomer = userType == "customer";
  const handleUserChangeType = (type: Roles) => {
    setUserType(type);
  };
  const router = useRouter();
  const { mutate, isLoading, error, isError, isSuccess } =
    api.profile.changeProfileType.useMutation();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      type: userType,
    });
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toastSuccess({
        message: `registred as a ${userType}`,
        rest: {
          duration: 4000,
        },
      });
      toastSuccess({
        message: `you need to login again`,
        rest: {
          duration: 4000,
        },
      });
      toastSuccess({
        message: `you will be redirected after 3s`,
        rest: {
          duration: 4000,
        },
      });
      setTimeout(() => {
        router.push("/auth/logout").catch((err) => console.error(err));
      }, 3000);
    }
    if (!isLoading && isError) {
      toastError({
        message: error.message,
      });
    }
  }, [isLoading]);

  return (
    <main className="justyf-center  flex min-h-screen w-full  items-center  ">
      <form
        onSubmit={handleSubmit}
        className=" mx-auto flex w-full max-w-[300px]   flex-col gap-4"
      >
        <div className="    flex  justify-center  gap-8 ">
          <Button
            className={`  flex flex-col  gap-4 transition-all duration-200  ${
              isCustomer ? "!bg-primary" : "!bg-transparent"
            }  !p-4 !px-6`}
            onClick={(e) => handleUserChangeType("customer")}
          >
            <Image
              alt="man icon"
              width={64}
              height={64}
              className=""
              src="/images/man.png"
            />
            <h1
              className={` transition-all duration-200 ${
                isCustomer ? "text-white" : "text-title dark:text-title-dark"
              } capitalize`}
            >
              customer
            </h1>
          </Button>

          <Button
            onClick={(e) => handleUserChangeType("restaurant")}
            className={`flex flex-col gap-4  ${
              !isCustomer ? "!bg-primary" : "!bg-transparent"
            }  !p-4 !px-6`}
          >
            <Image
              alt="restaurant icon"
              width={64}
              height={64}
              className=""
              src="/images/restaurant.png"
            />

            <h1
              className={`${
                !isCustomer ? "text-white" : "text-title dark:text-title-dark"
              } capitalize`}
            >
              restraurant
            </h1>
          </Button>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="!border-1 !border-1 mt-4 flex items-center justify-center gap-4 rounded-xl py-4 font-bold capitalize"
        >
          {isLoading && <Spinner className="!h-4  !w-4 !text-white" />}
          <span>confirm</span>
        </Button>
      </form>
    </main>
  );
};

ProfileChoseType.hideAside = true;
export default ProfileChoseType;
