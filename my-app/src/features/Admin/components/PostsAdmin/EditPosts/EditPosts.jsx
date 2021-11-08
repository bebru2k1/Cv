import React, { useState } from "react";

import EditButton from "../../PostButton/EditButton/EditButton";
import FormPosts from "../FormPosts";

function EditPosts({ id, data }) {
  const [dataForm, setDataForm] = useState(data);

  return (
    <>
      <FormPosts dataForm={dataForm} setDataForm={setDataForm} />
      <EditButton dataForm={dataForm} id={id} />
    </>
  );
}

export default EditPosts;
