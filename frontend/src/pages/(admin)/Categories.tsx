import { Divider, Spinner } from '@nextui-org/react';
import moment from 'moment';

import CreateCategoryButtonModal from '../../components/modals/CreateCategoryModal';
import DeleteTableActions from '../../components/modals/deleteTableActions';
import { useGetCategoryQueryHook } from '../../hooks/categoryReactQueryHooks';

interface IRows {
  id: string;
  name: string;
  createdAt: string;
}

function Categories() {
  const { isLoading, data } = useGetCategoryQueryHook();

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
        <table className="w-full">
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
            ) : !data || data.length === 0 ? (
              <tr>
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
              data.map((val: IRows) => {
                return (
                  <tr key={val.id}>
                    <td className="p-1">{val.name}</td>
                    <td className="p-1">{moment(val.createdAt).format('L')}</td>
                    <td className=" pl-4 pt-1 flex items-center justify-start gap-1">
                      <button>
                        <DeleteTableActions id={val.id} type="category" />
                      </button>
                      <CreateCategoryButtonModal
                        action="Edit"
                        categoryData={val}
                      />
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
