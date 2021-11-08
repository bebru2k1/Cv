import React from "react";
import * as Icon from "react-feather";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import logo from "../../../../assets/image/glow.png";
import imageme from "../../../../assets/image/meabout.jpg";
import "./NavbarAdmin.css";
function NavbarAdmin() {
  const { url } = useRouteMatch();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link activeClassName="activeLink" to="/admin">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="logo__name">Admin</div>
        <Icon.Menu className="sidebar__logo__menu" />
      </div>
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item sidebar__nav__me">
          {/* <Icon.Search className=" sidebar__nav-item-icon sidebar__logo__icon-search" /> */}
          <img src={imageme} alt="" className="sidebar__nav-item-image" />
          <div className="sidebar__nav__me__title"> Đức Ah</div>
        </li>

        <li className="sidebar__nav-item">
          <Icon.Search className=" sidebar__nav-item-icon sidebar__logo__icon-search" />
          <input type="text" placeholder="Search..."></input>
        </li>

        <li className="sidebar__nav-item">
          <NavLink activeClassName="activeLink" to={`${url}/dashboard`}>
            <Icon.Grid className="sidebar__nav-item-icon" />
            <span className="sidebar__nav__name">DashBoard</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink activeClassName="activeLink" to={`${url}/users`}>
            <Icon.Users className="sidebar__nav-item-icon" />
            <span className="sidebar__nav__name">Users</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink activeClassName="activeLink" to={`${url}/posts`}>
            <Icon.FileText className="sidebar__nav-item-icon" />
            <span className="sidebar__nav__name">Posts</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink activeClassName="activeLink" to={`${url}/analytic`}>
            <Icon.PieChart className="sidebar__nav-item-icon" />
            <span className="sidebar__nav__name">Analytics</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavbarAdmin;
