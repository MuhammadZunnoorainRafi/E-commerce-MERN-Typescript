import { Divider, Spinner } from '@nextui-org/react';
import { MdDeleteOutline } from 'react-icons/md';
import { storeId } from '../../utils/getStore';
import moment from 'moment';

import { useAppSelector } from '../../hooks/RTKHooks';
import CreateCategoryButtonModal from '../../components/modals/CreateCategoryModal';
import {
  useDeleteCategoryQueryHook,
  useGetCategoryQueryHook,
} from '../../hooks/categoryReactQueryHooks';

interface IRows {
  id: string;
  name: string;
  createdAt: string;
}

function Categories() {
  const { user } = useAppSelector((state) => state.authReducer);
  const { isLoading, data } = useGetCategoryQueryHook(storeId);

  const { mutate, isLoading: delSLoading } = useDeleteCategoryQueryHook(
    storeId,
    user!.token
  );
  const handleDelete = async (id: string) => {
    mutate(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Categories</h1>
          <p className="text-slate-600 text-sm">
            Manage categories for your store
          </p>
        </div>
        <CreateCategoryButtonModal />
      </div>
      <Divider className="my-5" />

      {/* Table */}
      <div className=" p-4 shadow-lg rounded-lg border border-slate-200">
        <table
          className={`w-full ${delSLoading ? 'cursor-wait' : 'cursor-default'}`}
        >
          <thead>
            <tr className="text-left bg-slate-100 text-slate-700 ">
              <th className="p-2 rounded-l-lg">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className=" text-center">
                <td></td>
                <td className="py-5">
                  <Spinner />
                </td>
                <td></td>
              </tr>
            ) : (
              data.map((val: IRows) => {
                return (
                  <tr key={val.id}>
                    <td className="p-1">{val.name}</td>
                    <td className="p-1">{moment(val.createdAt).format('L')}</td>
                    <td className=" pl-6 pt-1">
                      <button
                        onClick={() => handleDelete(val.id)}
                        className={`hover:text-red-500 transition-colors ${
                          delSLoading ? 'cursor-wait' : 'cursor-pointer'
                        }`}
                      >
                        <MdDeleteOutline />
                      </button>
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

export default Categories;
