import { Divider } from '@nextui-org/react';
import { MdDeleteOutline } from 'react-icons/md';
import CreateColorButtonModal from '../../components/shared/CreateColorModal';

const rows = [
  {
    key: '1',
    name: 'Tony Reichert',
    role: 'CEO',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Zoey Lang',
    role: 'Technical Lead',
    status: 'Paused',
  },
  {
    key: '3',
    name: 'Jane Fisher',
    role: 'Senior Developer',
    status: 'Active',
  },
  {
    key: '4',
    name: 'William Howard',
    role: 'Community Manager',
    status: 'Vacation',
  },
];

function Colors() {
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
              <th className="p-2">Date</th>
              <th className="p-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((val) => {
              return (
                <tr key={val.key}>
                  <td className="p-1">{val.name}</td>
                  <td className="p-1">{val.role}</td>
                  <td className=" pl-6 pt-1">
                    <button className="hover:text-red-500">
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Colors;
