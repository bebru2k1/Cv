import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Pagination1 from "../../../../components/Pagination1/Pagination1";
import Spinner from "../../../Admin/components/Spinner/Spinner";
import { getPosts, postSelector } from "../../PostSlice";
import SinglePost from "../SinglePost/SinglePost";
import "./Posts.css";

function Posts() {
  const { postsLoading, posts, countPosts } = useSelector(postSelector);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(4);
  // page query
  const { search } = useLocation();
  let _pageQuery =
    queryString.parse(search, {
      parseNumbers: true,
    })._page || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getPosts({
        url: `/posts?_limit=${limit}&_page=${_pageQuery}`,
        page: _pageQuery,
      })
    );
  }, [dispatch, limit, _pageQuery]);
  const postResult = useMemo(
    () => posts.filter((post) => post.page === _pageQuery),
    [posts, _pageQuery]
  );
  if (postsLoading) return <Spinner />;
  return (
    <>
      <div className="posts row">
        {postResult[0]?.data.map((posts) => (
          <SinglePost
            key={posts._id}
            image={posts.image}
            title={posts.title}
            createdAt={posts.createdAt}
            className="post__item homepost__post__item"
            slug={posts.slug}
          />
        ))}
      </div>

      <Pagination1
        pageQuery={_pageQuery}
        totalPage={Math.ceil(countPosts / limit)}
        pathname="/posts"
      />
    </>
  );
}

export default Posts;
