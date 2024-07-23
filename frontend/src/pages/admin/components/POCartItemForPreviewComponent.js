import React, { useEffect, useState } from "react";

const POCartItemForPreviewComponent = ({
  item,
  onLocalUpdate,
  receivePO,
  backOrderStatus,
}) => {
  const [receivedQty, setReceivedQty] = useState(
    item.poCartProducts[0].receivedQty
  );
  const [backOrderQty, setBackOrderQty] = useState(
    item.poCartProducts[0].backOrderQty
  );

  const [receivingQty, setReceivingQty] = useState(0);

  const handleBlur = () => {
    onLocalUpdate(
      item.poCartProducts[0]._id,
      receivedQty,
      backOrderQty,
      receivingQty
    );
  };

  useEffect(() => {
    setBackOrderQty(
      item.poCartProducts[0].quantity - receivedQty - receivingQty
    );
    setReceivedQty(item.poCartProducts[0].receivedQty);
  }, [receivingQty]);

  const maxReceivingQty = item.poCartProducts[0].quantity - receivedQty;

  const handleReceivingQtyChange = (e) => {
    const newReceivingQty = parseInt(e.target.value, 10) || 0;
    if (newReceivingQty <= maxReceivingQty) {
      setReceivingQty(newReceivingQty);
    } else {
      setReceivingQty(maxReceivingQty);
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td style={{ width: "5%" }}>
            <img
              crossOrigin="anonymous"
              src={item.image ? item.image ?? null : null}
              className="w-100 img_hovf"
              alt="s"
            />
          </td>
          <td style={{ width: "30%" }}>
            <a href={`/product-details/${item.productId}`} tabIndex={-1}>
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
          <td style={{ width: "13%" }}>
            <p className="m-0">{item.poCartProducts[0].ctlsku}</p>
          </td>
          <td style={{ width: "12%" }}>{item.poCartProducts[0].suppliersku}</td>
          <td style={{ width: "8%" }}>
            {item.poCartProducts[0].purchaseprice}
          </td>
          <td style={{ width: "8%" }}>{item.poCartProducts[0].quantity}</td>

          <td style={{ width: "8%" }}>{item.poCartProducts[0].receivedQty}</td>
          <td
            style={{
              width: "8%",
              color:
                item.poCartProducts[0].backOrderQty > 0 &&
                backOrderStatus === true
                  ? "red"
                  : "",
              fontWeight:
                item.poCartProducts[0].backOrderQty > 0 &&
                backOrderStatus === true
                  ? "bold"
                  : "",
            }}
          >
            {item.poCartProducts[0].backOrderQty}
          </td>
          <td style={{ width: "8%" }}>
            {receivePO ? (
              <input
                type="number"
                value={receivingQty}
                onChange={handleReceivingQtyChange}
                onBlur={handleBlur}
                style={{ width: "85%" }}
                max={maxReceivingQty}
              />
            ) : (
              receivingQty
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default POCartItemForPreviewComponent;
