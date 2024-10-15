import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  InputGroup,
  Button,
  Modal
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

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

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
  const [hasProducts, setHasProducts] = useState()
  const [uniformUserId, setUniformUserId] = useState()
  const [uniformUserName, setUniformUserName] = useState()
  const [createdUserId, setCreatedUserId] = useState()
  const [createdUserName, setCreatedUserName] = useState()
  const [user, setUser] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [validated, setValidated] = useState(true);
  // const [ chosenDeliverySite, setChosenDeliverySite ] = useState();
  const [ totaQuantity, setTotalQuantity ] = useState(0)

  const [ isOpenNewAddressModal, setIsOpenNewAddressModal ] = useState(false);
  const [ isOpenChangeAddressModal, setIsOpenChangeAddressModal ] = useState(false);
  const [ location, setLocation ] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    addressLine: '',
    city: '',
    stateProvinceRegion: '',
    ZIPostalCode: '',
    country: ''
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine: '',
    city: '',
    stateProvinceRegion: '',
    ZIPostalCode: '',
    country: ''
  });

  const [newBillingAddress, setNewBillingAddress] = useState({
    addressLine: '',
    city: '',
    stateProvinceRegion: '',
    ZIPostalCode: '',
    country: ''
  });

  const [newDeliveryAddress, setNewDeliveryAddress] = useState({
    addressLine: '',
    city: '',
    stateProvinceRegion: '',
    ZIPostalCode: '',
    country: ''
  });

  const [sameAddress, setSameAddress] = useState(false);

  const [chosenDeliverySite, setChosenDeliverySite] = useState({
    location: '',
    billingAddress: '',
    deliveryAddress: ''
  });

  const [isLocationValid, setIsLocationValid] = useState(true);

  const splitAddress = (address) => address ? address.split(',').map(part => part.trim()) : ['', '', '', '', ''];

  

  useEffect(() => {
    const [address, city, state, zip, country] = splitAddress(chosenDeliverySite.billingAddress);
    setBillingAddress({
      addressLine: address,
      city: city,
      stateProvinceRegion: state,
      ZIPostalCode: zip,
      country: country
    });
  }, [chosenDeliverySite]);

  useEffect(() => {
    const [address, city, state, zip, country] = splitAddress(chosenDeliverySite.deliveryAddress);
    setDeliveryAddress({
      addressLine: address,
      city: city,
      stateProvinceRegion: state,
      ZIPostalCode: zip,
      country: country
    });
  }, [chosenDeliverySite]);

  const handleSiteChange = (event) => {
    const selectedSiteIndex = event.target.value;
    const selectedSite = deliveryBooks[0]?.sites[selectedSiteIndex];

    if (selectedSite) {
      setChosenDeliverySite({
        location: selectedSite.name || '',
        billingAddress: selectedSite.billingAddress || '',
        deliveryAddress: selectedSite.deliveryAddress || ''
      });
    }
  };

  //Tracking user Interactions
  useTrackEvents();
  // var trackData = localStorage.getItem("trackData")
  // console.log("trackData", trackData);
  useEffect(() => {
    let total = 0;
    if (cartItems) {
      cartItems.map((item) => {
        if (item.uniformUserId) {
          setUniformUserId(item.uniformUserId)
          setUniformUserName(item.uniformUserName)
        }

        total += item.cartProducts[0].quantity
      })
    }
    setCreatedUserId(userInfo._id)
    setCreatedUserName(userInfo.name + " " + userInfo.lastName + "(" + userInfo.email + ")")
    setTotalQuantity(total)
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
        setChosenDeliverySite(deliveryBooks[0].sites[0]);
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
      } else {
        setHasProducts(0)
      }
    })
  }, [cartItems])

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
      deliverySite: chosenDeliverySite.name,
      deliveryAddress: chosenDeliverySite.deliveryAddress,
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


  const handleLocation = (event) => { 
    setIsLocationValid(true);
    setLocation(event.target.value);
  }

  const handleBillingAddress = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value
    }));

    if (sameAddress) {
      setDeliveryAddress((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNewBillingAddress = (e) => {
    const { name, value } = e.target;
    setNewBillingAddress((prev) => ({
      ...prev,
      [name]: value
    }));

    if (sameAddress) {
      setNewDeliveryAddress((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDeliveryAddress = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewDeliveryAddress = (e) => {
    const { name, value } = e.target;
    setNewDeliveryAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSameAddressChange = () => {
    setSameAddress((prev) => {
      const newSameAddress = !prev;

      if (newSameAddress) {
        setNewDeliveryAddress(billingAddress);
      } else {
        setNewDeliveryAddress({
          addressLine: '',
          city: '',
          stateProvinceRegion: '',
          ZIPostalCode: '',
          country: ''
        });
      }
      return newSameAddress;
    });
  };

 
  const addNewAddress = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const location = form.location.value;
    const billingAddress = `${form.addressLine.value}, ${form.city.value}, ${form.stateProvinceRegion.value}, ${form.ZIPostalCode.value}, ${form.country.value}`;
    const deliveryAddress = `${form.addressDeliveryLine.value}, ${form.cityDelivery.value}, ${form.stateProvinceRegionDelivery.value}, ${form.ZIPostalCodeDelivery.value}, ${form.countryDelivery.value}`;

    const newAddressSite = {
      name: location,
      billingAddress,
      deliveryAddress,
      abn: user.abn,
      id: deliveryBooks[0]._id
    }

    try {
      const res = await axios.post("/api/deliveryBooks/addNewSite", {
        location,
        billingAddress,
        deliveryAddress,
        abn: user.abn,
        id: deliveryBooks[0]._id
      });
  
      if (res.status === 200) {
        setChosenDeliverySite((prevSite) => ({
          ...prevSite,
          name: location,
          deliveryAddress,
          billingAddress
        }));
        
        deliveryBooks[0].sites.push(newAddressSite);
        setIsOpenNewAddressModal(false);
      } else if (res.status === 400) {
        setIsLocationValid(false);
      }
    } catch (error) {
      setIsLocationValid(false);
      console.error("Error adding new address:", error);
    }
    
  }


  const updateAddress = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const location = form.location.value;
    const billingAddress = `${form.addressLine.value}, ${form.city.value}, ${form.stateProvinceRegion.value}, ${form.ZIPostalCode.value}, ${form.country.value}`;
    const deliveryAddress = `${form.deliveryAddressLine.value}, ${form.deliveryCity.value}, ${form.deliveryStateProvinceRegion.value}, ${form.deliveryZIPostalCode.value}, ${form.deliveryCountry.value}`;
    
    const locationExists = deliveryBooks[0].sites.some(site => site.name.toLowerCase() === location.toLowerCase() && site._id !== chosenDeliverySite._id);

    if (locationExists && chosenDeliverySite.name.toLowerCase() !== location.toLowerCase()) {
      setIsLocationValid(false);
      return;
    }

    const updatedAddress = {
      location,
      billingAddress,
      deliveryAddress,
      abn: user.abn,
      id: deliveryBooks[0]._id,
      idSite: chosenDeliverySite._id
    };

    try {
      const res = await axios.post("/api/deliveryBooks/updateSite", updatedAddress);
  
      if (res.status === 200) {
        setChosenDeliverySite((prevSite) => ({
          ...prevSite,
          name: location,
          deliveryAddress,
          billingAddress
        }));

        setDeliveryBooks((prevBooks) => 
          prevBooks.map((book) => {
            if (book._id === deliveryBooks[0]._id) {
              return {
                ...book,
                sites: book.sites.map((site) => 
                  site._id === chosenDeliverySite._id 
                    ? { ...site, name: location, billingAddress, deliveryAddress }
                    : site
                )
              };
            }
            return book;
          })
        );

        setIsOpenChangeAddressModal(false)
      } else if (res.status === 400) {
        setIsLocationValid(false);
      }
    } catch (error) {
      setIsLocationValid(false);
      console.error("Error adding new address:", error);
    }
  };
  

  function ModalAddAddress() {
    return (
      <Modal show={isOpenNewAddressModal} onHide={handleClose} size="lg">
      <Modal.Header 
      closeButton 
      onClick={() => {
        setIsOpenNewAddressModal(false);
        setNewDeliveryAddress({
          addressLine: '',
          city: '',
          stateProvinceRegion: '',
          ZIPostalCode: '',
          country: ''
        });
        setNewBillingAddress({
          addressLine: '',
          city: '',
          stateProvinceRegion: '',
          ZIPostalCode: '',
          country: ''
        });
        setIsLocationValid(true);
        }}>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form onSubmit={addNewAddress}>
      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control required type="text" name="location" placeholder="Location" onChange={handleLocation}  isInvalid={!isLocationValid}  />
        <Form.Control.Feedback type="invalid">A site with this name already exists.</Form.Control.Feedback>
      </Form.Group>

      <Form.Label>Billing address</Form.Label>
      <Row>
        <Col>
        <Form.Group controlId="formBasicAddressLine">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Address Line</Form.Label>
        <Form.Control required type="text" name="addressLine" placeholder="Address Line" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>

      </Row>
      <Row col={2}>
        <Col>
        <Form.Group controlId="formBasicCity">
        <Form.Label style={{fontSize: "12px", color: "black"}}>City</Form.Label>
        <Form.Control required type="text" name="city" placeholder="City" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formBasicStateProvinceRegion">
        <Form.Label style={{fontSize: "12px", color: "black"}}>State/Province/Region</Form.Label>
        <Form.Control required type="text" name="stateProvinceRegion" placeholder="State/Province/Region" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
      </Row>
      <Row col={2}>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicZIPostalCode">
        <Form.Label style={{fontSize: "12px", color: "black"}}>ZIP/Postal Code</Form.Label>
        <Form.Control required type="number" name="ZIPostalCode" placeholder="ZIP/Postal Code" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Country</Form.Label>
        <Form.Control required type="text" name="country" placeholder="Country" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
      </Row>

      <Form.Check
        type="checkbox"
        label="Same as Billing Address"
        checked={sameAddress}
        onChange={handleSameAddressChange}
        style={{fontSize: "12px"}}
        className="mb-1"
      />


      <Form.Label>Delivery address</Form.Label>
      <Row>
        <Col>
        <Form.Group controlId="formBasicAddressDeliveryLine">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Address Line 1</Form.Label>
        <Form.Control 
        required 
        type="text" 
        name="addressDeliveryLine" 
        placeholder="Address Line"
        value={sameAddress ? newBillingAddress.addressLine : newDeliveryAddress.addressLine}
        onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
      </Row>
      <Row col={2}>
        <Col>
        <Form.Group controlId="formBasicCityDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>City</Form.Label>
        <Form.Control required type="text" name="cityDelivery" placeholder="City" 
                value={sameAddress ? newBillingAddress.city : newDeliveryAddress.city}

        onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formBasicStateProvinceRegionDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>State/Province/Region</Form.Label>
        <Form.Control required type="text" name="stateProvinceRegionDelivery" 
                        value={sameAddress ? newBillingAddress.stateProvinceRegion : newDeliveryAddress.stateProvinceRegion}
        placeholder="State/Province/Region" onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
      </Row>
      <Row col={2}>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicZIPostalCodeDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>ZIP/Postal Code</Form.Label>
        <Form.Control required type="number" name="ZIPostalCodeDelivery"                         
        value={sameAddress ? newBillingAddress.ZIPostalCode : newDeliveryAddress.ZIPostalCode}
        placeholder="ZIP/Postal Code" onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicCountryDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Country</Form.Label>
        <Form.Control required type="text" name="countryDelivery" 
        value={sameAddress ? newBillingAddress.country : newDeliveryAddress.country}
        placeholder="Country"  onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
      </Row>

      <div style={{display: "flex", gap: "15px", justifyContent: "flex-end"}}>
        <Button variant="secondary"
        onClick={() => {
          setIsOpenNewAddressModal(false);
          setNewDeliveryAddress({
            addressLine: '',
            city: '',
            stateProvinceRegion: '',
            ZIPostalCode: '',
            country: ''
          });
          setNewBillingAddress({
            addressLine: '',
            city: '',
            stateProvinceRegion: '',
            ZIPostalCode: '',
            country: ''
          });
          setIsLocationValid(true);
          }}
        
        >
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleClose}>
          Save New Address
        </Button>
      </div>
    </Form>
      </Modal.Body>
    </Modal>
    );
  }

  function ModalChangeAddress() {
    return (
    <Modal show={isOpenChangeAddressModal} size="lg">
      <Modal.Header closeButton onClick={() => {
        setIsOpenChangeAddressModal(false)
        setIsLocationValid(true);
        }}>
        <Modal.Title>Change Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateAddress}>
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleLocation}
              defaultValue={chosenDeliverySite.name}
              isInvalid={!isLocationValid}
            />
             <Form.Control.Feedback type="invalid">A site with this name already exists.</Form.Control.Feedback>
          </Form.Group>

          <Form.Label>Billing Address</Form.Label>
          <Row>
            <Col>
              <Form.Group controlId="formBasicBillingAddressLine">
                <Form.Label style={{fontSize: "12px", color: "black"}}>Address Line</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="addressLine"
                  placeholder="Address Line"
                  onChange={handleBillingAddress}
                  value={billingAddress.addressLine}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicCity">
                <Form.Label style={{fontSize: "12px", color: "black"}}>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleBillingAddress}
                  value={billingAddress.city}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicStateProvinceRegion">
                <Form.Label style={{fontSize: "12px", color: "black"}}>State/Province/Region</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="stateProvinceRegion"
                  placeholder="State/Province/Region"
                  onChange={handleBillingAddress}
                  value={billingAddress.stateProvinceRegion}

                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formBasicZIPostalCode">
                <Form.Label style={{fontSize: "12px", color: "black"}}>ZIP/Postal Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="ZIPostalCode"
                  placeholder="ZIP/Postal Code"
                  onChange={handleBillingAddress}
                  value={billingAddress.ZIPostalCode}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicCountry">
                <Form.Label style={{fontSize: "12px", color: "black"}}>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country"
                  placeholder="Country"
                  onChange={handleBillingAddress}
                  value={billingAddress.country}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicDeliveryAddress">
            <Form.Label>Delivery Address</Form.Label>
            <Row>
              <Col>
                <Form.Group controlId="formBasicDeliveryAddressLine">
                  <Form.Label style={{fontSize: "12px", color: "black"}}>Address Line</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryAddressLine"
                    placeholder="Address Line"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.addressLine}
                  />
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicDeliveryCity">
                  <Form.Label style={{fontSize: "12px", color: "black"}}>City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryCity"
                    placeholder="City"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.city}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicDeliveryStateProvinceRegion">
                  <Form.Label style={{fontSize: "12px", color: "black"}}>State/Province/Region</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryStateProvinceRegion"
                    placeholder="State/Province/Region"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.stateProvinceRegion}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicDeliveryZIPostalCode">
                  <Form.Label style={{fontSize: "12px", color: "black"}}>ZIP/Postal Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryZIPostalCode"
                    placeholder="ZIP/Postal Code"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.ZIPostalCode}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicDeliveryCountry">
                  <Form.Label style={{fontSize: "12px", color: "black"}}>Country</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryCountry"
                    placeholder="Country"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.country}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => {
              setIsOpenChangeAddressModal(false)
              setIsLocationValid(true);
              }}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Change Address
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    );
  }

  const handleSelect = (e) => {
    const newChosenSite = deliveryBooks[0].sites[e.target.value];
    setChosenDeliverySite(newChosenSite);
  }

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
                        <span className="fw-bold ">{totaQuantity}</span>{" "}
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

                  <ListGroup.Item className="p-1 ps-2">
                    <h4 className="m-0">Address</h4>
                    <div style={{ display: 'flex', alignItems: "center", gap: "10px"}}>
                       <Button onClick={() => setIsOpenNewAddressModal(true)} className="p-1" style={{ width: '110px', fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                       Add New Address
                      </Button>
                      <Button onClick={() => setIsOpenChangeAddressModal(true)} className="p-1" style={{ width: '110px', fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      Change Address
                      </Button>
                    </div>
                   
                  </ListGroup.Item>

                  {ModalAddAddress()}
                  {ModalChangeAddress()}

                  <ListGroup.Item
                    controlid="validationLocation"
                    className="p-1 ps-2"
                  >
                    <Form.Label className="fw-bold">Location</Form.Label>
                    {deliveryBooks &&  <Form.Select value={chosenDeliverySite.name} onChange={(e) => handleSelect(e)}>
                          <option value={chosenDeliverySite.name} style={{fontWeight: "bold", color: "#073474"}}>{chosenDeliverySite.name.toUpperCase()}</option>
                          { deliveryBooks[0]?.sites?.map((site, index) => {
                            return <option value={index}>{site.name.toUpperCase()}</option>
                          })}
                        </Form.Select>}
                  </ListGroup.Item>

                  <ListGroup.Item
                    controlid="validationBillingAddress"
                    className="p-1 ps-2"
                  >
                    <Form.Label className="fw-bold">Billing Address:</Form.Label>
                    <Form.Control
                    as="textarea"
                      className="p-0 ps-1"
                      type="string"
                      name="billingAddress"
                      placeholder="Billing Address"
                      required
                      value={titleCase(chosenDeliverySite.billingAddress).split(',').map(sentence => sentence.trim()).join('\n')}
                      style={{ fontSize: '12px', height: "100px"}}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Shipping Address.{" "}
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
                      value={titleCase(chosenDeliverySite.deliveryAddress).split(',').map(sentence => sentence.trim()).join('\n')}
                      style={{ fontSize: '12px', height: "100px"}}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Shipping Address.{" "}
                    </Form.Control.Feedback>
                  </ListGroup.Item>
                  </>

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
                    <Button
                        size="sm"
                        onClick={orderHandler}
                        disabled={purchaseNumber === "" ? true : false}
                        className="btn btn-success p-0 ps-1 pe-1 download_cart_btn"
                      >
                        Confirm Order
                      </Button>
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
                        disabled={purchaseNumber === ""}
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
