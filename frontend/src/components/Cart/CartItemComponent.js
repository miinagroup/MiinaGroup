import { useState, useEffect } from "react";
import { Row, Col, ListGroup, Form } from "react-bootstrap";
import RemoveFromCartComponent from "../Utils/RemoveFromCartComponent";

const CartItemComponent = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
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

  return (
      <ListGroup.Item className="cart-item">
        <Row className="cart-item-row">
          <Col md={1}>
            <div>
              <img
                crossOrigin="anonymous"
                src={item.image ? item.image ?? null : null}
                className="w-100 img_hovf"
                alt="s"
              />
            </div>
          </Col>
          <Col md={5}>
            <a href={`/product-details/${item.productId}`}>
              <p>
                <strong className="text-uppercase">{item.name}</strong>
              </p>
            </a>
          </Col>
          <Col md={3}>
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
          </Col>
          <Col md={2} className="form-control-container">
            <Form.Control
              type="number"
              min={item.saleunit}
              step={item.saleunit}
              onBlur={handleBlur}
              className="form-control form-control-light"
              value={qty}
              onChange={handleChange}
              disabled={orderCreated}
            />
          </Col>
          {/* delete button trash */}
          <Col md={1} className="remove-from-cart">
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productId={item.cartProducts[0]._id}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
            />
          </Col>
        </Row>
      </ListGroup.Item>
  );
};

export default CartItemComponent;
