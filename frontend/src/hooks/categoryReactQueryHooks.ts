import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TData } from '../components/modals/CreateCategoryModal';

export const useGetCategoryQueryHook = (storeId: string) => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/${storeId}/category`);
      return res.data;
    },
  });
};

export const useDeleteCategoryQueryHook = (storeId: string, token: string) => {
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

export const usePostCategoryQueryHook = (storeId: string, token: string) => {
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
