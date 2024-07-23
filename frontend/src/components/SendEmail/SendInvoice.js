import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quotes.css";

const SendInvoice = (invDate) => {
  const [formData, setFormData] = useState({
    billingEmail: "",
    totalPrice: "",
    base64data: "",
    purchaseNumber:"",
    invoiceNumber:""
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

// console.log("Inv Email Date", invDate.invDate?.billingEmail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "billingEmail",
      `${invDate.invDate.billingEmail}`
    );    
    formDataToSend.append(
      "purchaseNumber",
      `${invDate.invDate.purchaseNumber}`
    );
    formDataToSend.append(
      "totalPrice",
      `${(invDate.invDate.cartSubtotal).toFixed(2)}`
    );
    formDataToSend.append(
      "invoiceNumber",
      `${(invDate.invDate.invoiceNumber)}`
    );
    formDataToSend.append("base64data", `${invDate.invDate.base64data}`);
    try {
      setIsSending(true);
      const res = await axios.post(
        "/api/sendemail/emailInv",
        formDataToSend,

        config
      );
      console.log(res.data);
      setIsSending(false);
      setFormData({
        from: "",
        totalPrice: "",
        billingEmail: "",
      });
      setSuccessMessage("Email sent successfully");
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
                successMessage
                /* 
                invDate.invDate.sentInvButtonDisabled === true
                 */
              }
            >
              {isSending ? `Sending${dots}` : "sent invoice to client"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SendInvoice;
