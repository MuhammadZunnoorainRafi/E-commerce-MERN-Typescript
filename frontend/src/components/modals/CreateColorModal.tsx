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
import { FiEdit } from 'react-icons/fi';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAppSelector } from '../../hooks/RTKHooks';
import {
  usePostColorQueryHook,
  useUpdateColorQueryHook,
} from '../../hooks/colorReactQueryHooks';
import { errorHandler, type IError } from '../../utils/errorHandler';
import { colorSchema } from '../../schemas/colorSchema';

export type TData = z.infer<typeof colorSchema>;
type Props = {
  action?: 'Edit' | '+ Add New';
  colorData?: { name: string; id: string };
};
export default function CreateColorButtonModal({
  action = '+ Add New',
  colorData,
}: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.authReducer);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TData>({
    resolver: zodResolver(colorSchema),
  });

  const { mutateAsync, isLoading } = usePostColorQueryHook(user!.token);
  const { mutateAsync: editMutateAsync, isLoading: editIsLoading } =
    useUpdateColorQueryHook(user!.token);

  const formSubmit = async (data: TData) => {
    try {
      if (colorData) {
        await editMutateAsync({ name: data.name, colorId: colorData.id });
      } else {
        await mutateAsync(data);
      }
      queryClient.invalidateQueries({ queryKey: ['color'] });
      reset();
      onClose();
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <>
      {action === 'Edit' ? (
        <button
          className="hover:text-cyan-600 transition-colors"
          onClick={onOpen}
        >
          <FiEdit />
        </button>
      ) : (
        <Button color="primary" onPress={onOpen}>
          + Add New
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action} Color
              </ModalHeader>
              <ModalBody className="pb-3">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="py-2 space-y-1">
                    <Input
                      defaultValue={colorData?.name}
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
    </>
  );
}
