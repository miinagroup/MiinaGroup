import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, emptyCart, editQuantity } from "../../redux/actions/cartActions";

import axios from "axios";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const taxAmount = useSelector((state) => state.cart.taxAmount);

  const reduxDispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const getStoreUser = async (email) => {
    const { data } = await axios.get("/api/users/store/" + email);
    return data;
  };

  const getOrdersInvNo = async () => {
    const { data } = await axios.get("/api/orders/invoiceNumber");
    return data;
  };

  const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders", { ...orderData });
    return data;
  }

  const getAllOrder = async () => {
    const { data } = await axios.get("/api/orders");
    return data;
  };
  const getdeliveryBooks = async () => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + userInfo.email);
    return data;
  };
  const getAdminDeliveryBooks = async () => {
    const { data } = await axios.get("/api/deliveryBooks/admin");
    return data;
  }

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      getdeliveryBooks={getdeliveryBooks}
      editQuantity={editQuantity}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
      getUser={getUser}
      createOrder={createOrder}
      emptyCart={emptyCart}
      getOrdersInvNo={getOrdersInvNo}
      getStoreUser={getStoreUser}
      taxAmount={taxAmount}
    />
  );
};

export default UserCartDetailsPage;

