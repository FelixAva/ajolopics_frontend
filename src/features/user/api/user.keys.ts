export const userKeys = {
  all: ['users'] as const,

  lists: () =>
    [...userKeys.all, 'list'] as const,

  list: () =>
    [...userKeys.lists()] as const,

  details: () =>
    [...userKeys.all, 'detail'] as const,

  detail: (username: string) =>
    [...userKeys.details(), username] as const,

  me: () =>
    [...userKeys.all, 'me'] as const,
};
