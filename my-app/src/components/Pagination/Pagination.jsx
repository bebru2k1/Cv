import React, { useCallback, useState } from "react";
import "./Pagination.css";
import { NavLink } from "react-router-dom";
function Pagination({ page, limit, totalPage, setPage }) {
  const handleClickPagination = (item) => {
    console.log("item", item);
    setPage(item);
  };

  let threeDots1 = {
    display: "none",
  };
  let threeDots2 = {
    display: "none",
  };

  const [visialbePage, setVisialbePage] = useState(5);

  //handle page max min

  const handlePages = useCallback((page) => {
    if (page > totalPage) page = totalPage;
    if (page <= 1) page = 1;
    return page;
  }, []);

  let arrayPages = [];
  if (page === 1 || page === 2 || page === 3) {
    if (totalPage < visialbePage) {
      arrayPages = [...Array(totalPage)].map((x, index) => index + 1);
    } else {
      arrayPages = [1, 2, 3, 4, 5];
    }
  } else if (page === totalPage || page === totalPage - 1) {
    arrayPages = [totalPage - 2, totalPage - 1, totalPage];
    threeDots1 = {
      display: "block",
    };
  } else {
    arrayPages = [page - 1, page, page + 1];
    threeDots1 = {
      display: "block",
    };
    threeDots2 = {
      display: "block",
    };
  }

  return (
    <div className="pagination">
      <NavLink
        to={{
          pathname: "/posts",
          search: `?_page=${handlePages(page - 1)}`,
        }}
        className=" pagination__item"
        onClick={() => setPage((page) => handlePages(page - 1))}
      >
        Prev
      </NavLink>
      <div className="threedots pagination__item" style={threeDots1}>
        ...
      </div>
      {arrayPages.map((item, index) => (
        <NavLink
          to={{
            pathname: "/posts",
            search: `?_page=${item}`,
          }}
          className={
            page === item ? "pagination__item activepage" : "pagination__item"
          }
          key={index}
          onClick={() => handleClickPagination(item)}
        >
          {item}
        </NavLink>
      ))}
      <div className="threedots pagination__item" style={threeDots2}>
        ...
      </div>
      <NavLink
        to={{
          pathname: "/posts",
          search: `?_page=${handlePages(page + 1)}`,
        }}
        className=" pagination__item"
        onClick={() => setPage((page) => handlePages(page + 1))}
      >
        Next
      </NavLink>
    </div>
  );
}

export default Pagination;
