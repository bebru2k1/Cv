import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Markdown from "../../../../components/Common/Markdown";
import Footer from "../../../../components/Footer/Footer";
import Headers from "../../../../components/Headers/Headers";
import Spinner from "../../../Admin/components/Spinner/Spinner";
import gfm from "remark-gfm";
import axios from "../../../../configs/axiosConfig";
import {
  getPostBySlug,
  postSelector,
  setPostDetail,
  clearPostDetail,
} from "../../PostSlice";
import "./PostDetail.css";

import CommentSingle from "../../../../components/CommentSingle/CommentSingle";
import { authSelector } from "../../../Auth/AuthSlice";
import ButtonAddCmt from "../../../../components/ButtonComment/ButtonAddCmt/ButtonAddCmt";
import SpinnerCricle from "../../../../components/SpinnerCricle/SpinnerCricle";
import ButtonDeleteCmt from "../../../../components/ButtonComment/ButtonDeleteCmt/ButtonDeleteCmt";

function PostDetail() {
  const { user } = useSelector(authSelector);

  //Fetch Comment
  const [comment, setComment] = useState([]);
  const [isLoadingCmt, setIsLoadingCmt] = useState(false);
  const [isLoadingDeleteCmt, setIsLoadingDeleteCmt] = useState(false);

  const [loadComment, setLoadComment] = useState(false);

  //handle toggle delete cmt
  const [toggleDelete, setToggleDelete] = useState({
    id: null,
    toggle: false,
  });
  const handleToggle = (id) => {
    setToggleDelete({
      id,
      toggle: !toggleDelete.toggle,
    });
  };

  const { slug } = useParams();
  const { posts, postsLoading, postsHome, post } = useSelector(postSelector);
  const dispatch = useDispatch();

  //handle để khỏi fetch lại data
  const fetchData = useCallback(async () => {
    //check data is exits ?

    let hasData = false;
    const dataPostsState = posts?.reduce(
      (acc, cur) => [...acc, ...cur.data],
      []
    );
    const dataPostsStateAndPostsHome = [...dataPostsState, ...postsHome];
    if (dataPostsStateAndPostsHome.length !== 0) {
      hasData = true;
    }
    if (hasData) {
      // posts :  [ {page, limit , data : []}, {}]

      const postFilter = dataPostsStateAndPostsHome.filter(
        (post) => post.slug === slug
      );

      dispatch(setPostDetail(postFilter));
    } else {
      dispatch(getPostBySlug(`/posts/${slug}`));
    }
  }, [posts, postsHome, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();

    return () => {
      dispatch(clearPostDetail());
    };
  }, [slug]);

  useEffect(() => {
    if (post?.length !== 0) {
      setLoadComment(true);
      fetchComment(post[0]._id);
    }
  }, [post]);

  const fetchComment = useCallback(async (id) => {
    try {
      const response = await axios.get(`/comments/${id}`);
      setComment(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadComment(false);
    }
  }, []);

  //handleOnChangeComment
  const [valueCmtInput, setValueCmtInput] = useState("");
  const handleOnChangeComment = (e) => {
    setValueCmtInput(e.target.value);
  };

  //Component Comment
  function Comment() {
    if (comment.length === 0) return null;
    return (
      <>
        {comment.length !== 0
          ? comment.map((cmt) => (
              <div className="comment__cpn" key={cmt._id}>
                <CommentSingle
                  img={cmt.user.photos}
                  displayname={cmt.user.username}
                  content={cmt.content}
                />
                {cmt.user.username === user?.username && (
                  <div className="comment__delete">
                    <div
                      className="comment__delete__threedots"
                      onClick={() => handleToggle(cmt._id)}
                    >
                      ...
                    </div>
                    {cmt._id === toggleDelete.id && toggleDelete.toggle && (
                      <ul className="comment__delete__toggle">
                        <li className="comment__delete__toggle__item">
                          <ButtonDeleteCmt
                            comment={comment}
                            setComment={setComment}
                            idCmt={cmt._id}
                            isLoadingDeleteCmt={isLoadingDeleteCmt}
                            setIsLoadingDeleteCmt={setIsLoadingDeleteCmt}
                          />
                        </li>
                        {/* <li className="comment__delete__toggle__item">
                          Chỉnh Sửa
                        </li> */}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))
          : null}
      </>
    );
  }
  if (postsLoading) return <Spinner />;
  if (!postsLoading && post?.length === 0)
    return (
      <>
        <h1
          style={{
            textAlign: "center",
            padding: "100px",
          }}
        >
          Không có bài viết này
        </h1>
        <Footer />
      </>
    );
  return (
    <>
      <div className="postdetail">
        <div className="postdetail__image">
          <img src={post[0]?.image} alt="" />
          <h1 className="postdetail__title">{post[0]?.title}</h1>
        </div>
        <div className="postdetail__container">
          <Markdown children={post[0]?.des} className="postdetail__markdown" />
          <div className="comment">
            <p>Bình luận</p>
            {loadComment ? <Spinner /> : <Comment />}
            <div className="comment__form">
              <div className="comment__form__author">
                <div className="comment__form__author__img">
                  <img src={user?.photos} alt="" />
                </div>
                <div className="comment__form__author__displayname">
                  {user?.username}
                </div>
              </div>
              <div className="comment__form__input">
                <input
                  type="text"
                  name="comment"
                  placeholder="Thêm bình luận của bạn"
                  onChange={handleOnChangeComment}
                  value={valueCmtInput}
                />
              </div>
              <ButtonAddCmt
                content={valueCmtInput}
                postId={post[0]._id}
                setComment={setComment}
                comment={comment}
                isLoadingCmt={isLoadingCmt}
                setIsLoadingCmt={setIsLoadingCmt}
                setValueCmtInput={setValueCmtInput}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PostDetail;
