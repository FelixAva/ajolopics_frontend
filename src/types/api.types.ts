export interface ErrorDTO {
  message: string;
  error: string;
  statusCode: number;
}

export interface PaginatedResponseDTO<T>{
  items: T[];
  size: number;
  page: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
