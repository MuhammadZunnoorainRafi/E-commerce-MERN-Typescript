import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppSelector } from '../../hooks/RTKHooks';
import { usePostCategoryQueryHook } from '../../hooks/categoryReactQueryHooks';
import { toast } from 'sonner';
import { type IError, errorHandler } from '../../utils/errorHandler';
import { categorySchema } from '../../schemas/categorySchema';

export type TData = z.infer<typeof categorySchema>;
export default function CreateCategoryButtonModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user } = useAppSelector((state) => state.authReducer);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TData>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(categorySchema),
  });

  const { mutateAsync, isLoading } = usePostCategoryQueryHook(user!.token);

  const formSubmit = async (data: TData) => {
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ['category'] });
      reset();
      onClose();
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        + Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Category
              </ModalHeader>
              <ModalBody className="pb-3">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="py-2 space-y-1">
                    <Input
                      size="sm"
                      color={`${errors.name?.message ? 'danger' : 'default'}`}
                      label="Name"
                      {...register('name')}
                    />
                    <p className="text-sm text-red-500">
                      {errors.name?.message}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  >
                    Create
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
