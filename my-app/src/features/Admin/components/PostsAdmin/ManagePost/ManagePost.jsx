import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  postSelector,
  setCloseModalEdit,
  setOpenModalEdit,
  setCloseModalTrash,
  setOpenModalTrash,
} from "../../../../Post/PostSlice";
import Spinner from "../../Spinner/Spinner";
import "./ManagePost.css";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import Pagination1 from "../../../../../components/Pagination1/Pagination1";
import Modal from "../../../../../components/Modal/Modal";
import EditPosts from "../EditPosts/EditPosts";
import TrashButton from "../../PostButton/TrashButton/TrashButton";

function ManagePost() {
  const history = useHistory();

  const [dataPost, setDataPost] = useState(null);

  const { postsLoading, posts, countPosts, isOpenModalTrash, isOpenModalEdit } =
    useSelector(postSelector);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(4);
  // page query
  const { search } = useLocation();
  let _pageQuery =
    queryString.parse(search, {
      parseNumbers: true,
    })._page || 1;

  if (
    _pageQuery > Math.ceil(countPosts / limit) &&
    Math.ceil(countPosts / limit) !== 0 // Chưa load
  ) {
    _pageQuery = Math.ceil(countPosts / limit);
    history.push(`?_page=${_pageQuery}`);
  }

  console.log("_pageQuery", _pageQuery);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getPosts({
        url: `/posts?_limit=${limit}&_page=${_pageQuery}`,
        page: _pageQuery,
      })
    );
  }, [dispatch, limit, _pageQuery, posts]);
  const postResult = useMemo(
    () => posts.filter((post) => post.page === _pageQuery),
    [posts, _pageQuery]
  );
  if (postsLoading) return <Spinner />;
  return (
    <>
      <div className="managepost">
        {postResult[0]?.data.map((post, index) => (
          <div key={index} className="managepost__item">
            <img src={post?.image} alt="" />
            <div className="managepost__item__content">
              <div className="managepost__item__content__title">
                {post?.title}
              </div>
              <div className="managepost__item__content__des">
                {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Adipisci, blanditiis accusantium! Eos amet optio nobis quis illo
              doloribus facilis at soluta voluptatum aliquid dolore officiis
              nesciunt cupiditate, ea laborum et. */}
              </div>
            </div>
            <div className="managepost__item-icon">
              <div
                onClick={() => {
                  setDataPost(post);
                  dispatch(setOpenModalEdit());
                }}
                className="managepost__item-icon__item managepost__item-icon__edit flex-alight"
              >
                <Icon.Edit />
                <span>Sửa bài viết</span>
              </div>
              <div
                onClick={() => {
                  setDataPost(post);
                  dispatch(setOpenModalTrash());
                }}
                className=" managepost__item-icon__item managepost__item-icon__trash flex-alight"
              >
                <Icon.Trash />
                <span>Xóa bài viết</span>
              </div>
            </div>
          </div>
        ))}

        {/* Modal Edit*/}
        <Modal
          isOpen={isOpenModalTrash}
          close={() => dispatch(setCloseModalTrash())}
        >
          <p style={{ marginBottom: "20px", marginTop: "20px" }}>
            Bạn có muốn xóa bài viết
          </p>
          <TrashButton id={dataPost?._id} />
        </Modal>

        {/* Modal Edit*/}
        <Modal
          isOpen={isOpenModalEdit}
          close={() => dispatch(setCloseModalEdit())}
        >
          <EditPosts
            id={dataPost?._id}
            data={{
              title: dataPost?.title,
              des: dataPost?.des,
              image: dataPost?.image,
            }}
          />
        </Modal>
      </div>
      <Pagination1
        pageQuery={_pageQuery}
        totalPage={Math.ceil(countPosts / limit)}
        pathname="/admin/posts/home"
      />
    </>
  );
}

export default ManagePost;
