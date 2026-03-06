// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Hooks imports
import useAuth from '../../features/auth/useAuth';

// Types and Interfaces imports
import type { SubmitHandler } from 'react-hook-form';
import type { ILoginFormInput } from '../../features/auth/form.auth.types';

// Components imports
import { Input, Button, Spinner, InputPassword } from '../../components';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('auth');

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
      <div className='flex flex-col gap-2'>
        <div>
          <h1 className='text-2xl'>{t('login.title')}</h1>
          <h2 className='text-lg font-thin'>{t('login.subTitle')}</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-sm flex flex-col gap-3'
        >
          <Input
            label={t('login.form.emailInput.name')}
            type='index'
            placeholder={t('login.form.emailInput.placeholder')}
            {...register('email', {
              required: t('login.form.emailInput.errors.required'),
              maxLength: {
                value: 255,
                message: t('login.form.emailInput.maxLength')
              }
            })}
            error={ errors.email?.message }
          />
          <InputPassword
            label={t('login.form.pwdInput.name')}
            pwdRecovery
            {...register("password",
              {
                required: t('login.form.pwdInput.errors.required'),
                minLength: {
                  value: 8,
                  message: t('login.form.pwdInput.errors.minLength')
                },
            })}
            error={ errors.password?.message }
          />

          {
            login.isError && (
                <span className='text-sm text-red-400'>{login.error.response?.data.message}</span>
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
                  title={t('login.form.submitButton.title')}
                  type='submit'
                />
              )
          }
        </form>

        <Link to="/auth/register" className="[&.active]:font-bold]" preload="intent">
          {t('login.registerLink.text')} <span className='text-deep-teal underline'>{t('login.registerLink.path')}</span>
        </Link>
      </div>
    </div>
  );
}
