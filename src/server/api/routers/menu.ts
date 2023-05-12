import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { UserRoles } from "@prisma/client";
import {
  checkIsARestaurant,
  checkIsAdmin,
  findUserById,
} from "~/server/services/user.services";
import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";
import { TRPCError } from "@trpc/server";
import { generateUploadURL } from "~/helpers/s3";

export const menuRouter = createTRPCRouter({
  getAllMenuItems: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.menuItem.findMany();
  }),
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.menuCategory.findMany();
  }),
  addCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        imageURL: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role != "admin")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you dont have the permessions to access this route",
        });
      return ctx.prisma.menuCategory.create({
        data: {
          name: input.name,
          image: input.imageURL,
        },
      });
    }),
  getMenuItemsByCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.menuCategory.findFirst({
        where: { id: input.id },
        select: {
          items: true,
        },
      });
    }),
  addItemToTheMenu: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string(),
        categoryId: z.string(),
        imageURL: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const id = ctx.session.user.id;
      const user = await findUserById(id, ctx.prisma);
      checkIsARestaurant(user);
      const category = await ctx.prisma.menuCategory.findFirst({
        where: {
          id: input.categoryId,
        },
      });
      if (!category)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid category id",
        });
      const restuarant = await ctx.prisma.restaurant.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!restuarant)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid restaurant",
        });
      return ctx.prisma.menuItem.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          userId: user.id,
          menuCategoryId: category.id,
          restaurantId: restuarant.id,
          image: input.imageURL,
        },
      });
    }),
});
