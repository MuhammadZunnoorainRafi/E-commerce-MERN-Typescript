import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { TProduct } from '../../types/productType';
import { storeId } from '../../utils/getStore';

function Products() {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ['size'],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/${storeId}/product`);
      return res.data;
    },
  });

  const { mutate, isLoading: delSLoading } = useMutation({
    mutationFn: async (id: string) => {
      const config = {
        data: {
          id,
        },
      };
      await axios.delete(`/api/admin/${storeId}/product`, config);
      queryClient.invalidateQueries({ queryKey: ['size'] });
    },
  });
  const handleDelete = async (id: string) => {
    mutate(id);
  };

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
          <Button color="primary">+Add New</Button>
        </Link>
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
              <th className="p-2">Category</th>
              <th className="p-2 ">Color</th>
              <th className="p-2 ">Date</th>
              <th className="p-2 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
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
            ) : (
              data.map((val: TProduct) => {
                return (
                  <tr key={val.id}>
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
                    <td className=" pt-1">
                      <div className="relative flex ml-5 justify-start items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
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
                          <DropdownMenu variant="flat">
                            <DropdownItem>View</DropdownItem>
                            <DropdownItem>
                              <Link
                                className="block"
                                to={`/admin/${storeId}/products/${val.slug}/edit`}
                              >
                                Edit
                              </Link>
                            </DropdownItem>
                            <DropdownItem color="danger">Delete</DropdownItem>
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

export default Products;
