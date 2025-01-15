import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemDropDown from "../components/CartItemDropDown";
import "../components/CartItemDropDown.css";
import { emptyCart } from "../../../redux/actions/cartActions";
import { useDispatch, useSelector, } from "react-redux";
import { useState, useEffect } from 'react'

const CartDropDown = ({
  editQuantity,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
  useIsAdmin,
}) => {
  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const removeFromCartHandler = (id, qty, price, item) => {
    reduxDispatch(removeFromCart(id, qty, price));
  };

  function handleProceedToCheckout() {
    //window.location.reload();
    if (useIsAdmin === true) {
      window.location.href = "/admin/cart-details";
    } else {
      window.location.href = "/user/cart-details";
    }
  }

  const removeAllItems = () => {
    reduxDispatch(emptyCart());
  };

  const formattedPrice = cartSubtotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Container>
      <Row className="mt-1 cart_items_map">
        {cartItems?.length === 0 ? (
          <Alert variant="info">Your Cart Is Empty</Alert>
        ) : (

          <ListGroup variant="flush">
            {cartItems?.map((item, idx) => (
              <CartItemDropDown
                item={item}
                key={idx}
                changeCount={changeCount}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))}
          </ListGroup>
        )}
      </Row>
      <Row>
        <Col sm={5}>
          <div className="m-1">
            <Button
              type="button"
              variant="success"
              onClick={handleProceedToCheckout}
              className="p-0 ps-1 pe-1 m-1"
            >
              Proceed To Checkout
            </Button>
            {/* </a> */}
          </div>
        </Col>
        <Col sm={3} >
          <Button
            type="button"
            variant="secondary"
            onClick={removeAllItems}
            className="p-0 ps-1 pe-1 m-2"
          >
            Empty Cart
          </Button>
        </Col>
        <Col sm={4} hidden={cartSubtotal === 0}>
          <div className="text-center mt-2">
            <p className="align-middle m-0">
              Total:{" "}
              <span className="fw-bold">
                ${formattedPrice}
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Container >
  );
};

export default CartDropDown;
