import React from "react";
import * as Icon from "react-feather";
import "./ButtonDeleteCmt.css";
import axios from "../../../configs/axiosConfig";
import SpinnerCricle from "../../SpinnerCricle/SpinnerCricle";
function ButtonDeleteCmt({
  comment,
  setComment,
  idCmt,
  isLoadingDeleteCmt,
  setIsLoadingDeleteCmt,
}) {
  const handleClickDeleteButton = async () => {
    setIsLoadingDeleteCmt(true);
    const response = await axios.delete(`/comments/${idCmt}`);
    const cmtDelete = response.data.data;
    const commentCopy = [...comment];
    const result = commentCopy.filter((cmt) => cmt._id !== cmtDelete._id);
    setComment(result);
    setIsLoadingDeleteCmt(false);
  };
  return (
    <div className="buttondelete" onClick={handleClickDeleteButton}>
      {isLoadingDeleteCmt ? <SpinnerCricle /> : "Xóa"}
    </div>
  );
}

export default ButtonDeleteCmt;
