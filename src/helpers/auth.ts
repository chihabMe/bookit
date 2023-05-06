import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import IUserWithoutPassword from "~/interfaces/IUserWithoutPassword";
export const compare = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
export const hash = async (password: string) => bcrypt.hash(password, 10);

export const getUserWihtoutPassword = (user: User): IUserWithoutPassword => {
  const { password: _, ...userWihoutPassword } = { ...user };
  return userWihoutPassword;
};
