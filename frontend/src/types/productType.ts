import { TProductSize } from '../components/admin/createAndEditForm';

export type TProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  size: TProductSize;
  price: number;
  stock: number;
  rating: string;
  isShown: boolean;
  category: { name: string };
  color: { name: string };
  images: { url: string }[];
  createdAt: string;
  updatedAt: string;
};
