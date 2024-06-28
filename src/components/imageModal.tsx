import React from "react";
import Image from "next/image";
import { placeholderImage, isValidUrl } from "./invalidImage";

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
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>
        <div className="relative mt-3 min-h-96">
          <Image
            src={isValidUrl(imageUrl) ? imageUrl : placeholderImage}
            alt="Selected"
            className="rounded-lg"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
