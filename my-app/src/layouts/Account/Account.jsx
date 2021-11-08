import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import setAuthToken from "../../configs/setAuthToken";
import {
  authSelector,
  setAuthSignOut,
  setUser,
} from "../../features/Auth/AuthSlice";
import Login from "../../features/Auth/components/Login/Login";
import "./Account.css";
import EditUserBtn from "../../features/Auth/components/AuthButton/EditUserBtn/EditUserBtn";
import UpLoadInput from "./component/UpLoadInput";
import * as Icon from "react-feather";
import background from "../../assets/image/anhbiatest.jpg";
import axios from "../../configs/axiosConfig";
import Markdown from "../../components/Common/Markdown";
import Background from "./component/Background";
function Account() {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  //Change Infomation State
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleEditAvatar, setToggleEditAvatar] = useState(false);
  const [toggleEditContent, setToggleEditContent] = useState(false);
  //avatar State

  const [imageAvatarTest, setImageAvatarTest] = useState(null);
  const [valueInputAvatar, setValueInputAvatar] = useState("");

  //content avatar
  const [valueInputContent, setValueInputContent] = useState("");
  useEffect(() => {
    setValueInputContent(user?.content);
  }, [user?.content]);

  // Đăng xuất
  const handleSigout = () => {
    localStorage.removeItem("aurBlog-acc");
    setAuthToken(null);
    dispatch(setAuthSignOut());
    history.push("/");
  };

  const handleChangInputAvatar = (e) => {
    setValueInputAvatar(e.target.value);
  };
  const handleChangInputContent = (e) => {
    setValueInputContent(e.target.value);
  };

  const handleChangeImg = async (data) => {
    const response = await axios.put("/auth/", data);
    dispatch(setUser(response.data.user));
    setToggleEditContent(false);
  };

  if (!user) return <Login />;

  return (
    <div className="account">
      <div className="account__header">
        <Background handleChangeImg={handleChangeImg} />

        <div className="account__avatar">
          <img src={imageAvatarTest || user?.photos} alt="" />
          <div className="account__displayname">{`${user?.username} (${user?.displayName}) `}</div>
        </div>
      </div>

      <div className="account__container"></div>
      <div className="account__edit">
        <p
          className=" account__edit__change flex-alight"
          onClick={() => setToggleEdit(!toggleEdit)}
        >
          <Icon.ChevronRight
            className={
              toggleEdit
                ? "account__edit__change__icon active"
                : "account__edit__change__icon"
            }
          />
          <span>Chỉnh sửa thông tin</span>
        </p>
        {toggleEdit && (
          <ul className="account__edit__toggle">
            <li
              className="flex-alight account__edit__toggle__item account__edit__toggle__avatar"
              onClick={() => setToggleEditAvatar(!toggleEditAvatar)}
            >
              <Icon.ChevronRight
                className={
                  toggleEditAvatar
                    ? "account__edit__toggle__avatar__icon active"
                    : "account__edit__toggle__avatar__icon"
                }
              />
              <span>Chỉnh sửa ảnh đại diện </span>
            </li>
            {toggleEditAvatar && (
              <div className="account__edit__toggle__avatar__toggle">
                <UpLoadInput
                  handleChangInput={handleChangInputAvatar}
                  valueInput={valueInputAvatar}
                  setImageTest={setImageAvatarTest}
                  handleChangeImg={handleChangeImg}
                  name="photos"
                />
              </div>
            )}

            <li
              className="flex-alight account__edit__toggle__content account__edit__toggle__item "
              onClick={() => {
                setToggleEditContent(!toggleEditContent);
                setValueInputContent(user?.content);
              }}
            >
              <Icon.ChevronRight
                className={
                  toggleEditContent
                    ? "account__edit__toggle__content__icon active"
                    : "account__edit__toggle__content__icon"
                }
              />
              <span>Chỉnh sửa nội dung </span>
            </li>
            {toggleEditContent && (
              <div className="account__edit__toggle__content__toggle">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={valueInputContent}
                  onChange={handleChangInputContent}
                ></textarea>
                <div
                  className="uploadinput__change uploadinput__item"
                  onClick={() =>
                    handleChangeImg({ content: valueInputContent })
                  }
                >
                  {/* <Icon.Tool /> */}
                  <span>Change</span>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>

      <div className="account__content">
        <div className="account__content__textarea"></div>
        <div className="account__content__markdown">
          <Markdown children={valueInputContent} />
        </div>
      </div>

      <div className="account__signout" onClick={handleSigout}>
        Đăng Xuất
      </div>
    </div>
  );
}

export default Account;
