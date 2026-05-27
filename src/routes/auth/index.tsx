// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Hooks imports
import useAuth from '@/features/auth/hooks/useAuth';

// Types and Interfaces imports
import type { SubmitHandler } from 'react-hook-form';
import type { ILoginFormInput } from '@/features/auth/types/auth.form.types';

// Components imports
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { createSeoHead } from '@/utils/seo';
import { getSeoTranslation } from '@/utils/seoTranslations';

export const Route = createFileRoute('/auth/')({
  head: () => createSeoHead({
    title: getSeoTranslation('auth.loginTitle'),
    description: getSeoTranslation('auth.loginDescription'),
    path: '/auth',
    noIndex: true,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['auth', 'components']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const { login } = useAuth();

  const onSubmit: SubmitHandler<ILoginFormInput> = async(data) => {
    login.mutate(data);
  };

  return (
    <div className='flex flex-1 justify-center items-center text-center'>
      <div className='w-full md:w-auto flex flex-col gap-2'>
        <div>
          <h1 className='text-2xl'>{t('auth:login.title')}</h1>
          <h2 className='text-lg font-thin'>{t('auth:login.subTitle')}</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='md:w-sm flex flex-col gap-3'
        >
          <Input
            label={t('auth:fields.email')}
            type='index'
            placeholder={t('auth:fields.emailPlaceholder')}
            {...register('email', {
              required: t('components:validation.required', { field: t('auth:fields.email') }),
              maxLength: {
                value: 255,
                message: t('components:validation.maxLength', { max: 255 })
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('components:validation.emailPattern')
              }
            })}
            error={ errors.email?.message }
          />
          <Input
            label={t('auth:fields.password')}
            type='password'
            placeholder='••••••••'
            {...register("password",
              {
                required: t('components:validation.required', { field: t('auth:fields.password') }),
                minLength: {
                  value: 8,
                  message: t('components:validation.minLength', { min: 8 })
                },
            })}
            error={ errors.password?.message }
          />

          {
            login.isError && (
                <span className='text-sm text-error'>{t(`auth:backendErrors.${login.error.response?.data.error}`)}</span>
              )
          }

          {
            login.isPending
              ? (
                <div className='self-center'>
                  <Spinner />
                </div>
              )
              : (
                <Button
                  title={t('auth:login.submit')}
                  type='submit'
                />
              )
          }
        </form>

        <Link to="/auth/register" className="[&.active]:font-bold]" preload="intent">
          {t('auth:login.registerPrompt')} <span className='text-primary underline'>{t('auth:login.registerLink')}</span>
        </Link>
      </div>
    </div>
  );
}
