import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quotes.css";

const QuoeteManagementApproval = (quotePriceData, cartItems) => {
  const [formData, setFormData] = useState({
    from: "",
    managerEmail: "",
    totalPrice: "",
    description: "",
    base64data: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [dots, setDots] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let interval = null;

    if (isSending) {
      interval = setInterval(() => {
        setDots((dots) => {
          if (dots.length === 6) {
            return "";
          }
          return dots + ".";
        });
      }, 500);
    } else {
      clearInterval(interval);
      setDots("");
    }

    return () => clearInterval(interval);
  }, [isSending]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cartItemsString = quotePriceData.quotePriceData.cartItems
    .map(
      (item, idx) =>
        `
    ${idx + 1}. ${item.name} -Item: ${item.cartProducts[0].attrs} - Quantity: ${
          item.cartProducts[0].quantity
        } - Unit price: $${item.cartProducts[0].price}\n `
    )
    .join("");

  const receiverEmail = quotePriceData.quotePriceData.managerEmail?.split("@")[1];
  const senderEmail = quotePriceData.quotePriceData.email?.split("@")[1]
  const base64data = quotePriceData.quotePriceData.base64Data.base64data
  

  // console.log("quotePriceDataCCCCCCCompoent", base64data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "from",
      `${quotePriceData.quotePriceData.name} <${quotePriceData.quotePriceData.email}>`
    );
    formDataToSend.append(
      "managerEmail",
      `${quotePriceData.quotePriceData.managerEmail}`
    );
    formDataToSend.append(
      "totalPrice",
      `${(quotePriceData.quotePriceData.cartSubtotal * 1.1).toFixed(2)}`
    );
    formDataToSend.append("description", `${cartItemsString}`);
    formDataToSend.append("base64data", `${base64data}`);
    try {
      setIsSending(true);
      const res = await axios.post(
        "/api/sendemail/managementApproval",
        formDataToSend,

        config
      );
      console.log(res.data);
      setIsSending(false);
      setFormData({
        from: "",
        totalPrice: "",
        managerEmail: "",
        description: "",
      });
      setSuccessMessage("Email sent successfully");

      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <button
              className="btn btn-success p-0 ps-1 pe-1 w-100 download_cart_btn"
              disabled={
                isSending ||
                successMessage ||
                receiverEmail !== senderEmail ||
                quotePriceData.quotePriceData.cartItems.length === 0
              }
            >
              {isSending ? `Sending${dots}` : "Email Cart"}
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="alert mt-2 p-1 managementAprroval_alert" role="alert">
            <p className="m-1">The cart has been successfully emailed.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default QuoeteManagementApproval;
