import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import z from "zod";
import { CommentRate } from "@prisma/client";

export const commentRouter = createTRPCRouter({
  getAllComments: publicProcedure
    .input(z.object({ menuItemId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const comments = await ctx.prisma.comment.findMany({
          where: {
            menuItemId: input.menuItemId,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return comments;
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
        menuItemId: z.string(),
        rate: z.nativeEnum(CommentRate).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // const rate = getEnumFromValues(parseInt(input.rate))
        if (!input.rate)
          return new TRPCError({
            message: "invalid rate",
            code: "BAD_REQUEST",
          });
        return ctx.prisma.comment.create({
          data: {
            body: input.body,
            userId: ctx.session.user.id,
            menuItemId: input.menuItemId,
            rate: input.rate,
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
