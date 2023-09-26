import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { type IError, errorHandler } from '../../utils/errorHandler';

type formType = {
  image: string;
  name: string;
  email: string;
  password: string;
  password2: string;
};

const schema = z
  .object({
    image: z.any().refine((files) => files?.length === 1, 'Select an image'),
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

export default function UpdateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAppSelector((state) => state.authReducer);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useRegQueryHook();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const formSubmit = async ({ name, email, image, password }: formType) => {
    try {
      setIsLoading(true);
      // Cloudinary Image Upload
      const file = image[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'sernEcommerce');
      const imageData = await axios.post(
        `https://api.cloudinary.com/v1_1/dk5gpbckp/image/upload`,
        formData
      );

      const dataWithImage = {
        name,
        email,
        password,
        image: imageData.data.secure_url,
      };

      const response = await mutateAsync(dataWithImage);
      dispatch(registerUser(response));
      toast.success(`Updated ${response.name}`);
      navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as IError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="success" onPress={onOpen}>
        Update
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update User
              </ModalHeader>
              <ModalBody>
                <div className="space-y-5">
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

                      <p className="text-red-500 text-sm">
                        {errors.image?.message}
                      </p>
                    </div>
                    <div className="space-y-[0.7]">
                      <Input
                        color={errors.name?.message ? 'danger' : 'default'}
                        {...register('name')}
                        type="text"
                        label="Name"
                      />
                      <p className="text-red-500 text-sm">
                        {errors.name?.message}
                      </p>
                    </div>
                    <div className="space-y-[0.7]">
                      <Input
                        color={errors.email?.message ? 'danger' : 'default'}
                        {...register('email')}
                        type="text"
                        label="Email"
                      />
                      <p className="text-red-500 text-sm">
                        {errors.email?.message}
                      </p>
                    </div>
                    <div className="space-y-[0.7]">
                      <Input
                        color={errors.password?.message ? 'danger' : 'default'}
                        {...register('password')}
                        type="password"
                        label="Password"
                      />
                      <p className="text-red-500 text-sm">
                        {errors.password?.message}
                      </p>
                    </div>
                    <div className="space-y-[0.7]">
                      <Input
                        color={errors.password2?.message ? 'danger' : 'default'}
                        {...register('password2')}
                        type="password"
                        label="Confirm Password"
                      />
                      <p className="text-red-500 text-sm">
                        {errors.password2?.message}
                      </p>
                    </div>
                    <Button
                      className="w-52 mx-auto"
                      size="lg"
                      type="submit"
                      color="primary"
                      disabled={isLoading}
                      isLoading={isLoading}
                    >
                      Register
                    </Button>
                  </form>
                  <p className="text-center">
                    Already have an account?{' '}
                    <Link
                      className="text-blue-500 hover:text-blue-800"
                      to="/login"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
