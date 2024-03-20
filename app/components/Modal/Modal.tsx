import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { TiDelete } from "react-icons/ti";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opcity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div
          className="pointer-events-none fixed inset-0 flex max-w-full
    justify-center items-center"
        >
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="pointer-events-auto  flex justify-center items-center p-8 bg-white relative rounded-md">
              <div
                className="absolute top-minus12 right-minus12 cursor-pointer"
                onClick={onClose}
              >
                <TiDelete size={30} />
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
