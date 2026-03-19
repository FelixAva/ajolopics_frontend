// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Hooks imports
import useAuth from '../../features/auth/useAuth';

// Types and Interfaces imports
import type { SubmitHandler } from 'react-hook-form';
import type { IRegisterFormInput } from '../../features/auth/auth.form.types';

// Components imports
import { Input, Button, Spinner, InputPassword } from '../../components';

export const Route = createFileRoute('/auth/register')({
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
          <h1 className='text-2xl'>{t('auth:register.title')}</h1>
          <h2 className='text-lg font-thin'>{t('auth:register.subTitle')}</h2>
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
            type='text'
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
          <InputPassword
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
          <InputPassword
            label={t('auth:fields.confirmPassword')}
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
                <span className='text-sm text-red-400'>{t(`auth:backendErrors.${authRegister.error.response?.data.error}`)}</span>
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

        <Link to="/auth" className="[&.active]:font-bold]" preload="intent">
          {t('auth:register.loginPrompt')} <span className='text-deep-teal underline'>{t('auth:register.loginLink')}</span>
        </Link>
      </div>
    </div>
  );
}
