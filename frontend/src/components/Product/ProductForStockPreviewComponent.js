import {Row,Col,Container,Button,Form} from "react-bootstrap";
import AddedToCartMessageComponent from "./AddedToCartMessage/AddedToCartMessageComponent.js"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-image-gallery/styles/css/image-gallery.css";

import { useState, useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";
import "./SharedPages.css";

const ProductForStockPreviewComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  product,
  getUser,
}) => {
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [qty, setQty] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("choose-product");
  const [selectedStock, setSelectedStock] = useState(null);
  const [userNameEmail, setUserNameEmail] = useState();
  const [buttonText, setButtonText] = useState("Add to cart");


  useEffect(() => {
    if (product?.saleunit) {
      setQty(product?.saleunit);
    }
  }, [product]);

  const addToCartHandler = async () => {
    setButtonText("Adding...");
    try {
      await reduxDispatch(addToCartReduxAction(product._id, qty, selectedStock));
      setButtonText("Added!");
      setTimeout(() => setButtonText("Add to cart"), 1000);
    } catch (error) {
      setButtonText("Add to cart");
    }
  };

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
    stockCode = selectedStock.mnasku;
  }

  const price = stockPrice;
  const formattedPrice = price
    ? (price * qty).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : "";
  useEffect(() => {
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBlur = (e) => {
    const newValue =
      Math.round(e.target.value / product.saleunit) * product.saleunit;
    setQty(newValue);
  };

  return (
    <Container className="ms-3 " fluid>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="">
        <Col lg={8}>
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
        </Col>
        <Col lg={4}>
          <Form.Control
            type="number"
            min={product?.saleunit}
            className="form-control col-0"
            value={qty}
            onBlur={handleBlur}
            onChange={(e) => setQty(e.target.value)}
            step={product?.saleunit}
            disabled={selectedProduct === "Please-Select" || price === 0}
          /><br />
          <Button
            onClick={() => addToCartHandler(selectedStock)}
            className="btn-ripple"
            variant="success"
            disabled={
              selectedProduct === "Please-Select" ||
              buttonText !== "Add to cart" ||
              price === 0
            }
          >
            {buttonText}
          </Button>
        </Col>
      </Row>

      <Row hidden={selectedProduct === "choose-product"}>
        <Col lg={8}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForStockPreviewComponent;
