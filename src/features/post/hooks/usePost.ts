import type { AxiosError } from 'axios';
import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { PostService } from '../services/post.service';
import type { ErrorDTO } from '@/types/api.types'
import type { PaginatedResponseDTO } from '@/types/api.paginated.response.types';
import type { Post } from '../types/post.types';
import type { CreatePostRequestDTO, GetFeedRequestDTO } from '../types/post.api.types';
import { queryClient } from '@/app/queryClient';
import { showAjolopicsToast } from '@/components/ui/Alerts';

const usePost = (feedBodyParameters?: GetFeedRequestDTO, postId?: string) => {
  const { t } = useTranslation('toast');

  const createPost = useMutation<Post, AxiosError<ErrorDTO>, CreatePostRequestDTO>({
    mutationFn: (data: CreatePostRequestDTO) => PostService.createPost(data),
    onSuccess: () => {
      showAjolopicsToast('success', t('postSuccess'));

      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (error) => {
      console.error(error);

      showAjolopicsToast('error', t('postFailed'));
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
