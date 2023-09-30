import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { storeId } from '../../utils/getStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateProductButtonModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const productSchema = z.object({
    name: z
      .string()
      .nonempty('Enter Name')
      .min(3, 'Product must be above 2 characters '),
  });

  type TData = z.infer<typeof productSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TData>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(productSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: TData) => {
      const res = await axios.post(`/api/admin/${storeId}/product`, data);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      reset();
      onClose();
    },
  });

  const formSubmit = async (data: TData) => {
    mutate(data);
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
                Create Product
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
