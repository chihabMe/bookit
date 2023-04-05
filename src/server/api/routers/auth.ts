import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z
        .object({
          email: z.string().email(),
          password: z.string().min(6, "short password"),
          rePassword: z.string(),
        })
        .refine(
          (x) => {
            x.password == x.rePassword;
          },
          {
            message: "passwords don't match",
            path: ["rePassword"],
          }
        )
    )
    .mutation(({ ctx, input }) => {
      console.log(input);
      return "hi";
    }),
});
