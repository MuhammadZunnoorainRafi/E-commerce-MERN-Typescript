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
import { toast } from 'sonner';
import { z } from 'zod';
import { useAppSelector } from '../../hooks/RTKHooks';
import {
  usePostCategoryQueryHook,
  useUpdateCategoryQueryHook,
} from '../../hooks/categoryReactQueryHooks';
import { categorySchema } from '../../schemas/categorySchema';
import { errorHandler, type IError } from '../../utils/errorHandler';

export type TData = z.infer<typeof categorySchema>;
type Props = {
  action?: string;
  categoryData?: { name: string; id: string };
};
export default function CreateCategoryButtonModal({
  action = '+ Add New',
  categoryData,
}: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user } = useAppSelector((state) => state.authReducer);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TData>({
    // defaultValues: {
    //   name: categoryData?.name || '',
    // },
    resolver: zodResolver(categorySchema),
  });

  const { mutateAsync, isLoading } = usePostCategoryQueryHook(user!.token);
  const { mutateAsync: editMutateAsync, isLoading: editIsLoading } =
    useUpdateCategoryQueryHook(user!.token);

  const formSubmit = async (data: TData) => {
    try {
      if (categoryData) {
        await editMutateAsync({ name: data.name, categoryId: categoryData.id });
      } else {
        await mutateAsync(data);
      }
      queryClient.invalidateQueries({ queryKey: ['category'] });
      reset();
      onClose();
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <div>
      {action === 'Edit' ? (
        <button className=" inline-block w-full text-left" onClick={onOpen}>
          {action}
        </button>
      ) : (
        <Button color="primary" onPress={onOpen}>
          {action}
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action} Category
              </ModalHeader>
              <ModalBody className="pb-3">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="py-2 space-y-1">
                    <Input
                      defaultValue={categoryData?.name}
                      labelPlacement="outside"
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
                    isLoading={isLoading || editIsLoading}
                    isDisabled={isLoading || editIsLoading}
                  >
                    {action}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
