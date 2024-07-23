import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Tab,
  Tabs,
  Form,
  Image,
  Carousel,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AddedToCartMessageComponent from "./AddedToCartMessageComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-medium-image-zoom/dist/styles.css";
import FilterComponent from "./filterQueryResultOptions/FilterComponent";
import BreadcrumbComponent from "./filterQueryResultOptions/BreadcrumbComponent";
import QuotePriceComponent from "./SendEmail/QuotePriceComponent";
import "../pages/components/SharedPages.css";

const ProductForListPreviewComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  product,
  getUser,
}) => {
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [qty, setQty] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState("choose-product");
  const [selectedStock, setSelectedStock] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [userNameEmail, setUserNameEmail] = useState();
  const [productName, setProductName] = useState();
  // const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);


  useEffect(() => {
    if (product && product.stock && product.stock.length === 1) {
      setSelectedProduct(product.stock[0].attrs);
      setSelectedStock(product.stock[0]);
    }
  }, [product]);

  function handleProductChange(event) {
    const attrs = event.target.value;
    setSelectedProduct(attrs);

    if (attrs !== "choose-product") {
      const stockItem = product.stock.find((item) => item.attrs === attrs);
      setSelectedStock(stockItem);
    } else {
      setSelectedStock(null);
    }
  }

  let stockCount = null;
  let stockPrice = null;
  let stockCode = null;

  if (selectedProduct !== "choose-product" && selectedStock) {
    stockCount = selectedStock.count;
    stockPrice = selectedStock.price;
    stockCode = selectedStock.ctlsku;
  }

  // console.log("selectedStock", selectedStock);

  // console.log(product);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(product._id, qty, selectedStock));
    setShowCartMessage(true);
  };

  // 新的尺寸价格库存
  const price = stockPrice;
  const formattedPrice = price?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
  //react-image-lightbox -ends here
  // quote price using
  useEffect(() => {
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
        setIsAdmin(data.isAdmin);
      })
      .catch((err) => console.log(err));
  }, []);

  const quotePriceData = {
    ...userNameEmail,
    productName: product?.name,
    productId: product?._id,
  };
  // console.log("quotePriceDataquotePriceDataquotePriceData", quotePriceData);

  // table first letter capitalized
  function capitalizeFirstLetter(string) {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      : "";
  }

  return (
    <Container className="ms-3 " fluid>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="">
        <Col lg={6} className="my-gallery">
          <ImageGallery items={images} />
          {/*           <Carousel
            className={
              product?.images.length > 1 ? "preview_carousel p-0" : "p-0"
            }
          >
            {product?.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image.path}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel> */}
        </Col>

        {/* ************   Product Details  ***************  */}
        <Col lg={6}>
          <Row>
            <ListGroup variant="flush">
              <ListGroup.Item>

                <div>
                  <label htmlFor="attrs">
                    Choose Product:&nbsp;&nbsp;&nbsp;{" "}
                  </label>
                  <select
                    id="product-select"
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    {product &&
                      product.stock &&
                      (product.stock.length === 1 ? (
                        <option value={product.stock[0].attrs}>
                          {product.stock[0].attrs}
                        </option>
                      ) : (
                        <>
                          <option value="choose-product">
                            <b>Choose Product</b>
                          </option>
                          {product.stock.map((stock) => (
                            <option key={stock.attrs} value={stock.attrs}>
                              {stock.attrs}
                            </option>
                          ))}
                        </>
                      ))}
                  </select>

                  {stockCount !== null && (
                    <h6 className="mt-2">
                      Status:{" "}
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
                    </h6>
                  )}
                </div>

                <Row hidden={selectedProduct === "choose-product"}>
                  <Col>
                    <h6>Product Code: {stockCode}</h6>
                    <h6>
                      {price === 0 ? (
                        <span className="fw-bold PriceContact">
                          Contact us for a quote
                        </span>
                      ) : (
                        <span className="fw-bold">
                          Price: ${formattedPrice}
                        </span>
                      )}
                    </h6>
                    {
                      isAdmin ? (
                        <>
                          <h6 >Sort Order: {product?.sortOrder}</h6>
                          <h6 >Category: {product?.category}</h6>
                        </>
                      ) : ("")
                    }
                  </Col>
                </Row>
                {/* add to cart */}
                {/*                 {price === 0 ? null : <h6>Quantity :</h6>}

                <Row>
                  {price === 0 ? (
                    <QuotePriceComponent quotePriceData={quotePriceData} />
                  ) : (
                    <>
                      <Col lg={3}>
                        <div className="btn-group addToCartQty" role="group">
                          <Form.Control
                            type="number"
                            min={1}
                            className="form-control col-0"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </div>
                      </Col>
                      &nbsp;&nbsp;
                      <Col lg={4}>
                        <Button
                          onClick={() => addToCartHandler(selectedStock)}
                          className="btn_blue btn-ripple addToCartBtn"
                          variant="success"
                          disabled={selectedProduct === "choose-product"}
                        >
                          Add to cart
                        </Button>
                      </Col>
                    </>
                  )}
                </Row> */}
                {/* ************   Product details  ***************  */}
                <Row>
                  <Col className="mt-2">
                    <Container className="border border-light border-5">
                      <div className="m-2">
                        {/* <span className="fw-bold m-1">DESCRIPTION:</span> */}
                        <div
                          className="m-1"
                          style={{
                            whiteSpace: "pre-wrap",
                            textAlign: "justify",
                            overflowWrap: "break-word",
                          }}
                        >
                          {product && product.description
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
                                                <tr key={tableIndex}>
                                                  <td /* style={{ whiteSpace: 'nowrap' }} */
                                                  >
                                                    {key.toUpperCase()}
                                                    {/* {capitalizeFirstLetter(key.trimStart())} */}
                                                  </td>
                                                  <td
                                                    style={{ width: "100%" }}
                                                  >
                                                    {capitalizeFirstLetter(
                                                      value.trimStart()
                                                    )}
                                                  </td>
                                                </tr>
                                              );
                                            } else {
                                              return (
                                                <div
                                                  key={tableIndex}
                                                  style={{
                                                    textIndent: "-10px",
                                                    paddingLeft: "15px",
                                                    lineHeight: "1.6rem",
                                                  }}
                                                >
                                                  <i className="bi bi-dot " />
                                                  {tableItem.trimStart()}
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
                                              key={tableIndex}
                                              style={{
                                                textIndent: "-10px",
                                                paddingLeft: "15px",
                                                lineHeight: "1.6rem",
                                                whiteSpace: "pre-line",
                                              }}
                                            >
                                              <i className="bi bi-dot " />
                                              {tableItem.trimStart()}
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
                                    <div key={index}>
                                      <strong>
                                        {item.slice(1).toUpperCase()}
                                      </strong>
                                    </div>
                                  );
                                }

                                return <div key={index}>{item}</div>;
                              })
                            : ""}
                        </div>
                      </div>
                    </Container>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForListPreviewComponent;
