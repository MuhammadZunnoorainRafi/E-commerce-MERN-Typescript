import { Image } from '@nextui-org/react';
import { useAppSelector } from '../hooks/RTKHooks';
import DeleteModal from '../components/shared/DeleteModal';
import UpdateModal from '../components/shared/UpdateModal';
import moment from 'moment';

function Profile() {
  const { user } = useAppSelector((state) => state.authReducer);
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="p-4 flex items-start justify-center rounded-lg shadow-md">
        <div className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover w-40 h-40 rounded-xl"
            src={user?.image}
          />
        </div>
        <div className="pb-0 pt-2 px-4 flex-col items-start">
          <h1 className=" font-semibold ">Name: {user?.name}</h1>
          <h2 className="font-semibold ">Email: {user?.email}</h2>
          <h4 className="font-semibold ">
            Since: {moment(user?.createdAt).format('L')}
          </h4>
          <div className="flex mt-2 gap-3 items-center justify-center">
            <DeleteModal />
            <UpdateModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
