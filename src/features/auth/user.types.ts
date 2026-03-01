export type UserRole = "USER" | "ADMIN" | "CREATOR";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
