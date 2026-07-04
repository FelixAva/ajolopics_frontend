import type { GetFeedRequestDTO } from '@/features/post/types/post.api.types';

export type FeedSearch = {
  tags?: string;
  authors?: string;
  aspectRatio?: string;
  search?: string;
  postId?: string;
}

export const getFeedParams = (searchParams: FeedSearch): GetFeedRequestDTO => ({
  size: 20,
  search: searchParams.search,
  filters: {
    tagIds: searchParams.tags ? searchParams.tags.split(',').map(Number) : undefined,
    authorIds: searchParams.authors ? searchParams.authors.split(',') : undefined,
    aspectRatio: searchParams.aspectRatio || undefined,
  },
});
