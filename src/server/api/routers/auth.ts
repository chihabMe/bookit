import Trpc from "~/pages/api/trpc/[trpc]";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ZodError, z } from "zod";
import { TRPCError, getTRPCErrorFromUnknown } from "@trpc/server";
import { hash } from "~/helpers/auth";
import { UserRoles } from "@prisma/client";

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
        return {
          success: false,
          errors: { email: ["This email is being used"] },
          message: "invalid email",
        };
      }
      const password = await hash(input.password);
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password,
          role: UserRoles.none,
        },
      });
      console.log(user);
      return {
        success: true,
        message: "registred",
      };
    }),
});
