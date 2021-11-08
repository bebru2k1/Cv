import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import Spinner from "../../features/Admin/components/Spinner/Spinner";
import { authSelector } from "../../features/Auth/AuthSlice";
function AdminRoute({ component: Component, ...rest }) {
  const { isAuthenticate, user, authLoading } = useSelector(authSelector);
  const location = useLocation();
  console.log(location);
  if (authLoading) return <Spinner />;
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticate && user.role === 1 ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  pathlocation: location.pathname,
                  typeRoute: "adminRoute",
                },
              }}
            />
          )
        }
      />
    </>
  );
}

export default AdminRoute;
