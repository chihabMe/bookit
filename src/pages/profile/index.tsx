import { GetServerSideProps } from "next";
import ProfileInfos from "~/components/pages/ProfilePage/ProfileInfos";
import ProfileOrders from "~/components/pages/ProfilePage/ProfileOrders";

const ProfilePage = () => {
  return (
    <main className="flex justify-between gap-2">
      <ProfileInfos />
      <div className="flex flex-col gap-4">
        <ProfileOrders />
      </div>
    </main>
  );
};
export default ProfilePage;
