import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';
import { router } from '../../../app/router';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../../types/api.types';
import type {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO
} from '../types/auth.api.types';
import { UserService } from '../../user/services/user.service';
import { queryClient } from '../../../app/queryClient';
import { showAjolopicsToast } from '@/components/ui/Toast';

const useAuth = () => {
  // Get the setToken function from Zustand
  const setToken = useAuthStore(state => state.setToken);
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate({ from: '/auth/' });

  const login = useMutation<LoginResponseDTO, AxiosError<ErrorDTO>, LoginDTO>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: async (data) => {
      // Set the user token with Zustand
      setToken(data.token);
      try {
        const user = await queryClient.fetchQuery({
          queryKey: ['userVerify'],
          queryFn: () => UserService.getUserVerify()
        });
        setUser(user);

        navigate({to: '/'});
      } catch (error) {
        console.error('Error al verificar tras login', error);
        useAuthStore.getState().logout();
      }
    },
    onError: (error) => {
      // Error cathching. The error is also render with a span in /src/routes/auth/index.tsx
      console.log(error.response?.data.message);
    }
  });

  const register = useMutation<RegisterResponseDTO, AxiosError<ErrorDTO>, RegisterDTO>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      showAjolopicsToast('success', 'User register successfully');

      // Redirect to the Login page
      router.navigate({ to: '/auth' });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    }
  })

  return { login, register };
}

export default useAuth;
