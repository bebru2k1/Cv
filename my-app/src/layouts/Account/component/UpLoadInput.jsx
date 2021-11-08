import React from "react";
import * as Icon from "react-feather";

const UpLoadInput = ({
  className = "",
  handleChangInput,
  valueInput,
  setImageTest,
  handleChangeImg,
  name,
}) => {
  return (
    <div className={`uploadinput ${className}`}>
      <div className="uploadinput__link uploadinput__item">
        <div className="uploadinput__link__group1">
          <Icon.Link2 className="uploadinput__link__group1__link" />
          <span>Link</span>
        </div>
        <input
          type="text"
          name="testbackground"
          value={valueInput}
          onChange={handleChangInput}
        />
      </div>

      <div
        className="uploadinput__view uploadinput__item"
        onClick={() => {
          setImageTest(valueInput);
        }}
      >
        <Icon.Eye />
        {/* <span>Xem Trước</span> */}
      </div>
      <div
        className="uploadinput__change uploadinput__item"
        onClick={() => handleChangeImg({ [name]: valueInput })}
      >
        {/* <Icon.Tool /> */}
        <span>Change</span>
      </div>
    </div>
  );
};
export default UpLoadInput;
