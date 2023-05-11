import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { generateUploadURL } from "~/helpers/s3";

export const uploadRouter = createTRPCRouter({
  getPreSignedUploadURL: protectedProcedure
    .input(
      z.object({
        originalName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const singedURL = await generateUploadURL(input.originalName);
      return { singedURL };
    }),
});
