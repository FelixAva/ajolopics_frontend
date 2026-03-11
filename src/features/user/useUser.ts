import { useQuery } from '@tanstack/react-query';
import { UserService } from './user.service';
import { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types';

const useUser = () => {
  const getUser = useQuery<any[], AxiosError<ErrorDTO>>({
    queryKey: ['users'],
    queryFn: () => UserService.getUser()
  });

  return {
    getUser
  }
}

export default useUser;
