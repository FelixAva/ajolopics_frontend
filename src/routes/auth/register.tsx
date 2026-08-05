// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  createRegisterSchema,
  useAuth,
  type RegisterSchema,
} from '@/features/auth';

// Types and Interfaces imports
import type { SubmitHandler } from 'react-hook-form';

// Components imports
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/auth/register')({
  head: () => createSeoHead({
    title: getSeoTranslation('auth.registerTitle'),
    description: getSeoTranslation('auth.registerDescription'),
    path: '/auth/register',
    noIndex: true,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['auth', 'components']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: yupResolver(createRegisterSchema(t)),
    mode: 'onTouched'
  });

  const { register: authRegister } = useAuth();

  const onSubmit: SubmitHandler<RegisterSchema> = async(data) => {
    authRegister.mutate(data);
  };

  return (
    <div className='flex flex-1 justify-center items-center text-center'>
      <div className='w-full md:w-auto flex flex-col gap-2'>
        <div>
          <h1 className='text-2xl text-foreground'>{t('auth:register.title')}</h1>
          <h2 className='text-lg font-thin text-foreground'>{t('auth:register.subTitle')}</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='md:w-sm flex flex-col gap-3'
        >
          <Input
            label={t('auth:fields.name')}
            type='text'
            placeholder={t('auth:fields.namePlaceholder')}
            {...register('name')}
            error={ errors.name?.message }
          />
          <Input
            label={t('auth:fields.email')}
            type='email'
            placeholder={t('auth:fields.emailPlaceholder')}
            {...register('email')}
            error={ errors.email?.message }
          />
          <Input
            type='password'
            placeholder='••••••••'
            label={t('auth:fields.password')}
            {...register("password")}
            error={ errors.password?.message }
          />
          <Input
            type='password'
            label={t('auth:fields.confirmPassword')}
            placeholder='••••••••'
            {...register("confPassword")}
            error={ errors.confPassword?.message }
          />

          {
            authRegister.isError && (
                <span className='text-sm text-error'>{t(`auth:backendErrors.${authRegister.error.response?.data.error}`)}</span>
              )
          }

          {
            authRegister.isPending
              ? (
                <div className='self-center'>
                  <Spinner />
                </div>
              )
              : (
                <Button
                  type='submit'
                >
                  {t('auth:register.submit')}
                </Button>
              )
          }
        </form>

        <Link to="/auth" className="[&.active]:font-bold] text-foreground" preload="intent">
          {t('auth:register.loginPrompt')} <span className='text-primary underline'>{t('auth:register.loginLink')}</span>
        </Link>
      </div>
    </div>
  );
}
