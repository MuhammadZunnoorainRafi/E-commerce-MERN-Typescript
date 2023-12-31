import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Image,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetCategoryQueryHook } from '../../hooks/categoryReactQueryHooks';
import { useGetColorQueryHook } from '../../hooks/colorReactQueryHooks';
import { productEditSchema, productSchema } from '../../schemas/productSchema';
import { ProductTData, TProduct } from '../../types/productType';
import { errorHandler, type IError } from '../../utils/errorHandler';
import { storeId } from '../../utils/getStore';
import { uploadImageCloudinary } from '../../utils/uploadImageCloudinary';

import {
  useCreateProductQuery,
  useUpdateProductQuery,
} from '../../hooks/productReactQueryHooks';

export type TProductSize = {
  label: string;
}[];

function CreateAndEditForm({ product }: { product?: TProduct }) {
  const navigate = useNavigate();
  const { data: category } = useGetCategoryQueryHook();
  const { data: color } = useGetColorQueryHook();
  const [message, setMessage] = useState('');
  const [productSize, setProductSize] = useState<TProductSize | []>(
    product?.size ? product.size.map((val) => ({ label: val.label })) : []
  );
  const [sizeField, setSizeField] = useState({
    label: '',
  });

  const existingImg = product?.images?.map((val) => ({ url: val.url }));
  const [allImages, setAllImages] = useState(existingImg || []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,

    reset,
  } = useForm<ProductTData>({
    defaultValues: {
      colorId: product?.colorId,
      categoryId: product?.categoryId,
      sizes: product?.size.map((val) => ({ label: val.label })),
      image: existingImg || [],
      isShown: product?.isShown,
    },
    resolver: zodResolver(product ? productEditSchema : productSchema),
  });
  const {
    mutateAsync: productCreateMutateAsync,
    isLoading: prodCreateLoading,
  } = useCreateProductQuery();
  const {
    mutateAsync: productUpdateMutateAsync,
    isLoading: prodUpdateLoading,
  } = useUpdateProductQuery();
  // const prodCreateLoading =
  //   prodCreateStatus !== 'error' && prodCreateStatus !== 'idle';
  // const productUpdateStatus =
  //   prodUpdateStatus !== 'error' && prodUpdateStatus !== 'idle';

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

  const inputImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    // if (!existingImg || ( existingImg && image.length > 0 && !image[0].url)) {
    if (image) {
      for (let i = 0; i < image.length; i++) {
        const multipleImages = await uploadImageCloudinary(image[i]);
        setAllImages((prev) => [...prev, multipleImages]);
      }
    }
    // }
  };
  const formSubmit = async ({
    name,
    price,
    colorId,
    description,
    image,
    stock,
    categoryId,
    isShown,
  }: ProductTData) => {
    // const arr = existingImg || [];
    if (image.length > 3) {
      toast.error('Maximum image chosen limit is 3');
      return;
    }
    // if (!existingImg || (existingImg && image.length > 0 && !image[0].url)) {
    //   setIsLoading(true);
    //   for (let i = 0; i < image.length; i++) {
    //     const multipleImages = await uploadImageCloudinary(image[i]);
    //     arr.push(multipleImages);
    //     setIsLoading(false);
    //   }
    // }

    try {
      if (product) {
        await productUpdateMutateAsync({
          id: product.id,
          name,
          stock,
          price,
          colorId,
          description,
          image: allImages,
          categoryId,
          sizes: productSize,
          isShown,
        });

        toast.success('Product Updated');
      } else {
        await productCreateMutateAsync({
          name,
          stock,
          price,
          colorId,
          description,
          image: allImages,
          categoryId,
          sizes: productSize,
        });
        toast.success('Product Created');
      }

      setProductSize([]);
      navigate(`/admin/${storeId}/products`);
      reset();
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };
  return (
    <div>
      <form
        className="space-y-4 max-w-xl mx-auto"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex items-center justify-center gap-2">
          {allImages.length > 0 &&
            allImages.map((val, ind) => {
              return (
                <div
                  key={ind}
                  className="group relative   overflow-hidden rounded-md"
                >
                  <Image className=" object-cover h-44 w-32" src={val.url} />
                  <div className=" absolute z-10 text-red-500 top-0 right-0  hidden group-hover:block">
                    <Button
                      variant="faded"
                      isIconOnly
                      className="m-1"
                      color="danger"
                      size="sm"
                      onClick={() =>
                        setAllImages(
                          allImages.filter((item) => item.url !== val.url)
                        )
                      }
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="space-y-[0.7]">
          <input
            id="file-input"
            multiple={true}
            placeholder="Enter your Image"
            {...register('image')}
            type="file"
            accept="image/*"
            onChange={inputImageUpload}
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
        {product && (
          <div className="space-y-[0.7]">
            <Controller
              name="isShown"
              control={control}
              render={({ field }) => (
                <Checkbox
                  defaultValue={product.isShown}
                  defaultSelected={product.isShown}
                  onValueChange={field.onChange}
                >
                  Product is in Stock
                </Checkbox>
              )}
            />
          </div>
        )}

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
              defaultSelectedKeys={product ? [product.colorId] : []}
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
          isLoading={prodCreateLoading || prodUpdateLoading}
          isDisabled={prodCreateLoading || prodUpdateLoading}
        >
          {product ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  );
}

export default CreateAndEditForm;
