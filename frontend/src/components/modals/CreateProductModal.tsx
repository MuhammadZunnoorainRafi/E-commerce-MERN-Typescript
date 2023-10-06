import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { storeId } from '../../utils/getStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/RTKHooks';
import { fromZodError } from 'zod-validation-error';
import { uploadImageCloudinary } from '../../utils/uploadImageCloudinary';
import { useState } from 'react';

export default function CreateProductButtonModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { category } = useAppSelector((state) => state.categoryReducer);
  const { size } = useAppSelector((state) => state.sizeReducer);
  const { color } = useAppSelector((state) => state.colorReducer);

  const productSchema = z.object({
    image: z.any().refine((val) => val?.length > 0, 'Select Images'),
    name: z.string().nonempty('Enter Name'),
    // description: z.string().nonempty('Enter description'),
    // price: z
    //   .number({
    //     invalid_type_error: 'Enter price ',
    //   })
    //   .nonnegative('Enter positive number'),
    // stock: z.number({
    //   invalid_type_error: 'Enter stock',
    // }),

    // categoryId: z.string().nonempty('Select Category'),
    // sizeId: z.string().nonempty('Select Size'),
    // colorId: z.string().nonempty('Select Color'),
  });

  type TData = {
    name: string;
    image: {
      url: string;
    }[];
  };

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
  const formSubmit = async ({ name, image }: TData) => {
    const arr = [];
    for (let i = 0; i < image.length; i++) {
      const multipleImages = await uploadImageCloudinary(image[i]);
      arr.push(multipleImages);
    }

    mutate({
      name,
      image: arr,
    });
    // mutate(data);
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
                <form className="space-y-2" onSubmit={handleSubmit(formSubmit)}>
                  <div className="space-y-[0.7]">
                    <Input
                      color={errors.image?.message ? 'danger' : 'default'}
                      multiple={true}
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
                      size="sm"
                      color={`${errors.name?.message ? 'danger' : 'default'}`}
                      label="Name"
                      {...register('name')}
                    />
                    <p className="text-sm text-red-500">
                      {errors.name?.message}
                    </p>
                  </div>
                  {/* <div className="space-y-[0.7]">
                    <Select
                      {...register('categoryId')}
                      color={errors.categoryId?.message ? 'danger' : 'default'}
                      label="Select a category"
                      className="max-w-xs"
                    >
                      {category.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <p className="text-sm text-red-500">
                      {errors.categoryId?.message}
                    </p>
                  </div>
                  <div className="space-y-[0.7]">
                    <Select
                      label="Select a size"
                      color={errors.sizeId?.message ? 'danger' : 'default'}
                      {...register('sizeId')}
                      className="max-w-xs"
                    >
                      {size.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <p className="text-sm text-red-500">
                      {errors.sizeId?.message}
                    </p>
                  </div>
                  <div className="space-y-[0.7]">
                    <Select
                      color={errors.colorId?.message ? 'danger' : 'default'}
                      label="Select a color"
                      {...register('colorId')}
                      className="max-w-xs"
                    >
                      {color.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <p className="text-sm text-red-500">
                      {errors.colorId?.message}
                    </p>
                  </div> */}
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
