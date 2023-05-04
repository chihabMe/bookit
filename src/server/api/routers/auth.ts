import Trpc from "~/pages/api/trpc/[trpc]";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ZodError, z } from "zod";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z
        .object({
          email: z.string().email(),
          password: z.string().min(6, "short password"),
          rePassword: z.string(),
        })
        .superRefine(({ password, rePassword }, ctx) => {
          if (password !== rePassword)
            ctx.addIssue({
              code: "custom",
              message: "Passwords don't match",
              path: ["rePassword"],
            });
        })
    )
    .mutation(async ({ ctx, input }) => {
      const isUsedEmail = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });
      console.log(isUsedEmail);
      if (isUsedEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid fields",
          cause: [{ email: "used email" }],
        });
      }
      await ctx.prisma.user.create({
        data: {
          email: input.email,
        },
      });
      return "hi";
    }),
});
