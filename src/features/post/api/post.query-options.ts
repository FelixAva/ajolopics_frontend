import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';

import { PostService } from '../services/post.service';
import type { GetFeedRequestDTO } from '../types/post.api.types';

export const postKeys = {
  all: ['posts'] as const,

  feed: (params: Omit<GetFeedRequestDTO, 'page'>) =>
    [...postKeys.all, 'feed', params] as const,

  detail: (postId: string) =>
    [...postKeys.all, 'detail', postId] as const,
};

export const singlePostQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: postKeys.detail(postId),
    queryFn: () => PostService.getSinglePost(postId),
  })
;

export const postFeedQueryOptions = (
  feedBodyParameters: GetFeedRequestDTO,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page: _, ...queryKeyParams } = feedBodyParameters;

  return infiniteQueryOptions({
    queryKey: postKeys.feed(queryKeyParams),
    queryFn: ({ pageParam }) =>
      PostService.getFeed({
        ...feedBodyParameters,
        page: pageParam as number
      }),

      initialPageParam: 1,

      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });
}
