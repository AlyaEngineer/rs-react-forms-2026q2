import { createPortal } from 'react-dom';
import { X as ModalCloseIcon } from 'lucide-react';
import { useModalAccessibility } from './useModalAccessibility';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  testId?: string;
}

const Modal = ({ isOpen, onClose, children, title, testId }: ModalProps) => {
  const modalRef = useModalAccessibility(isOpen, onClose);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-testid={testId}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl outline-none"
      >
        <div className="mb-6 flex items-center justify-between border-b border-gray-900/10 pb-4">
          <h2
            id="modal-title"
            className="text-base/7 font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <ModalCloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
