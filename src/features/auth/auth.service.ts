import type {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO
} from './auth.api.types';
import { api } from '../../api/axios';

export const AuthService = {
  async login(data: LoginDTO) {
    const response = await api.post<LoginResponseDTO>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterDTO) {
    const response = await api.post<RegisterResponseDTO>('/auth/register', data);
    return response.data;
  }
}
