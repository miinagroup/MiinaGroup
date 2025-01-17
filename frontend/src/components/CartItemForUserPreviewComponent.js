import React from "react";

const CartItemForUserPreviewComponent = ({ item }) => {

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
          <td style={{ width: "10%" }}>
            <p className="m-0">{item.cartProducts[0].mnasku}</p>
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
