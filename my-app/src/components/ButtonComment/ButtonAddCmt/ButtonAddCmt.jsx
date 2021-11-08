import React from "react";
import * as Icon from "react-feather";
import "./ButtonAddCmt.css";
import axios from "../../../configs/axiosConfig";
import Spinner from "../../../features/Admin/components/Spinner/Spinner";
import SpinnerCricle from "../../SpinnerCricle/SpinnerCricle";
function ButtonAddCmt({
  postId,
  content,
  setComment,
  comment,
  isLoadingCmt,
  setIsLoadingCmt,
  setValueCmtInput,
}) {
  const handleSendComment = async () => {
    if (content) {
      setIsLoadingCmt(true);
      const response = await axios.post("/comments", { content, postId });

      setComment([...comment, response.data.data]);
      setIsLoadingCmt(false);
      setValueCmtInput("");
    }
  };
  return (
    <div onClick={handleSendComment} className="buttonaddcomment flex-alight">
      {isLoadingCmt ? (
        <SpinnerCricle />
      ) : (
        <>
          <Icon.Send />
          <span>Send</span>
        </>
      )}
    </div>
  );
}

export default ButtonAddCmt;
