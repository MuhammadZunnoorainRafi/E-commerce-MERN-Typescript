import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

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

const formSubmit = (data: formType) => {
  console.log(data);
};

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-3">Login to Trendzy</h1>
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
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
