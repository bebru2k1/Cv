import React from "react";
import * as Icon from "react-feather";
function EditUserBtn({ className }) {
  return (
    <div className={`edituserbtn ${className}`}>
      <Icon.Edit className="edituserbtn__icon" />
      <span className="edituserbtn__name">Sửa</span>
    </div>
  );
}

export default EditUserBtn;
