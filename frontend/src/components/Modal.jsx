import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#121212] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;