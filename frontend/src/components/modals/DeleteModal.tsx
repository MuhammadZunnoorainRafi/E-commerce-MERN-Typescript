import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useDelUserQueryHook } from '../../hooks/userReactQueryHooks';
import { toast } from 'sonner';
import { type IError, errorHandler } from '../../utils/errorHandler';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../Slices/authSlice';

export default function DeleteModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoading, mutateAsync } = useDelUserQueryHook();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      const res = await mutateAsync(user?._id as string);
      dispatch(deleteUser());
      toast.success(res.message);

      navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as IError));
    }
  };

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete your account? You will lose
                  all of your data. This action is permanent and irreversible.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
