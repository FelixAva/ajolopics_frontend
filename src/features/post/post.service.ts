import { api } from '../../api/axios';
import type { CreatePostDTO } from './api.post.types';

export const PostService = {
  async createPost(data: CreatePostDTO) {
    const formData = new FormData();

    // 1. Texts
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }

    // 2. Tags
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach(tagId => {
        formData.append('tag[]', tagId.toString());
      });
    }

    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      },
    });

    return response.data;
  }
}
