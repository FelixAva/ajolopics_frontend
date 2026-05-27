// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Hooks imports
import useAuth from '@/features/auth/hooks/useAuth';

// Types and Interfaces imports
import type { SubmitHandler } from 'react-hook-form';
import type { IRegisterFormInput } from '@/features/auth/types/auth.form.types';

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
    getValues,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const { register: authRegister } = useAuth();

  const onSubmit: SubmitHandler<IRegisterFormInput> = async(data) => {
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
            {...register('name', {
              required: t('components:validation.required', { field: t('auth:fields.name') }),
              minLength: {
                value: 3,
                message: t('components:validation.minLength', { min: 3 })
              },
              maxLength: {
                value: 100,
                message: t('components:validation.maxLength', { max: 100 })
              },
            })}
            error={ errors.name?.message }
          />
          <Input
            label={t('auth:fields.email')}
            type='email'
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
            type='password'
            placeholder='••••••••'
            label={t('auth:fields.password')}
            {...register("password",
              {
                required: t('components:validation.required', { field: t('auth:fields.password') }),
                minLength: {
                  value: 8,
                  message: t('components:validation.minLength', { min: 8 })
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: t('components:validation.passwordPattern')
                }
            })}
            error={ errors.password?.message }
          />
          <Input
            type='password'
            label={t('auth:fields.confirmPassword')}
            placeholder='••••••••'
            {...register("confPassword",
              {
                required: t('components:validation.required', { field: t('auth:fields.confirmPassword') }),
                deps: ['password'],
                validate: (value) =>
                  value === getValues('password') || t('components:validation.passwordsMatch')
            })}
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
                  title={t('auth:register.submit')}
                  type='submit'
                />
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
