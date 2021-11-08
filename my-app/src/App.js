import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import "./App.css";
import "../src/assets/css/responsive.css";
import AdminRoute from "./components/Common/AdminRoute";
import HFRoute from "./components/Common/HFRoute";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import MarkdownPost from "./components/MarkdownPost/MarkdownPost";
import setAuthToken from "./configs/setAuthToken";
import Admin from "./features/Admin/Admin";
import Auth from "./features/Auth/Auth";
import { authSelector, loginToken } from "./features/Auth/AuthSlice";
import PostDetail from "./features/Post/components/PostDetail/PostDetail";
import Posts from "./features/Post/components/Posts/Posts";
import Home from "./layouts/Home/Home";
import MyCv from "./layouts/MyCv/MyCv";
import NotFound from "./components/Common/NotFound";
import Modal from "./components/Modal/Modal";
import {
  setModalLoginFail,
  setModalRegisterFail,
} from "./features/Auth/AuthSlice";
import Account from "./layouts/Account/Account";
import Headers from "./components/Headers/Headers";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isOpenModalLoginSuccess, isOpenModalRegisterSuccess } =
    useSelector(authSelector);

  useEffect(() => {
    if (localStorage.getItem("aurBlog-acc")) {
      setAuthToken(localStorage.getItem("aurBlog-acc"));
      dispatch(loginToken({ token: localStorage.getItem("aurBlog-acc") }));
    }
  }, [dispatch]);

  return (
    <div className="webapp">
      {/* {!location?.pathname.includes("/admin") && <Headers />} */}

      <div className="App">
        <Switch>
          <HFRoute exact path="/">
            <Home />
          </HFRoute>

          <Route path={`/markdown`} component={MarkdownPost} />

          <ProtectedRoute path="/posts/:slug" component={PostDetail} />

          <Route
            path="/login"
            render={(props) => <Auth authRoute="login" {...props} />}
          />
          <Route
            path="/register"
            render={() => <Auth authRoute="register" />}
          />

          <AdminRoute path="/admin" component={Admin} />

          <HFRoute path="/about">
            <MyCv />
          </HFRoute>

          <HFRoute path="/posts">
            <Posts />
          </HFRoute>

          <HFRoute path="/account">
            <Account />
          </HFRoute>

          <HFRoute path="*" component={NotFound} />
        </Switch>
        <Modal
          isOpen={isOpenModalLoginSuccess}
          close={() => dispatch(setModalLoginFail())}
        >
          Bạn đã đăng nhập thành công
        </Modal>

        <Modal
          isOpen={isOpenModalRegisterSuccess}
          close={() => dispatch(setModalRegisterFail())}
        >
          <p>Bạn đã đăng ký thành công</p>
          <Link to="/login"> Đăng Nhập</Link>
        </Modal>
      </div>
    </div>
  );
}

export default App;
