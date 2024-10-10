import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  InputGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuoeteManagementApproval from "../../../components/SendEmail/QuoeteManagementApproval";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import CartPrint from "../../../components/Pdfs/CartPrint";
import axios from "axios";
import "./invoicePDF.css";
import {
  saveTrackEvents,
  useTrackEvents,
} from "../../trackEvents/useTrackEvents";
import VerifySiteComponent from "../../components/VerifySiteComponent";

const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  taxAmount,
  getdeliveryBooks,
  editQuantity,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
  getOrdersInvNo,
  emptyCart,
  getStoreUser,
  updateUniformCart,
  updateUniformCartOnEmptyCart,
  updateUniformCartOnPurchase,
  getUniformCart,
  getUniformById,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Invoice");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [storeUser, setStoreUser] = useState();
  const [storeId, setStoreId] = useState();
  const [userId, setUserId] = useState();
  const [largestInvoice, setLargestInvoice] = useState(0);
  const [userNameEmail, setUserNameEmail] = useState();
  const [userName, setUserName] = useState();
  const [userCompany, setUserCompany] = useState();
  const [managerEmail, setManagerEmail] = useState();
  const [base64Data, setBase64Data] = useState([]);
  const [deliveryBooks, setDeliveryBooks] = useState();
  const [deliverySites, setDeliverySites] = useState();
  const [userSites, setUserSites] = useState();
  //const [adminDeliveryBooks, setAdminDeliveryBooks] = useState();
  const [selectedDeliverySite, setSelectedDeliverySite] = useState();
  //const [adminSelectedCompany, setAdminSelectedCompany] = useState();
  const [quickBooksCustomerId, setQuickBooksCustomerId] = useState();
  const [dueDays, setDueDays] = useState();
  const [clientSiteSku, setClientSiteSku] = useState();
  const [showVerifySiteModal, setShowVerifySiteModal] = useState(false);
  const [shouldRenderVerifySiteModal, setShouldRenderVerifySiteModal] = useState(false);
  const [unifroms, setUniforms] = useState([])
  const [uniformId, setUniformId] = useState()
  const [hasProducts, setHasProducts] = useState(0)
  const [uniformUserId, setUniformUserId] = useState()
  const [uniformUserName, setUniformUserName] = useState()
  const [createdUserId, setCreatedUserId] = useState()
  const [createdUserName, setCreatedUserName] = useState()
  const [user, setUser] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [validated, setValidated] = useState(true);

  // console.log("shippingAddress", shippingAddress)

  //Tracking user Interactions
  useTrackEvents();
  // var trackData = localStorage.getItem("trackData")
  // console.log("trackData", trackData);
  useEffect(() => {
    if (cartItems) {
      cartItems.map((item) => {
        if (item.uniformUserId) {
          setUniformUserId(item.uniformUserId)
          setUniformUserName(item.uniformUserName)
        }
      })
    }
    setCreatedUserId(userInfo._id)
    setCreatedUserName(userInfo.name + " " + userInfo.lastName + "(" + userInfo.email + ")")
  }, [cartItems])

  const navigate = useNavigate();

  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };

  useEffect(() => {
    getOrdersInvNo().then((orders) => {
      const invoiceNumbers = orders.map((order) => order.invoiceNumber);
      const newInvoiceNumbers = invoiceNumbers.map((item) => {
        return item.replace(/\D/g, "");
      });
      if (newInvoiceNumbers.length > 0) {
        setLargestInvoice(Math.max(...newInvoiceNumbers));
      } else {
        setLargestInvoice(100000);
      }
    });
  }, []);

  useEffect(() => {
    getdeliveryBooks()
      .then((deliveryBooks) => {
        setDeliveryBooks(deliveryBooks);
        setUserSites(deliveryBooks[0]);
        setDeliverySites(deliveryBooks[0]?.sites);
        setQuickBooksCustomerId(deliveryBooks[0]?.quickBooksCustomerId);
        setDueDays(deliveryBooks[0]?.dueDays);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, []);

  useEffect(() => {
    cartItems?.map((cart) => {
      if (!cart.cartProducts[0]?.attrs?.toUpperCase().includes("UNIFORM/")) {
        setHasProducts(1)
      }
    })
  }, [cartItems])


  // console.log(userInfo.siteVerified);
  // console.log(userSites);

  // const onHide = () => {
  //   setShowVerifySiteModal(false);
  // };

  const changeDeliverySite = (e) => {
    setSelectedDeliverySite(e.target.value);
  };

  const refreshUserInfo = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (isSwitchOn && userInfo.isSiteManager === true) {
      deliveryBooks &&
        deliveryBooks[0]?.sites?.map((site) => {
          if (site.name.toUpperCase() === selectedDeliverySite.toUpperCase()) {
            getStoreUser(site.storeEmail)
              .then((data) => {
                setStoreUser(data);
                setUserNameEmail({
                  email: data.email,
                  name: data.name,
                });
                setUserName(
                  data.name + " " + data.lastName + " ( " + data.email + " ) "
                );
                setUserCompany(data.company.toUpperCase());
                setUserAddress(data.location.toUpperCase());
                if (userInfo._id !== data._id) {
                  setStoreId(data._id);
                } else {
                  setStoreId(userInfo._id);
                }
              })
              .catch((er) => {
                console.log(
                  er.response.data.message
                    ? er.response.data.message
                    : er.response.data
                );
              });
          }
        });
    }
  }, [selectedDeliverySite]);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data)
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
        setUserName(
          data.name + " " + data.lastName + " ( " + data.email + " ) "
        );
        setUserCompany(data.company);
        setUserAddress(data.location);
        setSelectedDeliverySite(data.location);
        setMissingAddress(false);
        setStoreId(userInfo._id);
        setUserId(userInfo._id);
        setClientSiteSku(userInfo.siteSku);
        setShippingAddress(data.deliveryAddress)
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id]);

  useEffect(() => {
    if (hasProducts === 0) {
      const date = new Date()
      const uniformPurchaseNumber = "U-" + date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + "-" + date.getHours() + "" + date.getMinutes()
      setPurchaseNumber(uniformPurchaseNumber)
      setOrderNote("Uniform")
    } else {
      if (orderNote === "Uniform") {
        setOrderNote("")
      }
    }
  }, [hasProducts])

  useEffect(() => {
    if (!userInfo.siteVerified) {
      console.log("Site not verified, showing modal...");
      setShouldRenderVerifySiteModal(true);
      setShowVerifySiteModal(true);
    }
  }, [userInfo]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
      },
      cartItems: cartItems.map((item) => {
        return {
          productId: item.productId,
          quoteId: item.quoteId,
          name: item.name,
          saleunit: item.saleunit,
          image: item.image ? item.image ?? null : null,
          cartProducts: [
            {
              attrs: item.cartProducts[0].attrs,
              barcode: item.cartProducts[0].barcode,
              count: item.cartProducts[0].count,
              ctlsku: item.cartProducts[0].ctlsku,
              price: item.cartProducts[0].price,
              quantity: item.cartProducts[0].quantity,
              suppliedQty: item.cartProducts[0].quantity,
              backOrder: 0,
              sales: item.cartProducts[0].sales ?? null,
              [clientSiteSku]: item.cartProducts[0][clientSiteSku] ?? null,
              suppliersku: item.cartProducts[0].suppliersku,
              color: item.cartProducts[0].attrs?.toUpperCase().includes("UNIFORM/") ? item.cartProducts[0].color : "",
              size: item.cartProducts[0].attrs?.toUpperCase().includes("UNIFORM/") ? item.cartProducts[0].size : "",
              _id: item.cartProducts[0]._id,
            },
          ],
        };
      }),
      paymentMethod: paymentMethod,
      purchaseNumber: purchaseNumber,
      orderNote: uniformUserName ? uniformUserName + "'s " + orderNote + " Order" : orderNote,
      invoiceNumber: largestInvoice + 1,
      deliverySite: selectedDeliverySite,
      deliveryAddress: shippingAddress,
      userName: userName,
      userCompany: userCompany,
      quickBooksCustomerId: quickBooksCustomerId,
      dueDays: dueDays,
      storeId: uniformUserId ? uniformUserId : storeId,
      createdUserId: createdUserId ? createdUserId : "",
      createdUserName: createdUserName ? createdUserName : "",
    };

    if (!shippingAddress) {
      setValidated(false);
    }

    createOrder(orderData)
      .then(async (data) => {
        if (data) {
          let cartCount = 0
          let id = uniformUserId ? uniformUserId : userInfo._id
          let purchaseData = []
          const uniformCartItems = cartItems
          uniformCartItems.map((uniformItems) => {
            if (uniformItems.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) {
              purchaseData.push(uniformItems.cartProducts[0])
            }
          })
          updateUniformCartOnPurchase(id, { purchaseData }).then((data) => {
            if (data) {
              setTimeout(() => { }, 1000)
            }
          });

          reduxDispatch(emptyCart());
          setTimeout(() => {
            navigate("/user/my-orders");
          }, 1000);
          const res = await axios.post("/api/sendemail/newOrderRemind", {
            from: userInfo.email,
            PO: purchaseNumber,
            price: cartSubtotal.toFixed(2),
          });
        }
      })
      .catch((err) => console.log(err));
    saveTrackEvents();
  };

  // useEffect(() => {
  //   getUniformById(uniformId)
  //     .then((data) => setUniforms(data))
  // }, [uniformId])

  // console.log("uniforms", unifroms);

  /* 修改支付方式的vale */
  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const enterPurchaseNum = (e) => {
    setPurchaseNumber(e.target.value);
    setButtonDisabled(false);
  };

  const enterOrderNote = (e) => {
    setOrderNote(e.target.value);
  };

  const enterManagerEmail = (e) => {
    setManagerEmail(e.target.value + `@${userEmail}`);
  };

  const enterShippingAddress = (e) => {
    setValidated(true);
    setShippingAddress(e.target.value)
  }

  const removeFromCartHandler = (productId, qty, price, attrs, uniformUserId) => {
    reduxDispatch(removeFromCart(productId, qty, price));
    var userId = ""
    if (uniformUserId) {
      userId = uniformUserId
    } else {
      userId = userInfo._id
    }
    const id = productId
    if (attrs?.toUpperCase().includes("UNIFORM/")) {
      updateUniformCart(userId, { id, qty })
        .then((data) => {
          if (data.message === "UniformCart updated") {
            window.location.reload()
          }
        })
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      window.location.href = "/user/my-orders";
    }
  }, [cartItems])

  const removeAllItems = () => {
    reduxDispatch(emptyCart());
    const deleteList = []
    cartItems.map((cart) => {
      if (cart.cartProducts[0].attrs.includes("UNIFORM/")) {
        deleteList.push(cart.cartProducts[0])
      }
    })
    if (deleteList.length > 0) {
      var userId = ""
      if (uniformUserId) {
        userId = uniformUserId
      } else {
        userId = userInfo._id
      }
      updateUniformCartOnEmptyCart(userId, { deleteList })
        .then((data) => {
          if (data.message === "UniformCart updated") {
            setTimeout(() => {
              window.location.href = "/user/my-uniforms";
            }, 1000);
          }
        })
    } else {
      setTimeout(() => {
        window.location.href = "/product-list";
      }, 1000);
    }
  };

  const userEmail = userInfo.email?.split("@")[1];

  const generatePdf = async () => {
    try {
      const blob = await pdf(
        <CartPrint
          cartItems={cartItems}
          userInfo={userInfo}
          userAddress={userAddress}
          purchaseNumber={purchaseNumber}
          cartSubtotal={cartSubtotal}
          taxAmount={taxAmount}
        />
      ).toBlob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        // console.log(base64data);
        setBase64Data({
          base64data,
        });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  useEffect(() => {
    generatePdf();
  }, [cartItems]);

  const quotePriceData = {
    ...userNameEmail,
    cartItems,
    cartSubtotal,
    managerEmail,
    base64Data,
  };

  const truncateToTwo = (num) => {
    return Math.trunc(num * 100) / 100;
  };

  const nonGSTPrice = parseFloat(
    (cartSubtotal - taxAmount).toFixed(2)
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const GST = taxAmount?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const incGSTPrice = truncateToTwo(cartSubtotal).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );  

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <>
      <Container className="userCartDetailPage">
        <Row className="mt-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>CART DETAILS</h1>
          </div>
          <Col md={9}>
            <ListGroup variant="flush" className="cart-items-list"> 
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                  uniformUserId={uniformUserId}
                />
              ))}
            </ListGroup>
            <Button
              type="button"
              onClick={removeAllItems}
              className="p-0 ps-1 pe-1 empty_cart_btn"
            >
              Empty Cart <i className="bi bi-trash" />
            </Button>
          </Col>
          <Col md={3} className="cart_detail_right">

            <br />
            {(hasProducts === 1) ? (
              <>
                <ListGroup>
                  <ListGroup.Item className="p-1 ps-2">
                    <div className="d-grid gap-2">
                      <PDFDownloadLink
                        document={
                          <CartPrint
                            cartItems={cartItems}
                            userInfo={userInfo}
                            userAddress={userAddress}
                            purchaseNumber={purchaseNumber}
                            cartSubtotal={cartSubtotal}
                            taxAmount={taxAmount}
                          />
                        }
                        fileName={userInfo.name + "'s Cart"}
                        className="btn btn-success p-0 ps-1 pe-1 ms-3 me-3 download_cart_btn"
                      >
                        <span>
                          Download Cart <i className="bi bi-file-earmark-pdf"></i>
                        </span>
                      </PDFDownloadLink>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <br />
                <ListGroup hidden={cartItems.length === 0}>
                  <ListGroup.Item controlid="validationMangerEmail" className="p-0">
                    <InputGroup className="m-0 p-0">
                      <Form.Control
                        className="p-0 ps-2"
                        onChange={enterManagerEmail}
                        type="string"
                        name="MangerEmail"
                        placeholder={`Enter email`}
                        required
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        style={{ border: "none" }}
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        className="p-1"
                        style={{ border: "none", borderRadius: "0" }}
                      >
                        @{userEmail}
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Please Enter Your Manager's Email.{" "}
                    </Form.Control.Feedback>
                  </ListGroup.Item>

                  <ListGroup.Item className="p-1 ps-2">
                    <div className="d-grid gap-2">
                      <QuoeteManagementApproval quotePriceData={quotePriceData} />
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <br />
                <ListGroup className="">
                  <ListGroup.Item className="p-1 ps-2">
                    <h4 className="m-0">Order Summary</h4>
                  </ListGroup.Item>
                  <ListGroup.Item className="p-1 ps-2">
                    <p className="p-0 m-0">
                      Total:{" "}
                      <span className="float-end">
                        <span className="fw-bold ">{cartItems.length}</span>{" "}
                        {cartItems.length === 1 ? "Product" : "Products"}
                      </span>
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="p-1 ps-2">
                    Item Price:{" "}
                    <span className="fw-bold float-end"> $ {nonGSTPrice}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="p-1 ps-2">
                    Total GST <span className="fw-bold float-end">$ {GST}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="p-1 ps-2">
                    Invoice Amount:{" "}
                    <span className="fw-bold text-danger float-end">
                      $ {incGSTPrice}
                    </span>
                  </ListGroup.Item>

                  <Form noValidate validated={validated}>
                  <><ListGroup.Item
                    controlid="validationSLRPurchaseNum"
                    className="p-1 ps-2"
                  >
                    <Form.Label className="fw-bold text-danger">
                      PO Number
                    </Form.Label>
                    <Form.Control
                      className="p-0 ps-1"
                      onChange={enterPurchaseNum}
                      type="string"
                      name="SLRPurchaseNumber"
                      placeholder="PO Number"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Your Purchase Number.{" "}
                    </Form.Control.Feedback>
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                  </ListGroup.Item>

                  <ListGroup.Item
                    controlid="validationOrderNote"
                    className="p-1 ps-2"
                  >
                    <Form.Label className="fw-bold">Order Name:</Form.Label>
                    <Form.Control
                      className="p-0 ps-1"
                      type="string"
                      name="orderNote"
                      placeholder="Order Name"
                      onChange={enterOrderNote}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Your Note.{" "}
                    </Form.Control.Feedback>
                  </ListGroup.Item>

                  <ListGroup.Item
                    controlid="validationShippingAddress"
                    className="p-1 ps-2"
                  >
                    <Form.Label className="fw-bold">Shipping Address:</Form.Label>
                    <Form.Control
                    as="textarea"
                      className="p-0 ps-1"
                      type="string"
                      name="shippingAddress"
                      placeholder="Shipping Address"
                      onChange={enterShippingAddress}
                      required
                      value={shippingAddress}
                      style={{ fontSize: '12px', height: "70px"}}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Shipping Address.{" "}
                    </Form.Control.Feedback>
                  </ListGroup.Item>
                  </></Form>

                  <>
                    {userInfo.isSiteManager && deliverySites?.length > 0 ? (
                      <ListGroup.Item className="p-1 ps-2">
                        <Form.Label className="fw-bold">
                          Creating This Order For Any Stores?
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="Select Site"
                          onChange={onSwitchAction}
                          className="mb-2"
                        />
                        <div style={{ height: "2.5em" }}>
                          <div>
                            <Form.Select
                              required
                              name="sites"
                              aria-label="Default select example"
                              onChange={changeDeliverySite}
                              className="p-1 ps-2"
                              value={selectedDeliverySite?.toLowerCase()}
                              disabled={!isSwitchOn}
                            >
                              {deliverySites &&
                                deliverySites.map((site, idx) => {
                                  return site.name !== "" ? (
                                    <option
                                      key={idx}
                                      value={site.name.toLowerCase()}
                                    >
                                      {" "}
                                      {site.name}
                                    </option>
                                  ) : (
                                    <option
                                      key={idx}
                                      value={site.name.toLowerCase()}
                                    >
                                      {" "}
                                      {site.name}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ) : (
                      ""
                    )}
                  </>
                  <ListGroup.Item className="p-1 ps-2">
                    <div className="d-grid gap-2">
                    <button
                        size="sm"
                        onClick={orderHandler}
                        disabled={purchaseNumber?.length < 1}
                        className="btn btn-success p-0 ps-1 pe-1 download_cart_btn"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </>
            ) : (
              <>
                <ListGroup className="">
                  <ListGroup.Item className="p-1 ps-2">
                    <div className="d-grid gap-2">
                      <button
                        size="sm"
                        onClick={orderHandler}
                        //disabled={purchaseNumber?.length < 1}
                        className="btn btn-success p-0 ps-1 pe-1 download_cart_btn"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}

            <br />
          </Col>
        </Row>
      </Container>
      {shouldRenderVerifySiteModal && (
        <VerifySiteComponent
          show={showVerifySiteModal}
          onHide={() => setShowVerifySiteModal(false)}
          userSites={userSites}
          refreshUserInfo={refreshUserInfo}
        />
      )}
    </>
  );
};

export default UserCartDetailsPageComponent;
