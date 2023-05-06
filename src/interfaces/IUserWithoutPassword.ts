import { User } from "@prisma/client";

type IUserWithoutPassword = Omit<User, "password">;

export default IUserWithoutPassword;
