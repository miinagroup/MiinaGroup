import { Form } from "react-bootstrap";

const CartItemForUserOrderComponent = ({
  item,
  orderCreated = false,
}) => {

  const itemPrice = item.cartProducts[0].price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
      <tbody style={{background: "rgba(219, 161, 98, 0.25)", border: "1px solid #DBA162" }}>
        <tr>
          <td style={{ width: "7%" }} className="p-2">
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image ?? null : null}
              className="w-100 img_hovf"
              alt="s"
            />
          </td>
          <td style={{ width: "35%" }} className="p-2">
            <a href={`/product-details/${item.productId}`} >
              <strong className="text-uppercase" style={{ color: "#483F55", fontFamily:"HelveticaNeue" }}>
                {item.name}
              </strong>
            </a>
          </td>
          <td style={{ width: "18%", color: "#483F55" }}>
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
          <td style={{ width: "10%"}} className="p-2">
            <Form.Control
              type="number"
              className="form-control"
              value={item.cartProducts[0].quantity}
              disabled={orderCreated}
              style={{ backgroundColor: "rgba(72, 63, 85, 0.2)", border: "none" }}

            />
          </td>
          <td style={{ width: "10%" }} className="p-2">
            <Form.Control
              className="form-control pe-0"
              value={item.cartProducts[0].suppliedQty}
              disabled={orderCreated}
              style={{ backgroundColor: "rgba(72, 63, 85, 0.2)", border: "none" }}

            />
          </td>
          <td style={{ width: "10%" }} className="p-2">
            <Form.Control
              type="number"
              className="form-control pe-0"
              value={item.cartProducts[0].backOrder}
              disabled={orderCreated}
              style={{ backgroundColor: "rgba(72, 63, 85, 0.2)", border: "none" }}
            />
          </td>

        </tr>
      </tbody>
  );
};

export default CartItemForUserOrderComponent;
