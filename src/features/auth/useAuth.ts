import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../features/auth/auth.service';
import { useAuthStore } from './useAuthStore';
import { router } from '../../lib/router';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types';
import type {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO
} from './api.auth.types';

const useAuth = () => {
  // Get the setToken function from Zustand
  const setToken = useAuthStore(state => state.setToken);

  const login = useMutation<LoginResponseDTO, AxiosError<ErrorDTO>, LoginDTO>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: (data) => {
      // Set the user token with Zustand
      setToken(data.token);

      // Redirect to the Home page
      router.navigate({ to: '/' })
    },
    onError: (error) => {
      // Error cathching. The error is also render with a span in /src/routes/auth/index.tsx
      console.log(error.response?.data.message);
    }
  });

  const register = useMutation<RegisterResponseDTO, AxiosError<ErrorDTO>, RegisterDTO>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      alert('Registered successfully'); // ! Replace with a toast

      // Redirect to the Login page
      router.navigate({ to: '/auth' });
    },
    onError: (error) => {
      // Error cathching. The error is also render with a span in /src/routes/auth/register.tsx
      console.error(error.response?.data.message);
    }
  })

  return { login, register };
}

export default useAuth;
