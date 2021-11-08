import React from "react";
import "./Modal.css";
import * as Icon from "react-feather";
function Modal({ children, isOpen, close }) {
  return isOpen ? (
    <div className="modal__backdrop" onClick={() => close()}>
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <div onClick={() => close()}>
          <Icon.X className="modal__close" />
        </div>
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
