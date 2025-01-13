import { useState, useEffect } from "react";

import React from "react";

const CartItemForUserPreviewComponent = ({ item }) => {
  // const [clientSKU, setClientSKU] = useState("");
  const [ctlsku, setCtlsku] = useState(item.cartProducts[0].ctlsku);

  // const getSLRSKUByCTLSKU = async (ctlsku) => {
  //   try {
  //     const response = await fetch(
  //       `/api/products/getClientSKU/${ctlsku}`
  //     );
  //     const data = await response.json();
  //     return data.slrsku;
  //   } catch (error) {
  //     console.error("Failed to fetch slrsku:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   if (!item.cartProducts[0].attrs.includes("UNIFORM")) {
  //     const fetchSLRSKU = async () => {
  //       const fetchedSLRSKU = await getSLRSKUByCTLSKU(ctlsku);
  //       setClientSKU(fetchedSLRSKU);
  //     };

  //     fetchSLRSKU();
  //   }

  // }, [ctlsku]);

  return (
    <>
      <tbody>
        <tr>
          <td style={{ width: "10%" }}>
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image ?? null : null}
              className="w-100 img_hovf"
              alt="s"
            />
          </td>
          <td style={{ width: "25%" }}>
            <a href={`/product-details/${item.productId}`}>
              <strong
                className="text-uppercase"
                style={{
                  color: "#1E4881",
                }}
              >
                {item.name} - ({item.cartProducts[0].attrs})
              </strong>
            </a>
          </td>
          {/* <td style={{ width: "10%" }}>{clientSKU}</td> */}

          <td style={{ width: "10%" }}>
            <p className="m-0">{item.cartProducts[0].ctlsku}</p>
          </td>
          <td style={{ width: "10%" }}>{item.cartProducts[0].price}</td>
          <td style={{ width: "9%" }}>{item.cartProducts[0].quantity}</td>
          <td style={{ width: "11%" }}>{item.cartProducts[0].suppliedQty}</td>
          <td style={{ width: "10%" }}>{item.cartProducts[0].backOrder}</td>
        </tr>
      </tbody>
    </>
  );
};

export default CartItemForUserPreviewComponent;
