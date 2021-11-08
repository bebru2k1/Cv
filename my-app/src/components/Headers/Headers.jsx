import React, { useState } from "react";
import logo from "../../assets/image/glow.png";
import "./Headers.css";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
const Headers = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => {};
  return (
    <div className="webapp__header">
      <header className="header">
        <div className="header__nav">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="" />
              {/* <Box className="header__logo-icon" /> */}
            </Link>
          </div>
          {/* <div className="header__bar"></div> */}
          <div className="header__icon__toggle">
            {toggleMenu ? (
              <Icon.X onClick={() => setToggleMenu(false)} />
            ) : (
              <Icon.Layers onClick={() => setToggleMenu(!toggleMenu)} />
            )}
          </div>
        </div>
        <ul className={toggleMenu ? "header__menu active" : "header__menu "}>
          <li className="header__menu__link">
            <Link
              to="/"
              className="menu__home"
              onClick={() => setToggleMenu(false)}
            >
              Trang chủ
            </Link>
          </li>
          <li className="header__menu__link ">
            <Link
              to="/posts"
              className="menu__post "
              onClick={() => setToggleMenu(false)}
            >
              Bài viết của tôi
            </Link>
          </li>
          <li className="header__menu__link ">
            <Link
              to="/about"
              className="menu__about"
              onClick={() => setToggleMenu(false)}
            >
              CV của tôi
            </Link>
          </li>
          <li className="header__menu__link ">
            <Link
              to="/account"
              className="menu__about"
              onClick={() => setToggleMenu(false)}
            >
              {" "}
              Tài khoản
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Headers;
