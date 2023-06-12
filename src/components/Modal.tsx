import "./styles/modal.css";
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef?.current?.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">

    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close-icon" onClick={() => onClose(false)}>
          &times;
        </span>
        {children}
      </div>
    </div>
    </div>
  );
};

export default Modal;
