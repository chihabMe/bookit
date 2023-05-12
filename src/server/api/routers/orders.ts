import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const ordersRouter = createTRPCRouter({
  getLast4orders: protectedProcedure.query(async ({ ctx }) => {
    try {
      const orders = await ctx.prisma.order.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        take: 4,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
          orderdBy: true,
          _count: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return orders;
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "something went wrong",
      });
    }
  }),
  getAllOrders: protectedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.order.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "something went wrong",
      });
    }
  }),
});
