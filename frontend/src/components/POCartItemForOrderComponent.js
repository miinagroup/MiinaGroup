import { Row, Col, ListGroup, Form, Table } from "react-bootstrap";
import RemoveFromOrderComponent from "./RemoveFromOrderComponent";
import { useState, useEffect } from "react";

import React from "react";
import axios from "axios";

const POCartItemForOrderComponent = ({ item, backOrderStatus }) => {
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
          <td style={{ width: "30%" }}>
            <a href={`/product-details/${item.productId}`}>
              <strong
                className="text-uppercase"
                style={{
                  color:
                    item.poCartProducts[0].backOrderQty > 0 &&
                    backOrderStatus === true
                      ? "red"
                      : "#1E4881",
                }}
              >
                {item.name} - ({item.poCartProducts[0].attrs})
              </strong>
            </a>
          </td>
          <td style={{ width: "10%" }}>
            <p className="m-0">{item.poCartProducts[0].suppliersku}</p>
          </td>

          <td style={{ width: "10%" }}>
            <p className="m-0">{item.poCartProducts[0].ctlsku}</p>
          </td>

          <td style={{ width: "10%" }}>
            {item.poCartProducts[0].purchaseprice}
          </td>
          <td style={{ width: "10%" }}>{item.poCartProducts[0].quantity}</td>
          <td style={{ width: "10%" }}>{item.poCartProducts[0].receivedQty}</td>
          <td
            style={{
              width: "10%",
              color:
                item.poCartProducts[0].backOrderQty > 0 &&
                backOrderStatus === true
                  ? "red"
                  : "#1E4881",
              fontWeight: item.poCartProducts[0].backOrderQty > 0 &&
              backOrderStatus === true
                ? "bold"
                : "",
            }}
          >
            {item.poCartProducts[0].backOrderQty}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default POCartItemForOrderComponent;
