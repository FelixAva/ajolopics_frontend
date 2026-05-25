import { useInfiniteQuery } from '@tanstack/react-query';
import { postFeedQueryOptions } from '../api/post.query-options';
import type { GetFeedRequestDTO } from '../types/post.api.types';

export const usePostFeedQuery = (
  feedBodyParameters: GetFeedRequestDTO,
) => {
  return useInfiniteQuery(
    postFeedQueryOptions(feedBodyParameters),
  );
};
