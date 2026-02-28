import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../api/auth.service';
import type { AxiosError } from 'axios';
import type { LoginDTO, LoginResponse, RegisterDTO, RegisterResponse } from '../../types/api.auth.types';
import type { ErrorDTO } from '../../types/api.types';

const useAuth = () => {
  const login = useMutation<LoginResponse, AxiosError<ErrorDTO>, LoginDTO>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      alert('Redirecting...');
      window.location.href = '/';
    },
    onError: (error) => {
      console.log(error.response?.data.message);
    }
  });

  const register = useMutation<RegisterResponse, AxiosError<ErrorDTO>, RegisterDTO>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      alert('Registered successfully');
      window.location.href = '/auth'; // ! Zustand to user session management
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    }
  })

  return {
    login,
    register
  }
}

export default useAuth;
