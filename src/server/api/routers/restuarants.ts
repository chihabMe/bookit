import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const restaurantsRouter = createTRPCRouter({
  getResturants: publicProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.restaurant.findMany({
        take: 10,
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
