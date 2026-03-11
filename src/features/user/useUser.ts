import { useQuery } from '@tanstack/react-query';
import { UserService } from './user.service';
import { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types';
import type { User } from './user.types';

const useUser = () => {
  const getUserVerify = useQuery<User, AxiosError<ErrorDTO>>({
    queryKey: ['userVerify'],
    queryFn: () => UserService.getUserVerify()
  });

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
