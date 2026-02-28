import { AuthService } from '../../api/auth.service';

import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Input, Button } from '../../components';

type IFormInput = {
  email: string;
  password: string;
}

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    try {
      const result = await AuthService.login(data);

      localStorage.setItem('token', result.token);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
          <Input
            label='Password'
            type='password'
            placeholder='••••••••'
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

          <Button
            title='Login'
            type='submit'
            action={() => {}}
          />
        </form>

        <Link to="/auth/register" className="[&.active]:font-bold]" preload="intent">
          Don't you have an account? <span className='text-deep-teal underline'>Register</span>
        </Link>
      </div>
    </div>
  );
}
