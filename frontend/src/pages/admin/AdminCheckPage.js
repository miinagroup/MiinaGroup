import { Row, Col } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useState } from "react";
import axios from "axios";

const AdminCheckPage = () => {
  const [missingCount, setMissingCount] = useState([]);
  const [emptyProduct, setEmptyProduct] = useState([]);
  const [productsNoCTLSKU, setProductsNoCTLSKU] = useState([]);
  const [productsMissingMainFields, setProductsMissingMainFields] = useState(
    []
  );
  const [productsMissingStockFields, setProductsMissingStockFields] = useState(
    []
  );
  const [productsWithDuplicateCtlSku, setProductsWithDuplicateCtlSku] =
    useState([]);
  const [noProdCategories, setNoProdCategories] = useState([]);
  const [formattedUser, setFormattedUser] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [countChecked, setCountChecked] = useState(false);
  const [productChecked, setProductChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState(false);
  const [userFormatted, setUserFormatted] = useState(false);

  /* ********* CHECK COUNT ********* */
  const checkStockCount = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/products/admin/checkStockCount");
      // console.log("checkStockCount", response);
      setMissingCount(response.data.updatedProducts);
      setEmptyProduct(response.data.deletedProducts);
      setProductsNoCTLSKU(response.data.productsNoCTLSKU);
      setCountChecked(true);
      setCategoryChecked(false);
      setUserFormatted(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };

  /* ********* CHECK PRODUCTS ********* */
  const checkProduct = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/products/admin/productsCheck");
      console.log("productsCheck", response);
      setProductsMissingMainFields(response.data.missingMainFields);
      setProductsMissingStockFields(response.data.missingStockFields);
      setProductsWithDuplicateCtlSku(response.data.duplicateCtlSku);
      setProductChecked(true);
      setCountChecked(false);
      setCategoryChecked(false);
      setUserFormatted(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };
  /* ********* CATEGORIES DISPLAY ********* */
  const checkCategoriesDisplay = async () => {
    setIsChecking(true);
    try {
      const response = await axios.post("/api/categories/updateDisplay");
      setNoProdCategories(response.data.categories);
      setCategoryChecked(true);
      setCountChecked(false);
      setUserFormatted(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };

  /* ********* FORMAT USERS ********* */
  const formatUsers = async () => {
    setIsChecking(true);
    try {
      const response = await axios.post("/api/users/formatUserName");
      setFormattedUser(response.data);
      setUserFormatted(true);
      setCategoryChecked(false);
      setCountChecked(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };
  // console.log("formatUsers", formattedUser);

  /* ********* GET GPS ********* */
  const [gpsData, setGpsData] = useState(null);
  const getGPSInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setGpsData(null);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  /* ********* Fetch Quotes ********* */
  const fetchQuotes = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/quotes/admin");
      setFormattedUser(response.data);
      setUserFormatted(true);
      setCategoryChecked(false);
      setCountChecked(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          {/* ********** check product missing count ********** */}
          <div>
            <h4>Check Product Missing Count</h4>
            <button onClick={checkStockCount} disabled={isChecking}>
              {isChecking ? "Checking..." : "Check Missing Count"}
            </button>

            <h4>Check Product Info</h4>
            <button onClick={checkProduct} disabled={isChecking}>
              {isChecking ? "Checking..." : "Check Product Info"}
            </button>

            <h4>Check Categories Display</h4>
            <button onClick={checkCategoriesDisplay} disabled={isChecking}>
              {isChecking ? "Checking..." : "Check Category"}
            </button>

            <h4>Format Users</h4>
            <button onClick={formatUsers} disabled={isChecking}>
              {isChecking ? "Formatting..." : "Format Users"}
            </button>

            <h4>Fetch GPS</h4>
            <button onClick={getGPSInfo} disabled={isChecking}>
              {isChecking ? "Fetching..." : "Get GPS Info"}
            </button>

            <h4>Fetch Quotes</h4>
            <button onClick={fetchQuotes} disabled={isChecking}>
              {isChecking ? "Fetching..." : "Fetch Quotes"}
            </button>

            {productsMissingStockFields.length === 0 ? null : (
              <div className="mt-3" hidden={productChecked === false}>
                <p className="fw-bold">
                  Check the following: {productsMissingStockFields.length}{" "}
                  products STOCK fields!!!
                </p>
                {productsMissingStockFields.map((item, index) => (
                  <p key={index}>
                    <span className="me-2">{index + 1}.</span>
                    {/* <span className="fw-bold">Product Name: </span> */}
                    <a
                      href={`/admin/edit-product/${item._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name} <i class="bi bi-box-arrow-up-right" />
                    </a>
                  </p>
                ))}
              </div>
            )}

            {productsMissingMainFields.length === 0 ? (
              <div className="mt-3" hidden={productChecked === false}>
                No product missing main field data!!!
              </div>
            ) : (
              <div className="mt-3" hidden={productChecked === false}>
                <p className="fw-bold">
                  The Following: {productsMissingMainFields.length} Products
                  missing MAIN fields!!!
                </p>
                {productsMissingMainFields.map((item, index) => (
                  <p key={index}>
                    <span className="me-2">{index + 1}.</span>
                    {/* <span className="fw-bold">Product Name: </span> */}
                    <a
                      href={`/admin/edit-product/${item._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name} <i class="bi bi-box-arrow-up-right" />
                    </a>
                  </p>
                ))}
              </div>
            )}

            {productsWithDuplicateCtlSku.length === 0 ? (
              <div className="mt-3" hidden={productChecked === false}>
                No product with duplicated CTLSKU!!!
              </div>
            ) : (
              <div className="mt-3" hidden={productChecked === false}>
                <p className="fw-bold">
                  The Following: {productsWithDuplicateCtlSku.length} Products
                  are found duplicated CTLSKU!!!
                </p>
                {productsWithDuplicateCtlSku.map((duplicate, index) => (
                  <div key={index} className="mb-2">
                    <div className="me-2">
                      <span className="fw-bold">{index + 1}.</span> Duplicate
                      ctlsku found:{" "}
                      <span className="fw-bold">{duplicate._id}</span>, in
                      products:
                    </div>
                    {duplicate.products.map((product, pIndex) => (
                      <div key={pIndex}>
                        <a
                          href={`/admin/edit-product/${product.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product.name}{" "}
                          <i className="bi bi-box-arrow-up-right me-2" />
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {emptyProduct.length === 0 ? (
              <div className="mt-3" hidden={countChecked === false}>
                No EMPTY product found!!!
              </div>
            ) : (
              <div className="mt-3" hidden={countChecked === false}>
                <p className="fw-bold">
                  Total: {emptyProduct.length} Products have been removed, as
                  EMPTY EMPTY EMPTY EMPTY EMPTY!!!
                </p>
              </div>
            )}

            {missingCount.length === 0 ? /* (
              <div className="mt-3" hidden={countChecked === false}>
                No product found!!!
              </div>
            ) */ null : (
              <div className="mt-3" hidden={countChecked === false}>
                <p className="fw-bold">
                  Total: {missingCount.length} Products have been UPDATED as NO
                  COUNT!!!
                </p>
              </div>
            )}

            {productsNoCTLSKU.length === 0 ? (
              <div className="mt-3" hidden={countChecked === false}>
                No missing count product found!!!
              </div>
            ) : (
              <div className="mt-3" hidden={countChecked === false}>
                <p className="fw-bold">
                  The Following: {productsNoCTLSKU.length} Products do NOT have
                  CTLSKU!!!
                </p>
                {productsNoCTLSKU.map((item, index) => (
                  <p key={index}>
                    <span className="me-2">{index + 1}.</span>
                    <span className="fw-bold">Product Name: </span>
                    <a
                      href={`/admin/edit-product/${item._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.productName} <i class="bi bi-box-arrow-up-right" />
                    </a>
                  </p>
                ))}
              </div>
            )}

            {noProdCategories.length === 0 ? (
              <div className="mt-3" hidden={categoryChecked === false}>
                No category found!!!
              </div>
            ) : (
              <div className="mt-3" hidden={categoryChecked === false}>
                <p className="">
                  Total categories without products:{" "}
                  <span className="fw-bold">{noProdCategories.length}</span>!!!
                </p>
                {noProdCategories.map((item, index) => (
                  <p key={index}>
                    <span className="me-2">{index + 1}.</span>
                    <span className="">No product in </span>
                    <span className="fw-bold">{item}</span>
                  </p>
                ))}
              </div>
            )}

            {formattedUser.length === 0 ? (
              <div className="mt-3" hidden={userFormatted === false}>
                No User Formatted!!!
              </div>
            ) : (
              <div className="mt-3" hidden={userFormatted === false}>
                <p className="">
                  Total{" "}
                  <span className="fw-bold">
                    {formattedUser.formattedUsers?.length
                      ? formattedUser.formattedUsers?.length
                      : "0"}
                  </span>{" "}
                  User Formatted !!!
                </p>
                <p className="fw-bold">
                  {" "}
                  No Delivery Book found for the following Users:
                </p>
                {formattedUser.notFound.map((item, index) => (
                  <p key={index}>
                    <span className="me-2">{index + 1}.</span>
                    <span className="">{item.split(":")[1]}</span>
                  </p>
                ))}
              </div>
            )}

            {gpsData && (
              <div className="mt-3">
                <p className="fw-bold">GPS Information:</p>
                <p>Latitude: {gpsData.latitude}</p>
                <p>Longitude: {gpsData.longitude}</p>
              </div>
            )}
          </div>
          <br />
        </Col>
      </Row>
    </>
  );
};

export default AdminCheckPage;
