import type { FileWithPreview } from "./post.types";

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
