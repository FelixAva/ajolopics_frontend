import type { FileWithPreview } from './post.types';

export type Option = {
  value: string;
  label: string;
}

export type ICreatePostFormInput = {
  title: string;
  description: string;
  media: FileWithPreview[];
  tags: Option[];
}

export type IGetFeedFiltersFormInput = {
  search: string | null;
  tags: Option[] | null;
  aspectRatio: Option | null; // <-- Cambia a un solo Option o null
  authors: Option[] | null;
}
