import { api } from '@/api/axios';
import type { PaginatedResponseDTO } from '@/types/api.types';
import type { CreatePostRequestDTO, GetFeedRequestDTO } from '../types/post.api.types';
import type { MediaVariant, Post } from '../types/post.types';

export const PostService = {
  async createPost(data: CreatePostRequestDTO) {
    const formData = new FormData();

    // 1. Texts
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }

    // 2. Tags
    if (data.tags && data.tags.length > 0) {
      formData.append('tags', data.tags.join(','));
    }

    // 3. Media
    for (let i = 0; i < data.media.length; i++) {
      formData.append('media', data.media[i]);
    }

    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      },
    });

    return response.data;
  },

  async getFeed(data: GetFeedRequestDTO) {
    const response = await api.post<PaginatedResponseDTO<Post>>('/posts/feed', data);
    return response.data;
  },

  async getSinglePost(id: string) {
    const response = await api.get<Post>(`/posts/single/${id}`);
    return response.data;
  },

  async downloadPostImage(variant: MediaVariant) {
    const response = await api.get<Blob>(variant.url, {
      responseType: 'blob',
      headers: {
        Accept: variant.mimeType || 'image/*',
      },
    });

    return response.data;
  }
}
