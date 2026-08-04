import type { FileWithPreview } from "@/features/post/types/post.types";

export type IEditProfileFormInput = {
  name: string;
  media: FileWithPreview[];
  // caption: string;
}
