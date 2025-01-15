import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { addToCart } from "../redux/actions/cartActions";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const createQuote = async (formInputs) => {
    const { data } = await axios.post(`/api/quotes/create`, { ...formInputs });
    return data;
  };

  const addToPOCartHandler = async (poCartItems) => {
    const { data } = await axios.post("/api/poCart/add", { poCartItems });
    console.log("addToPOCartHandler", data);
    return data;
  }

  return (
    <ProductDetailsPageComponent
      getUser={getUser}
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
      createQuote={createQuote}
      addToPOCartHandler={addToPOCartHandler}
    />
  );
};

export default ProductDetailsPage;
