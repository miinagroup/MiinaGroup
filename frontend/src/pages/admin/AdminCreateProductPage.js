import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import {
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
} from "./utils/utils";
import {
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
  getCategories
} from "../../redux/actions/categoryActions";
import CreateProductPageComponent from "./components/CreateProductPageComponent";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const getMNASku = async () => {
  const { data } = await axios.get(`/api/products/admin/getMNASKU`);
  return data;
}

const AdminCreateProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getCategories);

  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadPdfApiRequest={uploadPdfApiRequest}
      uploadPdfCloudinaryApiRequest={uploadPdfCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      getMNASku={getMNASku}
    />
  );
};

export default AdminCreateProductPage;