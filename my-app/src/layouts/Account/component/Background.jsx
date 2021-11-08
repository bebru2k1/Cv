import React, { useState } from "react";
import UpLoadBackGround from "./UpLoadBackGround";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/Auth/AuthSlice";
function Background({ handleChangeImg }) {
  const { user } = useSelector(authSelector);
  const [isChangeBackground, setIsChangeBackground] = useState(false);
  const [imageTest, setImageTest] = useState("null");
  const [valueInput, setValueInput] = useState("");

  const handleChangInput = (e) => {
    setValueInput(e.target.value);
  };

  return (
    <div className="account__background">
      {isChangeBackground ? (
        <UpLoadBackGround
          className="account__background__upload"
          img={imageTest || user?.background}
          handleChangInput={handleChangInput}
          valueInput={valueInput}
          setImageTest={setImageTest}
          handleChangeImg={handleChangeImg}
          name="background"
        />
      ) : (
        <img src={user?.background} alt="" />
      )}

      <div className="account__background__select">
        <Icon.Edit
          className="account__background__select__icon"
          onClick={() => {
            setIsChangeBackground(!isChangeBackground);
            setImageTest(null);
          }}
        />
      </div>
    </div>
  );
}

export default Background;
