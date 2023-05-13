import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import z from "zod";

export const commentRouter = createTRPCRouter({
  getAllComments: publicProcedure
    .input(z.object({ menuItemId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return ctx.prisma.comment.findFirst({
          where: {
            id: input.menuItemId,
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        });
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong",
        });
      }
    }),
  addComment: protectedProcedure

    .input(
      z.object({
        body: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.comment.create({
          data: {
            body: input.body,
            userId: ctx.session.user.id,
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
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