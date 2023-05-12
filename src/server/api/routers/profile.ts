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
      console.error(err);
      throw new TRPCError({
        message: "try to login again",
        code: "UNAUTHORIZED",
      });
    }
  }),
  changeProfileType: protectedProcedure
    .input(
      z.object({
        type: z.enum(["restaurant", "customer"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            role: input.type,
          },
        });
        if (input.type == "restaurant") {
          await ctx.prisma.restaurant.create({
            data: {
              userId: user.id,
              name: user.name ?? "",
            },
          });
        }
        const { password: _, ...userWithoutPassword } = { ...user };
        return userWithoutPassword;
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong ",
        });
      }
    }),
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        phone: z.string().nullable(),
        location: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            phone: input.phone,
            location: input.location,
            name: input.name,
          },
        });
        return getUserWihtoutPassword(user);
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong ",
        });
      }
    }),
});
