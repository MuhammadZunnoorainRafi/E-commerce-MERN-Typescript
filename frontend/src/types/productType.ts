import { TProductSize } from '../components/admin/CreateAndEditForm';

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
  colorId: string;
  categoryId: string;
  category: { name: string };
  color: { name: string };
  images: { url: string }[];
  createdAt: string;
  updatedAt: string;
};

export type ProductTData = {
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
  isShown?: boolean;
};
