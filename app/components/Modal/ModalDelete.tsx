import Button from "../Button";
import Modal from "./Modal";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  disabled: boolean;
  varient: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  onClose,
  handleDelete,
  disabled,
  varient,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">
          Are you sure you want to delete this{" "}
          {varient === "Product" ? "product" : "category"}
          {varient === "Order" && "product"}
        </h2>
        <p>Note that this action cannot undo</p>
        <div className="w-full flex justify-end items-center gap-3">
          <p className="cursor-pointer" onClick={onClose}>
            Cancel
          </p>
          <Button disabled={disabled} danger onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
