import { useQuery, useMutation } from '@tanstack/react-query';
import { TagService } from './tag.service';
import type { AxiosError } from 'axios';
import type { ErrorDTO } from '../../types/api.types';
import type { GetTagResponseDTO, PostTagDTO, PostTagResponseDTO } from './api.tag.types';

const useTag = () => {
  const createTag = useMutation<PostTagResponseDTO, AxiosError<ErrorDTO>, PostTagDTO>({
    mutationFn: (data: PostTagDTO) => TagService.createTag(data),
    onSuccess: () => {
      alert('Tag created');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const getTags = useQuery<GetTagResponseDTO[], AxiosError<ErrorDTO>>({
    queryKey: ['tags'],
    queryFn: () => TagService.getTag(),
  });

  return {
    createTag,
    getTags
  }
};

export default useTag;
