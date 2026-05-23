import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { AxiosError } from 'axios';

import { PostService } from '../services/post.service';
import type { ErrorDTO } from '@/types/api.types';
import type { MediaVariant, Post } from '../types/post.types';
import type { CreatePostRequestDTO } from '../types/post.api.types';
import { queryClient } from '@/app/queryClient';
import { showAjolopicsToast } from '@/components/ui/Alerts';
import { downloadPostImage } from '../utils/downloadPostImage';

interface DownloadPostImageVariables {
  post: Post;
  variant: MediaVariant;
}

const usePostMutations =  () => {
  const { t } = useTranslation('toast');

  const createPost = useMutation<Post, AxiosError<ErrorDTO>, CreatePostRequestDTO>({
    mutationFn: (data: CreatePostRequestDTO) => PostService.createPost(data),
    onSuccess: () => {
      showAjolopicsToast('success', t('postSuccess'));

      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (error) => {
      console.error(error);


      showAjolopicsToast('error', t('postFailed'));
    }
  });

  const downloadPost = useMutation<Blob, Error, DownloadPostImageVariables>({
    mutationFn: ({ variant }) => PostService.downloadPostImage(variant),
    onSuccess: (blob, { post, variant }) => {
      downloadPostImage(post, variant, blob);

      showAjolopicsToast('success', t('postDownloadSuccess'));
    },
    onError: (error) => {
      console.error(error);

      showAjolopicsToast('error', t('postDownloadFailed'));
    }
  });

  return {
    createPost,
    downloadPost
  }
};

export default usePostMutations;
