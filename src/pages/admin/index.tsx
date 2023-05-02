import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const AdminPage = () => {
  return <main>admin</main>;
};
export default AdminPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session || !session?.user) {
    return {
      redirect: {
        destination: "/admin/login",
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};
