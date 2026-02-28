import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../api/auth.service';
// import { queryClient } from '../client';
import type { LoginDTO, LoginResponse, RegisterDTO, RegisterResponse } from '../../types/api.auth.types';

const useAuth = () => {
  const login = useMutation<LoginResponse, Error, LoginDTO>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      alert('Redirecting...');
    },
    onError: (error) => {
      console.error(error.message);
    }
  });

  const register = useMutation<RegisterResponse, Error, RegisterDTO>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      alert('Registered successfully');
    },
    onError: (error) => {
      console.error(error);
    }
  })

  return {
    login,
    register
  }
}

export default useAuth;
