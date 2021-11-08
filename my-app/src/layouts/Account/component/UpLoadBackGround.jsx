import React from "react";
import UpLoadInput from "./UpLoadInput";
const UpLoadBackGround = ({
  className = "",
  img,
  handleChangInput,
  valueInput,
  setImageTest,
  handleChangeImg,
  name,
}) => {
  return (
    <div className={`uploadbgr ${className}`}>
      <img src={img} alt="" />
      <div className="uploadbgr__icon">
        <UpLoadInput
          handleChangInput={handleChangInput}
          valueInput={valueInput}
          setImageTest={setImageTest}
          handleChangeImg={handleChangeImg}
          name={name}
        />
      </div>
    </div>
  );
};

export default UpLoadBackGround;
