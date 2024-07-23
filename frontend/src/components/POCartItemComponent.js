import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const POCartItemComponent = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
  fetchPOCartData = false,
  fromPOCart = false,
  removeFromPOCartHandler
}) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [qty, setQty] = useState(0);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    setActiveProducts(item.cartProducts || item.poCartProducts || []);
  }, [item]);

  useEffect(() => {
    if (item.saleunit && activeProducts.length > 0) {
      setQty(activeProducts[0].quantity);
    }
  }, [item, activeProducts]);

  const handleBlur = (e) => {
    const newValue = Math.round(e.target.value / item.saleunit) * item.saleunit;
    setQty(newValue);
    applyChange(newValue);
  };

  // console.log("item saleunit", item.saleunit);

  const handleChange = (e) => {
    const value = e.target.value;
    setQty(value);
    // debounceChange(value);
  };

  const applyChange = (value) => {
    if (changeCount && activeProducts.length > 0) {
      changeCount(activeProducts[0]._id, value)
        .then(data => {
          if (data.status === "success") {
            fetchPOCartData();
          }
        })
        .catch(error => {
          console.error("There was an error updating the quantity", error);
        });
    }
  };

  // const debounceChange = (value) => {
  //   if (debounceTimeout) clearTimeout(debounceTimeout);
  //   const newTimeout = setTimeout(() => applyChange(value), 500); 
  //   setDebounceTimeout(newTimeout);
  // };

  if (activeProducts.length === 0) return null;

  const isPoCartProducts = !!item.poCartProducts;
  const itemPrice = activeProducts[0][isPoCartProducts ? "purchaseprice" : "price"]
    .toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });



  return (
    <>
      <ListGroup.Item className="mt-1">
        <Row>
          <Col md={1}>
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image : null}
              className="w-100 img_hovf"
              alt="product"
            />
          </Col>
          <Col md={5}>
            <a href={`/product-details/${item.productId}`}>
              <p className="" style={{ color: "#1E4881" }}>
                <strong className="text-uppercase">{item.name}</strong>
              </p>
            </a>
          </Col>
          <Col md={3}>
            <p className="m-0">
              Item: <span className="fw-bold">{activeProducts[0].attrs}</span>
            </p>
            <p className="m-0">
              {isPoCartProducts ? "Purchase Price: $" : "Unit Price: $"}
              <span className="fw-bold">{itemPrice}</span>
            </p>
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              min={item.saleunit}
              step={item.saleunit}
              onBlur={handleBlur}
              className="form-control"
              value={qty}
              onChange={handleChange}
              disabled={orderCreated}
            />
          </Col>
          <Col md={1}>
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productId={activeProducts[0]._id}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
              fromPOCart={fromPOCart}
              removeFromPOCartHandler={removeFromPOCartHandler}
              poCartItemId={item._id}
              fetchPOCartData={fetchPOCartData}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default POCartItemComponent;
