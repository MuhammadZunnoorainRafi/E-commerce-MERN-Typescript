import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

type formType = {
  image?: string;
  name: string;
  email: string;
  password: string;
  password2: string;
};

const schema: ZodType<formType> = z
  .object({
    image: z.any().refine((files) => files?.length == 1, 'Select an image'),
    name: z.string().nonempty('Enter your name'),
    email: z.string().nonempty('Enter your email').email('Enter a valid email'),
    password: z
      .string()
      .nonempty('Enter your password')
      .min(6, 'Password must be above 5 characters'),
    password2: z.string().nonempty('Enter confirm password'),
  })
  .refine((val) => val.password === val.password2, {
    message: "Passwords don't match",
    path: ['password2'],
  });

const formSubmit = (data: formType) => {
  console.log(data);
};

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-3">Register</h1>
      <form
        className="flex max-w-xl mx-auto flex-col space-y-3"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="space-y-[0.7]">
          <Input
            color={errors.image?.message ? 'danger' : 'default'}
            size="md"
            label="Image"
            placeholder="Enter your Image"
            {...register('image')}
            type="file"
            accept="image/jpg,image/png,image/jpeg"
          />
          <p className="text-red-500 text-sm">{errors.image?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <Input
            color={errors.name?.message ? 'danger' : 'default'}
            {...register('name')}
            type="text"
            label="Name"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
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
        <div className="space-y-[0.7]">
          <Input
            color={errors.password2?.message ? 'danger' : 'default'}
            {...register('password2')}
            type="password"
            label="Confirm Password"
          />
          <p className="text-red-500 text-sm">{errors.password2?.message}</p>
        </div>
        <Button
          className="w-52 mx-auto"
          size="lg"
          type="submit"
          color="primary"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
