import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../../Admin/components/Spinner/Spinner";
import { getHomePost, postSelector } from "../../PostSlice";
import SinglePost from "../SinglePost/SinglePost";
import "./HomePost.css";
function HomePost() {
  const { postsLoading, postsHome } = useSelector(postSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePost("/posts?_limit=4"));
  }, [dispatch]);
  if (postsLoading) return <Spinner />;
  return (
    <div className="homepost">
      <p className="homepost__title">Các bài viết của mình</p>
      <div className="homepost__post">
        {postsHome?.map((posts) => (
          <SinglePost
            key={posts._id}
            image={posts.image}
            title={posts.title}
            createdAt={posts.createdAt}
            className="homepost__post__item"
            slug={posts.slug}
          />
        ))}
      </div>
      <div className="homepost_addlink">
        <Link to="/posts">Xem Thêm Bài Viết </Link>
      </div>
    </div>
  );
}

export default HomePost;
