import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const ordersRouter = createTRPCRouter({
  getLast4orders: protectedProcedure.query(async ({ ctx }) => {
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
  }),
  getAllOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
