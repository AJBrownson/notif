import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-[#1a1a1a] rounded-lg shadow-lg p-6 w-11/12 md:w-1/3"
      >
        <button
          onClick={onClose}
          className="text-red-500 hover:text-gray-800 absolute top-2 right-2"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
