import React from "react";
import { Link } from "react-router-dom";
import authorImg from "../../../../assets/image/meabout.jpg";
import * as Icon from "react-feather";
import "./SinglePost.css";
function SinglePost({ _id, image, title, createdAt, className, slug }) {
  return (
    <>
      <Link to={`/posts/${slug}`} className="singlepost col c-12 lm-6 ">
        <img src={image} alt="" className="singlepost__imagepost" />
        <div className="singlepost__author">
          <img className="singlepost__author__image" src={authorImg} alt="" />
        </div>

        <div className="singlepost__star">
          <div className="singlepost__like flex-alight">
            <span className="singlepost__like__number">10</span>

            <Icon.Check className="singlepost__like-icon" />
          </div>
          <div className="singlepost__comment flex-alight">
            <span className="singlepost__comment__number">20</span>
            <Icon.MessageCircle className="singlepost__comment-icon" />
          </div>
        </div>
        <div className="singlepost__title">{title}</div>
      </Link>
    </>
  );
}

export default SinglePost;
