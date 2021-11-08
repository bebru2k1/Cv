import React from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../../../Post/PostSlice";
import "./CreateButton.css";
import * as Icon from "react-feather";
function CreateButton({ dataForm, className }) {
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createPost(dataForm));
  };

  return (
    <div
      onClick={handleCreate}
      className={`${className} createbutton flex-alight`}
    >
      <Icon.Edit />
      <span>Thêm bài viết</span>
    </div>
  );
}

export default CreateButton;
