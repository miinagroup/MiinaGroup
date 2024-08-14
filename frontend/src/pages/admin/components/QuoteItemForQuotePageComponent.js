import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import { Row, Col, Container, ListGroup, Button, Form } from "react-bootstrap";

const QuoteItemForQuotePageComponent = ({
  id,
  updateQuote,
  getQuote,
  markAsProcessing,
  userQuoteAction,
  refreshQuotes,
  getStatusColor,
  adminDuplicateQuote,
  handleClose,
}) => {
  const [product, setProduct] = useState(null);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [needRefresh, setNeedRefresh] = useState(false);

  const [ctlsku, setCtlsku] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [todayDate, setTodayDate] = useState("");
  const [daysDifference, setDaysDifference] = useState("");

  const [quoteName, setQuoteName] = useState("");

  useEffect(() => {
    setQuoteName(quote?.name);
    const today = new Date();
    setTodayDate(today.toISOString().substring(0, 10));

    if (quote?.expireDate) {
      const expiryDate = new Date(quote.expireDate);
      const timeDiff = expiryDate - today;
      const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      setDaysDifference(dayDiff);
    }
  }, [quote]);

  useEffect(() => {
    setExpireDate(daysDifference);
  }, [daysDifference]);

  const refreshQuoteItem = () => {
    getQuote(id)
      .then((quote) => {
        setQuote(quote);
        setProduct(quote.product);
        setCtlsku(quote.product?.stock[0].ctlsku);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    refreshQuoteItem();
  }, [getQuote, id, refreshQuotes]);

  // console.log(getQuote, id, refreshQuotes, product);

  const handleUpdateNewQuote = async () => {
    try {
      const expireDays = parseInt(expireDate, 10);
      if (!isNaN(expireDays)) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + expireDays);
        const expiryDateString = currentDate.toISOString().split("T")[0];

        const updatedData = await updateQuote(id, {
          ctlsku,
          expireDate: expiryDateString,
          status: "Completed",
          adminMessage: adminMessage,
        });
        console.log("updatedData", updatedData);
        setExpireDate("");
      } else {
        setError("Invalid number of days for expiration");
      }
    } catch (error) {
      console.error("Error updating quote:", error);
      setError("Failed to update quote");
    }
  };

  /*   const updateNewQuote = async () => {
      try {
        const updatedData = await updateQuote(id, { ctlsku, expireDate });
        console.log(updatedData);
      } catch (error) {
        console.error('Error updating quote:', error);
        setError('Failed to update quote');
      }
    }; */

  // console.log("quote", quote);

  /* **************** Image check (unvalid url) **************** */
  async function fetchImage(url) {
    try {
      const response = await fetch(url);
      return response;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function handleImages() {
      const imagesArray = [];
      if (product && product.images) {
        for (const image of product.images) {
          let imagePath = image.path;

          if (imagePath.includes("http://")) {
            imagePath = imagePath.replace("http://", "https://");
          }
          imagesArray.push({
            original: imagePath,
            thumbnail: imagePath,
            url: imagePath,
            title: image.title,
            caption: image.name,
          });
          // const isExists = await fetchImage(imagePath);
          // if (isExists.ok) {
          //   imagesArray.push({
          //     original: imagePath,
          //     thumbnail: imagePath,
          //     url: imagePath,
          //     title: image.title,
          //     caption: image.name,
          //   });
          // }
        }
      } else {
        if (quote && quote.clientImages) {
          for (const image of quote.clientImages) {
            let imagePath = image.path;

            if (imagePath.includes("http://")) {
              imagePath = imagePath.replace("http://", "https://");
            }
            const isExists = await fetchImage(imagePath);
            if (isExists.ok) {
              imagesArray.push({
                original: imagePath,
                thumbnail: imagePath,
                url: imagePath,
                title: image.title,
                caption: image.name,
              });
            }
          }
        }
      }
      setImages(imagesArray);
    }
    handleImages();
  }, [quote, product]);

  /* **************** Complete Quote **************** */
  const [completeQuoteResponseState, setCompleteQuoteResponseState] =
    useState("");

  const [adminMessage, setAdminMessage] = useState("");
  const handleCompleteQuote = async () => {
    if (product.stock[0].price > 0 && product.displayPrice > 0) {
      try {
        const expireDays = parseInt(expireDate, 10);
        if (!isNaN(expireDays)) {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + expireDays);
          const expiryDateString = currentDate.toISOString().split("T")[0];
          console.log("expiryDateString", expiryDateString);

          const updatedData = await markAsProcessing(
            id,
            expiryDateString,
            adminMessage
          );
          console.log("completeQuote", updatedData);

          if (updatedData.message === "Quote status updated") {
            // window.location.reload();
            console.log("I am here if");
            handleClose();
            refreshQuotes();
          }
        } else {
          console.log("I am here else");
          const updatedData = await markAsProcessing(id);
          if (updatedData.message === "Product expire date is not exist!!!") {
            setCompleteQuoteResponseState(
              "Product expire date does not exist!!!"
            );
          } else if (
            updatedData.message === "Product expire date is in the past."
          ) {
            setCompleteQuoteResponseState(
              "Product price valid date is in the past. Please update the product expired date."
            );
          }
          if (updatedData.message === "Quote status updated") {
            // window.location.reload();
            console.log("I am here if 2");

            handleClose();
            refreshQuotes();
          }
        }
      } catch (error) {
        console.error("Error updating quote:", error);
        setError("Failed to update quote");
      }
    } else {
      setCompleteQuoteResponseState(
        "Please check product display price and sell price!!!"
      );
    }
  };

  // console.log(completeQuoteResponseState);

  const receivedHandler = async (quoteId) => {
    markAsProcessing(quoteId)
      .then(() => {
        refreshQuotes();
      })
      .catch((err) => console.error("Error in userQuoteAction:", err));
  };

  const handleUserAcceptQuote = (quote, accept) => {
    // console.log("handleUserAcceptQuote", quote, accept);
    userQuoteAction(quote, accept)
      .then(() => {
        refreshQuotes();
      })
      .catch((err) => console.error("Error in userQuoteAction:", err));
  };

  const [updateQuoteButton, setUpdateQuoteButton] = useState(false);
  const updateQuoteButtonHandler = () => {
    setUpdateQuoteButton(true);
  };

  const [contacted, setContacted] = useState(false);
  const contactedClient = () => {
    if (updateQuoteButton === false && contacted === false) {
      setContacted(true);
    } else if (updateQuoteButton === false && contacted === true) {
      setContacted(false);
      setUpdateQuoteButton(false);
    } else if (updateQuoteButton === true && contacted === true) {
      setContacted(false);
      setUpdateQuoteButton(false);
    } else if (updateQuoteButton === true && contacted === false) {
      setContacted(false);
      setUpdateQuoteButton(false);
    }
  };

  // console.log(updateQuoteButton, contacted);
  const [duplicateCount, setDuplicateCount] = useState(1);
  const [processDuplicateQuotes, setProcessDuplicateQuotes] = useState(false);
  const [duplicateQuoteButton, setDuplicateQuoteButton] = useState(false);
  const [adminMessageButton, setAdminMessageButton] = useState(false);

  const handleAdminMessageButton = () => {
    if (adminMessageButton === true) {
      setAdminMessage("");
      setAdminMessageButton(false);
    } else {
      setAdminMessageButton(true);
    }
  };

  const duplicateQuoteHandler = (quoteId, number) => {
    setProcessDuplicateQuotes(true);
    adminDuplicateQuote(quoteId, number)
      .then(() => {
        refreshQuotes();
        handleClose();
        setProcessDuplicateQuotes(false);
      })
      .catch((err) => console.error("Error in adminDuplicateQuote:", err));
  };

  // console.log("quoteName", quoteName);

  const [nameUpdating, setNameUpdating] = useState(false);

  const adminUpdateQuoteName = async () => {
    try {
      setNameUpdating(true);
      const updatedData = await axios.put(
        "/api/quotes/admin/updateName?quoteId=" + quote._id,
        {
          quoteName: quoteName,
        }
      );
      if (updatedData.status === 200) {
        refreshQuotes();
        setNameUpdating(false);
        setUpdateName(false);
      }
      // console.log(updatedData);
    } catch (error) {
      console.error("Error updating quote:", error);
      setError("Failed to update quote");
    }
  };

  const [updateName, setUpdateName] = useState(false);

  const handleInputChange = (e) => {
    setQuoteName(e.target.value);
  };

  return (
    <>
      {product && product ? (
        // ******************** EXISTING PRODUCT ********************
        <Container className="mt-3" fluid>
          <h2 className="text-center">{product.name}</h2>
          <hr />
          <Row className="">
            <Col lg={6} className="">
              <ImageGallery items={images} />
            </Col>
            <Col lg={6}>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h6>Product Code: {product.stock[0].ctlsku}</h6>
                        <h6>Supplier Code: {product.stock[0].suppliersku}</h6>
                        <h6>Supplier: {product.supplier}</h6>
                        <h6>
                          Product Price:
                          <span
                            style={{
                              color:
                                product.stock[0].price > 0 ? "black" : "red",
                            }}
                          >
                            {" "}
                            $ {product.stock[0].price}
                          </span>
                        </h6>
                        <h6>
                          Display Price:
                          <span
                            style={{
                              color: product.displayPrice > 0 ? "black" : "red",
                            }}
                          >
                            {" "}
                            $ {product.displayPrice}
                          </span>
                        </h6>

                        <h6
                          style={{
                            color:
                              product?.expireDate &&
                                new Date(
                                  product.expireDate
                                    .split(" ")[1]
                                    .split("/")
                                    .reverse()
                                    .join("-")
                                ) < new Date()
                                ? "red"
                                : "",
                          }}
                        >
                          Product Expires on:{" "}
                          {product.expireDate
                            ? product.expireDate.split(" ")[1]
                            : "NaN"}
                        </h6>
                        <h6 hidden={!quote?.expireDate}>
                          Quote Expires on:{" "}
                          {quote?.expireDate?.substring(0, 10)} 【
                          <span
                            style={{
                              color: `${Math.abs(daysDifference) > 7 ? "" : "red"
                                }`,
                            }}
                          >
                            {daysDifference}
                          </span>
                          】
                        </h6>
                      </Col>
                    </Row>
                    {
                      quote.repeatPurchase.length > 0 ? (
                        <Row className="m-1" style={{ backgroundColor: "#f0ead2", width: "50%" }}>
                          <Col>
                            <h6>Purchase History:</h6>
                            {
                              quote.repeatPurchase.map((item) => {
                                return <p>Purchased on : {item.purchasedDate?.substring(0, 10)}</p>
                              })
                            }
                          </Col>
                        </Row>
                      ) : ("")
                    }
                    <Row>
                      <Col className="">
                        <div className="">
                          <div className=""></div>
                          {quote.status === "Completed" ? null : (
                            <>
                              <Button
                                className="CTL_btn p-1 pe-3 ps-3 mt-2"
                                onClick={() => {
                                  setNeedRefresh(true);
                                  setCompleteQuoteResponseState("");
                                  receivedHandler(quote?._id);
                                  window.open(
                                    `/admin/edit-product/${product._id}`
                                  );
                                }}
                              >
                                Edit <i class="bi bi-box-arrow-up-right"></i>
                              </Button>
                              <br />
                              <Button
                                className="CTL_btn p-1 pe-3 ps-3 mt-2"
                                onClick={() => {
                                  setNeedRefresh(false);
                                  refreshQuoteItem();
                                }}
                                hidden={needRefresh === false}
                              >
                                Refresh
                              </Button>
                              <Button
                                className="CTL_btn p-1 pe-3 ps-3 mt-2"
                                onClick={handleCompleteQuote}
                                disabled={
                                  completeQuoteResponseState ===
                                  "Product price valid date is in the past. Please update the product expired date."
                                }
                                hidden={needRefresh === true}
                              >
                                Complete
                              </Button>
                              <br />
                              <textarea
                                className="mt-2 w-100"
                                placeholder="add admin message"
                                value={adminMessage}
                                onChange={(e) =>
                                  setAdminMessage(e.target.value)
                                }
                              />
                              {completeQuoteResponseState ===
                                "Product expire date does not exist!!!" ? (
                                <input
                                  className="mt-2"
                                  type="number"
                                  placeholder="1 day before expire"
                                  value={expireDate}
                                  required
                                  onChange={(e) =>
                                    setExpireDate(e.target.value)
                                  }
                                />
                              ) : null}
                              <br />
                              {completeQuoteResponseState && (
                                <span className="text-danger">
                                  {completeQuoteResponseState}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {quote.status === "Completed" ? (
                        <>
                          {quote.existingProduct ? null : (
                            <>
                              <hr className="m-0" />
                              <h6 className="mt-1">
                                Quoted Name: {quote.name}
                              </h6>
                              <h6 className="mt-1">Quoted Description: </h6>
                              <p>{quote.userDescription}</p>
                            </>
                          )}

                          <hr className="mb-1" />
                          <h6>
                            Satus:{" "}
                            <span
                              style={{
                                color: getStatusColor(quote.status),
                                fontWeight: "bold",
                              }}
                            >
                              {quote.status ? quote.status : null}
                            </span>
                          </h6>
                          <h6>
                            Action:{" "}
                            <span
                              style={{
                                color: quote.accepted
                                  ? "green"
                                  : quote.accepted === undefined
                                    ? "black"
                                    : "red",
                              }}
                            >
                              {quote.accepted === undefined
                                ? "Waiting"
                                : quote.accepted
                                  ? "Accepted"
                                  : "Declined"}
                            </span>{" "}
                            {quote.accepted === false ? (
                              <button
                                onClick={() => {
                                  handleUserAcceptQuote(quote._id, true);
                                }}
                                hidden={updateQuoteButton === false}
                              >
                                {" "}
                                Mark as Accepted
                              </button>
                            ) : null}
                          </h6>
                          <button
                            className="w-auto ms-3"
                            onClick={updateQuoteButtonHandler}
                            hidden={
                              updateQuoteButton === true || contacted === false
                            }
                          >
                            Update Quote
                          </button>
                          <Form hidden={updateQuoteButton === false}>
                            <h4 className="mb-3">Update Quote Item:</h4>
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm="3">
                                CTL Sku:
                              </Form.Label>
                              <Col sm="9">
                                <Form.Control
                                  type="text"
                                  placeholder="CTL SKU"
                                  name="ctlsku"
                                  value={ctlsku}
                                  required
                                  onChange={(e) => setCtlsku(e.target.value)}
                                />
                              </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm="3">
                                Expires in:
                              </Form.Label>
                              <Col sm="9">
                                <Form.Control
                                  type="number"
                                  placeholder="1 day before expire"
                                  value={expireDate}
                                  required
                                  onChange={(e) =>
                                    setExpireDate(e.target.value)
                                  }
                                />
                              </Col>
                            </Form.Group>

                            <Button
                              type="submit"
                              className="CTL_btn p-1 pe-3 ps-3"
                              onClick={handleUpdateNewQuote}
                            >
                              Submit
                            </Button>
                            <br />
                            <Button
                              className="CTL_btn p-1 pe-3 ps-3 mt-2"
                              onClick={() =>
                                window.open(
                                  `/admin/edit-product/${product._id}`
                                )
                              }
                            >
                              Edit Product{" "}
                              <i class="bi bi-box-arrow-up-right"></i>
                            </Button>
                          </Form>
                          {quote.accepted === false ? (
                            <div>
                              <hr />
                              <h6>
                                User:{" "}
                                <span>
                                  {quote.user?.name +
                                    " " +
                                    quote.user?.lastName}
                                </span>
                              </h6>
                              <h6 className="mt-1" hidden={!quote.user?.mobile}>
                                Mobile: <span>{quote.user?.mobile}</span>
                              </h6>
                              <h6 className="mt-1" hidden={!quote.user?.phone}>
                                Phone: <span>{quote.user?.phone}</span>
                              </h6>
                              <h6 className="mt-1">
                                Company: <span>{quote.user?.company}</span>
                              </h6>
                              <h6 className="mt-1">
                                Site: <span>{quote.user?.location}</span>
                              </h6>
                              <Form.Check
                                type="checkbox"
                                label=" Contacted Client"
                                onClick={() => contactedClient()}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        // ******************** NEW PRODUCT ********************
        <Container className="mt-3" fluid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {updateName ? (
              <>
                <input
                  type="text"
                  value={quoteName}
                  onChange={handleInputChange}
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
                <Button
                  className="CTL_btn p-0 ps-1 pe-1 ms-2"
                  onClick={() => adminUpdateQuoteName()}
                >
                  {nameUpdating ? "Updating..." : "Update"}
                </Button>
              </>
            ) : (
              <h2
                onClick={() => setUpdateName(true)}
                style={{
                  cursor: "pointer",
                }}
              >
                {quoteName}
              </h2>
            )}
          </div>
          <hr />
          <Row className="">
            <Col lg={6} className="d-flex justify-content-center">
              {images.length > 0 ? (
                <ImageGallery items={images} />
              ) : (
                <div className="border border-1 mb-3 p-3 rounded-3">
                  No Images Uploaded
                </div>
              )}
            </Col>
            <Col lg={6}>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <p
                          className="fw-bold fs-5"
                          style={{
                            color:
                              quote?.quoteType &&
                                quote?.quoteType === "Exact_Product_Required"
                                ? "red"
                                : "#1E4881",
                          }}
                          hidden={quote?.product}
                        >
                          {quote?.quoteType?.replace(/_/g, " ")}
                        </p>
                        <p className="fw-bold">Quantity: {quote?.quantity}</p>
                        <h4>User Description:</h4>
                        <p>{quote?.userDescription}</p>
                        <hr />
                      </Col>
                    </Row>
                    <ListGroup.Item className="mb-4">
                      <button
                        className="m-2 mt-0"
                        onClick={() =>
                          setDuplicateQuoteButton(!duplicateQuoteButton)
                        }
                      >
                        {duplicateQuoteButton
                          ? "Update Quotes"
                          : "Duplicate Quotes"}
                      </button>
                      <button
                        className="m-2 mt-0"
                        onClick={() => handleAdminMessageButton()}
                        hidden={quote?.status === "Completed"}
                      >
                        {adminMessageButton
                          ? "Dismiss Message"
                          : "Add Admin Message"}
                      </button>
                      <Form>
                        <div hidden={!duplicateQuoteButton}>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                              Duplicate:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                type="number"
                                value={duplicateCount}
                                onChange={(e) =>
                                  setDuplicateCount(e.target.value)
                                }
                                min="1"
                              />
                            </Col>
                          </Form.Group>
                          <Button
                            className="CTL_btn p-1 pe-3 ps-3"
                            onClick={() =>
                              duplicateQuoteHandler(quote?._id, duplicateCount)
                            }
                            disabled={processDuplicateQuotes === true}
                          >
                            Duplicate Quote
                          </Button>
                        </div>

                        <div hidden={duplicateQuoteButton}>
                          <h4 className="mb-3">Admin Part:</h4>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                              CTL Sku:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                type="text"
                                placeholder="CTL SKU"
                                value={ctlsku}
                                required
                                name="ctlsku"
                                onChange={(e) => setCtlsku(e.target.value)}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                              Expires in:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                type="number"
                                placeholder="1 day before expire"
                                defaultValue={daysDifference}
                                value={expireDate}
                                required
                                name="expireDate"
                                onChange={(e) => setExpireDate(e.target.value)}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group
                            as={Row}
                            className="mb-3"
                            hidden={adminMessageButton === false}
                          >
                            <Form.Label column sm="3">
                              Admin Message:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                as="textarea"
                                placeholder="add message here"
                                value={adminMessage}
                                name="adminMessage"
                                onChange={(e) =>
                                  setAdminMessage(e.target.value)
                                }
                              />
                            </Col>
                          </Form.Group>

                          <Button
                            type="submit"
                            className="CTL_btn p-1 pe-3 ps-3"
                            onClick={handleUpdateNewQuote}
                          >
                            Submit
                          </Button>
                          <Button
                            className="CTL_btn p-1 pe-3 ps-3 ms-2"
                            onClick={() => {
                              window.open("/admin/create-new-product");
                            }}
                          >
                            Create New Product{" "}
                            <i class="bi bi-box-arrow-up-right"></i>
                          </Button>
                        </div>
                      </Form>
                    </ListGroup.Item>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default QuoteItemForQuotePageComponent;
