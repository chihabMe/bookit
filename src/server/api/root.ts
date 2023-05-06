import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { ordersRouter } from "./routers/orders";
import { menuRouter } from "./routers/menu";
import { authRouter } from "./routers/auth";
import { profileRouter } from "./routers/profile";
import { reservationRouter } from "./routers/resevation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  ordres: ordersRouter,
  menu: menuRouter,
  auth: authRouter,
  profile: profileRouter,
  reservation: reservationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
