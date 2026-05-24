import type { MediaVariant, Post } from '../types/post.types';

const MIME_EXTENSION_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

const sanitizeFilename = (filename: string) => {
  return filename
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

const getExtension = (variant: MediaVariant, blob: Blob) => {
  const mimeType = variant.mimeType || blob.type;
  return MIME_EXTENSION_MAP[mimeType] || 'jpg';
};

export const downloadPostImage = (post: Post, variant: MediaVariant, blob: Blob) => {
  const extension = getExtension(variant, blob);
  const filename = `${sanitizeFilename(post.title || 'ajolopics-image')}-${variant.variant.toLowerCase()}.${extension}`;
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 0);
};
