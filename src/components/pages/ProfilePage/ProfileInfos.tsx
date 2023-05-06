import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import Button from "~/components/ui/Button";
import Spinner from "~/components/ui/Spinner";
import { api } from "~/utils/api";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useRef } from "react";

const ProfileInfos = () => {
  const {
    isLoading,
    isError,
    data: profile,
    error,
  } = api.profile.getProfile.useQuery();

  if (isLoading) return <ProfileInfosSkelaton />;
  if (isError || !profile)
    return (
      <div className="h-700px flex w-[300px] items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <h1 className="text-red-400">{error?.message}</h1>
      </div>
    );
  return (
    <div className="flex w-full flex-col justify-center gap-4 rounded-xl bg-bg-light bg-gray-200 px-4 py-2   shadow-lg  dark:bg-bg-dark dark:bg-gray-900  md:w-[350px]">
      <h1 className="py-2 text-lg font-bold text-title dark:text-title-dark">
        Profile infos
      </h1>
      <div className="flex w-full justify-center">
        <ProfileImage image={profile.image} />
      </div>
      <h1 className="font-bold text-title dark:text-title-dark ">chihab</h1>
      <div className="flex flex-col  text-sm font-medium text-title dark:text-title-dark  ">
        <div className="flex w-full justify-between">
          <h2 className="py-2">Email</h2>
          <h2 className="py-2">{profile.email}</h2>
        </div>

        <div className="flex w-full justify-between">
          <h2 className="py-2">Phone Number</h2>
          <h2 className="py-2">{profile.phone ?? "None"}</h2>
        </div>
        <div className="flex w-full justify-between">
          <h2 className="py-2">location</h2>
          <h2 className="py-2">{profile.location ?? "None"} </h2>
        </div>
      </div>
      <Link href="/profile/edit" className="flex  w-full ">
        <Button className="w-full py-[15px] capitalize">edit</Button>
      </Link>
    </div>
  );
};
const ProfileImage = ({ image }: { image?: string | null }) => {
  const imageFileInput = useRef<null | HTMLInputElement>(null);
  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log("uploading....");
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) uploadFile(file);
    }
  };
  const openFileUpload = () => {
    if (imageFileInput.current) imageFileInput.current?.click();
  };
  return (
    <div className="group relative">
      <Image
        width={250}
        height={170}
        alt="profile image"
        src={image ?? `/images/pages/home/image1.jpg`}
        className=" rounded-xl"
      />
      <div
        onClick={openFileUpload}
        className="absolute bottom-0 left-0 right-0 z-10 flex h-12 cursor-pointer items-center justify-center bg-white transition-all duration-300 group-hover:opacity-100 md:opacity-0"
      >
        <input
          className="hidden"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageFileChange}
          name="image"
          ref={imageFileInput}
        />
        <ArrowUpTrayIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
const ProfileInfosSkelaton = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-4 rounded-xl bg-bg-light bg-gray-200 px-4 py-2   shadow-lg  dark:bg-bg-dark dark:bg-gray-900  md:w-[350px]">
      <h1 className="py-2 text-lg font-bold text-title dark:text-title-dark">
        Profile infos
      </h1>
      <div className="flex w-full justify-center">
        <Skeleton width={250} height={170} />
      </div>
      <h1 className="font-bold text-title dark:text-title-dark ">
        <Skeleton width={60} height={10} />
      </h1>
      <div className="flex flex-col  text-sm font-medium text-title dark:text-title-dark  ">
        <div className="flex w-full justify-between">
          <h2 className="py-2">
            <Skeleton width={60} height={10} />
          </h2>
          <h2 className="py-2">
            <Skeleton width={60} height={10} />
          </h2>
        </div>

        <div className="flex w-full justify-between">
          <h2 className="py-2">
            <Skeleton width={60} height={10} />
          </h2>
          <h2 className="py-2">
            <Skeleton width={60} height={10} />
          </h2>
        </div>
        <div className="flex w-full justify-between">
          <h2 className="py-2">
            <Skeleton width={60} height={10} />
          </h2>
          <h2 className="py-2">
            <Skeleton width={60} height={10} />
          </h2>
        </div>
      </div>
      <Skeleton width={100} />
    </div>
  );
};
export default ProfileInfos;
