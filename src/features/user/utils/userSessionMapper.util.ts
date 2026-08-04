import type { UserSession } from "@/features/auth";
import type { User } from "../types/user.types";

export const userSessionMapper = (user: User) => {
  const sessionUser: UserSession = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role
  };

  return sessionUser;
};
