import { useSession } from "next-auth/react";
import Image from "next/image";
import Spinner from "~/components/ui/Spinner";

const ProfileInfos = () => {
  const { status, data } = useSession();

  if (status == "loading")
    return (
      <div className="h-700px flex w-[300px] items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <Spinner />
      </div>
    );
  return (
    <div className="h-700px flex w-[300px] flex-col  justify-center gap-4 rounded-full bg-bg-light px-4 shadow-lg  dark:bg-bg-dark">
      <Image
        width={300}
        height={300}
        alt="profile image"
        src="/images/pages/home/image1.jpg"
        className=" rounded-lg"
      />
      <h1 className="font-bold text-title dark:text-title-dark ">chihab</h1>
      <div className="flex flex-col  text-sm font-medium text-title dark:text-title-dark  ">
        <div className="flex w-full justify-between">
          <h2 className="py-2">Email</h2>
          <h2 className="py-2">{data?.user.email}</h2>
        </div>

        <div className="flex w-full justify-between">
          <h2 className="py-2">Phone Number</h2>
          <h2 className="py-2">2133252332</h2>
        </div>
        <div className="flex w-full justify-between">
          <h2 className="py-2">location</h2>
          <h2 className="py-2">algeria constantine</h2>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfos;
