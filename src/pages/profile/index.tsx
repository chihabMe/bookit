import { GetServerSideProps } from "next";
import ProfileInfos from "~/components/pages/ProfilePage/ProfileInfos";
import ProfileOrders from "~/components/pages/ProfilePage/ProfileOrders";
import ProfileReservations from "~/components/pages/ProfilePage/ProfileReservations";

const ProfilePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-2 md:flex-row  ">
      <ProfileInfos />
      <div className="flex flex-col justify-center gap-4">
        <ProfileOrders />
        <ProfileReservations />
      </div>
    </main>
  );
};
export default ProfilePage;
