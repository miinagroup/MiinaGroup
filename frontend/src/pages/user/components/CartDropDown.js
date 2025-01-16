import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import CartItemDropDown from "../components/CartItemDropDown";
import "../components/CartItemDropDown.css";
import { emptyCart } from "../../../redux/actions/cartActions";

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

  const removeFromCartHandler = (id, qty, price, item) => {
    reduxDispatch(removeFromCart(id, qty, price));
  };

  function handleProceedToCheckout() {
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
    <Container className="cart_items_container">
      <Row className="cart_items_map">
        {cartItems?.length === 0 ? (
          <Alert variant="info">Your Cart Is Empty</Alert>
        ) : (

          <ListGroup className="cart-dropdown-list-group">
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
      <Row className="cart_items_info">
        <Col sm={5}>
          <div className="m-1">
            <Button
              type="button"
              onClick={handleProceedToCheckout}
              className="p-0 ps-1 pe-1 m-1 cart-dropdown-btn"
            >
              Proceed To Checkout
            </Button>
          </div>
        </Col>
        <Col sm={3} >
          <Button
            type="button"
            onClick={removeAllItems}
            className="p-0 ps-1 pe-1 m-2 cart-dropdown-btn-empty"
          >
            Empty Cart
          </Button>
        </Col>
        <Col sm={4} hidden={cartSubtotal === 0}>
          <div className="text-center mt-2">
            <p className="align-middle m-0">
              Total:{" "}
              <span className="fw-bold" style={{color: "#521712"}}>
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
