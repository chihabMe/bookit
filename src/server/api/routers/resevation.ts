import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reservationRouter = createTRPCRouter({
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
      throw err;
    }
  }),
});
