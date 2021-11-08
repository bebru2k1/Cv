import React, { useState } from "react";
import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
function FormPosts({ dataForm, setDataForm }) {
  const dispatch = useDispatch();
  const handleChangeForm = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="createpost">
      <div className="createpost__title createpost__item">
        <p className="createpost__input__name">
          <Icon.Edit2 className="createpost__item__icon" />
          Title:
        </p>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="createpost__input"
          value={dataForm.title}
          onChange={handleChangeForm}
        />
      </div>
      <div className="createpost__des createpost__item">
        <p className="createpost__input__name">
          <Icon.FileMinus className="createpost__item__icon" /> Descriptions:
        </p>

        <div className="createpost__des__flex">
          <div className="createpost__textarea">
            <textarea
              name="des"
              value={dataForm.des}
              onChange={handleChangeForm}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="createpost__image createpost__item">
        <p className="createpost__input__name">
          <Icon.Image className="createpost__item__icon" />
          Image:
        </p>

        <input
          type="text"
          name="image"
          className="createpost__input"
          value={dataForm.image}
          onChange={handleChangeForm}
        />
      </div>
    </div>
  );
}

export default FormPosts;
