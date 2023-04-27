import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { User, UserRoles } from "@prisma/client";

export const findUserById = async (id: string, prisma: PrismaClient) => {
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "invalid user",
    });
  return user;
};

export const checkIsAdmin = (user: User) => {
  if (user.role != UserRoles.admin)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "you don't have permissions to access this route",
    });
};
