import AdminCartDetailsPageComponent from "./components/AdminCartDetailsPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, emptyCart, editQuantity } from "../../redux/actions/cartActions";

import axios from "axios";

const AdminCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const taxAmount = useSelector((state) => state.cart.taxAmount);

  // console.log("admin cart mother", cartSubtotal);

  const reduxDispatch = useDispatch();

  const fetchUsers = async (abctrl) => {
    const { data } = await axios.get("/api/users", {
      signal: abctrl.signal,
    });
    return data
  }

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const getOrdersInvNo = async () => {
    const { data } = await axios.get("/api/orders/invoiceNumber");
    return data;
  };

  // const createOrder = async (orderData) => {
  //   const { data } = await axios.post("/api/orders", { ...orderData });
  //   return data;
  // }

  const adminCreateOrder = async (orderData) => {
    console.log(orderData);
    const { data } = await axios.post("/api/orders/adminCreateOrder", { ...orderData });
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
    <AdminCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      getAdminDeliveryBooks={getAdminDeliveryBooks}
      editQuantity={editQuantity}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
      getUser={getUser}
      adminCreateOrder={adminCreateOrder}
      emptyCart={emptyCart}
      getOrdersInvNo={getOrdersInvNo}
      fetchUsers={fetchUsers}
      taxAmount={taxAmount}

    />
  );
};

export default AdminCartDetailsPage;

