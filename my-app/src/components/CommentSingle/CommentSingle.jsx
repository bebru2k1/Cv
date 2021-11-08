import React from "react";
import "./Comment.css";
import { Link } from "react-router-dom";
function CommentSingle({ img, displayname, content }) {
  return (
    <div className="commentsingle">
      <div className="commentsingle__author">
        <div className="commentsingle__author__image">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="commentsingle__container">
        <p className="commentsingle__author__displayname">
          <Link to="/">{displayname}</Link>
        </p>
        <div className="commentsingle__content">{content}</div>
      </div>
    </div>
  );
}

export default CommentSingle;
