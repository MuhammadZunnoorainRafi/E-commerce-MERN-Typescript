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
import { SketchPicker } from 'react-color';
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
import { useState } from 'react';

export type TData = z.infer<typeof colorSchema>;
type Props = {
  action?: 'Edit' | '+ Add New';
  colorData?: { name: string; id: string; hexCode: string };
};
export default function CreateColorButtonModal({
  action = '+ Add New',
  colorData,
}: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.authReducer);
  const [currentColor, setCurrentColor] = useState('#C66666');

  const handleChange = (color: { hex: string }) => {
    setCurrentColor(color.hex);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TData>({
    defaultValues: {
      name: '',
      hexCode: '',
    },
    resolver: zodResolver(colorSchema),
  });

  const { mutateAsync, isLoading } = usePostColorQueryHook(user!.token);
  const { mutateAsync: editMutateAsync, isLoading: editIsLoading } =
    useUpdateColorQueryHook(user!.token);
  console.log(currentColor);
  const formSubmit = async (data: TData) => {
    try {
      if (colorData) {
        await editMutateAsync({
          name: data.name,
          colorId: colorData.id,
          hexCode: data.hexCode,
        });
      } else {
        await mutateAsync(data);
      }
      queryClient.invalidateQueries({ queryKey: ['color'] });
      reset({ name: '', hexCode: '' });
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
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 space-y-1">
                        <Input
                          defaultValue={colorData?.name}
                          size="sm"
                          color={`${
                            errors.name?.message ? 'danger' : 'default'
                          }`}
                          label="Name"
                          {...register('name')}
                        />
                        <p className="text-sm  text-red-500">
                          {errors.name?.message}
                        </p>
                        <Input
                          defaultValue={colorData?.hexCode}
                          value={colorData ? colorData.hexCode : currentColor}
                          size="sm"
                          color={`${
                            errors.hexCode?.message ? 'danger' : 'default'
                          }`}
                          label="Name"
                          {...register('hexCode')}
                        />
                        <p className="text-sm  text-red-500">
                          {errors.hexCode?.message}
                        </p>
                      </div>
                      <SketchPicker
                        className="flex-1"
                        color={currentColor}
                        onChangeComplete={handleChange}
                      />
                    </div>
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
