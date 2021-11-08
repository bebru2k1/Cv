import React from "react";

import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import Spinner from "../../features/Admin/components/Spinner/Spinner";
import { authSelector } from "../../features/Auth/AuthSlice";
function ProtectedRoute({ component: Component, ...rest }) {
  const { authLoading, isAuthenticate } = useSelector(authSelector);
  const location = useLocation();
  if (authLoading) return <Spinner />;

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticate ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  pathlocation: location.pathname,
                  typeRoute: "protectedRoute",
                },
              }}
            />
          )
        }
      />
    </>
  );
}

export default ProtectedRoute;
