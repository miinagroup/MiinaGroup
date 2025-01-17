import React, { useEffect, useState } from "react";
import CartItemForOrderPreviewComponent from "../../../components/CartItemForOrderPreviewComponent";
import axios from "axios";

const OrderItemForOrderPageComponent = (id) => {

  const [cartItems, setCartItems] = useState([]);
  const [backOrderStatus, setBackOrderStatus] = useState(false);

  useEffect(() => {
    const getOrder = async (id) => {
      try {
        const { data } = await axios.get("/api/orders/user/" + id.id);
        setCartItems(data.cartItems);
        setBackOrderStatus(data.backOrder)
      } catch (e) {
        console.log(e);
      }
    };
    getOrder(id);
  }, [id]);

  return (
    <table style={{ width: "95%", marginLeft: "3%", marginTop: "2%", marginBottom: "2%" }}>
      <thead>
        <tr>
          <th style={{ width: "10%" }}></th>
          <th style={{ width: "25%" }}>Product</th>
          {/* <th style={{ width: "10%" }}>Client SKU</th> */}
          <th style={{ width: "10%" }}>MNASKU</th>
          <th style={{ width: "10%" }}>Unit Price</th>
          <th style={{ width: "9%" }}>Order Qty</th>
          <th style={{ width: "11%" }}>Supplied Qty</th>
          <th style={{ width: "10%" }}>Back Order</th>
        </tr>
      </thead>
      {cartItems.map((item, idx) => (
        <CartItemForOrderPreviewComponent key={idx} item={item} backOrderStatus={backOrderStatus} />
      ))}
    </table>
  );
};

export default OrderItemForOrderPageComponent;
