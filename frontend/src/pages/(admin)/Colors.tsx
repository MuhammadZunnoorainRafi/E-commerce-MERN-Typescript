import { Divider, Spinner } from '@nextui-org/react';
import moment from 'moment';
import CreateColorButtonModal from '../../components/modals/CreateColorModal';
import DeleteTableActions from '../../components/modals/deleteTableActions';
import { useGetColorQueryHook } from '../../hooks/colorReactQueryHooks';

interface IRows {
  id: string;
  name: string;
  hexCode: string;
  createdAt: string;
}

function Colors() {
  const { isLoading, data } = useGetColorQueryHook();

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
        <table className="w-full">
          <thead>
            <tr className="text-left bg-slate-100 text-slate-700 ">
              <th className="p-2 rounded-l-lg">Name</th>
              <th className="p-2">Hex Code</th>
              <th className="p-2">Date</th>
              <th className="p-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {isLoading ? (
              <tr className=" text-center">
                <td></td>
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
                  <tr key={val.id} className="hover:bg-default-100">
                    <td className="p-1">{val.name}</td>
                    <td className="flex items-center gap-1 p-1">
                      <div
                        style={{
                          backgroundColor: val.hexCode,
                        }}
                        className={`h-5 w-5 rounded-full border-3 border-slate-200`}
                      />
                      {val.hexCode}
                    </td>
                    <td className="p-1">{moment(val.createdAt).format('L')}</td>
                    <td className=" pl-4 pt-1 flex items-center justify-start gap-1">
                      <DeleteTableActions id={val.id} type="color" />
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
