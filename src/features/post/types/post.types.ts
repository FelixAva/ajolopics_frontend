import type { User } from '@/features/user/types/user.types';
import type { Tag } from '@/features/tag/types/tag.type';

export type AspectRatioType = "SQUARE" | "LANDSCAPE" | "PORTRAIT";

export type Post = {
  id: string;
  author: User;
  title: string;
  description?: string | null;
  assets: Asset[];
  tags: Tag[];
  createdAt: string; // ! Could be a Date
}

export type Asset = {
  id: string;
  post: string;
  filename: string;
  posiition: number,
  variants: MediaVariant[]
}

export type VariantType = "ORIGINAL" | "MEDIUM" | "THUMBNAIL";

export type MediaVariant = {
  id: string;
  url: string;
  key: string;
  variant: VariantType;
  width: number;
  height: number;
  size: number;
  mimeType: string;
}

export type FileWithPreview = {
  file: File;
  previewUrl: string;
}
