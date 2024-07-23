import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Tab,
  Tabs,
  Form,
  Modal,
  Table,
  Tooltip,
  OverlayTrigger,

} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-medium-image-zoom/dist/styles.css";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";
import BreadcrumbComponent from "../../components/filterQueryResultOptions/BreadcrumbComponent";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCategories } from "../../redux/actions/categoryActions";
import QuotePriceComponent from "../../components/SendEmail/QuotePriceComponent";
import { connect } from "react-redux";
import moment from "moment-timezone";
import EditProductShortInforComponent from "../admin/components/EditProductShortInforComponent";
import "./SharedPages.css";
import { useTrackEvents } from "../trackEvents/useTrackEvents";
import ReturnProfitCalculator from "../ReturnProfitCalculator";
import { getClientsSkuList } from "../../redux/actions/productsActions";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  getUser,
  createQuote,
  clientUpdateSku,
  addToPOCartHandler,
}) => {
  const { id } = useParams();
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("Please-Select");
  const [selectedStock, setSelectedStock] = useState(null);
  const [userNameEmail, setUserNameEmail] = useState();
  const [userData, setUserData] = useState([]);
  const [quoteData, setQuoteData] = useState();
  const [edit, setEdit] = useState(false);
  const [changedClientSKU, setChangedClientSKU] = useState();
  const [brandSearch, setBrandSearch] = useState("");
  const navigate = useNavigate();

  //check for uniform content in cart
  const [isUniform, setIsUniform] = useState(false)
  const cartItems = useSelector((state) => state.cart.cartItems);
    //categories
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCategories());
      dispatch(getClientsSkuList());
    }, [dispatch]);
  
    const { categories } = useSelector((state) => state.getCategories);
    const { clientsSkuList } = useSelector((state) => state.products);
  useEffect(() => {
    cartItems?.map((items) => {
      if (items.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) {
        setIsUniform(true)
      }
    })
  }, [cartItems])

  // console.log("product", product)
  // console.log("userData", userData)

 
  var displayTable = [];
  var tableHeadings = [
    "SPECIFICATIONS",
    "SPECIFICATION",
    "TECHNICAL SPECIFICATIONS",
    "TECHNICAL SPECIFICATION",
    "TECHNICAL DETAILS",
  ];
  var headings = [
    "APPLICATION INFO",
    "DESCRIPTIONS",
    "DESCRIPTION",
    "FEATURES",
    "FEATURE",
    "SPECIFICATIONS",
    "SPECIFICATION",
    "TECHNICAL SPECIFICATIONS",
    "TECHNICAL SPECIFICATION",
    "TECHNICAL DETAILS",
  ];

  //Tracking user Interactions
  useTrackEvents();
  // var trackData = localStorage.getItem("trackData")
  // console.log("trackData", trackData);

  // 当product state update的时候，重置一下setQty
  useEffect(() => {
    if (product.saleunit) {
      setQty(product.saleunit);
    }
    setBrandSearch(product.supplier);
  }, [product]);

  useEffect(() => {
    if (product.stock && product.stock.length === 1) {
      const singleStockItem = product.stock[0];
      const siteSku = userData.siteSku;

      if (siteSku in singleStockItem) {
        const filteredStockItem = Object.keys(singleStockItem).reduce(
          (acc, key) => {
            if (
              key === "_id" ||
              key === "attrs" ||
              key === "count" ||
              key === "purchaseprice" ||
              key === "price" ||
              key === "barcode" ||
              key === "suppliersku" ||
              key === "ctlsku" ||
              key === "sales" ||
              key === "QuickBooksItemID" ||
              key === siteSku
            ) {
              acc[key] = singleStockItem[key];
            }
            return acc;
          },
          {}
        );

        setSelectedProduct(singleStockItem.attrs);
        setSelectedStock(filteredStockItem);
      } else {
        setSelectedProduct(singleStockItem.attrs);
        setSelectedStock(singleStockItem);
      }
    }
  }, [product, userData.siteSku, edit]);

  const handleProductChange = (event) => {
    const attrs = event.target.value;
    setSelectedProduct(attrs);

    if (attrs !== "Please-Select") {
      const stockItem = product.stock.find((item) => item.attrs === attrs);

      const siteSku = userData?.siteSku;

      if (stockItem) {
        const selectedStockWithOneSku = Object.keys(stockItem).reduce(
          (acc, key) => {
            if (
              key === "_id" ||
              key === "attrs" ||
              key === "uom" ||
              key === "count" ||
              key === "purchaseprice" ||
              key === "price" ||
              key === "barcode" ||
              key === "suppliersku" ||
              key === "ctlsku" ||
              key === "sales" ||
              key === "QuickBooksItemID" ||
              key === siteSku ||
              key === "clientsSku"
            ) {
              acc[key] = stockItem[key];
            }
            return acc;
          },
          {}
        );

        setSelectedStock(selectedStockWithOneSku);
      } else {
        setSelectedStock(null);
      }
    } else {
      setSelectedStock(null);
    }
  };

  let stockCount = null;
  let stockPrice = null;
  let stockCode = null;
  let supplierCode = null;
  let clientSku = null;
  let clientSkuName = null;

  const clientSiteSku = userData?.siteSku;

  if (selectedProduct !== "Please-Select" && selectedStock) {
    stockCount = selectedStock.count;
    stockPrice = selectedStock.price;
    stockCode = selectedStock.ctlsku;
    supplierCode = selectedStock.suppliersku;

    // if (clientSiteSku && selectedStock[clientSiteSku] !== undefined) {
    //   clientSku = selectedStock[clientSiteSku];
    // }

    clientsSkuList.map(skuName => {
      if(skuName.sku.toLowerCase().includes(userData.location.toLowerCase())) {
        clientSkuName = skuName.sku
      }
    })

    selectedStock.clientsSku?.map(sku => {
      let matchClientSku = sku.name?.match(/[A-Z][a-z]+|[0-9]+/g).join(" ").toLowerCase().includes(userData.location.toLowerCase());

      if(matchClientSku){
        clientSku = sku.number;
      }
    })
  }

  const [buttonText, setButtonText] = useState("Add to cart");

  const addToCartHandler = async () => {
    setButtonText("Adding...");
    try {
      await reduxDispatch(addToCartReduxAction(id, qty, selectedStock));
      setShowCartMessage(true);
      setButtonText("Added!");
      setTimeout(() => setButtonText("Add to cart"), 1000);
    } catch (error) {
      // handle error case
      setButtonText("Add to cart");
    }
  };

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setQty(product.saleunit);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [edit, id]);

  // 如果直接用toLocaleString() 报错的话，可能是value undefined了，那就format一下price， 然后再加上 toLocaleString
  const price = stockPrice;
  const formattedPrice = price
    ? (price * qty).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : "";

  //react-image-lightbox -starts here
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

          try {
            await fetchImage(imagePath);
            imagesArray.push({
              original: imagePath,
              thumbnail: imagePath,
              url: imagePath,
              title: image.title,
              caption: image.name,
            });
          } catch (error) {
            console.error("Image failed to load:", error);
          }
        }
      }
      setImages(imagesArray);
    }

    handleImages();
  }, [product]);

  async function fetchImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ ok: true });
      img.onerror = () => reject({ ok: false });

      img.src = url;
    });
  }

  //Existing pdf list
  const [pdfs, setPdfs] = useState([]);
  useEffect(() => {
    async function handlePdfs() {
      const pdfArray = [];
      if (product && product.pdfs) {
        for (const pdf of product.pdfs) {
          if (!pdf.path) {
            continue;
          }
          let pdfPath = pdf.path;
          if (pdfPath.includes("http://")) {
            pdfPath = pdfPath.replace("http://", "https://");
          }
          const isExists = await fetchPdf(pdfPath);
          if (isExists.ok) {
            pdfArray.push({
              url: pdfPath,
            });
          }
        }
      }
      setPdfs(pdfArray);
    }
    handlePdfs();
  }, [product]);

  async function fetchPdf(url) {
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

  // quote price using -
  useEffect(() => {
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
        setUserData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const quotePriceData = {
    ...userNameEmail,
    productName: product.name,
    productId: id,
  };

  useEffect(() => {
    if (selectedStock) {
      setQuoteData({
        existingProduct: true,
        product: id,
        ctlsku: selectedStock.ctlsku,
        status: "Received",
      });
    }
  }, [id, selectedStock]);

  // TODO uncomment this when quote price is ready
  /*   const handleQuotePrice = async () => {
      try {
        const response = await createQuote(quoteData);
        console.log(response);
        if (response.message === "Product already in quotelist") {
          setButtonText("Product already in quotelist!");
          setTimeout(() => setButtonText("Add to cart"), 1000);
        }
        setButtonText("Quote Sent!");
        setTimeout(() => setButtonText("Add to cart"), 1000);
      } catch (error) {
        setButtonText("Error!, Please Refresh Page");
      }
    } */

  // console.log(quoteData);

  // next function
  const handleBlur = (e) => {
    const newValue =
      Math.round(e.target.value / product.saleunit) * product.saleunit;
    setQty(newValue);
  };

  const [standard, setStandard] = useState([]);

  useEffect(() => {
    if (product?.standards) {
      if (product.standards.includes("/")) {
        const splittedStandards = product.standards.split("/");
        setStandard(splittedStandards);
      } else {
        setStandard([product.standards]);
      }
    }
  }, [product]);

  const [videoUrl, setVideoUrl] = useState([]);

  useEffect(() => {
    if (product?.videoUrl) {
      if (product.videoUrl.includes("/")) {
        const splittedVideoUrl = product.videoUrl.split("/");
        setVideoUrl(splittedVideoUrl);
      } else {
        setVideoUrl([product.videoUrl]);
      }
    }
  }, [product]);

  const expireDate = product.expireDate;
  const formattedExpireDate = expireDate?.slice(9);

  const dateCalculation = moment.tz(
    expireDate,
    "HH:mm:ss DD/MM/YYYY",
    "Australia/Perth"
  );

  const currentDate = moment.tz("Australia/Perth");
  const diff = dateCalculation.diff(currentDate, "days");

  /*   async function downloadPDF(pdfURL, pdfName) {
      const response = await fetch(pdfURL);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
      tempLink.setAttribute("download", pdfName);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    } */
  async function downloadPDF(pdfURL, pdfName) {
    if (pdfURL.includes("http:")) {
      pdfURL = pdfURL.replace("http:", "https:");
    }

    const response = await fetch(pdfURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", pdfName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  // table first letter capitalized
  function capitalizeFirstLetter(string) {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      : "";
  }

  // Edit product Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Calculator Modal
  const [showCalculator, setShowCalculator] = useState(false);
  const handleCloseCalculator = () => {
    setShowCalculator(false);
  };
  const handleShowCalculator = () => setShowCalculator(true);



  const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    return data;
  };

  const updateProductApiRequest = async (productId, formInputs) => {
    const { data } = await axios.put(
      `/api/products/admin/updateProduct/${productId}`,
      {
        ...formInputs,
      }
    );
    return data;
  };

  const productChanged = async (closeModal) => {
    await setShow(closeModal);
  };

  const [refresh, setRefresh] = useState(false);
  const refreshAfterEdit = async (refresh) => {
    await setRefresh(refresh);
  };
  useEffect(() => {
    if (refresh === true) {
      window.location.reload();
    }
  }, [refresh]);

  const execustionDate = new Date("2024-1-15 11:30:00");

  const handleEdit = () => setEdit(true);

  const handleSaveClientSku = async () => {
    try {
      if (!changedClientSKU) {
        setEdit(false);
        return;
      }
      await clientUpdateSku(stockCode, changedClientSKU, clientSkuName);
      console.log("Client SKU updated successfully");

      const updatedProduct = await fetchProduct(id);
      setProduct(updatedProduct);

      const updatedStockItem = updatedProduct.stock.find(
        (item) => item.ctlsku === stockCode
      );
      if (updatedStockItem) {
        setSelectedStock(updatedStockItem);
      }

      setEdit(false);
      setChangedClientSKU();
    } catch (error) {
      console.error("Failed to save client SKU", error);
    }
  };

  const hanldeSkuChange = (e) => {
    setChangedClientSKU(e.target.value)
    setEdit(true);
  };

  const brandSearchHandler = () => {
    if (brandSearch) {
      window.open(`/product-list?brandName=${brandSearch}`, "_blank");
    }
  };

  const [poCartItems, setPoCartItems] = useState([]);
  const [poCartBtnText, setPoCartBtnText] = useState("Add to PO cart");


  useEffect(() => {
    if (selectedStock) {
      setPoCartItems([
        {
          productId: id,
          name: product.name,
          saleunit: product.saleunit,
          image: product.images[0].path,
          supplier: product.supplier,
          poCartProducts: [
            {
              ctlsku: selectedStock.ctlsku,
              quantity: qty,
              purchaseprice: selectedStock.purchaseprice,
              suppliersku: selectedStock.suppliersku,
              attrs: selectedStock.attrs,
              uom: selectedStock.uom,
            },
          ],
        },
      ]);
    }
  }, [selectedStock, qty]);

  const addToPOCartCheck = () => {

    let missingFields = [];

    poCartItems.forEach((item, itemIndex) => {
      const requiredItemFields = ['productId', 'name', 'saleunit', 'image', 'supplier'];
      requiredItemFields.forEach((field) => {
        if (item[field] === undefined || item[field] === null) {
          missingFields.push(`${field}`);
        }
      });

      item.poCartProducts.forEach((product, productIndex) => {
        const requiredProductFields = ['ctlsku', 'quantity', 'purchaseprice', 'suppliersku', 'attrs', 'uom'];
        requiredProductFields.forEach((field) => {
          if (product[field] === undefined || product[field] === null) {
            missingFields.push(`${field}`);
          }
        });
      });
    });

    if (missingFields.length > 0) {
      const formattedMissingFields = missingFields.map(field => field.toUpperCase());
      const errorMessage = `Please check selected product!!! It is missing:\n${formattedMissingFields.join('\n')}`;
      alert(errorMessage);
      return;
    }
    setPoCartBtnText("Adding...");
    console.log("poCartItems", poCartItems);

    addToPOCartHandler(poCartItems)
      .then((data) => {
        console.log("data", data);
        setPoCartBtnText("Added!");
        setTimeout(() => setPoCartBtnText("Add to PO cart"), 1000);
      })
      .catch((error) => {
        console.error("Error adding to PO cart:", error);
        alert("Failed to add to PO cart.");
        setPoCartBtnText("Add to PO cart");
      });
  };


  return (
    <Container className="content-container ms-3" fluid>
      <BreadcrumbComponent />
      <Row>
        <Col xxl={2} xl={3} lg={3} md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <FilterComponent />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xxl={10} xl={9} lg={9} md={9} className="mb-3">
          <Row className="mt-4 ">
            {/* ************   Filter, has removed, now just take 1 space  ***************  */}

            {/* ************   Product Pictures Display Carousel  ***************  */}
            <Col lg={4} className="m-1">
              <ImageGallery items={images} />
            </Col>

            {/* ************   Product Details  ***************  */}
            <Col lg={6}>
              <span className="categoryHD">
                {product.category?.replaceAll("/", " / ")}
              </span>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2 className="text-uppercase">{product.name}</h2>
                    {userData.isAdmin === true ? (
                      <>
                        <button
                          onClick={handleShow}
                          className="ms-2 p-0 ps-1 pe-1 mb-1"
                        >
                          Edit
                        </button>
                        <Button
                          onClick={() => addToPOCartCheck()}
                          className="ms-2 p-0 ps-1 pe-1 mb-1 btn btn-success"
                          disabled={
                            selectedProduct === "Please-Select" ||
                            poCartBtnText !== "Add to PO cart"
                          }
                        >
                          {poCartBtnText}
                        </Button>
                        <LinkContainer to="/admin/poCart-details">
                          <Button className="ms-2 p-0 ps-1 pe-1 mb-1 btn btn-success" ><i class="bi bi-box-arrow-in-up-right"></i></Button>
                        </LinkContainer>
                      </>
                    ) : (
                      ""
                    )}

                    <div>
                      <div
                        hidden={selectedProduct !== "Please-Select"}
                        className="mt-5"
                      >
                        <label htmlFor="attrs">
                          Choose Product:&nbsp;&nbsp;&nbsp;{" "}
                        </label>
                        <select
                          id="product-select"
                          value={selectedProduct}
                          onChange={handleProductChange}
                        >
                          {product.stock &&
                            (product.stock.length === 1 ? (
                              <option value={product.stock[0].attrs}>
                                {product.stock[0].attrs}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {product.stock.map((stock) => (
                                  <option
                                    key={"productMap1" + stock.attrs}
                                    value={stock.attrs}
                                  >
                                    {stock.attrs}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>
                      <div hidden={selectedProduct === "Please-Select"}>
                        <label htmlFor="attrs">
                          Choose Product:&nbsp;&nbsp;&nbsp;{" "}
                        </label>
                        <select
                          id="product-select"
                          value={selectedProduct}
                          onChange={handleProductChange}
                        >
                          {product.stock &&
                            (product.stock.length === 1 ? (
                              <option value={product.stock[0].attrs}>
                                {product.stock[0].attrs}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {product.stock.map((stock) => (
                                  <option
                                    key={"productMap2" + stock.attrs}
                                    value={stock.attrs}
                                  >
                                    {stock.attrs}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>

                      {/* {stockCount !== null && (
                        <>
                          <p className="mb-0">
                            WA Stock:{" "}
                            {stockCount > 19 ? (
                              <i className="bi bi-circle-fill fw-bold text-success">
                                {" "}
                                in stock
                              </i>
                            ) : (
                              <i className="bi bi-circle-fill fw-bold text-warning">
                                {" "}
                                low stock
                              </i>
                            )}
                          </p>
                          <p>
                            
                            {product.displayPrice === 0 ? null : (
                              <>
                              Status:{" "}
                              <i className="bi bi-circle-fill fw-bold text-success">
                                {" "}
                                in stock
                              </i>
                              </>
                            )}
                          </p>
                        </>
                      )} */}
                    </div>
                    <br />
                    <Row hidden={selectedProduct === "Please-Select"}>
                      <Col>
                        <h6>Product Code: {stockCode}</h6>
                        <h6 hidden={userData?.isAdmin === true}>
                          Client Code:
                          {userData?.isSitePerson === true ? (
                            <>
                              {edit === false ? (
                                <div
                                  style={{ display: "inline" }}
                                  className="ms-1"
                                >
                                  {clientSku ? clientSku : "N/A"}
                                  <i
                                    onClick={handleEdit}
                                    className="bi bi-pencil-square"
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                  ></i>
                                </div>
                              ) : (
                                <div
                                  style={{ display: "inline" }}
                                  className="ms-1"
                                >
                                  <Form.Control
                                    type="text"
                                    className="form-control d-inline-block p-0 pe-1 ps-1"
                                    style={{
                                      width: "auto",
                                      verticalAlign: "middle",
                                    }}
                                    onChange={hanldeSkuChange}
                                    value={
                                      changedClientSKU
                                        ? changedClientSKU
                                        : clientSku
                                    }
                                  />
                                  <button
                                    className="btn btn-success p-0 pe-1 ps-1 ms-1 d-inline-block"
                                    onClick={handleSaveClientSku}
                                    disabled={!edit}
                                  >
                                    save
                                  </button>
                                  <button
                                    className="btn btn-light p-0 pe-1 ps-1 ms-1 d-inline-block"
                                    onClick={() => setEdit(false)}
                                    disabled={!edit}
                                  >
                                    <i class="bi bi-x-circle"></i>
                                  </button>
                                </div>
                              )}
                            </>
                          ) : null}
                        </h6>

                        <h6>
                          {userData.isAdmin === true ||
                            userData.isMarketing === true ? (
                            <>
                              <h6>Supplier Code: {supplierCode}</h6>
                              <h6>
                                Supplier: {product.supplier}{" "}
                                <i
                                  onClick={() => brandSearchHandler()}
                                  className="bi bi-box-arrow-in-right"
                                  style={{ cursor: "pointer" }}
                                ></i>
                              </h6>
                              <h6>
                                Margin:{" "}
                                {(
                                  (100 *
                                    (selectedStock?.price -
                                      selectedStock?.purchaseprice)) /
                                  selectedStock?.purchaseprice
                                ).toFixed(2)}
                                %
                              </h6>

                              <span className="fw-bold">
                                Price: ${formattedPrice}
                              </span>
                              {diff < 0 ? (
                                <span className="text-danger ms-5">
                                  PRICE EXPIRED, PLEASE CHECK WITH SUPPLIER
                                </span>
                              ) : (
                                <span
                                  className="ms-5"
                                  style={{ fontSize: "0.9rem" }}
                                  hidden={!formattedExpireDate}
                                >
                                  Price Valid Until: {formattedExpireDate}
                                </span>
                              )}
                            </>
                          ) : product.displayPrice === 0 || diff < 0 ? (
                            <span className="fw-bold PriceContact">
                              Contact us for a quote
                            </span>
                          ) : (
                            <>
                              <span className="fw-bold">
                                Price: ${formattedPrice}
                              </span>
                              <span
                                className="text-danger ms-5"
                                style={{ fontSize: "0.9rem" }}
                                hidden={isNaN(diff)}
                              >
                                Price Valid Until: {formattedExpireDate}
                              </span>
                            </>
                          )}
                        </h6>
                        <br />
                      </Col>
                    </Row>

                    <Row>
                      {userData.isAdmin === true ? (
                        <>
                          {product.displayPrice === 0 ? null : (
                            <h6>Quantity :</h6>
                          )}
                          <Col lg={3}>
                            <div
                              className="btn-group addToCartQty"
                              role="group"
                            >
                              <Form.Control
                                type="number"
                                min={product.saleunit}
                                className="form-control col-0"
                                value={qty}
                                onBlur={handleBlur}
                                onChange={(e) => setQty(e.target.value)}
                                step={product.saleunit}
                                disabled={selectedProduct === "Please-Select"}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <Button
                              onClick={() => addToCartHandler(selectedStock)}
                              className="CTL_btn btn-ripple                    "
                              disabled={
                                selectedProduct === "Please-Select" ||
                                buttonText !== "Add to cart"
                              }
                            >
                              {buttonText}
                            </Button>
                          </Col>
                        </>
                      ) : product.displayPrice === 0 || diff < 0 ? (
                        <QuotePriceComponent
                          quotePriceData={quotePriceData}
                          createQuote={createQuote}
                          quoteData={quoteData}
                        />
                      ) : (
                        // <button onClick={handleQuotePrice} className="btn btn-block btn-success">Quote</button>
                        <>
                          {product.displayPrice === 0 || diff < 0 ? null : (
                            <h6 hidden={selectedProduct === "Please-Select"}>
                              Quantity :
                            </h6>
                          )}
                          <Col
                            lg={3}
                            hidden={selectedProduct === "Please-Select"}
                          >
                            <div
                              className="btn-group addToCartQty"
                              role="group"
                            >
                              <Form.Control
                                type="number"
                                min={product.saleunit}
                                className="form-control col-0"
                                value={qty}
                                onBlur={handleBlur}
                                onChange={(e) => setQty(e.target.value)}
                                step={product.saleunit}
                                disabled={selectedProduct === "Please-Select"}
                              />
                            </div>
                          </Col>
                          &nbsp;&nbsp;
                          <Col
                            lg={6}
                            hidden={selectedProduct === "Please-Select"}
                          >
                            <Button
                              onClick={() => addToCartHandler(selectedStock)}
                              className="CTL_btn btn-ripple                    "
                              disabled={
                                selectedProduct === "Please-Select" ||
                                buttonText !== "Add to cart" ||
                                isUniform
                              }
                            >
                              {buttonText}
                            </Button>&nbsp;
                            {isUniform ? (
                              <OverlayTrigger
                                delay={{ hide: 450, show: 200 }}
                                overlay={(props) => (
                                  <Tooltip {...props} >
                                    To Enable Add To Cart Button, Please Complete Uniform Ordering <br />( OR )<br /> Empty Your Cart
                                  </Tooltip>
                                )}
                                placement="bottom"
                              ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ color: "orange" }}></i>
                              </OverlayTrigger>
                            ) : ("")}
                          </Col>
                        </>
                      )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>

              {/* ************   Product details with download pdf  ***************  */}
              <Row>
                <Col className="mt-4">
                  <Container
                    className="border border-light border-2"
                    fluid
                    style={{
                      minHeight: "300px",
                      maxHeight: "500px",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <Tabs
                      defaultActiveKey="Description"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3 product_description"
                    >
                      <Tab
                        className="m-3 col-md-12"
                        eventKey="Description"
                        title="Specifications"
                      >
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            textAlign: "justify",
                            width: "97%",
                            overflowWrap: "break-word",
                          }}
                        >
                          {new Date(product.createdAt) > execustionDate ? (
                            <>
                              <div>
                                {product.description
                                  ? product.description
                                    .split("\n")
                                    .map((item, index) => {
                                      item = item.trimStart();
                                      if (item !== "" && item !== " ") {
                                        if (
                                          item.includes(":") &&
                                          item.charAt(0) !== "-"
                                        ) {
                                          displayTable.push(item);
                                        } else if (
                                          (headings.includes(
                                            item.toUpperCase()
                                          ) ||
                                            item.charAt(0) === "<") &&
                                          item.charAt(0) !== "-"
                                        ) {
                                          return (
                                            <div
                                              key={"boldUppercase" + index}
                                              style={{ paddingTop: "15px" }}
                                            >
                                              <strong>
                                                {!tableHeadings.includes(
                                                  item.toUpperCase()
                                                )
                                                  ? item.charAt(0) === "<"
                                                    ? item
                                                      .slice(1)
                                                      .toUpperCase()
                                                      .replace('""', '"')
                                                    : item
                                                      .toUpperCase()
                                                      .replace('""', '"')
                                                  : ""}
                                              </strong>
                                            </div>
                                          );
                                        } else if (
                                          item.includes(".") &&
                                          item.charAt(0) !== "-"
                                        ) {
                                          return (
                                            <div
                                              key={"Normal" + index}
                                              style={{ paddingTop: "10px" }}
                                            >
                                              {item.trimStart()}
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div
                                              key={"table2" + index}
                                              style={{
                                                textIndent: "-10px",
                                                paddingLeft: "15px",
                                                lineHeight: "1.6rem",
                                              }}
                                            >
                                              <i className="bi bi-dot " />
                                              {item.charAt(0) === "-"
                                                ? item
                                                  .slice(1)
                                                  .trimStart()
                                                  .replace('""', '"')
                                                : item
                                                  .trimStart()
                                                  .replace('""', '"')}
                                            </div>
                                          );
                                        }
                                      }
                                    })
                                  : ""}
                              </div>
                              <div>
                                {displayTable.length > 0 ? (
                                  <h6 style={{ paddingTop: "15px" }}>
                                    <b>SPECIFICATIONS</b>
                                  </h6>
                                ) : (
                                  ""
                                )}
                                <Table striped bordered hover>
                                  <tbody>
                                    {displayTable.length > 0
                                      ? displayTable.map((items, idx) => {
                                        if (items.includes(":")) {
                                          let splitValues = items.split(":");
                                          let key = splitValues[0];
                                          let value = splitValues[1];
                                          for (
                                            let i = 2;
                                            i < splitValues.length;
                                            i++
                                          ) {
                                            value =
                                              value + " : " + splitValues[i];
                                          }
                                          if (value !== "") {
                                            return (
                                              <tr key={"table1" + idx}>
                                                <td
                                                  style={{
                                                    textAlign: "left",
                                                  }}
                                                >
                                                  {key.toUpperCase()}
                                                </td>
                                                <td
                                                  style={{
                                                    textAlign: "left",
                                                  }}
                                                >
                                                  {value
                                                    ?.trimStart()
                                                    .replace('""', '"')}
                                                </td>
                                              </tr>
                                            );
                                          } else {
                                            return (
                                              <tr key={"table1" + idx}>
                                                <td
                                                  style={{
                                                    textAlign: "left",
                                                    backgroundColor:
                                                      "lightblue",
                                                  }}
                                                  colspan="2"
                                                >
                                                  <strong>
                                                    {key.toUpperCase()}
                                                  </strong>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        }
                                      })
                                      : ""}
                                  </tbody>
                                </Table>
                              </div>
                            </>
                          ) : (
                            <>
                              {product.description
                                ? product.description
                                  .split(">")
                                  .map((item, index) => {
                                    // console.log("itemmmm", item)
                                    // Check if this item contains "^", which indicates it should be formatted as a table
                                    if (
                                      item.includes("^") &&
                                      item.includes(":")
                                    ) {
                                      const tableItems = item
                                        .split("^")
                                        .filter(Boolean); // remove empty strings from the array
                                      return (
                                        <Table striped bordered hover>
                                          <tbody>
                                            {tableItems.map(
                                              (tableItem, tableIndex) => {
                                                if (tableItem.includes(":")) {
                                                  let [key, value] =
                                                    tableItem.split(":");
                                                  return (
                                                    <tr
                                                      key={
                                                        "table1" + tableIndex
                                                      }
                                                    >
                                                      <td
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                      >
                                                        {key.toUpperCase()}
                                                      </td>
                                                      <td
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                      >
                                                        {value
                                                          .trimStart()
                                                          .replace('""', '"')}
                                                      </td>
                                                    </tr>
                                                  );
                                                } else {
                                                  return (
                                                    <div
                                                      key={
                                                        "table2" + tableIndex
                                                      }
                                                      style={{
                                                        textIndent: "-10px",
                                                        paddingLeft: "15px",
                                                        lineHeight: "1.6rem",
                                                      }}
                                                    >
                                                      <i className="bi bi-dot " />
                                                      {tableItem
                                                        .trimStart()
                                                        .replace('""', '"')}
                                                    </div>
                                                  );
                                                }
                                              }
                                            )}
                                          </tbody>
                                        </Table>
                                      );
                                    } else if (item.includes("^")) {
                                      const tableItems = item
                                        .split("^")
                                        .filter(Boolean); // remove empty strings from the array
                                      return (
                                        <>
                                          {tableItems.map(
                                            (tableItem, tableIndex) => {
                                              return (
                                                <div
                                                  key={"table3" + tableIndex}
                                                  style={{
                                                    textIndent: "-10px",
                                                    paddingLeft: "15px",
                                                    lineHeight: "1.6rem",
                                                    whiteSpace: "pre-line",
                                                  }}
                                                >
                                                  <i className="bi bi-dot " />
                                                  {tableItem
                                                    .trimStart()
                                                    .replace('""', '"')}
                                                </div>
                                              );
                                            }
                                          )}
                                        </>
                                      );
                                    }
                                    // If the first character is "<", format the string in bold and uppercase, removing the "<"
                                    if (item.charAt(0) === "<") {
                                      return (
                                        <div key={"boldUppercase" + index}>
                                          <strong>
                                            {item
                                              .slice(1)
                                              .toUpperCase()
                                              .replace('""', '"')}
                                          </strong>
                                        </div>
                                      );
                                    }

                                    return (
                                      <div key={"Normal" + index}>{item}</div>
                                    );
                                  })
                                : ""}
                            </>
                          )}
                        </div>
                      </Tab>
                      {/* Download */}
                      {pdfs && pdfs.length > 0 ? (
                        <Tab eventKey="Download" title="Downloads">
                          {pdfs &&
                            pdfs.map((pdf, idx) => {
                              const pdfName = pdf.url?.split("/").pop(); // Get the file name from the url
                              return pdf.url ? (
                                <div
                                  className="border border-light border-2 m-2 p-1"
                                  key={"pdfDiv" + idx}
                                >
                                  <button
                                    onClick={() =>
                                      downloadPDF(pdf.url, pdfName)
                                    }
                                    className="border-0"
                                    key={"pdfButton" + idx}
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "#1e4881",
                                    }}
                                  >
                                    <i className="bi bi-file-earmark-pdf">
                                      {" "}
                                      {pdfName}
                                    </i>
                                  </button>
                                </div>
                              ) : (
                                ""
                              );
                            })}
                        </Tab>
                      ) : null}
                      {/* Standards */}
                      {product.standards && product.standards.length > 0 ? (
                        <Tab eventKey="Standards" title="Standards">
                          <div className="border border-light border-2 m-3 p-3 d-flex justify-content-left">
                            {standard &&
                              standard.map((item, index) => {
                                return (
                                  <img
                                    key={"standards" + index}
                                    src={`https://res.cloudinary.com/dxvwresim/image/upload/c_scale,h_120/STANDARDS/${item}.jpg`}
                                    target="_blank"
                                    alt=""
                                    style={{ maxWidth: "100%", height: "auto" }}
                                  />
                                );
                              })}
                          </div>
                        </Tab>
                      ) : null}
                      {/* Video URL */}
                      {product.videoUrl && product.videoUrl.length > 0 ? (
                        <Tab eventKey="videoUrl" title="Video">
                          <div className="border border-light border-2 m-3 p-3 d-flex justify-content-left">
                            {videoUrl &&
                              videoUrl.map((item, index) => {
                                return (
                                  <div>
                                    <video width="560" height="315" controls controlsList="nofullscreen nodownload" disablePictureInPicture>
                                      <source src={`https://res.cloudinary.com/dxvwresim/video/upload/v1714464030/Videos/${item}.mp4`} type="video/mp4" />
                                    </video>
                                  </div>
                                );
                              })}
                          </div>
                        </Tab>
                      ) : null}
                      {/* Return Calculator */}
                      {product.returnCalculator && product.returnCalculator === true ? (
                        <Tab eventKey="returnCalculator" title="Return Calculator">
                          <div className="border border-light border-2 m-3 p-3 d-flex justify-content-center">
                            <Button onClick={handleShowCalculator}>Open Calculator <i class="bi bi-box-arrow-up-right"></i></Button>
                          </div>
                          <Modal
                            show={showCalculator}
                            onHide={handleCloseCalculator}
                            className="edite_product_short_infor">
                            <ReturnProfitCalculator />
                          </Modal>
                        </Tab>
                      ) : null}
                    </Tabs>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* edit product */}
      <Modal
        show={show}
        onHide={handleClose}
        className="edite_product_short_infor"
      >
        <EditProductShortInforComponent
          categories={categories}
          fetchProduct={fetchProduct}
          updateProductApiRequest={updateProductApiRequest}
          productChanged={productChanged}
          refreshAfterEdit={refreshAfterEdit}
        />
      </Modal>
    </Container>
  );
};

export default connect()(ProductDetailsPageComponent);
