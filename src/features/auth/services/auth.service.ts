import type {
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from '../types/auth.api.types';
import { api } from '../../../api/axios';
import type { LoginSchema } from '../schemas/auth.schemas';

export const AuthService = {
  async login(loginData: LoginSchema): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  }
}
