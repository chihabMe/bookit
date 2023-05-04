import bcrypt from "bcrypt";
export const compare = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
export const hash = async (password: string) => bcrypt.hash(password, 10);
