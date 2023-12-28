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
import { usePostColorQueryHook } from '../../hooks/colorReactQueryHooks';
import { errorHandler, type IError } from '../../utils/errorHandler';

const colorSchema = z.object({
  name: z
    .string()
    .nonempty('Enter Name')
    .min(3, 'Color must be above 2 characters '),
});
export type TData = z.infer<typeof colorSchema>;
type Props = {
  action?: string;
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
        {action}
      </Button>
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
                    isLoading={isLoading}
                    isDisabled={isLoading}
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
