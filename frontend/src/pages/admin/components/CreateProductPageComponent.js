import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  changeCategory,
  setAttributesTableWrapper,
} from "./utils/utils";
import GoBackButton from "./GoBackButton";

const CreateProductPageComponent = ({
  createProductApiRequest,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
  categories,
  reduxDispatch,
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
  getCTLSku,
}) => {
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [images, setImages] = useState(false);
  const [pdfs, setPdfs] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [isCreatingPdf, setIsCreatingPdf] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");
  const [ctlskuList, setCtlskuList] = useState([]);
  const [newCTLSKU, setNewCTLSKU] = useState("");
  const [newCtlSkus, setNewCtlSkus] = useState([]);
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);
  const [rowCount, setRowCount] = useState(1);

  useEffect(() => {
    ctlskuList.length = 0;
    getCTLSku().then((data) => {
      data?.map((ctl) => {
        setCtlskuList((current) => [...current, ctl.stock[0]?.ctlsku]);
      });
    });
  }, [1]);

  useEffect(() => {
    let skucounter = 100100;
    let foundNextSku = false;
    ctlskuList.sort();
    ctlskuList?.forEach((ctlsku) => {
      if (foundNextSku === false) {
        const ctlNumber = parseInt(ctlsku?.replace("CTL", ""));
        if (ctlNumber > skucounter) {
          if (ctlNumber === skucounter + 1) {
            skucounter = ctlNumber;
          } else {
            foundNextSku = true;
          }
        }
      }
    });
    const nextCtlSku = "CTL" + (skucounter + 1);
    setNewCTLSKU(nextCtlSku);
    setNewCtlSkus([nextCtlSku]);
  }, [ctlskuList]);

  const handleNewProduct = () => {
    setNewCtlSkus([...newCtlSkus, newCTLSKU]);
    setRowCount(rowCount + 1);
  };

  const handleRemoveProduct = (idx) => {
    setNewCtlSkus(newCtlSkus.filter((_, index) => index !== idx));
    setRowCount((prevRowCount) => prevRowCount - 1);
  };

  const handleCtlSkuChange = (index, value) => {
    const updatedSkus = newCtlSkus.map((sku, idx) =>
      idx === index ? value : sku
    );
    setNewCtlSkus(updatedSkus);
  };

  const [dynamicPrices, setDynamicPrices] = useState({});
  const updateDynamicPrice = (index, field, value) => {
    const newDynamicPrices = { ...dynamicPrices };
    if (!newDynamicPrices[index]) {
      newDynamicPrices[index] = { purchasePrice: 0, margin: 0, calculatedPrice: 0 };
    }
    newDynamicPrices[index][field] = value;

    if (newDynamicPrices[index].purchasePrice && newDynamicPrices[index].margin) {
      newDynamicPrices[index].calculatedPrice = (newDynamicPrices[index].purchasePrice / (1 - (newDynamicPrices[index].margin / 100))).toFixed(2);
    }

    setDynamicPrices(newDynamicPrices);
  };

  const handlePriceChange = (index, value) => {
    const newDynamicPrices = { ...dynamicPrices };
    newDynamicPrices[index] = {
      ...newDynamicPrices[index],
      calculatedPrice: parseFloat(value),
    };
    setDynamicPrices(newDynamicPrices);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const stock = [];
    for (
      let i = 0;
      i < document.querySelectorAll(".text-primary").length;
      i++
    ) {
      const count = document.getElementsByName(`count-${i}`)[0].value;

      let price;

      if (dynamicPrices[i]?.calculatedPrice) {
        price = dynamicPrices[i].calculatedPrice;
      } else {
        price = document.getElementsByName(`price-${i}`)[0].value;
      }

      let purchaseprice;
      if (dynamicPrices[i]?.purchasePrice) {
        purchaseprice = dynamicPrices[i].purchasePrice;
      } else {
        purchaseprice = document.getElementsByName(`purchaseprice-${i}`)[0].value;
      }

      const attrs = document.getElementsByName(`attrs-${i}`)[0].value;
      const uom = document.getElementsByName(`uom-${i}`)[0].value;
      const barcode = document.getElementsByName(`barcode-${i}`)[0].value;
      const ctlsku = document.getElementsByName(`ctlsku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`suppliersku-${i}`)[0]
        .value;
      stock.push({
        count,
        price: price,
        purchaseprice,
        attrs,
        uom,
        barcode,
        ctlsku,
        suppliersku,
      });
    }

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      saleunit: form.saleunit.value,
      max: form.Max.value,
      displayPrice: form.displayPrice.value,
      supplier: form.supplier.value,
      category: categoryChoosen,
      attributesTable: attributesTable,
      sortOrder: form.sortOrder.value,
      createdBy: userInfo.name + " " + userInfo.lastName,
      editedBy: "",
      stock: stock,
      tags: form.tags.value
    };



    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 9) {
        setIsCreating("to many files");
        return;
      }
      console.log("formInputs", formInputs);
      createProductApiRequest(formInputs)
        .then((data) => {
          if (images) {
            if (process.env.NODE_ENV === "dev") {
              // TODO: change to !==  ===
              uploadImagesApiRequest(images, data.productId)
                .then((res) => { })
                .catch((er) =>
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryApiRequest(images, data.productId);
            }
          }
          if (pdfs) {
            if (process.env.NODE_ENV === "dev") {
              // to do: change to !==
              uploadPdfApiRequest(pdfs, data.productId)
                .then((res) => { })
                .catch((er) =>
                  setIsCreatingPdf(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadPdfCloudinaryApiRequest(pdfs, data.productId);
            }
          }
          if (data.message === "product created") navigate("/admin/products");
        })
        .catch((er) => {
          console.log("error", er);
          setCreateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  const uploadHandlerImage = (e) => {
    console.log(e.target.files);
    setImages(e.target.files);
  };

  const uploadHandlerPdf = (pdfs) => {
    setPdfs(pdfs);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      reduxDispatch(newCategory(e.target.value.toUpperCase()));
      setTimeout(() => {
        let element = document.getElementById("cats");
        setCategoryChoosen(e.target.value);
        element.value = e.target.value;
        e.target.value = "";
      }, 200);
    }
  };

  const deleteCategoryHandler = () => {
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChoosen("Choose category");
  };

  const [searchTerm, setSearchTerm] = useState("");

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const displayImages = () => {
    return (
      images &&
      Array.from(images).map((image, index) => (
        <img
          src={URL.createObjectURL(image)}
          key={index}
          alt="Selected"
          style={{ margin: "2px", width: "19%", height: "auto" }}
        />
      ))
    );
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5 content-container ">
        <Col md={1}>
          {/*           <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link> */}
          <GoBackButton />
        </Col>
        <Col md={8}>
          <h1>Create a new product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mb-3"
              controlId="formBasicSupplier"
            >
              {/* <Form.Control name="create_CTLSKU" type="button" /> */}
            </Form.Group>

            {[...Array(rowCount)].map((_, index) => (
              <>
                <span className="text-primary">Product: {index + 1}</span>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="2"
                      className="mb-3"
                      controlId={`formBasicCount-${index}`}
                    >
                      <Form.Label>Count</Form.Label>
                      <Form.Control
                        name={`count-${index}`}
                        required
                        type="number"
                        defaultValue={0}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicAttrs-${index}`}
                    >
                      <Form.Label>Attrs</Form.Label>
                      <Form.Control
                        name={`attrs-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="2"
                      className="mb-3"
                      controlId={`formBasicUom-${index}`}
                    >
                      <Form.Label>UOM</Form.Label>
                      <Form.Control
                        name={`uom-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId={`formBasicBarcde-${index}`}
                    >
                      <Form.Label>Barcode</Form.Label>
                      <Form.Control name={`barcode-${index}`} type="text" />
                    </Form.Group>
                    <Form.Group as={Col} md="1" className="mb-3">
                      <i
                        className="bi bi-trash mt-3"
                        onClick={() => handleRemoveProduct(index)}
                        style={{
                          cursor: "pointer",
                        }}
                      ></i>
                    </Form.Group>
                  </React.Fragment>
                </Row>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicPrice-${index}`}
                    >
                      <Form.Label>Product Price</Form.Label>
                      <Form.Control
                        name={`price-${index}`}
                        required
                        type="number"
                        step={0.01}
                        value={
                          dynamicPrices[index]?.calculatedPrice || ""
                        }
                        onChange={(e) =>
                          handlePriceChange(index, e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicPurchasePrice- ${index}`}
                    >
                      <Form.Label>Purchase Price</Form.Label>
                      <Form.Control
                        name={`purchaseprice-${index}`}
                        required
                        type="number"
                        step={0.01}
                        onChange={(e) =>
                          updateDynamicPrice(
                            index,
                            "purchasePrice",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicMargin-${index}`}
                    >
                      <Form.Label>Margin (%)</Form.Label>
                      <Form.Control
                        name={`margin-${index}`}
                        type="number"
                        onChange={(e) =>
                          updateDynamicPrice(
                            index,
                            "margin",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicCTLSKU-${index}`}
                    >
                      <Form.Label>CTL SKU</Form.Label>
                      <Form.Control
                        name={`ctlsku-${index}`}
                        required
                        type="text"
                        value={newCtlSkus[index] || ""}
                        onChange={(e) =>
                          handleCtlSkuChange(index, e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicSupplierSKU-${index}`}
                    >
                      <Form.Label>Supplier SKU</Form.Label>
                      <Form.Control
                        name={`suppliersku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                  </React.Fragment>
                </Row>
              </>
            ))}
            <hr />
            <Button
              onClick={handleNewProduct}
              style={{
                cursor: "hand",
                textAlign: "center",
                fontStyle: "italic",
                margin: "0 auto",
                display: "flex"
              }}
            >
              Add a New Product
            </Button>
            <hr />

            <Row>
              <Form.Group
                as={Col}
                md="4"
                className="mb-3"
                controlId="formBasicSLRBuyingPrice"
              >
                <Form.Label>Display Price</Form.Label>
                <Form.Control
                  name="displayPrice"
                  type="text"
                  step="0.01"
                  defaultValue={0}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="mb-3"
                controlId="formBasicSortOrder"
              >
                <Form.Label>Sort Order</Form.Label>
                <Form.Control
                  name="sortOrder"
                  type="text"
                  defaultValue={0}
                  required
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="4"
                className="mb-3"
                controlId="formBasicSaleunit"
              >
                <Form.Label>Sale Unit</Form.Label>
                <Form.Control
                  name="saleunit"
                  type="text"
                  defaultValue={1}
                  required
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicSupplier"
              >
                <Form.Label>Supplier</Form.Label>
                <Form.Control name="supplier" required type="text" />
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicMax"
              >
                <Form.Label>Max</Form.Label>
                <Form.Control
                  name="Max"
                  required
                  type="text"
                  defaultValue={0}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton onClick={deleteCategoryHandler} />(
                <small>remove selected</small>)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Form.Select
                id="cats"
                required
                name="category"
                aria-label="Default select example"
                onChange={(e) =>
                  changeCategory(
                    e,
                    categories,
                    setCategoryChoosen
                  )
                }
              >
                <option value="">Choose category</option>
                {categories
                  ?.filter((category) =>
                    category.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((category, idx) => (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. PPE/HAT/PARTS, then press Enter,
                and use above choose that created category){" "}
              </Form.Label>
              <Form.Control
                onKeyUp={newCategoryHandler}
                name="newCategory"
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTags">
              <Form.Label>
                Tags / Keywords
              </Form.Label>
              <Form.Control
                // onKeyUp={newCategoryHandler}
                name="tags"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              {/* ********* Image upload ********* */}
              <Form.Label>Images</Form.Label>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                {displayImages()}
              </div>

              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => {
                  uploadHandlerImage(e);
                  displayImages();
                }}
              />
              {isCreating}
              {/* ********* Description PDF ********* */}
              <br />
              <Form.Label>Description PDF</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => uploadHandlerPdf(e.target.files)}
              />
              {isCreatingPdf}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>

            <Link to="/admin/products" className="btn btn-secondary ms-5">
              Cancel
            </Link>
            <p></p>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;
