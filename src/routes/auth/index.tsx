// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

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
          <h1 className='text-2xl'>Welcome Back</h1>
          <h2 className='text-lg font-thin'>Check the newest Art Posts</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-sm flex flex-col gap-3'
        >
          <Input
            label='Email'
            type='text'
            placeholder='you@email.com'
            {...register('email', {
              required: 'The email is required',
              maxLength: {
                value: 255,
                message: 'The max length is of 255'
              }
            })}
            error={ errors.email?.message }
          />
          <InputPassword
            label='Password'
            pwdRecovery
            {...register("password",
              {
                required: "The password is required",
                minLength: {
                  value: 8,
                  message: "The min length is of 8"
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
                  title='Login'
                  type='submit'
                />
              )
          }
        </form>

        <Link to="/auth/register" className="[&.active]:font-bold]" preload="intent">
          Don't you have an account? <span className='text-deep-teal underline'>Register</span>
        </Link>
      </div>
    </div>
  );
}
