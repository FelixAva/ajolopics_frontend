// Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

// Hooks imports
import useAuth from '../../features/auth/useAuth';

// Types and Interfaces imports
import type { SubmitHandler } from 'react-hook-form';
import type { IRegisterFormInput } from '../../features/auth/form.auth.types';

// Components imports
import { Input, Button, Spinner, InputPassword } from '../../components';

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})


function RouteComponent() {
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
      <div className='flex flex-col gap-2'>
        <div>
          <h1 className='text-2xl'>Nice to meet you</h1>
          <h2 className='text-lg font-thin'>Register to access all the content</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-sm flex flex-col gap-3'
        >
          <Input
            label='Name'
            type='text'
            placeholder='John Doe'
            {...register('name', {
              required: 'The name is required',
              minLength: {
                value: 2,
                message: 'The min length is of 2'
              },
              maxLength: {
                value: 100,
                message: 'The max length is of 100'
              },
            })}
            error={ errors.name?.message }
          />
          <Input
            label='Email'
            type='text'
            placeholder='you@email.com'
            {...register('email', {
              required: 'The email is required',
              maxLength: {
                value: 255,
                message: 'The max length is of 255'
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'This is not a valid email format'
              }
            })}
            error={ errors.email?.message }
          />
          <InputPassword
            label='Password'
            {...register("password",
              {
                required: "The password is required",
                minLength: {
                  value: 8,
                  message: "The min length is of 8"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                }
            })}
            error={ errors.password?.message }
          />
          <InputPassword
            label='Confirm password'
            {...register("confPassword",
              {
                required: "The password is required",
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
                  title='Register'
                  type='submit'
                />
              )
          }
        </form>

        <Link to="/auth" className="[&.active]:font-bold]" preload="intent">
          Do you have an account? <span className='text-deep-teal underline'>Login</span>
        </Link>
      </div>
    </div>
  );
}
