import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import debounce from "lodash.debounce";
import { FaCamera } from "react-icons/fa";
import ProductsPageStockTakeCamera from "./ProductsPageStockTakeCamera";
import "./invoicePDF.css"

const ProductsPageStockTake = ({ productStockTake }) => {
  const [show, setShow] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [count, setCount] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (barcode) {
      try {
        const data = await productStockTake(barcode);
        setProduct(data.product);
        setMessage(data.message);
        if (data.message === "Product not found with given barcode") {
          setBarcode("");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  }, [barcode, productStockTake]);

  const debouncedFetchProduct = useCallback(debounce(fetchProduct, 500), [
    fetchProduct,
  ]);

  useEffect(() => {
    debouncedFetchProduct();
    return debouncedFetchProduct.cancel;
  }, [debouncedFetchProduct]);

  const handleClose = () => {
    setShow(false);
    setProduct(null);
    setMessage("");
    setBarcode("");
    setCount("");
    setUploading(false);
  };
  const handleShow = () => setShow(true);

  const handleStockTake = async () => {
    try {
      setUploading(true);
      const data = await productStockTake(barcode, count);

      if (data) {
        setUploading(false);
      }

      setProduct(data.product);
      setMessage(data.message);

      if (data.message === "Product count successful") {
        setBarcode("");
        setCount("");
        setMessage("Product stock take successful");
      }
    } catch (error) {
      console.error("Count error:", error);
      alert("Error during count.");
    }
  };

  //   console.log("product", product);

  const [showScanner, setShowScanner] = useState(false);
  const handleBarcodeDetected = (barcode) => {
    setBarcode(barcode);
    setShowScanner(false);
  };

  const handleCameraOpen = () => {
    setProduct(null);
    setMessage("");
    setBarcode("");
    setCount("");
    setShowScanner(true);
  };

  return (
    <>
      <Button
        className="CTL_btn m-0 me-4 ms-4 p-0 pe-1 ps-1"
        onClick={handleShow}
      >
        Stock Take
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="product_replenishment_items"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Stock Take</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-0 pb-0">
          <Row>
            <Col md={8}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Barcode"
                  className="form-control m-1"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  style={{ flex: 1 }}
                />
                <FaCamera
                  onClick={() => handleCameraOpen()}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </div>
            </Col>
            <Col md={4}>
              <input
                type="number"
                placeholder="Count"
                className="form-control m-1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </Col>
          </Row>

          <Button
            className="CTL_btn btn m-1 mt-3"
            onClick={handleStockTake}
            disabled={uploading || !barcode}
          >
            {uploading ? "Loading" : "Submit"}
          </Button>

          <p hidden={message === "Please provide count number"}>{message}</p>

          <div
            className="m-1"
            hidden={message === "Product not found with given barcode"}
          >
            {product !== null && (
              <Row className="mt-3 mb-2">
                <Col md={4} className="product-image">
                  <img
                    src={product?.images[0]?.path}
                    alt="Product"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col md={8} className="product-details">
                  <p>
                    <strong>Name:</strong> {product?.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {product?.category}
                  </p>
                  {product?.stock?.map((stockItem) => (
                    <div key={stockItem.mnasku}>
                      <p>
                        <strong>Item:</strong> {stockItem.attrs}
                      </p>
                      <p>
                        <strong>Miina SKU:</strong> {stockItem.mnasku}
                      </p>
                      <p>
                        <strong>Count:</strong> {stockItem.count}
                      </p>
                    </div>
                  ))}
                </Col>
              </Row>
            )}
          </div>
          {showScanner && (
            <ProductsPageStockTakeCamera onDetected={handleBarcodeDetected} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsPageStockTake;
