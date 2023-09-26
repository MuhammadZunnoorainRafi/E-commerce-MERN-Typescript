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

export const useUpdQueryHook = () => {
  return useMutation({
    mutationFn: async (data: IRegData) => {
      const res = await axios.post('/api/auth/upd', data);
      return res.data;
    },
  });
};
