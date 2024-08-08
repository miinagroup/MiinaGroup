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
} from "react-bootstrap";
import AddedToCartMessageComponent from "../../../../components/AddedToCartMessageComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { useState, useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";

import "../../../../pages/components/SharedPages.css";

const QuoteProductPreviewComponent = ({ product }) => {
  const [showCartMessage, setShowCartMessage] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("choose-product");
  const [selectedStock, setSelectedStock] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [userNameEmail, setUserNameEmail] = useState();

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
          const isExists = await fetchImage(imagePath);
          if (isExists.ok) {
            imagesArray.push({
              original: imagePath,
              thumbnail: imagePath,
              url: imagePath,
              title: image.title,
              caption: image.name,
            });
            // console.log(imagesArray);
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


  //Existing pdf list
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

  const [pdfs, setPdfs] = useState([]);
  useEffect(() => {
    async function handlePdfs() {
      const pdfArray = [];
      if (product && product.pdfs) {
        for (const pdf of product.pdfs) {
          if (!pdf.path) {
            continue
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

  const execustionDate = new Date('2024-1-4 12:00:00')

  var displayTable = [];
  var tableHeadings = [
    "SPECIFICATIONS",
    "SPECIFICATION",
    "TECHNICAL SPECIFICATIONS",
    "TECHNICAL SPECIFICATION",
    "TECHNICAL DETAILS"
  ]
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
    "TECHNICAL DETAILS"
  ]


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

  return (
    <Container
      className=""
      fluid
      style={{
        minHeight: "300px",
        maxHeight: "600px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="">
        <Col lg={6} className="my-gallery">
          <ImageGallery items={images} />
        </Col>

        {/* ************   Product Details  ***************  */}
        <Col lg={6}>
          <Row>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="" style={{ textAlign: "left" }}>
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
                  <Col style={{ textAlign: "left" }}>
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
                    {isAdmin ? <h6>Sort Order: {product?.sortOrder}</h6> : ""}
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
                  <Col className="mt-4">
                    <Container className="border border-light border-2" fluid style={{ minHeight: "300px", maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}>
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
                            {
                              new Date(product.createdAt) > execustionDate ? (
                                <>
                                  <div>
                                    {
                                      product.description ?
                                        product.description
                                          .split("\n")
                                          .map((item, index) => {
                                            item = item.trimStart();
                                            if (item !== "" && item !== " ") {
                                              if (item.includes(":")
                                                && item.charAt(0) !== "-"
                                              ) {
                                                displayTable.push(item)
                                              } else if ((headings.includes(item.toUpperCase()) || item.charAt(0) === "<")
                                                && item.charAt(0) !== "-"
                                              ) {
                                                return (
                                                  <div key={"boldUppercase" + index} style={{ paddingTop: "15px" }}>
                                                    <strong>
                                                      {
                                                        !tableHeadings.includes(item.toUpperCase()) ?
                                                          (item.charAt(0) === "<") ? (
                                                            item.slice(1)
                                                              .toUpperCase()
                                                              .replace('""', '"')

                                                          ) : (
                                                            item
                                                              .toUpperCase()
                                                              .replace('""', '"')
                                                          )

                                                          : ""
                                                      }
                                                    </strong>
                                                  </div>
                                                );
                                              }
                                              else if (item.includes(".") && item.charAt(0) !== "-") {
                                                return (
                                                  <div key={"Normal" + index} style={{ paddingTop: "10px" }}>
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
                                                    {
                                                      item.charAt(0) === "-" ? (
                                                        item.slice(1)
                                                          .trimStart()
                                                          .replace('""', '"')

                                                      ) : (
                                                        item
                                                          .trimStart()
                                                          .replace('""', '"')

                                                      )
                                                    }
                                                  </div>
                                                );
                                              }
                                            }

                                          })
                                        : ("")
                                    }
                                  </div>
                                  <div>
                                    {displayTable.length > 0 ?
                                      <h6 style={{ paddingTop: "15px" }}><b>SPECIFICATIONS</b></h6>
                                      : ""}
                                    <Table striped bordered hover>
                                      <tbody>
                                        {
                                          displayTable.length > 0 ?
                                            displayTable.map((items, idx) => {
                                              if (items.includes(":")) {
                                                let [key, value] =
                                                  items.split(":");
                                                if (value !== "") {
                                                  return (
                                                    <tr
                                                      key={"table1" + idx}
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

                                                        {
                                                          value.trimStart().replace('""', '"')
                                                        }
                                                      </td>
                                                    </tr>
                                                  );
                                                } else {
                                                  return (
                                                    <tr
                                                      key={"table1" + idx}>
                                                      <td
                                                        style={{
                                                          textAlign: "left",
                                                          backgroundColor: "lightblue",

                                                        }} colspan="2">
                                                        <strong>{key.toUpperCase()}</strong>
                                                      </td>
                                                    </tr>
                                                  )
                                                }
                                              }
                                            }) : ""
                                        }
                                      </tbody>
                                    </Table>
                                  </div>
                                </>

                              ) : (
                                <>
                                  {
                                    product.description
                                      ? (product.description
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
                                                            key={"table1" + tableIndex}
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

                                                              {
                                                                value.trimStart().replace('""', '"')
                                                              }
                                                            </td>
                                                          </tr>
                                                        );
                                                      } else {
                                                        return (
                                                          <div
                                                            key={"table2" + tableIndex}
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
                                        }))
                                      : ("")
                                  }
                                </>
                              )
                            }
                          </div>
                        </Tab>
                        {/*START*/}
                        {/* <div>
                            {
                              product.description ?
                                product.description
                                  .split("\n")
                                  .map((item, index) => {
                                    const wordCount = item
                                      .split(/\s+/)
                                      .filter(Boolean).length;
                                    if (item.includes(":")) {
                                      displayTable.push(item)

                                    } else if (wordCount < 3) {
                                      return (
                                        <div key={"boldUppercase" + index} style={{ paddingTop: "15px" }}>
                                          <strong>
                                            {

                                              !headings.includes(item) ? item
                                                .toUpperCase()
                                                .replace('""', '"') : ""
                                            }
                                          </strong>
                                        </div>
                                      );
                                    }
                                    else if (item.includes(".")) {
                                      return (
                                        <div key={"Normal" + index} style={{ paddingLeft: "15px" }}>{item}<br /></div>
                                      );
                                    } else {
                                      return (
                                        <div
                                          key={"table2" + index}
                                          style={{
                                            textIndent: "-10px",
                                            paddingLeft: "30px",
                                            lineHeight: "1.6rem",
                                          }}
                                        >
                                          <i className="bi bi-dot " />
                                          {item
                                            .trimStart()
                                            .replace('""', '"')}
                                        </div>
                                      );
                                    }
                                  })
                                : ""
                            }
                          </div>
                          <div>
                            <Table striped bordered hover>
                              <tbody>
                                {
                                  displayTable.length > 0 ?
                                    displayTable.map((items, idx) => {
                                      if (items.includes(":")) {
                                        let [key, value] =
                                          items.split(":");
                                        return (
                                          <tr
                                            key={"table1" + idx}
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

                                              {
                                                value.trimStart().replace('""', '"')
                                              }
                                            </td>
                                          </tr>
                                        );
                                      }
                                    }) : ""
                                }
                              </tbody>
                            </Table>
                          </div>
                        </div> */}

                        {/*STOP*/}


                        {/* <div
                          style={{
                            whiteSpace: "pre-wrap",
                            textAlign: "justify",
                            width: "97%",
                            overflowWrap: "break-word",
                          }}
                        >
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
                                                  key={"table1" + tableIndex}
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
                                                   
                                                    {
                                                      value.trimStart().replace('""', '"')
                                                    }
                                                  </td>
                                                </tr>
                                              );
                                            } else {
                                              return (
                                                <div
                                                  key={"table2" + tableIndex}
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
                        </div> */}
                        {/* </Tab> */}

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
                                ) : ""

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
                                      src={`https://ctladmin.b-cdn.net/STANDARDS/${item}.jpg`}
                                      target="_blank"
                                      alt=""
                                      style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                  );
                                })}
                            </div>
                          </Tab>
                        ) : null}
                      </Tabs>
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

export default QuoteProductPreviewComponent;
