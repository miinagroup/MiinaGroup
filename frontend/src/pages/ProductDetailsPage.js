import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { addToCart } from "../redux/actions/cartActions";
// import { getClientsSkuList } from "../redux/actions/productsActions";


const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  // const { clientsSkuList } = useSelector((state) => state.products); 

  // useEffect(() => {
  //   dispatch(getClientsSkuList());
  // }, [dispatch]);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const createQuote = async (formInputs) => {
    const { data } = await axios.post(`/api/quotes/create`, { ...formInputs });
    return data;
  };

  // const clientUpdateSku = async (ctlsku, clientSku, clientSkuName) => {
  //   try {
  //     const response = await axios.put(
  //       `/api/products/client/updateSKU/${ctlsku}`,
  //       { [userInfo.siteSku]: clientSku,
  //         "clientSkuName": clientSkuName,
  //         "clientSkuNumber": clientSku
  //        }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log("Failed to change sku", error);
  //   }
  // };

  const addToPOCartHandler = async (poCartItems) => {
    const { data } = await axios.post("/api/poCart/add", { poCartItems });
    console.log("addToPOCartHandler", data);
    return data;
  }

  return (
    <ProductDetailsPageComponent
      // clientsSkuList={clientsSkuList}
      getUser={getUser}
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
      createQuote={createQuote}
      // clientUpdateSku={clientUpdateSku}
      addToPOCartHandler={addToPOCartHandler}
    />
  );
};

export default ProductDetailsPage;
