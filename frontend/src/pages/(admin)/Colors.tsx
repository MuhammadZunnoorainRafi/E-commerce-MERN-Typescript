import { Divider, Spinner } from '@nextui-org/react';
import moment from 'moment';
import { MdDeleteOutline } from 'react-icons/md';
import CreateColorButtonModal from '../../components/modals/CreateColorModal';
import { useAppSelector } from '../../hooks/RTKHooks';
import {
  useDeleteColorQueryHook,
  useGetColorQueryHook,
} from '../../hooks/colorReactQueryHooks';

interface IRows {
  id: string;
  name: string;
  createdAt: string;
}

function Colors() {
  const { user } = useAppSelector((state) => state.authReducer);

  const { isLoading, data } = useGetColorQueryHook();

  const { mutate, isLoading: delCLoading } = useDeleteColorQueryHook(
    user!.token
  );
  const handleDelete = async (id: string) => {
    mutate(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Colors</h1>
          <p className="text-slate-600 text-sm">Manage colors for your store</p>
        </div>
        <CreateColorButtonModal />
      </div>
      <Divider className="my-5" />

      {/* Table */}
      <div className=" p-4 shadow-lg rounded-lg border border-slate-200">
        <table
          className={`w-full ${delCLoading ? 'cursor-wait' : 'cursor-default'}`}
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
                    <td className=" pl-6 pt-1">
                      <button
                        onClick={() => handleDelete(val.id)}
                        className={`hover:text-red-500 transition-colors ${
                          delCLoading ? 'cursor-wait' : 'cursor-pointer'
                        }`}
                      >
                        <MdDeleteOutline />
                      </button>
                      <CreateColorButtonModal action="Edit" colorData={val} />
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

export default Colors;
