import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadImageCloudinary } from '../../utils/uploadImageCloudinary';
import { useForm } from 'react-hook-form';
import { storeId } from '../../utils/getStore';
import { useState } from 'react';
import { type IError, errorHandler } from '../../utils/errorHandler';
import { toast } from 'sonner';
import { ProductTData, TProduct } from '../../types/productType';
import { useNavigate } from 'react-router-dom';
import { useGetCategoryQueryHook } from '../../hooks/categoryReactQueryHooks';
import { useGetColorQueryHook } from '../../hooks/colorReactQueryHooks';
import { productSchema } from '../../schemas/productSchema';
import {
  useCreateProductQuery,
  useUpdateProductQuery,
} from '../../hooks/productReactQueryHooks';

export type TProductSize = {
  label: string;
}[];

function CreateAndEditForm({ product }: { product?: TProduct }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: category } = useGetCategoryQueryHook();
  const { data: color } = useGetColorQueryHook();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [productSize, setProductSize] = useState<TProductSize | []>(
    product?.size ? product.size : []
  );

  const [sizeField, setSizeField] = useState({
    label: '',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<ProductTData>({
    defaultValues: {
      sizes: product
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (product.size[product.size.length - 1].label as any)
        : '',
    },
    resolver: zodResolver(productSchema),
  });

  console.log(getValues('image'));

  const { mutateAsync: productCreateMutateAsync } = useCreateProductQuery();
  const { mutateAsync: productUpdateMutateAsync } = useUpdateProductQuery();

  const sizeButtonSubmit = (sizeFieldData: { label: string }) => {
    if (sizeField.label === '') {
      setMessage('Enter Sizes');
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
  }: ProductTData) => {
    setIsLoading(true);
    const arr = [];
    for (let i = 0; i < image.length; i++) {
      const multipleImages = await uploadImageCloudinary(image[i]);
      arr.push(multipleImages);
    }
    console.log(image, 'imageAWEWQE');

    try {
      setIsLoading(true);
      if (product) {
        await productUpdateMutateAsync({
          name,
          stock,
          price,
          colorId,
          description,
          image: arr,
          categoryId,
          sizes: productSize,
        });
      } else {
        await productCreateMutateAsync({
          name,
          stock,
          price,
          colorId,
          description,
          image: arr,
          categoryId,
          sizes: productSize,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success('Product Created');
      setProductSize([]);
      navigate(`/admin/${storeId}/products`);
      reset();
    } catch (error) {
      toast.error(errorHandler(error as IError));
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form
        className="space-y-4 max-w-xl mx-auto"
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
            defaultValue={product?.name}
            size="sm"
            color={`${errors.name?.message ? 'danger' : 'default'}`}
            label="Name"
            {...register('name')}
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="space-y-[0.7]">
          <Input
            defaultValue={product?.description}
            size="sm"
            color={`${errors.description?.message ? 'danger' : 'default'}`}
            label="Description"
            {...register('description')}
          />
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        </div>
        <div className="flex  items-center justify-center gap-4">
          <div className="space-y-[0.7] flex-1">
            <Input
              defaultValue={product?.stock.toString()}
              size="sm"
              color={`${errors.stock?.message ? 'danger' : 'default'}`}
              label="Stock"
              {...register('stock', {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-red-500">{errors.stock?.message}</p>
          </div>
          <div className="space-y-[0.7] flex-1">
            <Input
              defaultValue={product?.price.toString()}
              size="sm"
              color={`${errors.price?.message ? 'danger' : 'default'}`}
              label="Price"
              {...register('price', {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-red-500">{errors.price?.message}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="space-y-[0.7] flex-1">
            <Select
              {...register('colorId')}
              size="sm"
              defaultSelectedKeys={product ? [product?.colorId] : []}
              color={errors.colorId?.message ? 'danger' : 'default'}
              label="Select a Color"
            >
              {!color || color.length === 0 ? (
                <SelectItem key={''}>No data yet</SelectItem>
              ) : (
                color.map((color) => (
                  <SelectItem key={color.id} value={color.id}>
                    {color.name}
                  </SelectItem>
                ))
              )}
            </Select>
            <p className="text-sm text-red-500">{errors.colorId?.message}</p>
          </div>
          <div className="space-y-[0.7] flex-1">
            <Select
              {...register('categoryId')}
              size="sm"
              defaultSelectedKeys={product ? [product?.categoryId] : []}
              color={errors.categoryId?.message ? 'danger' : 'default'}
              label="Select a category"
            >
              {!category || category.length === 0 ? (
                <SelectItem key={''}>No data yet</SelectItem>
              ) : (
                category.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </Select>
            <p className="text-sm text-red-500">{errors.categoryId?.message}</p>
          </div>
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

export default CreateAndEditForm;
