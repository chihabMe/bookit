import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserWihtoutPassword } from "~/helpers/auth";
import { TRPCError } from "@trpc/server";

type Roles = "restaurant" | "customer";
export const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
      });
      if (!user) {
        throw new TRPCError({
          message: "try to login again",
          code: "UNAUTHORIZED",
        });
      }
      return getUserWihtoutPassword(user);
    } catch (err) {
      throw err;
    }
  }),
  changeProfileType: protectedProcedure
    .input(
      z.object({
        type: z.enum(["restaurant", "customer"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("id=>", ctx.session.user);
      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          role: input.type,
        },
      });
      const { password: _, ...userWithoutPassword } = { ...user };
      return userWithoutPassword;
    }),
});
