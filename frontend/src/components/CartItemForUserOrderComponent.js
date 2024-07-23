import { Form } from "react-bootstrap";

import React from "react";

const CartItemForUserOrderComponent = ({
  item,
  orderCreated = false,
}) => {

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
          {
            (item.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) ? (
              <>
                <td style={{ width: "35%" }} className="p-2">
                  <a href={`/uniform-details/${item.productId}`} >
                    <strong className="text-uppercase" style={{ color: "#1E4881" }}>
                      {item.name}
                    </strong>
                  </a>
                </td>
                <td style={{ width: "18%" }}>
                  <p className="m-0">
                    Item:{" "}
                    <span className="fw-bold">{item.cartProducts[0].attrs.split("/")[1]}</span>
                  </p>
                  <p className="m-0">
                    Variant:{" "}
                    <span className="fw-bold">{item.cartProducts[0].color + " (" + item.cartProducts[0].size + ")"}</span>
                  </p>
                </td>
              </>
            ) : (
              <>
                <td style={{ width: "35%" }} className="p-2">
                  <a href={`/product-details/${item.productId}`} >
                    <strong className="text-uppercase" style={{ color: "#1E4881" }}>
                      {item.name}
                    </strong>
                  </a>
                </td>
                <td style={{ width: "18%" }}>
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
                </td>
              </>
            )
          }


          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              className="form-control"
              value={item.cartProducts[0].quantity}
              disabled={orderCreated}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              className="form-control pe-0"
              value={item.cartProducts[0].suppliedQty}
              disabled={orderCreated}
            />
          </td>
          <td style={{ width: "10%" }}>
            <Form.Control
              type="number"
              className="form-control pe-0"
              value={item.cartProducts[0].backOrder}
              disabled={orderCreated}
            />
          </td>
          {/* <td
            style={{
              width: "10%",
              textAlign: "center",
            }}
          >
            {item.cartProducts[0].quantity}
          </td>
          <td
            style={{
              width: "10%",
              textAlign: "center",
            }}
          >
            {item.cartProducts[0].suppliedQty}
          </td>
          <td
            style={{
              width: "10%",
              textAlign: "center",
            }}
          >
            {item.cartProducts[0].backOrder}
          </td> */}
        </tr>
      </tbody>
    </>
  );
};

export default CartItemForUserOrderComponent;
