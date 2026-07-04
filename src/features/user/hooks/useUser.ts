import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { userVerifyQueryOptions, usersQueryOptions } from '../api/user.query-options';

const useUser = () => {
  const token = useAuthStore(state => state.token);
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);

  const getUserVerify = useQuery({
    ...userVerifyQueryOptions(),
    enabled: !!token,
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

  const getUsers = useQuery(usersQueryOptions());

  return {
    getUserVerify,
    getUsers
  }
}

export default useUser;
