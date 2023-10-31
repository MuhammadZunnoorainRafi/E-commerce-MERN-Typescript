import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useAppSelector } from '../../hooks/RTKHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { uploadImageCloudinary } from '../../utils/uploadImageCloudinary';
import { useForm } from 'react-hook-form';
import { storeId } from '../../utils/getStore';
import { useState } from 'react';
import { type IError, errorHandler } from '../../utils/errorHandler';
import { toast } from 'sonner';

type TData = {
  name: string;
  image: {
    url: string;
  }[];
  description: string;
  price: number;
  categoryId: string;
  colorId: string;
  stock: number;
  sizes: {
    label: string;
  }[];
};

type TProductSize = {
  label: string;
}[];

const productSchema = z.object({
  image: z.any().refine((val) => val?.length > 0, 'Select Images'),
  name: z.string().nonempty('Enter Name'),
  description: z.string().nonempty('Enter description'),
  stock: z
    .number({
      invalid_type_error: 'Enter stock',
    })
    .nonnegative('Enter positive number'),
  price: z
    .number({
      invalid_type_error: 'Enter Price ',
    })
    .nonnegative('Enter positive number'),

  categoryId: z.string().nonempty('Select Category'),
  // sizeId: z.string().nonempty('Select Size'),
  colorId: z.string().nonempty('Select Color'),
  sizes: z.any().refine((val) => val.length > 0, 'Select Sizes'),
});

function CreateProduct() {
  const { user } = useAppSelector((state) => state.authReducer);

  const queryClient = useQueryClient();
  const { category } = useAppSelector((state) => state.categoryReducer);
  const { color } = useAppSelector((state) => state.colorReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [productSize, setProductSize] = useState<TProductSize | []>([]);
  const [sizeField, setSizeField] = useState({
    label: '',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TData>({
    resolver: zodResolver(productSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: TData) => {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user!.token}`,
        },
      };
      const res = await axios.post(
        `/api/admin/${storeId}/product`,
        data,
        config
      );
      setIsLoading(false);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success('Product Created');
      setProductSize([]);
      reset();
    },
    onError(error) {
      toast.error(errorHandler(error as IError));
    },
  });

  const sizeButtonSubmit = (sizeFieldData: { label: string }) => {
    if (sizeField.label === '') {
      setMessage('Select Size');
    } else if (sizeField.label !== '') {
      setProductSize([...productSize, sizeFieldData]);
      setSizeField({ label: '' });
      setMessage('');
    }
  };

  const deleteSize = (label: string) => {
    setProductSize(productSize.filter((val) => val.label !== label));
  };

  const formSubmit = async ({
    name,
    price,
    colorId,
    description,
    image,
    stock,
    categoryId,
  }: TData) => {
    setIsLoading(true);
    const arr = [];
    for (let i = 0; i < image.length; i++) {
      const multipleImages = await uploadImageCloudinary(image[i]);
      arr.push(multipleImages);
    }
    mutate({
      name,
      stock,
      price,
      colorId,
      description,
      image: arr,
      categoryId,
      sizes: productSize,
    });

    setIsLoading(false);
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
            accept="image/*"
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
          <Input
            size="sm"
            color={`${errors.description?.message ? 'danger' : 'default'}`}
            label="Description"
            {...register('description')}
          />
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <Input
            size="sm"
            color={`${errors.stock?.message ? 'danger' : 'default'}`}
            label="Stock"
            {...register('stock', {
              valueAsNumber: true,
            })}
          />
          <p className="text-sm text-red-500">{errors.stock?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <Input
            size="sm"
            color={`${errors.price?.message ? 'danger' : 'default'}`}
            label="Price"
            {...register('price', {
              valueAsNumber: true,
            })}
          />
          <p className="text-sm text-red-500">{errors.price?.message}</p>
        </div>

        <div className="space-y-[0.7]">
          <Select
            {...register('colorId')}
            size="sm"
            color={errors.colorId?.message ? 'danger' : 'default'}
            label="Select a Color"
          >
            {color.map((color) => (
              <SelectItem key={color.id} value={color.id}>
                {color.name}
              </SelectItem>
            ))}
          </Select>
          <p className="text-sm text-red-500">{errors.colorId?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <div className="flex space-x-1 mb-2 items-center justify-center">
            <div className="flex-1">
              <Input
                {...register('sizes')}
                value={sizeField.label}
                color={errors.categoryId?.message ? 'danger' : 'default'}
                size="sm"
                label="Size"
                onChange={(e) =>
                  setSizeField({ label: e.target.value.toUpperCase() })
                }
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
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <div className="flex items-center space-x-2">
            {productSize.map((val) => (
              <div className="rounded-lg px-1 bg-default-300" key={val.label}>
                <div className="group flex space-x-2  items-center">
                  <p>{val.label}</p>
                  <button
                    onClick={() => deleteSize(val.label)}
                    className="group-hover:block text-red-500 hidden"
                  >
                    x
                  </button>
                </div>
              </div>
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
