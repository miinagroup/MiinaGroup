import React, { useState, useEffect } from "react";
import axios from "axios";

const QuotePriceComponent = ({
  quotePriceData,
  createQuote,
  quoteData,
  mini,
}) => {
  const [formData, setFormData] = useState({
    from: "",
    productName: "",
    description: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [dots, setDots] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [quoteAlreadyInList, setQuoteAlreadyInList] = useState(false);

  const currentUrl = window.location.href;

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

  // console.log('quotePriceDataCCCCCCCompoent',quoteData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const quoteResult = await handleQuotePrice();
      // console.log('quoteResult in handleSubmit', quoteResult);

      if (
        quoteResult &&
        quoteResult.message === "Product already in quotelist"
      ) {
        setResMessage(
          "Product already in quote list! Please check your quote list."
        );
        setQuoteAlreadyInList(true);
        setTimeout(() => {
          setResMessage("");
        }, 4000);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append(
        "from",
        `${quotePriceData.name} <${quotePriceData.email}>`
      );
      formDataToSend.append("productName", quotePriceData.productName);
      formDataToSend.append(
        "description",
        `product-details/${quotePriceData.productId}`
      );

      const res = await axios.post(
        "/api/sendemail/quoteprice",
        formDataToSend,
        config
      );
      // console.log(res.data);

      setFormData({ from: "", productName: "", description: "" });
      setQuoteAlreadyInList(true);
      setResMessage(
        "Quote has been sent. You can track your quote in your quote list."
      );
      setTimeout(() => setResMessage(""), 4000);
    } catch (err) {
      console.log(err);
      console.error("Error details:", err.response || err);
      setResMessage("Error!, Please Refresh Page");
    } finally {
      setIsSending(false);
    }
  };

  const [resMessage, setResMessage] = useState("");
  // console.log("quotePriceData", quotePriceData);
  // console.log("quoteData", quoteData);

  const handleQuotePrice = async () => {
    try {
      console.log(quoteData);
      const response = await createQuote(quoteData);
      // console.log("child",response.message);
      return response;
    } catch (error) {
      console.log(error);
      console.error("Error details:", error.response || error);
      setResMessage("Error!, Please Refresh Page");
    }
  };

  // console.log(mini);

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* TODO: have user's name here as from */}
          <div className="form-group" style={{ display: "none" }}>
            <input
              className="form-control "
              type="text"
              name="from"
              required
              placeholder="From:"
              value="{from}"
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ display: "none" }}>
            <input
              className="form-control "
              type="text"
              name="productName"
              required
              placeholder="Product Name:"
              value="{productName}"
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ display: "none" }}>
            <textarea
              className="form-control "
              name="description"
              required
              placeholder="Description"
              value="{description}"
              onChange={handleChange}
            />
          </div>

          <div className="form-group" hidden={mini === true}>
            <button
              className="btn btn-block btn-success"
              disabled={
                isSending || resMessage || quoteAlreadyInList || !quoteData
              }
            >
              {isSending ? `Sending${dots}` : "Request Quote"}
            </button>
          </div>

          <div
            className="form-group d-flex justify-content-center"
            hidden={mini !== true}
          >
            <button
              style={{ marginBottom: "0.7em" }}
              className="btn btn-block btn-success"
              disabled={
                isSending || resMessage || quoteAlreadyInList || !quoteData
              }
              hidden={mini !== true}
            >
              {isSending
                ? `Sending${dots}`
                : quoteAlreadyInList
                ? "Quote Added"
                : "Request Quote"}
            </button>
          </div>
        </form>
        {resMessage && mini !== true && (
          <div
            className="alert mt-2 w-75 p-1"
            role="alert"
            style={{ backgroundColor: "lightgray" }}
          >
            <p className="m-0 ms-2 mb-2">{resMessage}</p>
            {/* <p className="m-0 ms-2 mb-2">Email has been sent, Thanks for your quote.</p>
            <p className="m-0 ms-2">One of our finest team members will reach out to you soon</p> */}
          </div>
        )}
      </div>
    </>
  );
};

export default QuotePriceComponent;
