import { api } from '../../api/axios';
import type { PostTagResponseDTO, GetTagResponseDTO, PostTagDTO } from './tag.api.types';

export const TagService = {
  async createTag(data: PostTagDTO) {
    const response = await api.post<PostTagResponseDTO>('/tags', data);
    return response.data;
  },

  async getTag() {
    const response = await api.get<GetTagResponseDTO[]>('/tags');
    return response.data;
  }
}
