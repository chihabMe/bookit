import { createTRPCRouter, publicProcedure } from "../trpc";

export const restaurantsRouter = createTRPCRouter({
  getResturants: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.restaurant.findMany({
      take: 10,
    });
  }),
});
