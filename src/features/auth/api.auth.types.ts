import type { UserRole } from './user.types';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  id: string;
  role: UserRole;
}
