import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import debounce from "lodash.debounce";
import { set } from "lodash";

const ProductsPageReplenishment = ({ productReplenishment }) => {
  const [show, setShow] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [suppliersku, setSuppliersku] = useState("");
  const [replenishment, setReplenishment] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (barcode) {
      try {
        const data = await productReplenishment(barcode);
        setProduct(data.product);
        setMessage(data.message);
        if (data.message === "Product not found with given barcode") {
          setBarcode("");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  }, [barcode, productReplenishment]);

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
    setSuppliersku("");
    setReplenishment("");
    setUploading(false);
  };
  const handleShow = () => setShow(true);

  const handleReplenishment = async () => {
    try {
      setUploading(true);
      const data = await productReplenishment(
        barcode,
        suppliersku,
        replenishment
      );

      if (data) {
        setUploading(false);
      }

      setProduct(data.product);
      setMessage(data.message);

      if (data.message === "Product replenishment successful") {
        setBarcode("");
        setSuppliersku("");
        setReplenishment("");
        setMessage("Product replenishment successful");
      }
    } catch (error) {
      console.error("Replenishment error:", error);
      alert("Error during replenishment.");
    }
  };

  //   console.log("product", product);
  return (
    <>
      <Button
        className="CTL_btn m-0 me-4 ms-4 p-0 pe-1 ps-1"
        onClick={handleShow}
      >
        Replenishment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="product_replenishment_items"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Replenishment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-0 pb-0">
          <Row>
            <Col md={6}>
              <input
                type="text"
                placeholder="Barcode"
                className="form-control m-1"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <input
                type="text"
                placeholder="Supplier SKU"
                className="form-control m-1"
                value={suppliersku}
                onChange={(e) => setSuppliersku(e.target.value)}
              />
            </Col>
          </Row>
          <input
            type="number"
            placeholder="Replenishment"
            className="form-control m-1"
            value={replenishment}
            onChange={(e) => setReplenishment(e.target.value)}
          />

          <Button
            className="CTL_btn btn m-1"
            onClick={handleReplenishment}
            disabled={uploading || (!barcode && !suppliersku)}
          >
            {uploading ? "Loading" : "Submit"}
          </Button>

          <p hidden={message === "Please provide replenishment number"}>
            {message}
          </p>

          <div
            className="m-1"
            hidden={
              message === "Product not found with given barcode" ||
              message === "Product not found with given supplier SKU"
            }
          >
            {product !== null && (
              <Row>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsPageReplenishment;
