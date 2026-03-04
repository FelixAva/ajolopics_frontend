import type { AspectRatioType } from './post.types';

export interface GetFeedDTO {
  page: number;
  size: number;
  search: string;
  filters: FiltersSet;
}

export interface FiltersSet {
  tagIds: number[];
  aspectRatio: AspectRatioType;
  authorIds: string[];
}

export interface CreatePostDTO {
  title: string;
  description?: string;
  tags?: number[];
  media: File[];
}
