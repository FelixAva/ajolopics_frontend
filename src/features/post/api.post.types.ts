// * The GetFeedResponseDTO its the paginatedResponse.

export interface GetFeedRequestDTO {
  page?: number;
  size?: number;
  search?: string | null;
  filters?: FiltersSet;
}

export interface FiltersSet {
  tagIds: number[] | null;
  aspectRatio: string[] | null;
  authorIds: string[] | null;
}

export interface CreatePostRequestDTO {
  title: string;
  description?: string;
  tags?: number[];
  media: File[];
}
