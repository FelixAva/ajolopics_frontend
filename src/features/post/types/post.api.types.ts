// * The GetFeedResponseDTO its the paginatedResponse.

export interface GetFeedRequestDTO {
  page?: number;
  size?: number;
  search?: string | undefined;
  filters?: FiltersSet;
}

export interface FiltersSet {
  tagIds: number[] | undefined;
  aspectRatio: string[] | undefined | string;
  authorIds: string[] | undefined;
}

export interface CreatePostRequestDTO {
  title: string;
  description?: string;
  tags?: number[];
  media: File[];
}
