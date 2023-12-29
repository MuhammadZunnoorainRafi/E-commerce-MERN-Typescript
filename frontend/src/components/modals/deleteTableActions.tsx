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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAppSelector((state) => state.authReducer);

  const { mutate: colorMutate, isLoading: colorLoading } =
    useDeleteColorQueryHook(user!.token);

  const { mutate: categoryMutate, isLoading: categoryLoading } =
    useDeleteCategoryQueryHook(user!.token);

  const { mutate: productMutate, isLoading: productLoading } =
    useDeleteProductQuery();

  const handleDelete = async (id: string) => {
    if (type === 'color') {
      colorMutate(id);
    } else if (type === 'category') {
      categoryMutate(id);
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
                  isLoading={colorLoading || categoryLoading || productLoading}
                  isDisabled={colorLoading || categoryLoading || productLoading}
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
