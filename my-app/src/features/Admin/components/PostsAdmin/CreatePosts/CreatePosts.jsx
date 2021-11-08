import React, { useState } from "react";
import Modal from "../../../../../components/Modal/Modal";
import CreateButton from "../../PostButton/CreateButton/CreateButton";
import FormPosts from "../FormPosts";
import { postSelector, setCloseModalCreate } from "../../../../Post/PostSlice";
import "./CreatePosts.css";
import { useSelector, useDispatch } from "react-redux";
function CreatePosts() {
  const { isOpenModalCreate } = useSelector(postSelector);
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    title: "",
    des: "",
    image: "",
  });

  return (
    <>
      <FormPosts dataForm={dataForm} setDataForm={setDataForm} />
      <CreateButton dataForm={dataForm} />
      <Modal
        close={() => dispatch(setCloseModalCreate())}
        isOpen={isOpenModalCreate}
      >
        <p>Bạn đã thêm bài viết thành công</p>
      </Modal>
    </>
  );
}

export default CreatePosts;
