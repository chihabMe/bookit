import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { generateUploadURL } from "~/helpers/s3";

export const uploadRouter = createTRPCRouter({
  getPreSignedUploadURL: protectedProcedure.mutation(async ({ ctx, input }) => {
    const singedURL = await generateUploadURL();
    return { singedURL };
  }),
});
