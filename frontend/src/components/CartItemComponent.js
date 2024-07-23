import { Row, Col, ListGroup, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";
import { useState, useEffect } from "react";

import React from "react";

const CartItemComponent = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
  uniformUserId,
}) => {
  const [qty, setQty] = useState(item.cartProducts[0].quantity);

  useEffect(() => {
    if (item.saleunit) {
      setQty(item.cartProducts[0].quantity);
    }
  }, [item]);

  const handleBlur = (e) => {
    const newValue = Math.round(e.target.value / item.saleunit) * item.saleunit;
    setQty(newValue);
    if (changeCount) {
      changeCount(item.cartProducts[0]._id, newValue);
    }
  };

  const handleChange = (e) => {
    setQty(e.target.value);
    if (changeCount) {
      changeCount(item.cartProducts[0]._id, e.target.value);
    }
  };

  const itemPrice = item.cartProducts[0].price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  //console.log(item);
  return (
    <>
      <ListGroup.Item className="mt-1">
        <Row>
          <Col md={1}>
            <div className="">
              {/* Image */}
              <img
                crossOrigin="anonymous"
                src={item.image ? item.image ?? null : null}
                className="w-100 img_hovf"
                alt="s"
              />
              {/* Image */}
            </div>
          </Col>
          <Col md={5}>
            {(item.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) ? (
              <a href={`/uniform-details/${item.productId}`}>
                <p className="" style={{ color: "#1E4881" }}>
                  <strong className="text-uppercase">{item.name}</strong>
                </p>
              </a>
            ) : (
              <a href={`/product-details/${item.productId}`}>
                <p className="" style={{ color: "#1E4881" }}>
                  <strong className="text-uppercase">{item.name}</strong>
                </p>
              </a>
            )}

          </Col>
          <Col md={3}>
            {(item.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) ? (
              <>
                <p className="m-0">
                  Item:{" "}
                  <span className="fw-bold">{item.cartProducts[0].attrs.split("/")[1]}</span>
                </p>
                <p className="m-0">
                  Variant:{" "}
                  <span className="fw-bold">{item.cartProducts[0].color + " (" + item.cartProducts[0].size + ")"}</span>
                </p>
              </>
            ) : (
              <>
                <p className="m-0">
                  Item:{" "}
                  <span className="fw-bold">{item.cartProducts[0].attrs}</span>
                </p>
                <p className="m-0">
                  Unit Price: $
                  <span className="fw-bold">
                    {itemPrice}
                  </span>
                </p>
              </>
            )}
            {/*  */}
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
              disabled={orderCreated || item.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")}
            />
          </Col>
          {/* delete button trash */}
          <Col md={1}>
            {
              (item.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) ? (
                <RemoveFromCartComponent
                  orderCreated={orderCreated}
                  productId={item.cartProducts[0]._id}
                  qty={item.cartProducts[0].quantity}
                  price={item.cartProducts[0].price}
                  attrs={item.cartProducts[0].attrs}
                  uniformUserId={uniformUserId}
                  removeFromCartHandler={
                    removeFromCartHandler ? removeFromCartHandler : undefined
                  }
                />
              ) : (
                <RemoveFromCartComponent
                  orderCreated={orderCreated}
                  productId={item.cartProducts[0]._id}
                  quantity={item.quantity}
                  price={item.price}
                  removeFromCartHandler={
                    removeFromCartHandler ? removeFromCartHandler : undefined
                  }
                />
              )
            }

          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default CartItemComponent;
