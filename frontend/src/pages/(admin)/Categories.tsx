import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from '@nextui-org/react';
import moment from 'moment';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import CreateCategoryButtonModal from '../../components/modals/CreateCategoryModal';
import { useAppSelector } from '../../hooks/RTKHooks';
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
  const { isLoading, data } = useGetCategoryQueryHook();
  const { user } = useAppSelector((store) => store.authReducer);

  const { mutate, isLoading: delSLoading } = useDeleteCategoryQueryHook(
    user!.token
  );

  const handleDelete = (id: string) => {
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
                    <td className=" pt-1">
                      <div className="flex  ml-5 justify-start items-center gap-2">
                        <Dropdown
                          placement="bottom-end"
                          className="bg-background border-1 border-default-200"
                        >
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              radius="full"
                              size="sm"
                              variant="light"
                            >
                              <HiOutlineDotsVertical size={22} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            className="relative z-0"
                            closeOnSelect={false}
                            aria-label="Static Actions"
                            variant="flat"
                          >
                            <DropdownItem className="relative z-50" key="edit">
                              <CreateCategoryButtonModal
                                action="Edit"
                                categoryData={val}
                              />
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              onPress={() => handleDelete(val.id)}
                              color="danger"
                            >
                              {delSLoading ? (
                                <span className="flex items-center justify-start gap-2">
                                  Deleting <Spinner size="sm" color="danger" />
                                </span>
                              ) : (
                                'Delete'
                              )}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
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

export default Categories;
