import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { PostService } from './post.service';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types'
import type { PaginatedResponseDTO } from '../../types/api.paginated.response.types';
import type { Post } from './post.types';
import type { CreatePostRequestDTO, GetFeedRequestDTO } from './post.api.types';
import { queryClient } from '../../lib/queryClient';

const usePost = (feedBodyParameters?: GetFeedRequestDTO, postId?: string) => {
  const createPost = useMutation<Post, AxiosError<ErrorDTO>, CreatePostRequestDTO>({
    mutationFn: (data: CreatePostRequestDTO) => PostService.createPost(data),
    onSuccess: () => {
      alert('Post created successfully'); // ! Replace with a toast
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (error) => {
      console.error(error);
    }
  });

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
    createPost,
    getPostFeed,
    getSinglePost
  };
};

export default usePost;
