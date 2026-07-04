import { api } from '../../../api/axios';
import type { User } from '../types/user.types';

export const UserService = {
  async getUserVerify() {
    const response = await api.get<User>('/auth/verify');
    return response.data;
  },

  async getUsers() {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async getUser(username: string) {
    const response = await api.get<User>(`/users/${username}`)
    return response.data;
  }
}
