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
import { generateUniqueSlug } from "~/helpers/slug";

export const menuRouter = createTRPCRouter({
  getAllMenuItems: publicProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.menuItem.findMany();
    } catch (err) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "something went wrong",
      });
    }
  }),
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    try {
      return ctx.prisma.menuCategory.findMany();
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "something went wrong",
      });
    }
  }),
  addCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        imageURL: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
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
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "something went wrong",
        });
      }
    }),
  getMenuItemsByCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      try {
        return ctx.prisma.menuCategory.findFirst({
          where: { id: input.id },
          select: {
            items: true,
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
      try {
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
        const slug = await generateUniqueSlug(input.name, (slug: string) =>
          ctx.prisma.menuItem.findFirst({
            where: {
              slug: slug,
            },
          })
        );
        console.log("generated slug=", slug);
        return ctx.prisma.menuItem.create({
          data: {
            name: input.name,
            price: input.price,
            description: input.description,
            userId: user.id,
            menuCategoryId: category.id,
            restaurantId: restuarant.id,
            image: input.imageURL,
            slug,
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
