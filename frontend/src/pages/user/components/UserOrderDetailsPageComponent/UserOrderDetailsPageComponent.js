import {
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
  Modal,
  ListGroupItem
} from "react-bootstrap";
import CartItemForUserOrderComponent from "../../../../components/Cart/CartItemForUserOrderComponent";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../invoicePDF.css";
import styles from "./UserOrderDetailsPageComponent.module.css";
import InvoicePrint from "../../../../components/Pdfs/InvoicePrint";
import DeliveryNotePrint from "../../../../components/Pdfs/DeliveryNotePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { emptyCart } from "../../../../redux/actions/cartActions";
import { useSelector } from "react-redux";

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  updateOrderNote,
  updateOrderSecondOwner,
  loadPayPalScript,
  reduxDispatch,
  reOrdertReduxAction,
  getdeliveryBooks,
  getUsersList,
}) => {
  const [order, setOrder] = useState();
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState();
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [deliveredDate, setDeliveredDate] = useState("");
  const [trackLink, setTrackLink] = useState("");
  const [deliveryBooks, setDeliveryBooks] = useState([]);
  const [selectedDeliverySite, setSelectedDeliverySite] = useState();
  const [usersList, setUsersList] = useState([]);
  const [companyUsersList, setCompanyUsersList] = useState([]);
  const [storeUsersList, setStoreUsersList] = useState([]);
  const [siteUsersList, setSiteUsersList] = useState([]);
  const [secondOwner, setSecondOwner] = useState();
  const [secondOwnerId, setSecondOwnerId] = useState("");
  const [secondOwnerSite, setSecondOwnerSite] = useState("");
  const [clicked, setClicked] = useState(false);
  const [buttonText, setButtonText] = useState(1);
  const paypalContainer = useRef();
  const { id } = useParams();

  const reOrderItemsCheck = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          location: data.location,
          deliveryAddress: data.deliveryAddress,
          billAddress: data.billAddress,
          postCode: data.postCode,
          state: data.state,
          phone: data.phone,
          company: data.company,
        });
        setButtonText("Assign");
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setOrder(data);
        setPaymentMethod(data.paymentMethod);
        setInvoiceNumber(data.invoiceNumber);
        setCreatedAt(data.createdAt);
        if (data.deliveredAt) {
          setDeliveredDate(data.deliveredAt);
        }
        setOrderData(data);
        setPurchaseNumber(data.purchaseNumber);
        setTrackLink(data.trackLink);
        setCartItems(data.cartItems);
        setOrderNote(data.orderNote);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        if (data.orderTotal.taxAmount) {
          setTaxAmount(data.orderTotal.taxAmount);
        }
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.balance === 0 ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.balance === 0) {
          setOrderButtonMessage("Your order has been completed!");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "Invoice") {
            setOrderButtonMessage("Thanks for your order");
          } else if (data.paymentMethod === "PayPal") {
            /* setButtonDisabled(true); */
            setOrderButtonMessage(
              "To pay for your order click one of the buttons below"
            );
          }
        }
      })

      .catch((err) => console.log(err));
  }, []);

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "PayPal") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  /* paypal的一些判定 */
  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Thank you for your payment!");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
  };

  const [orderCreated, setOrderCreated] = useState(true);

  const reOrderHandler = () => {
    reduxDispatch(reOrdertReduxAction(id));
    setClicked(true);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleReorderClick = () => {
    if (reOrderItemsCheck.length > 0) {
      setShowConfirmation(true);
    } else {
      reOrderHandler(id);
    }
  };

  const removeAllItems = () => {
    reduxDispatch(emptyCart());
  };

  const handleConfirmationClose = (emptyCart) => {
    if (emptyCart) {
      removeAllItems();
      setTimeout(() => {
        reOrderHandler(id);
      }, 1000);
    } else {
      reOrderHandler(id);
    }
  };

  const closeModal = () => {
    setShowConfirmation(false);
  };

  const shippedAT = new Date(isDelivered).toLocaleString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const nonGSTPrice = (cartSubtotal / 1.1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const GST = ((cartSubtotal / 1.1) * 0.1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const incGSTPrice = cartSubtotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const orderNetAmount = (cartSubtotal - taxAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const TAX = taxAmount?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


  // edite order note modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setOrderNote(order.orderNote);
  };
  const handleShow = () => setShow(true);

  const enterOrderName = (e) => {
    setOrderNote(e.target.value);
  };

  const saveOrderName = () => {
    setShow(false);
    updateOrderNote(id, orderNote);
  };

  //assign ownership
  const saveOwnership = () => {
    setButtonText("Assigning...")
    try {
      if (secondOwnerId !== "") {
        updateOrderSecondOwner(id, secondOwnerId, secondOwnerSite)
      } else {
        updateOrderSecondOwner(id, usersList[0]?._id, usersList[0]?.location)
      }
      setButtonText("Assigned!")
      setTimeout(() => setButtonText("Assigned"), 1000);
    } catch (error) {
      setButtonText("Assign");
    }
    setIsSwitchOn(!isSwitchOn);
  }

  useEffect(() => {
    if (userAddress.company) {
      getUsersList(userAddress.company)
        .then((users) => {
          setCompanyUsersList(users)
          setStoreUsersList(users.filter(user => user.isSitePerson === true))
          setSiteUsersList(users.filter(user => user.location === userAddress.location &&
            user.isSiteManager === false &&
            user.isPD === false))
        })
        .catch((err) =>
          console.log(
            err.response.data.message
              ? err.response.data.message
              : err.response.data
          )
        );
    }
  }, [userAddress]);



  useEffect(() => {
    if (userInfo.isSiteManager) {
      setUsersList(storeUsersList)
    } else if (userInfo.isSitePerson) {
      setUsersList(siteUsersList)
    } else {
      console.log("Error Loading User List");
    }
  }, [storeUsersList, siteUsersList])

  const selectSecondOwner = (e) => {
    setSecondOwnerId(e.target.value)
    companyUsersList.map((user) => {
      if (e.target.value === user._id) {
        setSecondOwnerSite(user.location)
      }
    })
  }

  useEffect(() => {
    companyUsersList.map((user) => {
      if (order?.secondOwnerId !== " ") {
        if (user._id === order.secondOwnerId) {
          setSecondOwner(user)
        }
      }
    })
  }, [usersList]);


  // delivery site
  useEffect(() => {
    if (userInfo.email) {
      getdeliveryBooks(userInfo.email)
        .then((deliveryBooks) => setDeliveryBooks(deliveryBooks))
        .catch((err) =>
          console.log(
            err.response.data.message
              ? err.response.data.message
              : err.response.data
          )
        );
    }
  }, [userInfo]);

  const deliverySites = deliveryBooks[0]?.sites;
  const companyAccount = deliveryBooks[0]?.companyAccount;

  useEffect(() => {
    deliverySites &&
      deliverySites.map((site, idx) => {
        return site.name !== ""
          ? orderData.deliverySite?.toUpperCase() === site.name?.toUpperCase()
            ? setSelectedDeliverySite(site)
            : ""
          : "";
      });
  }, [orderData, deliveryBooks]);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <>
    <div className="green-line"></div>
      <div className="desktop userCartDetailPage">
        <Row className="mt-4 userCartDetailPageWrapper">
          <h1 className={styles.title}>ORDER DETAILS !</h1>
          <Col md={9}>
            <ListGroup variant="flush">
              <table style={{ width: "100%" }} className="mt-1">
                <thead>
                  <tr>
                    <th style={{ width: "7%" }}></th>
                    <th style={{ width: "35%" }}>PRODUCTS</th>
                    <th style={{ width: "18%" }}>DETAILS</th>
                    <th style={{ width: "11%" }} className="ps-1">ORDER Qty</th>
                    <th style={{ width: "11%" }} className="ps-1">SUPPLIED Qty</th>
                    <th style={{ width: "11%" }} className="ps-1">BACK ORDER</th>
                  </tr>
                </thead>
                {cartItems.map((item, idx) => (
                  <CartItemForUserOrderComponent
                    key={idx}
                    item={item}
                    orderCreated={true}
                    id={id}
                  />
                ))}
              </table>
            </ListGroup>
          </Col>
          <Col md={3} className="cart_detail_right">
            <ListGroup>
              <ListGroup.Item className="p-1 ps-2">
                <h3  className="m-0 cart_detail_right-title">ORDER SUMMARY</h3>
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                Item Price:{" "}
                <span className="fw-bold float-end"> $ {taxAmount ? orderNetAmount : nonGSTPrice}</span>
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                Total GST <span className="fw-bold float-end">$ {taxAmount ? TAX : GST}</span>
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                Invoice Amount:{" "}
                <span className="fw-bold text-danger float-end">
                  $ {incGSTPrice}
                </span>
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                PO Number: <span className="fw-bold">{purchaseNumber}</span>
              </ListGroup.Item>

              <ListGroup.Item className="p-2 ps-3">
                <Row>
                  <Col>
                    <div>
                      <Button
                        onClick={handleReorderClick}
                        className="p-1 pe-3 ps-3 m-0 confirm-btn"
                      >
                        Re-Order
                      </Button>
                      <Modal
                        show={showConfirmation}
                        onHide={closeModal}
                        className="Re_Order_Modal"
                      >
                        <Modal.Header className="p-0 m-2 mb-0" closeButton>
                          <span className="fw-bold p-0 m-0">Confirmation</span>
                        </Modal.Header>
                        <Modal.Body className="p-2 pt-0">
                          Some items already in your cart! Do you want to empty
                          your cart before re-ordering?
                        </Modal.Body>
                        <Modal.Footer className="p-0 d-flex justify-content-between">
                          <Button
                            variant="success"
                            onClick={() => handleConfirmationClose(true)}
                            className="ms-5 p-0 pe-1 ps-1 button-shadow"
                          >
                            Empty Cart
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleConfirmationClose(false)}
                            className="me-5 p-0 pe-1 ps-1 button-shadow"
                          >
                            Keep Cart Items
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      className={styles.btnMyOrders}
                    >
                      <a href="/user/my-orders">
                        My Orders{" "}
                      </a>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="pt-3">
              <ListGroup.Item className="p-2 ps-3">
                <b>Order Note:</b> {orderNote ? null : "N/A"}
                <i
                  onClick={handleShow}
                  className="bi bi-pencil-square"
                  style={{ cursor: "pointer" }}
                ></i>
              </ListGroup.Item>
              {orderNote ? (
                <ListGroup.Item className="p-2 ps-3">{orderNote}</ListGroup.Item>
              ) : null}
            </ListGroup>

            {/* edit order note modal */}
            <Modal show={show} onHide={handleClose} className="edite_order_name">
              <Modal.Header className="p-1 ps-3 pe-3 m-0" closeButton>
                <Modal.Title>Enter Order Note:</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-2 m-0">
                <Form.Control
                  onChange={enterOrderName}
                  type="string"
                  name="MangerEmail"
                  defaultValue={orderNote}
                  required
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </Modal.Body>
              <Modal.Footer className="p-0 m-0">
                <Button
                  
                  onClick={handleClose}
                  className="p-1 pt-0 pb-0 m-1"
                >
                  Close
                </Button>
                <Button
                  onClick={saveOrderName}
                  className="p-1 pt-0 pb-0 m-1 confirm-btn"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* ******* shipping information ******* */}
            <ListGroup className="pt-3">
              <ListGroup.Item className="p-2 ps-3">
                <h5 className="m-0">SHIPPING INFORMATION</h5>
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                <b>Name</b>: {orderData?.userName?.split('(')[0]}
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                <b>Site</b>: {orderData?.deliverySite}
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                <Form.Label className="fw-bold" style={{ color: "black" }}>Shipping address:</Form.Label>
                <Form.Control
                  as="textarea"
                  className="p-1 ps-2"
                  type="string"
                  name="shippingAddress"
                  placeholder="Shipping Address"
                  required
                  value={orderData.deliveryAddress && titleCase(orderData?.deliveryAddress).split(',').map(sentence => sentence.trim()).join('\n')}
                  style={{ fontSize: '12px', height: "100px", backgroundColor: "rgba(72, 63, 85, 0.2)", border: "none" }}
                  disabled
                />
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                <b>Phone</b>: {orderData?.user?.phone}
              </ListGroup.Item>
              <ListGroup.Item className="p-2 ps-3">
                <Alert
                  className="m-0 lh-1 h-50 p-2 ps-2 pe-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Shipped at {shippedAT.split("at")[0]}</>
                  ) : (
                    <>Not Sent Yet</>
                  )}
                </Alert>
              </ListGroup.Item>
              {isDelivered ? (
                <>
                  <ListGroup.Item className="p-1 ps-2">
                    <div className="d-grid gap-2">
                      <PDFDownloadLink
                        document={
                          <DeliveryNotePrint
                            cartItems={cartItems}
                            invoiceNumber={invoiceNumber}
                            userInfo={userInfo}
                            purchaseNumber={purchaseNumber}
                            cartSubtotal={cartSubtotal}
                            invoiceDate={createdAt}
                            selectedDeliverySite={selectedDeliverySite}
                            companyAccount={companyAccount}
                          />
                        }
                        fileName={"PN" + invoiceNumber}
                      >
                        <u style={{ whiteSpace: "nowrap" }}>
                          Download Delivery Note
                        </u>
                      </PDFDownloadLink>
                    </div>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div
                        ref={paypalContainer}
                        id="paypal-container-element"
                      ></div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="p-1 ps-2">
                    {trackLink && trackLink.includes("false") ? (
                      <p className="mb-0">
                        Please Contact{" "}
                        <a
                          href="mailto:sales@ctlaus.com"
                          class="action remind fw-bold"
                          style={{ color: "#1E4881" }}
                        >
                          {" "}
                          Sales{" "}
                        </a>
                        to Track Shipping
                      </p>
                    ) : (
                      <a
                        href={trackLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#1e4881" }}
                      >
                        <i className="bi bi-truck"></i> Track Shipping
                      </a>
                    )}
                  </ListGroup.Item>
                </>
              ) : (
                ""
              )}
              {userInfo.isInvoiceViwer === true ? (
                <>
                  <ListGroup.Item className="p-1 ps-2">
                    <div className="d-grid gap-2">
                      <PDFDownloadLink
                        document={
                          <InvoicePrint
                            cartItems={cartItems}
                            invoiceNumber={invoiceNumber}
                            userInfo={userInfo}
                            purchaseNumber={purchaseNumber}
                            cartSubtotal={cartSubtotal}
                            invoiceDate={createdAt}
                            selectedDeliverySite={selectedDeliverySite}
                            companyAccount={companyAccount}
                            taxAmount={taxAmount}
                          />
                        }
                        fileName={"INV" + invoiceNumber}
                      >
                        {({ loading }) =>
                          loading ? (
                            <Button className="p-0 m-0 pe-2 ps-2 ctl_blue_button">
                              Loading Invoice...
                            </Button>
                          ) : (
                            <Button className="p-0 m-0 pe-2 ps-2 w-50 ctl_blue_button">
                              Download Invoice
                            </Button>
                          )
                        }
                      </PDFDownloadLink>
                    </div>
                  </ListGroup.Item>
                </>
              ) : (
                ""
              )}
            </ListGroup>

            {/* Assign ownership */}
            <div style={{ height: "200px" }}>
              {
                (userInfo.isSitePerson || userInfo.isSiteManager) ? (
                  <ListGroup className="pt-3">
                    <ListGroup.Item className="p-1 ps-2">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Assign Ownership"
                        data-toggle="collapse"
                        data-target="#ownership_div"
                        aria-expanded="false"
                        aria-controls="ownership_div"
                        disabled={(order?.secondOwnerId !== " " && order?.secondOwnerId !== userInfo?._id)}

                      />

                      {
                        order?.secondOwnerId !== " " ? (
                          <span id="show_message">
                            <b>This Order Assignee is :</b><br />
                            <label style={{}}>{secondOwner?.name + " " + secondOwner?.lastName + " -"}</label>
                            <label style={{ fontSize: "95%" }}>{" " + secondOwner?.location}</label>
                          </span>
                        ) : ("")
                      }

                    </ListGroup.Item>
                    <ListGroupItem className="p-0" disabled={isSwitchOn} style={{}}>
                      <div
                        id="ownership_div"
                        class="collapse"
                      >

                        <div class="m-2">
                          {
                            (order?.secondOwnerId !== " " && order?.secondOwnerId === userInfo?._id) ? (
                              <span>
                                <b>Re-Assign this Order?</b>
                              </span>

                            ) : ("")
                          }
                          <Form.Select
                            required
                            name="userNames"
                            aria-label="Default select example"
                            onChange={selectSecondOwner}
                            className="mt-1 p-0 ps-1"

                          >
                            {usersList &&
                              usersList
                                .map((user, idx) => {
                                  return user !== "" ? (
                                    <option key={idx} value={user._id}>
                                      {" "}
                                      {user.name + " " + user.lastName + " ( " + user.location + " )"}
                                    </option>
                                  ) : ("");
                                })}
                          </Form.Select>
                          <Row className="pt-2">
                            <Col md={7}>
                              <Button
                                variant="success"
                                onClick={saveOwnership}
                                className="button-shadow p-0 pe-3 ps-3 m-0"
                              >
                                {buttonText}
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>

                ) : ("")
              }
            </div>
          </Col>
        </Row>
      </div>

      <div className="mobile">
        <h5 className={styles.UserOrderDetailsPageTitle}>ORDER DETAILS</h5>
        <div>
          <div>
            {cartItems.map((item, idx) => {
              const itemPrice = item.cartProducts[0].price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              return <>
                <div className={styles.orderDetailPageMobileProductItem}>

                  <div className={styles.orderDetailPageMobileProductWrapper}>
                    <div className={styles.orderDetailPageMobileProduct}>
                      <img
                        crossOrigin="anonymous"
                        src={item.image ? item.image ?? null : null}
                        className={styles.orderDetailPageMobileImage}
                        alt="s"
                      />
                      <a href={`/product-details/${item.productId}`} className={styles.orderDetailPageMobileProductName} >
                        <strong className="text-uppercase" style={{ color: "#1E4881" }}>
                          {item.name}
                        </strong>
                      </a>
                    </div>

                    <div className={styles.orderDetailPageMobileDataProduct}>
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
                    </div>
                  </div>
                  <div className={styles.orderDetailPageMobileProductItemQuantity}>
                    <div>
                      <div>ORDER Qty</div>
                      <Form.Control
                        type="number"
                        className="form-control"
                        value={item.cartProducts[0].quantity}
                        disabled={orderCreated}
                      />
                    </div>
                    <div>
                      <div>SUPPLIED Qty</div>
                      <Form.Control
                        className="form-control"
                        value={item.cartProducts[0].suppliedQty}
                        disabled={orderCreated}
                      />
                    </div>
                    <div>
                      <div>BACK ORDER</div>
                      <Form.Control
                        type="number"
                        className="form-control"
                        value={item.cartProducts[0].backOrder}
                        disabled={orderCreated}
                      />
                    </div>
                  </div>
                </div>
                <hr />
              </>
            })}
          </div>
        </div>
        <ListGroup className={styles.UserOrderDetailsPageComponentSummary}>
          <ListGroup.Item>
            <h5>ORDER SUMMARY</h5>
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            Item Price:{" "}
            <span className="fw-bold float-end"> $ {taxAmount ? orderNetAmount : nonGSTPrice}</span>
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            Total GST <span className="fw-bold float-end">$ {taxAmount ? TAX : GST}</span>
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            Invoice Amount:{" "}
            <span className="fw-bold text-danger float-end">
              $ {incGSTPrice}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            PO Number: <span className="fw-bold">{purchaseNumber}</span>
          </ListGroup.Item>

          <ListGroup.Item className="p-1 ps-2">
            <Row>
              <Col>
                <div>
                  <Button
                    onClick={handleReorderClick}
                    className={styles.reorderBtn}
                    variant="success"
                  >
                    Re-Order
                  </Button>
                  <Modal
                    show={showConfirmation}
                    onHide={closeModal}
                    className="Re_Order_Modal"
                  >
                    <Modal.Header className="p-0 m-2 mb-0" closeButton>
                      <span className="fw-bold p-0 m-0" style={{fontFamily: "GloriaHallelujah", color: "#483F55"}}>Confirmation</span>
                    </Modal.Header>
                    <Modal.Body className="p-2 pt-0" style={{fontFamily: "HelveticaNeue", color: "#483F55"}}>
                      Some items already in your cart! Do you want to empty
                      your cart before re-ordering?
                    </Modal.Body>
                    <Modal.Footer className="p-0 d-flex justify-content-between">
                      <Button
                        
                        onClick={() => handleConfirmationClose(true)}
                        className="p-1 pe-2 ps-2 confirm-btn"
                      >
                        Empty Cart
                      </Button>
                      <Button
                        onClick={() => handleConfirmationClose(false)}
                        className={styles.reorderBtn}
                        style={{backgroundColor: "#521712", border: "none" }}
                      >
                        Keep Cart Items
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Col>
              <Col>
                <Button
                  className={styles.reorderBtn}
                  variant="light"
                >
                  <a href="/user/my-orders" style={{ color: "#073474" }}>
                    My Orders{" "}
                  </a>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup className={styles.UserOrderDetailsPageComponentSummary}>
          <ListGroup.Item className="p-1 ps-2">
            <b>Order Note:</b> {orderNote ? null : "N/A"}
            <i
              onClick={handleShow}
              className="bi bi-pencil-square"
              style={{ cursor: "pointer" }}
            ></i>
          </ListGroup.Item>
          {orderNote ? (
            <ListGroup.Item className="p-1 ps-2">{orderNote}</ListGroup.Item>
          ) : null}
        </ListGroup>

        {/* edit order note modal */}
        <Modal show={show} onHide={handleClose} className="edite_order_name">
          <Modal.Header className="p-1 ps-3 pe-3 m-0" closeButton>
            <Modal.Title style={{color: "#483F55", fontFamily:"GloriaHallelujah"}}>Enter Order Note:</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2 m-0">
            <Form.Control
              onChange={enterOrderName}
              type="string"
              name="MangerEmail"
              defaultValue={orderNote}
              required
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </Modal.Body>
          <Modal.Footer className="p-0 m-0">
            <Button
              onClick={handleClose}
              className="p-2 pt-1 pb-1"
              style={{backgroundColor: "#521712", border: "none"}}
            >
              Close
            </Button>
            <Button
              onClick={saveOrderName}
              className="p-2 pt-1 pb-1 m-1 confirm-btn"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ******* shipping information ******* */}
        <ListGroup className={styles.UserOrderDetailsPageComponentSummary}>
          <ListGroup.Item>
            <h5>SHIPPING INFORMATION</h5>
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            <b>Name</b>: {orderData?.userName?.split('(')[0]}
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            <b>Site</b>: {orderData?.deliverySite}
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            <b>Shipping address</b>: {orderData?.deliverySite}
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            <b>Phone</b>: {orderData?.user?.phone}
          </ListGroup.Item>
          <ListGroup.Item className="p-1 ps-2">
            <Alert
              className="m-0 lh-1 h-50 p-1 ps-2"
              variant={isDelivered ? "success" : "danger"}
            >
              {isDelivered ? (
                <>Shipped at {shippedAT.split("at")[0]}</>
              ) : (
                <>Not Sent Yet</>
              )}
            </Alert>
          </ListGroup.Item>
          {isDelivered ? (
            <>
              <ListGroup.Item className="p-1 ps-2">
                <div className="d-grid gap-2">
                  <PDFDownloadLink
                    document={
                      <DeliveryNotePrint
                        cartItems={cartItems}
                        invoiceNumber={invoiceNumber}
                        userInfo={userInfo}
                        //userAddress={userAddress}
                        purchaseNumber={purchaseNumber}
                        cartSubtotal={cartSubtotal}
                        invoiceDate={createdAt}
                        selectedDeliverySite={selectedDeliverySite}
                        companyAccount={companyAccount}
                      />
                    }
                    fileName={"PN" + invoiceNumber}
                  >
                    <u style={{ whiteSpace: "nowrap" }}>
                      Download Delivery Note
                    </u>
                  </PDFDownloadLink>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    ref={paypalContainer}
                    id="paypal-container-element"
                  ></div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="p-1 ps-2">
                {trackLink && trackLink.includes("false") ? (
                  <p className="mb-0">
                    Please Contact{" "}
                    <a
                      href="mailto:sales@ctlaus.com"
                      class="action remind fw-bold"
                      style={{ color: "#1E4881" }}
                    >
                      {" "}
                      Sales{" "}
                    </a>
                    to Track Shipping
                  </p>
                ) : (
                  <a
                    href={trackLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#1e4881" }}
                  >
                    <i className="bi bi-truck"></i> Track Shipping
                  </a>
                )}
              </ListGroup.Item>
            </>
          ) : (
            ""
          )}
          {userInfo.isInvoiceViwer === true ? (
            <>
              <ListGroup.Item className="p-1 ps-2">
                <div className="d-grid gap-2">
                  <PDFDownloadLink
                    document={
                      <InvoicePrint
                        cartItems={cartItems}
                        invoiceNumber={invoiceNumber}
                        userInfo={userInfo}
                        purchaseNumber={purchaseNumber}
                        cartSubtotal={cartSubtotal}
                        invoiceDate={createdAt}
                        selectedDeliverySite={selectedDeliverySite}
                        companyAccount={companyAccount}
                        taxAmount={taxAmount}
                      />
                    }
                    fileName={"INV" + invoiceNumber}
                  >
                    {({ loading }) =>
                      loading ? (
                        <Button className="p-0 m-0 pe-2 ps-2 ctl_blue_button">
                          Loading Invoice...
                        </Button>
                      ) : (
                        <Button className="p-0 m-0 pe-2 ps-2 w-50 ctl_blue_button">
                          Download Invoice
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </ListGroup.Item>
            </>
          ) : (
            ""
          )}
        </ListGroup>

        {/* Assign ownership */}
        <div style={{ height: "200px" }}>
          {
            (userInfo.isSitePerson || userInfo.isSiteManager) ? (
              <ListGroup className={styles.UserOrderDetailsPageComponentSummary}>
                <ListGroup.Item className="p-1 ps-2">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Assign Ownership"
                    data-toggle="collapse"
                    data-target="#ownership_div"
                    aria-expanded="false"
                    aria-controls="ownership_div"
                    //disabled={userInfo.email !== userAddress.storeEmail}
                    disabled={(order?.secondOwnerId !== " " && order?.secondOwnerId !== userInfo?._id)}
                  />

                  {
                    order?.secondOwnerId !== " " ? (
                      <span id="show_message">
                        <b>This Order Assignee is :</b><br />
                        <label style={{}}>{secondOwner?.name + " " + secondOwner?.lastName + " -"}</label>
                        <label style={{ fontSize: "95%" }}>{" " + secondOwner?.location}</label>
                      </span>
                    ) : ("")
                  }

                </ListGroup.Item>
                <ListGroupItem className="p-0" disabled={isSwitchOn} style={{}}>
                  <div
                    id="ownership_div"
                    class="collapse"
                  >

                    <div class="m-2">
                      {
                        (order?.secondOwnerId !== " " && order?.secondOwnerId === userInfo?._id) ? (
                          <span>
                            <b>Re-Assign this Order?</b>
                          </span>

                        ) : ("")
                      }
                      <Form.Select
                        required
                        name="userNames"
                        aria-label="Default select example"
                        onChange={selectSecondOwner}
                        className="mt-1 p-0 ps-1"

                      >
                        {usersList &&
                          usersList
                            .map((user, idx) => {
                              return user !== "" ? (
                                <option key={idx} value={user._id}>
                                  {" "}
                                  {user.name + " " + user.lastName + " ( " + user.location + " )"}
                                </option>
                              ) : ("");
                            })}
                      </Form.Select>
                      <Row className="pt-2">
                        <Col md={7}>
                          <Button
                            variant="success"
                            onClick={saveOwnership}
                            className="button-shadow p-0 pe-3 ps-3 m-0"
                          >
                            {buttonText}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>

            ) : ("")
          }
        </div>
      </div>
    </>
  );
};

export default UserOrderDetailsPageComponent;
