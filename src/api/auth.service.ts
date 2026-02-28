import type { LoginDTO, LoginResponse, RegisterDTO, RegisterResponse } from '../types/api.auth.types';
import { api } from './axios';

export const AuthService = {
  async login(data: LoginDTO) {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterDTO) {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  }
}
