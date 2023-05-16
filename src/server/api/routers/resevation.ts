import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";

export const reservationRouter = createTRPCRouter({
  bookATable: protectedProcedure
    .input(
      z.object({
        numberOfPeople: z.number(),
        numberOfHours: z.number(),
        resturantId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        //to do check if its allready reserved
        const table = await ctx.prisma.table.findFirst({
          where: {
            restaurantId: input.resturantId,
            //reserved:false
          },
        });
        if (!table) {
          throw new TRPCError({ message: "no talbes", code: "BAD_REQUEST" });
        }
        const reservation = await ctx.prisma.reservation.create({
          data: {
            userId: ctx.session.user.id,
            restaurantId: input.resturantId,
            numberOfHours: "TWO_POINT_FIVE",
            tableId: table.id,
          },
        });
        if (!reservation)
          throw new TRPCError({
            message: "reservation error",
            code: "BAD_REQUEST",
          });
        return reservation;
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          message: "something went wrong",
          code: "BAD_REQUEST",
        });
      }
    }),
  getUserLast4Rervations: protectedProcedure.query(async ({ ctx }) => {
    try {
      const reservations = await ctx.prisma.reservation.findMany({
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
        },
      });
      return reservations;
    } catch (err) {
      console.log(err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "something went wrong ",
      });
    }
  }),
});
