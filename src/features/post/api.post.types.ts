import type { AspectRatioType } from './post.types';

export interface GetFeedRequestDTO {
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

export interface CreatePostRequestDTO {
  title: string;
  description?: string;
  tags?: number[];
  media: File[];
}
