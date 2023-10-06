import { Button, Chip, Input, Select, SelectItem } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useAppSelector } from '../../hooks/RTKHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { uploadImageCloudinary } from '../../utils/uploadImageCloudinary';
import { useForm } from 'react-hook-form';
import { storeId } from '../../utils/getStore';
import { useState } from 'react';
const sizes = [
  {
    id: 1,
    label: 'S',
  },
  {
    id: 2,
    label: 'M',
  },
  {
    id: 3,
    label: 'L',
  },
  {
    id: 4,
    label: 'XL',
  },
];

function CreateProduct() {
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

    categoryId: z.string().nonempty('Select Category'),
    // sizeId: z.string().nonempty('Select Size'),
    sizes: z.any().refine((val) => val.length > 0, 'Select sizes'),
  });

  type TData = {
    name: string;
    image: {
      url: string;
    }[];
    categoryId: string;
    sizes: string;
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
    },
  });

  const [productSize, setProductSize] = useState([{ label: '' }]);
  const [sizeField, setSizeField] = useState({
    label: '',
  });
  const sizeButtonSubmit = (sizeFieldData: { label: string }) => {
    setProductSize([sizeFieldData, ...productSize]);
  };

  const formSubmit = async ({ name, sizes, image, categoryId }: TData) => {
    const arr = [];
    for (let i = 0; i < image.length; i++) {
      const multipleImages = await uploadImageCloudinary(image[i]);
      arr.push(multipleImages);
    }

    mutate({
      name,
      image: arr,
      categoryId,
      sizes,
    });
    // mutate(data);
  };
  return (
    <div>
      <form
        className="space-y-2 max-w-xl mx-auto"
        onSubmit={handleSubmit(formSubmit)}
      >
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

          <p className="text-red-500 text-sm">{errors.image?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <Input
            size="sm"
            color={`${errors.name?.message ? 'danger' : 'default'}`}
            label="Name"
            {...register('name')}
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <div
            {...register('sizes')}
            className="flex space-x-1 items-center justify-center"
          >
            <div className="flex-1">
              <Input
                value={sizeField.label}
                size="sm"
                label="Size"
                onChange={(e) => setSizeField({ label: e.target.value })}
              />
              <p className="text-sm text-red-500">{errors.sizes?.message}</p>
            </div>
            <Button
              onClick={() => sizeButtonSubmit(sizeField)}
              size="sm"
              color="default"
            >
              Add
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {productSize.map((val) => (
              <p key={val.label} className="px-1 rounded-lg bg-gray-300">
                {val.label}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-[0.7]">
          <Select
            {...register('categoryId')}
            size="sm"
            color={errors.categoryId?.message ? 'danger' : 'default'}
            label="Select a category"
          >
            {category.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
          <p className="text-sm text-red-500">{errors.categoryId?.message}</p>
        </div>

        {/*
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
    </div>
  );
}

export default CreateProduct;
