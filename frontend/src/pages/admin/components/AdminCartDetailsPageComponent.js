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
import { titleCase } from "../../user/utils/utils";

const AdminCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  taxAmount,
  userInfo,
  getAdminDeliveryBooks,
  editQuantity,
  removeFromCart,
  reduxDispatch,
  getUser,
  adminCreateOrder,
  getOrdersInvNo,
  emptyCart,
  fetchUsers,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Invoice");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [adminOrderNote, setAdminOrderNote] = useState("");
  const [orderNote, setOrderNote] = useState("");
  //const [storeUser, setStoreUser] = useState(" ");
  const [isStoreUser, setIsStoreUser] = useState(false);
  //const [secondOwnerId, setSecondOwnerId] = useState(" ");
  const [largestInvoice, setLargestInvoice] = useState(0);
  const [users, setUsers] = useState([]);
  const [userNameEmail, setUserNameEmail] = useState();
  const [userName, setUserName] = useState();
  const [managerEmail, setManagerEmail] = useState();
  const [base64Data, setBase64Data] = useState([]);

  const [adminDeliveryBooks, setAdminDeliveryBooks] = useState();
  const [adminDeliverySites, setAdminDeliverySites] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userEmailList, setUserEmailList] = useState([]);
  const [deliverySiteList, setDeliverySiteList] = useState([]);
  const [deliverySiteFinalList, setDeliverySiteFinalList] = useState([]);
  const [deliverySiteListSorted, setDeliverySiteListSorted] = useState([])
  const [userIdList, setUserIdList] = useState([]);
  const [companyList, setCompanyList] = useState(['-Select Company-'])
  const [adminSelectedDeliverySite, setAdminSelectedDeliverySite] =
    useState("DEFAULT");
  const [adminSelectedCompany, setAdminSelectedCompany] = useState();
  const [adminSelectedUserName, setAdminSelectedUserName] = useState();
  const [adminSelectedUserId, setAdminSelectedUserId] = useState();
  const [userInformation, setUserInformation] = useState([]);
  const [quickBooksCustomerId, setQuickBooksCustomerId] = useState();
  const [dueDays, setDueDays] = useState();
  const [userNameList, setUserNamesList] = useState([])
  const [shippingAddress, setShippingAddress] = useState("");

  const navigate = useNavigate();

  const changeCount = (id, qty) => {
    reduxDispatch(editQuantity(id, qty));
  };

  useEffect(() => {
    const handleShippingAddress = () => {
      if (!adminSelectedCompany || !adminSelectedDeliverySite) {
        return;
      }

      const selectedCompany = adminDeliveryBooks.find(company => company.companyName === adminSelectedCompany);
      if (selectedCompany) {
        const selectedSite = selectedCompany.sites.find(site => site.name === adminSelectedDeliverySite);
        if (selectedSite) {
          setShippingAddress(selectedSite.deliveryAddress);
        }
      }
    };

    handleShippingAddress();
  }, [adminSelectedDeliverySite, adminSelectedCompany, adminDeliveryBooks])


  const removeFromCartHandler = (productId, quantity, price) => {
    reduxDispatch(removeFromCart(productId, quantity, price));
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
        setUserName(data.name + " " + data.lastName);
        setUserAddress(data.location);
        setAdminSelectedDeliverySite(data.location);
        setMissingAddress(false);

      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id]);

  function updateCurrentClientSku(clientsSku) {
    const matchingClientSku = clientsSku.find(sku =>
      sku.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ").toLowerCase().includes(adminSelectedDeliverySite.toLowerCase())
    );

    if (matchingClientSku) {
      return {
        name: matchingClientSku.name,
        number: matchingClientSku.number
      };
    }

    return {
      name: "",
      number: ""
    };
  }


  useEffect(() => {
    getOrdersInvNo().then((orders) => {
      const invoiceNumbers = orders.map((order) => order.invoiceNumber);
      const newInvoiceNumbers = invoiceNumbers.map((item) => {
        return item.replace(/\D/g, "");
      });

      if (newInvoiceNumbers.length > 0) {
        const filteredInvoiceNumbers = newInvoiceNumbers.filter(num => num < 165000)
        setLargestInvoice(Math.max(...filteredInvoiceNumbers));
      } else {
        setLargestInvoice(100000);
      }
    });
  }, []);

  useEffect(() => {
    getAdminDeliveryBooks()
      .then((adminDeliveryBooks) => setAdminDeliveryBooks(adminDeliveryBooks))
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, []);

  useEffect(() => {
    adminDeliverySites.length = 0
    adminDeliveryBooks?.map((adminBook) => {
      adminBook.sites?.map((site) => {
        adminDeliverySites?.push(site)
      })
    })
    const tempArray = Array.from(
      new Set(adminDeliveryBooks?.map((deliverySite) => deliverySite.companyName))
    ).sort((a, b) => a.localeCompare(b))

    setCompanyList(Array.from(new Set([...companyList, ...tempArray])))
  }, [adminDeliveryBooks]);

  useEffect(() => {
    const abctrl = new AbortController();
    fetchUsers(abctrl)
      .then((res) => setUsers(res))
      .catch((er) => {
        if (er.code === "ERR_CANCELED") {
        } else if (er.response) {
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
        } else {
          console.log(er);
        }
      });

    return () => abctrl.abort();
  }, [userAddress]);

  const changeCompanyName = (e) => {
    if (e.target.value !== '-Select Company-') {
      setAdminSelectedCompany(e.target.value);
      userList.length = 0;
      userNameList.length = 0;
      deliverySiteList.length = 0;
      userIdList.length = 0;
      userEmailList.length = 0;
      users?.map((user) => {
        if (user.company === e.target.value) {
          userList.push({ userName: user.name + " " + user.lastName + " ( " + user.email + " ) ", userId: user._id, userFname: user.name, userEmail: user.email });
          deliverySiteList.push(user.location.toUpperCase());
          userNameList.push({ userName: user.name + " " + user.lastName + " ( " + user.email + " ) ", userId: user._id, userFname: user.name, userEmail: user.email });
        }
      });
      userList.sort((a, b) => a.userName.localeCompare(b.userName))
      setAdminSelectedUserName(userList[0].userName);
      setAdminSelectedUserId(userList[0].userId);
      setAdminSelectedDeliverySite(deliverySiteList[0]);
      setDeliverySiteListSorted(Array.from(new Set(deliverySiteList)))
      setUserInformation({ name: userList[0].userFname, email: userList[0].userEmail });
    }
  };

  const changeUserName = (e) => {
    const userName = e.target.value
    setAdminSelectedUserName(userName);
    userList.length = 0;
    deliverySiteFinalList.length = 0;
    userIdList.length = 0;
    userEmailList.length = 0;
    users?.map((user) => {
      if (
        user.name + " " + user.lastName + " ( " + user.email + " ) " ===
        userName
      ) {
        userList.push({ userName: user.name + " " + user.lastName + " ( " + user.email + " ) ", userId: user._id, userFname: user.name, userEmail: user.email });
        deliverySiteFinalList.push(user.location);
        userIdList.push(user._id);
        userEmailList.push({ email: user.email, name: user.name });
      }
    });
    userList.sort((a, b) => a.userName.localeCompare(b.userName))
    setAdminSelectedUserId(userList[0].userId);
    setAdminSelectedDeliverySite(deliverySiteFinalList[0]);
    setUserInformation({ name: userList[0].userFname, email: userList[0].userEmail });
  };

  const changeDeliverySite = (e) => {
    setAdminSelectedDeliverySite(e.target.value);
  };

  useEffect(() => {
    const chosenCompany = adminDeliveryBooks?.filter(book => book.companyName === adminSelectedCompany)
    setQuickBooksCustomerId(chosenCompany && chosenCompany[0]?.quickBooksCustomerId);
    setDueDays(chosenCompany && chosenCompany[0]?.dueDays);
  }, [adminSelectedCompany])


  useEffect(() => {
    users?.map((user) => {
      if (user.location.toUpperCase() === adminSelectedDeliverySite) {
        adminDeliverySites?.map((adminSite) => {
          if (adminSite.name?.toUpperCase() === user.location?.toUpperCase()) {
            setUserAddress(adminSite.deliveryAddress)
          }

          // if (adminSite.storeEmail && adminSite.storeEmail?.toUpperCase() === user.email?.toUpperCase()) {
          //   setStoreUser(user)
          //}
        });
      }
    })
  }, [adminSelectedCompany, adminSelectedUserName, adminSelectedDeliverySite, adminSelectedUserId]);

  // useEffect(() => {
  //   if (storeUser && storeUser?._id === adminSelectedUserId) {
  //     setSecondOwnerId(" ")
  //   } else if (storeUser !== " ") {
  //     setSecondOwnerId(storeUser?._id)
  //   }
  // }, [storeUser])


  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal.toFixed(2),
        taxAmount: taxAmount,
      },
      cartItems: cartItems.map((item) => {
        const currentClientSku = updateCurrentClientSku(item.cartProducts[0].clientsSku)
        return {
          productId: item.productId,
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
              purchaseprice: item.cartProducts[0].purchaseprice,
              quantity: item.cartProducts[0].quantity,
              suppliedQty: item.cartProducts[0].quantity,
              backOrder: 0,
              sales: item.cartProducts[0].sales ?? null,
              slrsku: item.cartProducts[0].slrsku,
              suppliersku: item.cartProducts[0].suppliersku,
              clientsSku: item.cartProducts[0].clientsSku,
              currentClientSku: currentClientSku,
              _id: item.cartProducts[0]._id,
            },
          ],
        };
      }),
      paymentMethod: paymentMethod,
      purchaseNumber: purchaseNumber,
      adminNote: adminOrderNote,
      orderNote: orderNote,
      invoiceNumber: largestInvoice + 1,
      deliverySite: adminSelectedDeliverySite,
      //secondOwnerId: secondOwnerId,
      //storeId: storeUser !== " " ? (storeUser._id) : " ",
      user_id: adminSelectedUserId,
      userName: adminSelectedUserName,
      userCompany: adminSelectedCompany,
      quickBooksCustomerId: quickBooksCustomerId,
      dueDays: dueDays,
    };

    adminCreateOrder(orderData)
      .then(async (data) => {
        if (data) {
          reduxDispatch(emptyCart());
          setTimeout(() => {
            navigate("/admin/orders");
          }, 1000);
          const res = await axios.post("/api/sendemail/newOrderRemind", {
            from: userInfo.email,
            PO: purchaseNumber,
            price: cartSubtotal.toFixed(2),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  /* 修改支付方式的vale */
  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const enterPurchaseNum = (e) => {
    setPurchaseNumber(e.target.value);
    setButtonDisabled(false);
  };

  const enterAdminOrderNote = (e) => {
    setAdminOrderNote(e.target.value);
  };

  const enterOrderNote = (e) => {
    setOrderNote(e.target.value);
  };

  const enterManagerEmail = (e) => {
    setManagerEmail(e.target.value + `@${userEmail}`);
  };

  const removeAllItems = () => {
    reduxDispatch(emptyCart());
    setTimeout(() => {
      window.location.href = "/product-list";
    }, 1000);
  };

  const userEmail = userInfo.email?.split("@")[1];

  const generatePdf = async () => {
    try {
      const blob = await pdf(
        <CartPrint
          cartItems={cartItems}
          userInfo={userInformation}
          userAddress={userAddress}
          purchaseNumber={purchaseNumber}
          cartSubtotal={cartSubtotal}
          taxAmount={taxAmount}
        />
      ).toBlob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
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

  const nonGSTPrice = parseFloat((cartSubtotal - taxAmount).toFixed(2)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

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

  return (
    <>
      <Container>
        <Row className="mt-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>CART DETAILS (ADMIN)</h1>
          </div>
          <Col md={9}>
            <ListGroup>
              <ListGroup.Item className="mt-1">
                <Row>
                  <Col md={4}>
                    <Form.Label className="fw-bold">Company Name:</Form.Label>
                    <Form.Select
                      required
                      name="companyNames"
                      aria-label="Default select example"
                      onChange={changeCompanyName}
                      className="p-0 ps-2"
                    >
                      {companyList &&
                        companyList.map((company, idx) => {
                          return company !== "" ? (
                            <option key={idx} value={company}>
                              {" "}
                              {company}
                            </option>
                          ) : (
                            <option key={idx} value={company}>
                              {" "}
                              {company}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </Col>
                  <Col md={5}>
                    <Form.Label className="fw-bold">User's Name:</Form.Label>
                    <Form.Select
                      required
                      name="userNames"
                      aria-label="Default select example"
                      onChange={changeUserName}
                      className="p-0 ps-2"
                      value={userList?.name}
                    >
                      <option value={userList.name}>Select a name</option>
                      {userNameList &&
                        userNameList
                          .sort((a, b) => a.userName.localeCompare(b.userName))
                          .map((user, idx) => {
                            return user !== "" ? (
                              <option key={idx}
                                value={user.userName}
                              >
                                {" "}
                                {user.userName}
                              </option>
                            ) : ("");
                          })}
                      {/* {userList &&
                        userList
                          .sort((a, b) => a.userName.localeCompare(b.userName))
                          .map((user, idx) => {
                            return user !== "" ? (
                              <option key={idx} 
                            value={user.userName}
                              >
                                {" "}
                                {user.userName}
                              </option>
                            ) : ("");
                          })} */}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-bold">Delivery Site:</Form.Label>
                    <Form.Select
                      required
                      name="deliverySites"
                      aria-label="Default select example"
                      onChange={changeDeliverySite}
                      className="p-0 ps-2"
                      value={adminSelectedDeliverySite}
                    >
                      {deliverySiteListSorted &&
                        deliverySiteListSorted
                          .sort((a, b) => a.localeCompare(b))
                          .map((site, idx) => {
                            return site !== "" ? (
                              <option key={idx} value={site}>
                                {" "}
                                {site}
                              </option>
                            ) : (
                              <option key={idx} value={site}>
                                {" "}
                                {site}
                              </option>
                            );
                          })}
                    </Form.Select>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item className="mt-2">
              <Row>
                <Col md={12}>
                  <ListGroup>
                    {cartItems.map((item, idx) => (
                      <CartItemComponent
                        item={item}
                        key={idx}
                        changeCount={changeCount}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    ))}
                  </ListGroup>
                  <Button
                    type="button"
                    onClick={removeAllItems}
                    className="p-1 ps-1 pe-1 mt-1 empty_cart_btn"
                  >
                    Empty Cart <i className="bi bi-trash" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </Col>
          <Col md={3} className="cart_detail_right">
            <ListGroup>
              <ListGroup.Item className="p-1 ps-2">
                <div className="d-grid gap-2">
                  <PDFDownloadLink
                    document={
                      <CartPrint
                        cartItems={cartItems}
                        userInfo={userInformation}
                        userAddress={userAddress}
                        purchaseNumber={purchaseNumber}
                        cartSubtotal={cartSubtotal}
                        taxAmount={taxAmount}
                      />
                    }
                    fileName={userInformation.name + "'s Cart"}
                    className="btn btn-success p-0 ps-1 pe-1 ms-3 me-3 download_cart_btn"
                  >
                    <span>
                      Download Cart <i className="bi bi-file-earmark-pdf"></i>
                    </span>
                  </PDFDownloadLink>
                </div>
              </ListGroup.Item>
            </ListGroup>

            {/* <ListGroup hidden={cartItems.length === 0}>

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
            </ListGroup> */}
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

              <ListGroup.Item
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
                controlid="validationAdminOrderNote"
                className="p-1 ps-2"
              >
                <Form.Label className="fw-bold">Admin Note:</Form.Label>
                <Form.Control
                  className="p-0 ps-1"
                  type="string"
                  name="adminOrderNote"
                  placeholder="Admin Note"
                  onChange={enterAdminOrderNote}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Your Note.{" "}
                </Form.Control.Feedback>

              </ListGroup.Item>

              <ListGroup.Item
                controlid="validationOrderNote"
                className="p-1 ps-2"
              >
                <Form.Label className="fw-bold">Order Note:</Form.Label>
                <Form.Control
                  className="p-0 ps-1"
                  type="string"
                  name="orderNote"
                  placeholder="Order Note"
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
                  required
                  value={titleCase(shippingAddress).split(',').map(sentence => sentence.trim()).join('\n')}
                  style={{ fontSize: '12px', height: "100px" }}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Shipping Address.{" "}
                </Form.Control.Feedback>
              </ListGroup.Item>

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
            <br />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCartDetailsPageComponent;
