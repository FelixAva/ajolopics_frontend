import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_TOKEN_KEY } from '../utils/auth.constants';
import { queryClient } from '../../../app/queryClient';
import type { AuthState } from '../types/auth.store.types';
import { userKeys } from '../../user/api/user.keys';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      status: 'idle',

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setStatus: (status) => set({ status }),
      logout: () => {
        set({
          token: null,
          user: null,
          status: 'unauthenticated'
        });

        queryClient.removeQueries({
          queryKey: userKeys.all
        });
      },
      isAuthenticated: () => !!get().token,
    }),
    {
      name: AUTH_TOKEN_KEY,
      partialize: (state) => ({ token: state.token })
    }
  )
)
