import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductTData } from '../types/productType';
import { useAppSelector } from './RTKHooks';
import axios from 'axios';
import { storeId } from '../utils/getStore';

export const useGetProductQuery = () => {
  return useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/${storeId}/product`);
      return res.data;
    },
  });
};

export const useDeleteProductQuery = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((store) => store.authReducer);
  return useMutation({
    mutationFn: async (id: string) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user!.token}`,
        },
        data: {
          id,
        },
      };
      await axios.delete(`/api/admin/${storeId}/product`, config);
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};

export const useCreateProductQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  return useMutation({
    mutationFn: async (data: ProductTData) => {
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
      return res.data;
    },
  });
};

export const useUpdateProductQuery = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  return useMutation({
    mutationFn: async (data: ProductTData) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user!.token}`,
        },
      };
      const res = await axios.patch(
        `/api/admin/${storeId}/product`,
        data,
        config
      );
      return res.data;
    },
  });
};
