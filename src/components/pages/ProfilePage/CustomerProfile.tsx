import ProfileInfos from "./ProfileInfos";
import ProfileOrders from "./ProfileOrders";
import ProfileReservations from "./ProfileReservations";

const CustomerProfilePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-2 md:flex-row  ">
      <div className="min-h-[400px]">
        <ProfileInfos />
      </div>
      <div className="flex min-h-[400px]  flex-col  gap-4 ">
        <ProfileOrders />
        <ProfileReservations />
      </div>
    </div>
  );
};
export default CustomerProfilePage;
