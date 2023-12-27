import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface IRegData {
  id?: string;
  name: string;
  email: string;
  password: string;
  image: string;
}
interface ILogData {
  email: string;
  password: string;
}

export const useRegQueryHook = () => {
  return useMutation({
    mutationFn: async (data: IRegData) => {
      const res = await axios.post('/api/auth/reg', data);
      return res.data;
    },
  });
};

export const useLogQueryHook = () => {
  return useMutation({
    mutationFn: async (data: ILogData) => {
      const res = await axios.post('/api/auth/log', data);
      return res.data;
    },
  });
};

export const useUpdQueryHook = (token: string) => {
  return useMutation({
    mutationFn: async (data: IRegData) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post('/api/auth/upd', data, config);
      return res.data;
    },
  });
};

export const useDelUserQueryHook = (token: string) => {
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
      const res = await axios.delete('/api/auth/del', config);
      return res.data;
    },
  });
};
