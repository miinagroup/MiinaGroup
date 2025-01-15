import { Row, Col, ListGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import "./CartItemDropDown.css";
import CartItemDropDownRemoveFromCart from "./CartItemDropDownRemoveFromCart";

const CartItemDropDown = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
}) => {
  const [qty, setQty] = useState(item.cartProducts[0].quantity);

  useEffect(() => {
    setQty(item.cartProducts[0].quantity);
  }, [item.cartProducts[0].quantity]);

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

  return (
    <>
      <ListGroup.Item className="mt-1">
        <Row className="cartDropDownComponent_container">
          <Col md={1}>
            <div className="">
              {/* Image */}
              <img
                crossOrigin="anonymous"
                src={item.image ? item.image ?? null : null}
                className="w-100"
                alt="s"
              />
              {/* Image */}
            </div>
          </Col>
          <Col md={5}>
            <a href={`/product-details/${item.productId}`}>
              <p className="" style={{ color: "#1E4881" }}>
                <span className="text-uppercase">{item.name}</span>
              </p>
            </a>
          </Col>
          <Col md={3}>
            <p className="m-0 cart_product_attr">
              Item:{" "}
              <span className="cart_product_detail">
                {item.cartProducts[0].attrs}
              </span>
            </p>
            <p className="m-0 cart_product_attr">
              Each: $
              <span className="cart_product_detail">
                {itemPrice}
              </span>
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
          {/* delete button trash */}
          <Col md={1} className="remove_from_cart_btn">
            <CartItemDropDownRemoveFromCart
              orderCreated={orderCreated}
              productId={item.cartProducts[0]._id}
              quantity={item.cartProducts[0].quantity}
              price={item.cartProducts[0].price}
              item={item.cartProducts[0].attrs}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default CartItemDropDown;
