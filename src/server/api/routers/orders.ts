import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const ordersRouter = createTRPCRouter({
  addOrder: protectedProcedure
    .input(
      z.object({
        resturantId: z.string(),
        items: z.array(
          z.object({
            quantity: z.number(),
            itemId: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const order = await ctx.prisma.order.create({
          data: {
            paymentMethod: "cash",
            restaurantId: input.resturantId,
            userId: ctx.session.user.id,
            status: "pending",
          },
        });
        for (const item of input.items) {
          await ctx.prisma.orderItem.create({
            data: {
              orderId: order.id,
              quantity: item.quantity,
            },
          });
        }
        if (!order) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "can't create an order ",
          });
        }
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "can't create an order ",
        });
      }
    }),
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
