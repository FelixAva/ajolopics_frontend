import { Suspense, useEffect, type PropsWithChildren } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './app/router';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { queryClient } from './app/queryClient';
import './index.css';
import './app/i18n';
import { useAuthStore } from './features/auth';
import { userSessionMapper } from './features/user/utils/userSessionMapper.util';
import { userVerifyQueryOptions } from './features/user/api/user.query-options';

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const token = useAuthStore(state => state.token);
  const setUser = useAuthStore(state => state.setUser);
  const setStatus = useAuthStore(state => state.setStatus);

  const me = useQuery({
    ...userVerifyQueryOptions(),
    enabled: Boolean(token),
    refetchInterval: 1000 * 60 * 23,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!token) {
      setStatus('unauthenticated');
      return;
    }

    if (me.isPending) setStatus('checking');

    if (me.isSuccess) {
      setUser(userSessionMapper(me.data));
      setStatus('authenticated');
    }

    if (me.isError && me.error.response?.status === 401) useAuthStore.getState().logout();
  }, [
    token,
    me.isPending,
    me.isSuccess,
    me.isError,
    me.data,
    setStatus,
    setUser,
    me.error?.response?.status
  ]);

  return children;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <CheckAuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </CheckAuthProvider>

    </QueryClientProvider>
  </StrictMode>,
)
