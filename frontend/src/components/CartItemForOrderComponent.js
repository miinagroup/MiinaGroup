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
  enterClientSKU,
  backOrderStatus,
  userInfo,
  onSkuUpdateSuccess,
  setEnterClientSKU,
  currentClientSkuName,
  selectedDeliverySite,
  editingIndex,
  setEditingIndex,
  index,
  handleNewClientSkusChange,
  isCancel,
  isUpdated
}) => {
  const [qty, setQty] = useState(item.cartProducts[0].suppliedQty);
  const [price, setPrice] = useState(item.cartProducts[0].price);
  const [clientSKU, setClientSKU] = useState(item.cartProducts[0].currentClientSku);
  const [previousClientSkuValue, setPreviousClientSkuValue] = useState();

  const [ctlsku, setCtlsku] = useState(item.cartProducts[0].ctlsku);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [userEmail, setUserEmail] = useState(userInfo.email);

  const [clientsSku, setClientsSku] = useState(item.cartProducts[0].clientsSku);

  useEffect(() => {
    setClientSKU(item.cartProducts[0].currentClientSku)
    setPreviousClientSkuValue(item.cartProducts[0].currentClientSku?.number)
  }, [item]);

  useEffect(() => {
    isCancel && setClientSKU(clientSKU => ({
      ...clientSKU,
      number: previousClientSkuValue
    }));

    isUpdated && setPreviousClientSkuValue(clientSKU.number)
  }, [isCancel, previousClientSkuValue, isUpdated])
  

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

  const hanldeSkuChange = (e) => {
    let updatedCientSku = {}
    setEditingIndex(index);
    
    updatedCientSku = {number: e.target.value};
    if(!clientSKU?.name) {
      let clientSkuname = {name: currentClientSkuName};
      setClientSKU(clientSKU => ({
        ...clientSKU,
        ...clientSkuname,
        ...updatedCientSku
      }));
    } else {
      setClientSKU(clientSKU => ({
      ...clientSKU,
      ...updatedCientSku
    }));
    }
    handleNewClientSkusChange(updatedCientSku, ctlsku, item._id)
    setIsSaveEnabled(true);
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
            {enterClientSKU === false ? (
              <p className="m-0">{clientSKU?.number}</p>
            ) : (
              <>
                <Form.Control
                  type="string"
                  className="form-control"
                  onChange={hanldeSkuChange}
                  value={clientSKU?.number}
                />
               
              </>
            )}
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
