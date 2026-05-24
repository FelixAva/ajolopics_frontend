import type { AxiosError } from 'axios';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { PostService } from '../services/post.service';
import type { ErrorDTO, PaginatedResponseDTO } from '@/types/api.types'
import type { Post } from '../types/post.types';
import type { GetFeedRequestDTO } from '../types/post.api.types';

const usePostQueries = (feedBodyParameters?: GetFeedRequestDTO, postId?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page: _, ...queryKeyParams } = feedBodyParameters || {};

  const getPostFeed = useInfiniteQuery<PaginatedResponseDTO<Post>, AxiosError<ErrorDTO>>({
    queryKey: ['feed', queryKeyParams],
    queryFn: ({ pageParam }) => {
      if (!feedBodyParameters) throw new Error ('Post ID is required');
      return PostService.getFeed({ ...feedBodyParameters, page: pageParam as number });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    enabled: !!feedBodyParameters,
  });

  const getSinglePost = useQuery<Post, AxiosError<ErrorDTO>>({
    queryKey: ['singlePost', postId],
    queryFn: () => {
      if (!postId) throw new Error ('Post ID is required');
      return PostService.getSinglePost(postId);
    },
    enabled: !!postId,
  })

  return {
    getPostFeed,
    getSinglePost
  };
};

export default usePostQueries;
