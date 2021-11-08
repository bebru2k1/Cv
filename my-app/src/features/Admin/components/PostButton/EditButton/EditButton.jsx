import React from "react";
import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
import { editPost } from "../../../../Post/PostSlice";
function EditButton({ dataForm, id }) {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(editPost({ dataForm, id }));
  };
  return (
    <div
      onClick={handleEdit}
      className="managepost__item-icon__item managepost__item-icon__edit flex-alight"
    >
      <Icon.Edit />
      <span>Sửa bài viết</span>
    </div>
  );
}

export default EditButton;
