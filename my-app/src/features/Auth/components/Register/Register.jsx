import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import imageCode from "../../../../assets/image/imageCode.jpg";
import * as Icon from "react-feather";
import "./Register.css";
import Spinner from "../../../Admin/components/Spinner/Spinner";
import {
  authSelector,
  register,
  setModalLoginFail,
  setMessageErrorRegister,
} from "../../AuthSlice";
import Modal from "../../../../components/Modal/Modal";

function Register() {
  const [dataRegister, setDataRegister] = useState({
    username: "",
    password: "",
    passwordback: "",
    displayName: "",
  });

  const dispatch = useDispatch();
  const { message, authLoading, isOpenModalLoginSuccess } =
    useSelector(authSelector);

  useEffect(() => {
    // setMessageRegister(message.regis);
  }, [message]);
  // console.log(messageLogin);

  const dataChangeForm = (event) => {
    setDataRegister({
      ...dataRegister,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const { username, password, passwordback, displayName } = dataRegister;
    if (password !== passwordback) {
      dispatch(setMessageErrorRegister("Không trùng khớp mật khẩu"));
    } else {
      dispatch(register({ username, password, displayName }));
    }
  };
  const handleFocusInput = (e) => {
    dispatch(setMessageErrorRegister(""));
  };
  // if (authLoading) return <Spinner />;

  return (
    <div className="authfrom row">
      <figure className="register__image col c-0 m-6">
        <img src={imageCode} alt="" />
      </figure>
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
              placeholder="Ex: wibu123"
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
              Tên người dùng :
            </p>
            <input
              type="text"
              name="displayName"
              placeholder="Ex: Wibu Chúa"
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
          <div className="login__input__password">
            <p
              style={{
                textAlign: "left",
                marginBottom: "5px",
                fontSize: "15px",
                color: "var(--green-color)",
              }}
            >
              Nhập lại mật khẩu :
            </p>
            <input
              type="password"
              name="passwordback"
              placeholder="Nhập lại mật khẩu"
              onChange={dataChangeForm}
              onFocus={handleFocusInput}
            />
          </div>
          <span>{message.register}</span>
          {authLoading && <Spinner className="login__spinner" />}
        </div>
        <button className="login__action" type="submit">
          {" "}
          Đăng Kí
        </button>

        <div className="signup">
          <p>Bạn đã có tài khoản ?</p>
          <Link to="/login">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
