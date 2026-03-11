import { useQuery } from '@tanstack/react-query';
import { UserService } from './user.service';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useAuthStore } from '../auth/useAuthStore';
import type { ErrorDTO } from '../../types/api.types';
import type { User } from './user.types';

const useUser = () => {
  const token = useAuthStore(state => state.token);
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);

  const getUserVerify = useQuery<User, AxiosError<ErrorDTO>>({
    queryKey: ['userVerify'],
    queryFn: () => UserService.getUserVerify(),
    enabled: !!token,
    retry: false
  });

  useEffect(() => {
    if (getUserVerify.isSuccess && getUserVerify.data) {
      setUser(getUserVerify.data);
    }
  }, [getUserVerify.isSuccess, getUserVerify.data, setUser]);

  useEffect(() => {
    if (getUserVerify.isError && getUserVerify.error.response?.status === 401) {
      logout();
    }
  }, [getUserVerify.isError, getUserVerify.error, logout]);

  const getUsers = useQuery<User[], AxiosError<ErrorDTO>>({
    queryKey: ['users'],
    queryFn: () => UserService.getUsers()
  })
  return {
    getUserVerify,
    getUsers
  }
}

export default useUser;
