import type { UserRole } from "@/features/user/types/user.types";

export type AuthStatus =
  | 'idle' // * Persisted state has not been checked
  | 'checking' // * Validating token with /verify
  | 'authenticated' // * Token accepted and user loaded
  | 'unauthenticated'
;

export type AuthState = {
  // Properties
  token: string | null;
  user: UserSession | null;
  status: AuthStatus;

  // Getters
  isAuthenticated: () => boolean;

  // Setters
  setToken: (token: string) => void;
  setUser: (user: UserSession) => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => void;
};

export type UserSession = {
  id: string;
  name: string;
  username: string;
  role: UserRole;
};
