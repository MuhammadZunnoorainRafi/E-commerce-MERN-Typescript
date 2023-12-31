import { useParams } from 'react-router-dom';
import CreateAndEditForm from '../../components/admin/CreateAndEditForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { storeId } from '../../utils/getStore';
import { Spinner } from '@nextui-org/react';

function EditProduct() {
  const params = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', params.productId],
    queryFn: async () => {
      const res = await axios.get(
        `/api/admin/${storeId}/product/${params.productId}`
      );

      return res.data;
    },
    refetchOnMount: 'always',
  });

  if (isError) {
    return (
      <p className="text-center py-24 font-semibold text-slate-700">
        No Product Found
      </p>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-5">Edit Product</h1>
      {isLoading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <CreateAndEditForm product={data} />
      )}
    </div>
  );
}

export default EditProduct;
