import { queryOptions } from '@tanstack/react-query';

import { UserService } from '../services/user.service';
import type { ErrorDTO } from '@/types/api.types';
import type { User } from '../types/user.types';
import type { AxiosError } from 'axios';

export const userKeys = {
  all: ['users'] as const,

  lists: () =>
    [...userKeys.all, 'list'] as const,

  list: () =>
    [...userKeys.lists()] as const,

  details: () =>
    [...userKeys.all, 'detail'] as const,

  detail: (userId: string) =>
    [...userKeys.details(), userId] as const,

  me: () =>
    [...userKeys.all, 'me'] as const,
};

export const userProfileQueryOptions = (userId: string) =>
  queryOptions<User, AxiosError<ErrorDTO>>({
    queryKey: userKeys.detail(userId),
    queryFn: () => UserService.getUser(userId),
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
