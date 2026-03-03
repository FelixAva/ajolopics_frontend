export interface PaginatedResponseDTO<T>{
  items: T[];
  size: number;
  page: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
