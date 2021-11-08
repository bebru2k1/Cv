import React from "react";
import Register from "../Auth/components/Register/Register";
import Login from "../Auth/components/Login/Login";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { authSelector } from "./AuthSlice";
import { useSelector } from "react-redux";
function Auth({ authRoute, locations }) {
  const { isAuthenticate, user } = useSelector(authSelector);
  const history = useHistory();
  const { state } = useLocation();

  if (state?.typeRoute === "protectedRoute" && isAuthenticate) {
    history.push(state.pathlocation);
    return null;
  }

  if (state?.typeRoute === "adminRoute" && isAuthenticate && user.role === 1) {
    history.push(state.pathlocation);
    return null;
  }

  if (isAuthenticate) {
    return <Redirect to="/" />;
  } else {
    return <div>{authRoute === "register" ? <Register /> : <Login />}</div>;
  }
}

export default Auth;
