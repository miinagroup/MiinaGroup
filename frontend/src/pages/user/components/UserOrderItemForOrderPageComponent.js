import React, { useEffect, useState } from "react";
import CartItemForUserPreviewComponent from "../../../components/Cart/CartItemForUserPreviewComponent";
import axios from "axios";
import "./invoicePDF.css"

const UserOrderItemForOrderPageComponent = (id) => {

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
    <table className="preview-order-table">
      <thead style={{
                  color: "#483F55",
                }}>
        <tr>
          <th className="pt-2 pb-2" style={{ width: "10%" }}></th>
          <th className="pt-2 pb-2" style={{ width: "25%" }}>Product</th>
          <th className="pt-2 pb-2" style={{ width: "10%" }}>MNASKU</th>
          <th className="pt-2 pb-2" style={{ width: "10%" }}>Unit Price</th>
          <th className="pt-2 pb-2" style={{ width: "9%" }}>Order Qty</th>
          <th className="pt-2 pb-2" style={{ width: "11%" }}>Supplied Qty</th>
          <th className="pt-2 pb-2" style={{ width: "10%" }}>Back Order</th>
        </tr>
      </thead>
      {cartItems.map((item, idx) => (
        < CartItemForUserPreviewComponent key={idx} item={item} backOrderStatus={backOrderStatus} />
      ))}
    </table>
  );
};

export default UserOrderItemForOrderPageComponent;
