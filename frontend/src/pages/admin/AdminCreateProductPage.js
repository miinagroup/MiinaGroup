import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import {
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
} from "./utils/utils";
import { useSelector } from "react-redux";
import {
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
  getCategories
} from "../../redux/actions/categoryActions";
import { useDispatch } from "react-redux";
//categories。
import { useEffect } from "react";


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
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getCategories);

  const getClientSkuList = async () => {
    try {
        const response = await axios.get('/api/products/getClientsSkuList');
        return response.data
    } catch (error) {
        console.error('Axios error:', error);
    }
}

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
      getCTLSku={getCTLSku}
      getClientSkuList={getClientSkuList}
    />
  );
};

export default AdminCreateProductPage;