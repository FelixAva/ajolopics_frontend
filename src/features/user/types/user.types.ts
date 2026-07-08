export type UserRole = "USER" | "ADMIN" | "CREATOR";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
