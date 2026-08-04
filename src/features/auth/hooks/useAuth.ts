import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { AuthService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { router } from '@/app/router';
import { showAjolopicsToast } from '@/components/ui/Alerts';
import type { ErrorDTO } from '@/types/api.types';
import type {
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponseDTO
} from '../types/auth.api.types';
import { queryClient } from '@/app/queryClient';
import { userKeys } from '@/features/user/api/user.keys';

const useAuth = () => {
  const { t } = useTranslation('toast');

  // Get the setToken function from Zustand
  const setToken = useAuthStore(state => state.setToken);
  const navigate = useNavigate({ from: '/auth/' });

  const login = useMutation<LoginResponse, AxiosError<ErrorDTO>, LoginDTO>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: async (data) => {
      // Set the user token with Zustand
      setToken(data.token);

      queryClient.resetQueries({
        queryKey: userKeys.lists()
      });

      navigate({to: '/'});
    },
    onError: (error) => {
      // Error cathching. The error is also render with a span in /src/routes/auth/index.tsx
      console.log(error.response?.data.message);
    }
  });

  const register = useMutation<RegisterResponseDTO, AxiosError<ErrorDTO>, RegisterDTO>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      showAjolopicsToast('success', t('register'));

      // Redirect to the Login page
      router.navigate({ to: '/auth' });
    },
    onError: (error) => {
      // Error cathching. The error is also render with a span in /src/routes/auth/index.tsx
      console.error(error.response?.data.message);
    }
  })

  return { login, register };
}

export default useAuth;
