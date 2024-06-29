import React from 'react';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DialogXXL: React.FC<DialogProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-screen h-screen min-w-full max-w-full bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">
        <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug text-blue-gray-900">
          It's a simple dialog.
        </div>
        <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
          The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan luv.
        </div>
        <div className="flex flex-wrap items-center justify-end p-4 text-blue-gray-500">
          <button
            onClick={onClose}
            className="px-6 py-3 mr-1 text-xs font-bold uppercase transition-all rounded-lg hover:bg-red-500/10 active:bg-red-500/30 text-red-500"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-bold uppercase transition-all rounded-lg bg-gradient-to-tr from-green-600 to-green-400 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogXXL;
