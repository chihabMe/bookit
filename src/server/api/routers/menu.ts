import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { UserRoles } from "@prisma/client";
import { checkIsAdmin, findUserById } from "~/server/services/user.services";

export const menuRouter = createTRPCRouter({
  getAllMenuItems: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.menuItem.findMany();
  }),
  addItemToTheMenu: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const user = await findUserById(id, ctx.prisma);
      checkIsAdmin(user);
      return ctx.prisma.menuItem.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          userId: user.id,
        },
      });
    }),
});