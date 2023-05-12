import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { generateUploadURL } from "~/helpers/s3";
import { TRPCError } from "@trpc/server";

export const uploadRouter = createTRPCRouter({
  getPreSignedUploadURL: protectedProcedure
    .input(
      z.object({
        originalName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const singedURL = await generateUploadURL(input.originalName);
        return { singedURL };
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong",
        });
      }
    }),
});
