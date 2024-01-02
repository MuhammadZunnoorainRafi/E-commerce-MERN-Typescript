import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { storeId } from '../utils/getStore';
import { TColor } from '../types/colorType';
import { TData } from '../components/modals/CreateColorModal';

export const useGetColorQueryHook = () => {
  return useQuery({
    queryKey: ['color'],
    queryFn: async (): Promise<TColor> => {
      const res = await axios.get(`/api/admin/${storeId}/color`);
      return res.data;
    },
  });
};

export const useDeleteColorQueryHook = (token: string) => {
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
      await axios.delete(`/api/admin/${storeId}/color`, config);
      queryClient.invalidateQueries({ queryKey: ['color'] });
    },
  });
};

export const usePostColorQueryHook = (token: string) => {
  return useMutation({
    mutationFn: async (data: TData) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`/api/admin/${storeId}/color`, data, config);
      return res.data;
    },
  });
};
export const useUpdateColorQueryHook = (token: string) => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      colorId: string;
      hexCode: string;
    }) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(`/api/admin/${storeId}/color`, data, config);
      return res.data;
    },
  });
};
