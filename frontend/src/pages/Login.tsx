import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { useLogQueryHook } from '../hooks/userReactQueryHooks';
import { toast } from 'sonner';
import { type IError, errorHandler } from '../utils/errorHandler';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/RTKHooks';
import { loginUser } from '../Slices/authSlice';

type formType = {
  email: string;
  password: string;
};

const schema: ZodType<formType> = z.object({
  email: z.string().nonempty('Enter your email').email('Enter a valid email'),
  password: z
    .string()
    .nonempty('Enter your password')
    .min(6, 'Password must be above 5 characters'),
});

function Login() {
  const { mutateAsync, isLoading } = useLogQueryHook();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formSubmit = async (data: formType) => {
    try {
      const logUser = await mutateAsync(data);
      toast.success(`${logUser.name} logged in`);
      dispatch(loginUser(logUser));
      logUser.isAdmin ? navigate('/admin') : navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-2xl text-center ">Login to Trendzy</h1>
      <form
        className="flex max-w-xl mx-auto flex-col space-y-3"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="space-y-[0.7]">
          <Input
            color={errors.email?.message ? 'danger' : 'default'}
            {...register('email')}
            type="text"
            label="Email"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <Input
            color={errors.password?.message ? 'danger' : 'default'}
            {...register('password')}
            type="password"
            label="Password"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <Button
          className="w-52 mx-auto"
          size="lg"
          type="submit"
          color="primary"
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
      <p className="text-center">
        Don't have an account?{' '}
        <Link className="text-blue-500 hover:text-blue-800" to="/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
