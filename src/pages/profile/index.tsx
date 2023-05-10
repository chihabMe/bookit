import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session, User } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CustomerProfilePage from "~/components/pages/ProfilePage/CustomerProfile";
import ProfileInfos from "~/components/pages/ProfilePage/ProfileInfos";
import ProfileOrders from "~/components/pages/ProfilePage/ProfileOrders";
import ProfileReservations from "~/components/pages/ProfilePage/ProfileReservations";
import RestaurantProfilePage from "~/components/pages/ProfilePage/RestaurantProfilePage";
import Button from "~/components/ui/Button";
import Spinner from "~/components/ui/Spinner";

const ProfilePage = ({ user, f }: { user: User; f: number }) => {
  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-[900px]  flex-col  gap-2">
        <div className="mx-auto mt-[40px] flex w-full  justify-center rounded-md bg-orange-300 pt-[50px]">
          <Image
            alt="profile image"
            src={user.image ?? "/images/restaurant.png"}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex justify-end gap-2 py-4">
          <Link href="/profile/restaurant/add-to-menu">
            <Button className="capitalize">add item</Button>
          </Link>
          <Link href="/profile/restaurant/orders">
            <Button className="capitalize">see orders</Button>
          </Link>
          <Link href="/profile/restaurant/reservations">
            <Button className="capitalize">reservations</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    if (!session || !session.user)
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    console.log("------------", session);
    return {
      props: { user: session.user, f: 1 },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: "/505",
        permanent: false,
      },
    };
  }
};
export default ProfilePage;
