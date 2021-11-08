import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./Pagination1.css";

function Pagination1({ pathname, totalPage, pageQuery = 1 }) {
  let arrayPages = [];
  //style threedots
  let threeDotsLeftStyle = {
    display: "none",
  };
  let threeDotsRightStyle = {
    display: "none",
  };

  // case hidden page
  if (
    (pageQuery === 1 || pageQuery === 2 || pageQuery === 3) &&
    pageQuery <= totalPage
  ) {
    arrayPages = [...Array(totalPage)]?.map((x, index) => index + 1);
    threeDotsLeftStyle = { display: "none" };
    threeDotsRightStyle = { display: "none" };
  }
  if (totalPage >= 5) arrayPages = [...Array(5)]?.map((x, index) => index + 1);
  if (pageQuery >= 4) {
    arrayPages = [
      pageQuery - 2,
      pageQuery - 1,
      pageQuery,
      pageQuery + 1,
      pageQuery + 2,
    ];
    threeDotsLeftStyle = { display: "inline-flex" };
    threeDotsRightStyle = { display: "inline-flex" };
    if (
      pageQuery === totalPage ||
      pageQuery === totalPage - 1 ||
      pageQuery === totalPage - 2
    ) {
      arrayPages = [
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
      threeDotsLeftStyle = { display: "inline-flex" };
      threeDotsRightStyle = { display: "none" };
    }
  }

  //handle page
  const handlePages = useCallback(
    (page) => {
      if (page < 1) page = 1;
      if (page > totalPage) page = totalPage;
      return page;
    },
    [totalPage]
  );

  return (
    <div className="pagination">
      <NavLink
        to={{
          pathname: pathname,
          search: `?_page=${handlePages(pageQuery - 1)}`,
        }}
        className="pagination__item"
      >
        Prev{" "}
      </NavLink>

      <div
        style={threeDotsLeftStyle}
        className="pagination__threedots-left pagination__item"
      >
        ...
      </div>
      {arrayPages?.map((item, index) => (
        <NavLink
          key={index}
          to={{
            pathname: pathname,
            search: `?_page=${item}`,
          }}
          className={
            pageQuery === item
              ? "pagination__item activepage"
              : "pagination__item"
          }
        >
          {item}
        </NavLink>
      ))}
      <div
        style={threeDotsRightStyle}
        className="pagination__threedots-right pagination__item"
      >
        ...
      </div>

      <NavLink
        to={{
          pathname: pathname,
          search: `?_page=${handlePages(pageQuery + 1)}`,
        }}
        className="pagination_next pagination__item"
      >
        Next{" "}
      </NavLink>
    </div>
  );
}

export default Pagination1;
