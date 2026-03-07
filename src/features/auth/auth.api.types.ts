import type { UserRole } from '../user/user.types';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  name: string;
  email: string;
  id: string;
  role: UserRole;
}
