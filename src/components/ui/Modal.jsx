'use client';
import React from 'react';
import { CgClose } from "react-icons/cg";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CgClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;