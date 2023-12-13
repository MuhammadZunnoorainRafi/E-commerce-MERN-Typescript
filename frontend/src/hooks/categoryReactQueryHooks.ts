import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TData } from '../components/modals/CreateCategoryModal';
import { storeId } from '../utils/getStore';
import { TCategory } from '../types/categoryType';

export const useGetCategoryQueryHook = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<TCategory> => {
      const res = await axios.get(`/api/admin/${storeId}/category`);
      return res.data;
    },
  });
};

export const useDeleteCategoryQueryHook = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const config = {
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/admin/${storeId}/category`, config);
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });
};

export const usePostCategoryQueryHook = (token: string) => {
  return useMutation({
    mutationFn: async (data: TData) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `/api/admin/${storeId}/category`,
        data,
        config
      );
      return res.data;
    },
    // onSuccess() {
    //   queryClient.invalidateQueries({ queryKey: ['category'] });
    //   reset();
    //   onClose();
    // },
  });
};
