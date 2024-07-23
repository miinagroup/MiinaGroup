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
  updateUniformCart,
  updateUniformCartOnEmptyCart,
  cartSubtotal,
  reduxDispatch,
  useIsAdmin,
  // userUniformRole
}) => {
  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const [uniformUserId, setUniformUserId] = useState(null)
  const [uniformUserName, setUniformUserName] = useState(null)

  // useEffect(() => {
  //   if (cartItems[0].uniformUserId) {
  //     setUniformUserId(cartItems[0].uniformUserId)
  //     console.log("1", cartItems[0].uniformUserId);
  //   } else {
  //     setUniformUserId(userInfo._id)
  //     console.log("2", userInfo._id);
  //   }
  // }, [cartItems])
  const [hasUniform, setHasUniform] = useState(0)
  useEffect(() => {
    cartItems.map((cart) => {
      if (cart.cartProducts[0].attrs.includes("UNIFORM/")) {
        setHasUniform(1)
      }
      if ((cart.uniformUserName !== null) || (cart.uniformUserName !== "")) {
        if (typeof (cart.uniformUserName) !== "undefined") {
          setUniformUserName(cart.uniformUserName)
          setUniformUserId(cart.uniformUserId)
        } else {
          setUniformUserId(userInfo._id)
        }
      }

    })
  }, [cartItems])

  const removeFromCartHandler = (id, qty, price, item, uniformUserId) => {
    reduxDispatch(removeFromCart(id, qty, price));
    if (item.toUpperCase().includes("UNIFORM/")) {
      updateUniformCart(uniformUserId, { id, qty })
        .then((data) => {
          if (data.message === "UniformCart updated") {
            window.location.reload()
          }
        })
    }
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
    const deleteList = []
    cartItems.map((cart) => {
      if (cart.cartProducts[0].attrs.includes("UNIFORM/")) {
        deleteList.push(cart.cartProducts[0])
      }
    })
    if (deleteList.length > 0) {
      var userId = ""
      if (uniformUserId) {
        userId = uniformUserId
      } else {
        userId = userInfo._id
      }
      updateUniformCartOnEmptyCart(userId, { deleteList })
        .then((data) => {
          if (data.message === "UniformCart updated") {
            window.location.reload()
          }
        })
    }
  };

  const formattedPrice = cartSubtotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });



  //console.log("cartItems", cartItems);

  return (
    <Container>
      {
        uniformUserName ? (
          <>
            <Row>
              <span className="text-uppercase" style={{ backgroundColor: '#1E4881', color: 'white' }}>{uniformUserName}'s UNIFORM ORDER CART</span>
            </Row>
          </>
        ) : ""
      }
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
                uniformUserId={uniformUserId}
              // userUniformRole={userUniformRole}
              />
            ))}
          </ListGroup>
        )}
      </Row>
      <Row>
        <Col sm={5}>
          <div className="m-1">
            {/* <a href="/user/cart-details"> */}
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
        <Col sm={4} hidden={cartSubtotal === 0 || hasUniform === 1}>
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
