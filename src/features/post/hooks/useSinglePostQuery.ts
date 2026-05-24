import { useQuery } from '@tanstack/react-query';
import { singlePostQueryOptions } from '../api/post.query-options';

export const useSinglePostQuery = (postId: string) => {
  return useQuery(
    singlePostQueryOptions(postId),
  );
};
