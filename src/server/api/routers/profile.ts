import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

type Roles = "restaurant" | "customer";
export const profileRouter = createTRPCRouter({
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
