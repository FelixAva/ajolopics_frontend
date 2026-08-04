import { queryOptions } from '@tanstack/react-query';

import { UserService } from '../services/user.service';
import type { ErrorDTO } from '@/types/api.types';
import type { User } from '../types/user.types';
import type { AxiosError } from 'axios';
import { userKeys } from './user.keys';

export const userProfileQueryOptions = (username: string) =>
  queryOptions<User, AxiosError<ErrorDTO>>({
    queryKey: userKeys.detail(username),
    queryFn: () => UserService.getUser(username),
  })
;

export const userVerifyQueryOptions = () =>
  queryOptions<User, AxiosError<ErrorDTO>>({
    queryKey: userKeys.me(),
    queryFn: () => UserService.getUserVerify(),
    retry: false,
  })
;

export const usersQueryOptions = () =>
  queryOptions<User[], AxiosError<ErrorDTO>>({
    queryKey: userKeys.list(),
    queryFn: () => UserService.getUsers(),
  })
;
