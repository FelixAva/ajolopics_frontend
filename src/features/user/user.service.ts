import { api } from '../../api/axios';
import type { User } from './user.types';

export const UserService = {
  async getUser() {
    const response = await api.get<User[]>('/users');
    return response.data;
  }
}
