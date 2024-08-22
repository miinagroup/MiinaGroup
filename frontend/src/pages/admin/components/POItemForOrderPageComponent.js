import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CartItemForUserPreviewComponent from "../../../components/CartItemForUserPreviewComponent";
import axios from "axios";
import POCartItemForPreviewComponent from "./POCartItemForPreviewComponent";

const POItemForOrderPageComponent = ({
  id,
  updatePO,
  handleClose,
  refreshOrders,
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [poData, setPoData] = useState({});
  useEffect(() => {
    const getOrder = async (id) => {
      try {
        const { data } = await axios.get("/api/purchaseOrders/get-one/" + id);
        setCartItems(data.purchaseOrder.poCartItems);
        setPoData(data.purchaseOrder);
      } catch (e) {
        console.log(e);
      }
    };
    getOrder(id);
  }, [id]);

  const handleLocalUpdate = (
    productId,
    receivedQty,
    backOrderQty,
    receivingQty
  ) => {
    const updatedItems = cartItems.map((item) =>
      item.poCartProducts[0]._id === productId
        ? {
          ...item,
          poCartProducts: item.poCartProducts.map((product) => ({
            ...product,
            receivedQty,
            receivingQty,
            backOrderQty,
          })),
        }
        : item
    );

    setCartItems(updatedItems);
  };

  const [updatingPO, setUpdatingPO] = useState(false);
  const [receivePO, setReceivePO] = useState(false);

  const handleReceiveGoods = () => {
    setReceivePO(!receivePO);
  };

  const handleSaveChanges = async () => {
    try {
      setUpdatingPO(true);
      setReceivePO(false);
      updatePO(id, cartItems).then(() => {
        setUpdatingPO(false);
        refreshOrders();
        handleClose();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="m-3 mb-1"
        >
          <span className="fw-bold fs-4">{poData?.supplierName}</span>
          <h1 className="ms-2">
            - PO#: <span className="fw-bold">{poData?.poNumber}</span>{" "}
          </h1>
          {receivePO ? (
            <Button
              className="btn-secondary ms-5 p-1"
              onClick={handleReceiveGoods}
            >
              Cancel
            </Button>
          ) : (
            <Button
              className="btn-success ms-5 p-1"
              onClick={handleReceiveGoods}
            >
              Receive Goods
            </Button>
          )}
        </div>
        <table
          style={{
            width: "95%",
            marginLeft: "3%",
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>CLT SKU</th>
              <th>Supplier SKU</th>
              <th>Buy Price</th>
              <th>Order Qty</th>
              <th>Received</th>
              <th>BackOrder</th>
              <th>Receiving</th>
            </tr>
          </thead>
          {cartItems.map((item, idx) => (
            <POCartItemForPreviewComponent
              key={idx}
              item={item}
              onLocalUpdate={handleLocalUpdate}
              receivePO={receivePO}
              backOrderStatus={poData.backOrderStatus}
            />
          ))}
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginRight: "3%",
            marginBottom: "1%",
          }}
        >
          {receivePO ? (
            <Button
              className="CTL_btn p-1"
              onClick={handleSaveChanges}
              disabled={updatingPO}
            >
              {updatingPO ? "Updating..." : "Save Changes"}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default POItemForOrderPageComponent;
