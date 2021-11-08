import React from "react";
import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../../Post/PostSlice";
function TrashButton({ id }) {
  const dispatch = useDispatch();
  const handleTrash = () => {
    dispatch(deletePost(id));
  };
  return (
    <div
      onClick={handleTrash}
      className=" managepost__item-icon__item managepost__item-icon__trash flex-alight"
    >
      <Icon.Trash />

      <span>Xóa Bài Viết </span>
    </div>
  );
}

export default TrashButton;
