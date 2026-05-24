import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import type { GetFeedRequestDTO } from '../types/post.api.types';
import {
  singlePostQueryOptions,
  postFeedQueryOptions
} from '../api/post.query-options';

const usePostQueries = (
  feedBodyParameters?: GetFeedRequestDTO,
  postId?: string
) => {
  const getPostFeed = useInfiniteQuery({
    ...postFeedQueryOptions(feedBodyParameters!),
    enabled: !!feedBodyParameters,
  });

  const getSinglePost = useQuery({
    ...singlePostQueryOptions(postId!),
    enabled: !!postId
  })

  return {
    getPostFeed,
    getSinglePost
  };
};

export default usePostQueries;
