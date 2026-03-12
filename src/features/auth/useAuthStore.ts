import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_TOKEN_KEY } from '../../constants/auth.constants';
import type { User } from '../user/user.types';
import { queryClient } from '../../lib/queryClient';

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => {
        set({ token: null, user: null });
        queryClient.removeQueries({ queryKey:['userVerify'] });
      },
      isAuthenticated: () => !!get().token,
    }),
    {
      name: AUTH_TOKEN_KEY,
      // partialize: (state) => ({ token: state.token })
    }
  )
)
