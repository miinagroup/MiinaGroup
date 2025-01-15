import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { saveAttributeToCatDoc, getCategories } from "../../redux/actions/categoryActions";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
} from "./utils/utils";
import EditProductPageComponent from "./components/EditProductPageComponent";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/updateProduct/${productId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getCategories);

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV === "development") {
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  const pdfDeleteHandler = async (pdfPath, productId) => {

    let encoded = encodeURIComponent(pdfPath);
    if (process.env.NODE_ENV === "development") {
      await axios.delete(`/api/products/admin/pdf/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/pdf/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={dispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadPdfApiRequest={uploadPdfApiRequest}
      uploadPdfCloudinaryApiRequest={uploadPdfCloudinaryApiRequest}
      pdfDeleteHandler={pdfDeleteHandler}
    />
  );
};

export default AdminEditProductPage; 
