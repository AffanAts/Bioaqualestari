import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">&times;</button>
        <img src={imageUrl} alt="Modal Content" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

export default Modal;
