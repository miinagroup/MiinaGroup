import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./page.css";

const AddToCartQTYComponent = () => {
  const [quantity, setQuantity] = useState(1);
  let incNum = () => {
    if (quantity > 0) {
      setQuantity(Number(quantity) + 1);
    }
  };
  let decNum = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  let handleChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <div className="btn-group" role="group">
      <button type="button" className="btn_jj" onClick={decNum}>
        {" "}
        -{" "}
      </button>
      <Form.Control
        type="number"
        min={1}
        className="form-control"
        value={quantity}
        onChange={handleChange}
      />
      <button type="button" className="btn_jj" onClick={incNum}>
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default AddToCartQTYComponent;
