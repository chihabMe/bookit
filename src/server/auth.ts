import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvide from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { compare } from "~/helpers/auth";
import { type UserRoles } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    role: UserRoles;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRoles;

      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      role: UserRoles;
      id: string;
    };
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ account, token, user, profile, session, trigger }) => {
      // //@ts-ignore
      // token.user = user;
      console.log("-----------f it jwt-------------");
      console.log("user>", user);
      console.log("account>", account);
      console.log("profile", profile);
      if (user) {
        token.user = { role: user.role, id: user.id };
      }
      return token;
    },
    session: ({ session, user, token }) => {
      console.log("---sessxion--");
      const returnedSession = {
        ...session,
        user: {
          ...token.user,
          ...session.user,
        },
      };
      console.log(returnedSession);

      // //@ts-ignore
      // if (!returnedSession.user.id) returnedSession.user.id = token.user.id;
      return returnedSession;
    },
  },

  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvide({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "passwrod",
        },
      },

      async authorize(credentials, req) {
        try {
          if (!credentials) throw new Error("credentials can't be empty");
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user || !user.password || user.password.trim() == "")
            throw new Error("invalid user");
          const comparePassword = await compare(
            credentials.password,
            user.password
          );
          console.log(user.password);
          console.log("password", credentials.password);
          console.log(comparePassword);
          if (!comparePassword) throw new Error("invalid credentials");
          console.log(user);
          console.log("i will return the user");
          return user;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
