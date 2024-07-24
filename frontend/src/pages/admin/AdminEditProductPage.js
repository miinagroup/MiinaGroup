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
import { getClientsSkuList } from "../../redux/actions/productsActions";
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
  //categories
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getClientsSkuList());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getCategories);
  const { clientsSkuList } = useSelector((state) => state.products);

  const imageDeleteHandler = async (imagePath, productId) => {
    // 在productController的 adminDeleteProductImage 里面 已经decode了url，所以这里要encode
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV === "development") {
      // TODO: change to !==  ===
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  const pdfDeleteHandler = async (pdfPath, productId) => {
    // 在productController的 adminDeleteProductImage 里面 已经decode了url，所以这里要encode

    let encoded = encodeURIComponent(pdfPath);
    if (process.env.NODE_ENV === "development") {
      // TODO: change to !==  ===
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
      clientsSkuList={clientsSkuList}
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
