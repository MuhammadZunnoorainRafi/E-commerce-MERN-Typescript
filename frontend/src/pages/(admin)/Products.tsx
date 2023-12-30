import { Button, Divider, Spinner } from '@nextui-org/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DeleteTableActions from '../../components/modals/deleteTableActions';
import { useGetProductQuery } from '../../hooks/productReactQueryHooks';
import { TProduct } from '../../types/productType';
import { storeId } from '../../utils/getStore';
import { FiEdit } from 'react-icons/fi';

function Products() {
  const { isLoading, data } = useGetProductQuery();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Products</h1>
          <p className="text-slate-600 text-sm">
            Manage products for your store
          </p>
        </div>
        <Link to={`/admin/${storeId}/products/create`}>
          <Button color="primary">+ Add New</Button>
        </Link>
      </div>
      <Divider className="my-5" />

      {/* Table */}
      <div className=" p-4 shadow-lg rounded-lg border border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-slate-100 text-slate-700 ">
              <th className="p-2 rounded-l-lg">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2 ">Color</th>
              <th className="p-2 ">Date</th>
              <th className="p-2 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr className=" text-center">
                <td></td>
                <td></td>
                <td className="py-5">
                  <Spinner />
                </td>
                <td></td>
                <td></td>
              </tr>
            ) : !data || data.length === 0 ? (
              <tr>
                <td></td>
                <td></td>
                <td className="text-center">
                  <p className="my-10 text-slate-600 font-bold text-xl font-mono tracking-widest">
                    {' '}
                    No Data Yet!
                  </p>
                </td>
                <td></td>
              </tr>
            ) : (
              data.map((val: TProduct) => {
                return (
                  <tr key={val.id} className="hover:bg-default-100">
                    <td className="p-1 flex gap-2 items-center">
                      <div>
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={val.images[0].url}
                          alt="image error"
                        />
                      </div>
                      <p>{val.name}</p>
                    </td>
                    <td className="p-1">{val.category.name}</td>
                    <td className="p-1">{val.color.name}</td>
                    <td className="p-1">{moment(val.createdAt).format('L')}</td>
                    <td className="pl-4 pt-1 ">
                      <div className="flex items-center justify-start gap-1">
                        <DeleteTableActions id={val.id} type="product" />
                        <Link
                          className="hover:text-cyan-600"
                          to={`/admin/${storeId}/products/${val.slug}/edit`}
                        >
                          <FiEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
