import { Form } from "react-bootstrap";
import RemoveFromOrderComponent from "./RemoveFromOrderComponent";
import { useState, useEffect } from "react";

import React from "react";
import axios from "axios";

const CartItemForOrderComponent = ({
  item,
  id,
  removeFromOrderHandler = false,
  orderCreated = false,
  changeCount = false,
  changePrice = false,
  edit,
  backOrderStatus,
  userInfo,
  onSkuUpdateSuccess,
  selectedDeliverySite,
  editingIndex,
  setEditingIndex,
  index,
  isCancel,
  isUpdated
}) => {
  const [qty, setQty] = useState(item.cartProducts[0].suppliedQty);
  const [price, setPrice] = useState(item.cartProducts[0].price);
  const [ctlsku, setCtlsku] = useState(item.cartProducts[0].ctlsku);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [userEmail, setUserEmail] = useState(userInfo.email);

  useEffect(() => {
    if (item.saleunit) {
      setQty(item.cartProducts[0].suppliedQty);
    }
  }, [item]);

  const handleBlur = (e) => {
    const newValue = Math.round(e.target.value / item.saleunit) * item.saleunit;
    setQty(newValue);
    if (changeCount) {
      changeCount(orderId, item.cartProducts[0]._id, price, newValue);
    }
  };

  const orderId = id;
  const handleChange = (e) => {
    setQty(e.target.value);
    if (changeCount) {
      changeCount(orderId, item.cartProducts[0]._id, price, e.target.value);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    if (changePrice) {
      changePrice(orderId, item.cartProducts[0]._id, qty, e.target.value);
    }
  };
  const handlePriceBlur = (e) => {
    setPrice(e.target.value);
    if (changePrice) {
      changePrice(orderId, item.cartProducts[0]._id, qty, e.target.value);
    }
  };
  const backOrderQuantity = item.cartProducts[0].quantity - qty;
  const itemPrice = item.cartProducts[0].price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <tbody>
        <tr>
          <td style={{ width: "7%" }}>
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image ?? null : null}
              className="w-100 img_hovf"
              alt="s"
            />
          </td>
          <td style={{ width: "25%" }}>
            <a href={`/product-details/${item.productId}`}>
              <strong
                className="text-uppercase"
                style={{
                  color: item.cartProducts[0].backOrder > 0 && backOrderStatus === true ? "red" : "#1E4881",
                }}
              >
                {item.name} - ({item.cartProducts[0].attrs})
              </strong>
            </a>
          </td>
          <td style={{ width: "10%" }}>
            <p className="m-0">{item.cartProducts[0].ctlsku}</p>
          </td>

          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              min="0"
              className="form-control"
              onBlur={handlePriceBlur}
              onChange={handlePriceChange}
              value={edit === false ? item.cartProducts[0].price : price}
              disabled={edit === false}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              min={item.saleunit}
              step={item.saleunit}
              className="form-control"
              value={item.cartProducts[0].quantity}
              disabled={orderCreated}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              min="0"
              step={item.saleunit}
              onBlur={handleBlur}
              className="form-control pe-0"
              onChange={handleChange}
              value={edit === false ? item.cartProducts[0].suppliedQty : qty}
              disabled={edit === false}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              className="form-control pe-0"
              value={
                edit === false
                  ? item.cartProducts[0].backOrder
                  : backOrderQuantity
              }
              disabled={orderCreated}
            />
          </td>
          <td style={{ width: "5%" }}>
            <RemoveFromOrderComponent
              orderId={orderId}
              itemId={item.cartProducts[0]._id}
              removeFromOrderHandler={
                removeFromOrderHandler ? removeFromOrderHandler : undefined
              }
            />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default CartItemForOrderComponent;
