import { api } from '../../api/axios';
import type { User } from './user.types';

export const UserService = {
  async getUserVerify() {
    const response = await api.get<User>('/auth/verify');
    return response.data;
  },

  async getUsers() {
    const response = await api.get<User[]>('/users');
    return response.data;
  }
}
