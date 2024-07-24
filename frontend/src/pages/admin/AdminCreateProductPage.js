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
import { getClientsSkuList } from "../../redux/actions/productsActions";
import CreateProductPageComponent from "./components/CreateProductPageComponent";


const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const getCTLSku = async () => {
  const { data } = await axios.get(`/api/products/admin/getCTLSKU`);
  return data;
}

const AdminCreateProductPage = () => {
  //categories
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getClientsSkuList());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getCategories);
  const { clientsSkuList } = useSelector((state) => state.products);

  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadPdfApiRequest={uploadPdfApiRequest}
      uploadPdfCloudinaryApiRequest={uploadPdfCloudinaryApiRequest}
      categories={categories}
      clientsSkuList={clientsSkuList}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      getCTLSku={getCTLSku}
    />
  );
};

export default AdminCreateProductPage;