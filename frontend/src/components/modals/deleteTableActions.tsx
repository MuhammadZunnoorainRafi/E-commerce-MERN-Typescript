import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { MdDeleteOutline } from 'react-icons/md';
import { useAppSelector } from '../../hooks/RTKHooks';
import { useDeleteColorQueryHook } from '../../hooks/colorReactQueryHooks';
import { useDeleteCategoryQueryHook } from '../../hooks/categoryReactQueryHooks';
import { useDeleteProductQuery } from '../../hooks/productReactQueryHooks';

function DeleteTableActions({
  type,
  id,
}: {
  type: 'color' | 'category' | 'product';
  id: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user } = useAppSelector((state) => state.authReducer);

  const { mutateAsync: colorMutate, status: colStatus } =
    useDeleteColorQueryHook(user!.token);

  const { mutateAsync: categoryMutate, status: catStatus } =
    useDeleteCategoryQueryHook(user!.token);

  const { mutate: productMutate, status: prodStatus } = useDeleteProductQuery();

  const productStatus = prodStatus !== 'idle' && prodStatus !== 'error';
  const colorStatus = colStatus !== 'idle' && colStatus !== 'error';
  const categoryStatus = catStatus !== 'idle' && catStatus !== 'error';

  const handleDelete = async (id: string) => {
    if (type === 'color') {
      await colorMutate(id);
      onClose();
    } else if (type === 'category') {
      await categoryMutate(id);
      onClose();
    } else if (type === 'product') {
      productMutate(id);
    }
  };

  return (
    <>
      <button className="hover:text-red-500 transition-colors" onClick={onOpen}>
        <MdDeleteOutline />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete {type}?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  isLoading={productStatus || categoryStatus || colorStatus}
                  isDisabled={productStatus || categoryStatus || colorStatus}
                  onClick={() => handleDelete(id)}
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

export default DeleteTableActions;
