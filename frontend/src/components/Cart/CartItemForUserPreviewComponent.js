import React from "react";

const CartItemForUserPreviewComponent = ({ item }) => {

  return (
      <tbody style={{
        color: "#483F55",
        border: "1px solid #DBA162"
      }}>
        <tr>
          <td style={{ width: "10%", padding:"10px 10px 10px 10px" }}>
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image ?? null : null}
              className="w-100 img_hovf"
              alt="s"
            />
          </td>
          <td style={{ width: "25%", padding:"0px 25px 0px 0px"  }}>
            <a href={`/product-details/${item.productId}`} className="text-uppercase"
                style={{
                  color: "#483F55",
                }}>
                {item.name} - ({item.cartProducts[0].attrs})
            </a>
          </td>
          <td style={{ width: "10%" }}>
            <p className="m-0">{item.cartProducts[0].mnasku}</p>
          </td>
          <td style={{ width: "10%" }}>{item.cartProducts[0].price}</td>
          <td style={{ width: "9%" }}>{item.cartProducts[0].quantity}</td>
          <td style={{ width: "11%" }}>{item.cartProducts[0].suppliedQty}</td>
          <td style={{ width: "10%" }}>{item.cartProducts[0].backOrder}</td>
        </tr>
      </tbody>
  );
};

export default CartItemForUserPreviewComponent;
