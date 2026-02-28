import { api } from './axios';

interface LoginDTO {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}
interface RegisterResponse {
  name: string;
  email: string;
  id: string;
  role: "USER" | "ADMIN";
}

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
