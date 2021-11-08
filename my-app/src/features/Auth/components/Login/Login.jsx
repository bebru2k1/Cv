import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import imageCode from "../../../../assets/image/imageCode.jpg";
import * as Icon from "react-feather";
import Spinner from "../../../Admin/components/Spinner/Spinner";
import {
  authSelector,
  login,
  setModalLoginFail,
  setModalRegisterFail,
} from "../../AuthSlice";
import Modal from "../../../../components/Modal/Modal";
import "./Login.css";
function Login() {
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { message, authLoading, isOpenModalLoginSuccess } =
    useSelector(authSelector);

  const [messageLogin, setMessageLogin] = useState("");

  useEffect(() => {
    dispatch(setModalRegisterFail());
    setMessageLogin(message.login);
  }, [message]);

  const dataChangeForm = (event) => {
    setDataLogin({ ...dataLogin, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch(login(dataLogin));
  };
  const handleFocusInput = (e) => {
    setMessageLogin("");
  };
  // if (authLoading) return <Spinner />;

  return (
    <div className="authfrom row ">
      <form onSubmit={handleSubmitForm} className="login col c-12 m-6">
        <Icon.User className="login__usericon" />

        <p className="login__title">Welcome</p>

        <div className="login__input">
          <div className="login__input__username">
            <p
              style={{
                textAlign: "left",
                marginBottom: "5px",
                fontSize: "15px",
                color: "var(--green-color)",
              }}
            >
              Tên tài khoản :
            </p>
            <input
              type="text"
              name="username"
              placeholder="E.x ahihi"
              onChange={dataChangeForm}
              onFocus={handleFocusInput}
            />
          </div>

          <div className="login__input__password">
            <p
              style={{
                textAlign: "left",
                marginBottom: "5px",
                fontSize: "15px",
                color: "var(--green-color)",
              }}
            >
              Mật khẩu :
            </p>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={dataChangeForm}
              onFocus={handleFocusInput}
            />
          </div>
          <span>{messageLogin}</span>
          {authLoading && <Spinner className="login__spinner" />}
        </div>
        <button className="login__action" type="submit">
          {" "}
          Login
        </button>
        <div className="login__withapp">
          <Link to="" className="login__withapp__facebook">
            <p>Đăng nhập với Facebook</p>
            {/* <Icon.Facebook /> */}
          </Link>
        </div>
        <div className="signup">
          <p>Bạn chưa có tài khoản ?</p>
          <Link to="/register">Đăng kí</Link>
        </div>
      </form>
      <figure className="login__image col c-0 m-6">
        <img src={imageCode} alt="" />
      </figure>
    </div>
  );
}

export default Login;
