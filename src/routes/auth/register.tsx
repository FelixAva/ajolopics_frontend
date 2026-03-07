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
  const { t } = useTranslation('auth');
  const {
    register,
    handleSubmit,
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
          <h1 className='text-2xl'>{t('register.title')}</h1>
          <h2 className='text-lg font-thin'>{t('register.subTitle')}</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='md:w-sm flex flex-col gap-3'
        >
          <Input
            label={t('register.form.nameInput.name')}
            type='text'
            placeholder={t('register.form.nameInput.placeholder')}
            {...register('name', {
              required: t('register.form.nameInput.errors.required'),
              minLength: {
                value: 2,
                message: t('register.form.nameInput.errors.minLength')
              },
              maxLength: {
                value: 100,
                message: t('register.form.nameInput.errors.maxLength')
              },
            })}
            error={ errors.name?.message }
          />
          <Input
            label={t('register.form.emailInput.name')}
            type='text'
            placeholder={t('register.form.emailInput.placeholder')}
            {...register('email', {
              required: t('register.form.nameInput.errors.minLength'),
              maxLength: {
                value: 255,
                message: t('register.form.nameInput.errors.maxLength')
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('register.form.nameInput.errors.pattern')
              }
            })}
            error={ errors.email?.message }
          />
          <InputPassword
            label={t('register.form.pwdInput.name')}
            {...register("password",
              {
                required: t('register.form.pwdInput.errors.required'),
                minLength: {
                  value: 8,
                  message: t('register.form.pwdInput.errors.minLength')
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: t('register.form.pwdInput.errors.pattern')
                }
            })}
            error={ errors.password?.message }
          />
          <InputPassword
            label={t('register.form.pwdConfirmInput.name')}
            {...register("confPassword",
              {
                required: t('register.form.pwdConfirmInput.errors.required'),
                // ! Same as pwd
            })}
            error={ errors.confPassword?.message }
          />

          {
            authRegister.isError && (
                <span className='text-sm text-red-400'>{authRegister.error.response?.data.message}</span>
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
                  title={t('register.form.submitButton.title')}
                  type='submit'
                />
              )
          }
        </form>

        <Link to="/auth" className="[&.active]:font-bold]" preload="intent">
          {t('register.loginLink.text')} <span className='text-deep-teal underline'>{t('register.loginLink.path')}</span>
        </Link>
      </div>
    </div>
  );
}
