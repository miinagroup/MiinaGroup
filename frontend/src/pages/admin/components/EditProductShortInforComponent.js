import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
//当更改了产品信息，就navigate去product list page
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};

//需要的变量，以及随后会用到的功能
const EditProductShortInforComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  productChanged,
  refreshAfterEdit,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });

  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [attributesTable, setAttributesTable] = useState([]);
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [pdfRemoved, setPdfRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState("");
  const [isUploadingPdf, setIsUploadingPdf] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const setValuesForAttrFromDbSelectForm = (e) => {
    if (e.target.value !== "Choose attribute") {
      var selectedAttr = attributesFromDb.find(
        (item) => item.key === e.target.value
      );
      let valuesForAttrKeys = attrVal.current;
      if (selectedAttr && selectedAttr.value.length > 0) {
        while (valuesForAttrKeys.options.length) {
          valuesForAttrKeys.remove(0);
        }
        valuesForAttrKeys.options.add(new Option("Choose attribute value"));
        selectedAttr.value.map((item) => {
          valuesForAttrKeys.add(new Option(item));
          return "";
        });
      }
    }
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((er) => console.log(er));
  }, [id, imageRemoved, imageUploaded, pdfRemoved, pdfUploaded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const stock = [];
    for (
      let i = 0;
      i < document.querySelectorAll(".stockExisting").length;
      i++
    ) {
      const _id = document.getElementsByName(`_id-${i}`)[0].value;
      const count = parseInt(document.getElementsByName(`count-${i}`)[0].value);
      const price = document.getElementsByName(`price-${i}`)[0].value;
      const purchaseprice = document.getElementsByName(`purchaseprice-${i}`)[0]
        .value;
      const attrs = document.getElementsByName(`attrs-${i}`)[0].value;
      const mnasku = document.getElementsByName(`mnasku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`suppliersku-${i}`)[0]
        .value;

      stock.push({
        _id,
        count,
        price,
        purchaseprice,
        attrs,
        mnasku,
        suppliersku,
      });
    }

    const stockNew = [];
    for (let i = 0; i < document.querySelectorAll(".stockNew").length; i++) {
      const count = document.getElementsByName(`newCount-${i}`)[0].value;
      const price = document.getElementsByName(`newPrice-${i}`)[0].value;
      const purchaseprice = document.getElementsByName(
        `newPurchasePrice-${i}`
      )[0].value;
      const attrs = document.getElementsByName(`newAttrs-${i}`)[0].value;
      const mnasku = document.getElementsByName(`newMnasku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`newSuppliersku-${i}`)[0]
        .value;

      stockNew.push({
        count,
        price,
        purchaseprice,
        attrs,
        mnasku,
        suppliersku,
      });
    }

    const formInputs = {
      name: form.name.value,
      editedBy: userInfo.name + " " + userInfo.lastName,
      saleunit: form.saleunit.value,
      sortOrder: form.sortOrder.value,
      displayPrice: form.displayPrice.value,
      supplier: form.supplier.value,
      category: form.category.value,
      expireDate: form.expireDate.value,
      stock: [...stock, ...stockNew],
    };

    const priceError = formInputs.stock.some(
      (item) => item.price >= formInputs.displayPrice / formInputs.saleunit
    );

    if (!priceError) {
      alert("The DISPLAY PRICE have to be less than the ITEM PRICE !!!");
      return;
    }

    if (formInputs.category === "Choose category") {
      alert("Please choose a CATEGORY !!!!!");
      return;
    }

    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "product updated") {
            productChanged(false);
            refreshAfterEdit(true);
          }
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  useEffect(() => {
    let categoryOfEditedProduct = categories?.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      const mainCategoryOfEditedProductAllData = categories?.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === mainCategoryOfEditedProduct
      );
      if (
        mainCategoryOfEditedProductAllData &&
        mainCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    setAttributesTable(product.attrs);
    setCategoryChoosen(product.category);
  }, [product]);

  const changeCategory = (e) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories?.find(
      (cat) => cat.name === highLevelCategory
    );
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      setAttributesFromDb(highLevelCategoryAllData.attrs);
    } else {
      setAttributesFromDb([]);
    }

    setCategoryChoosen(e.target.value);
  };

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(attrKey.current.value, e.target.value);
    }
  };

  const setAttributesTableWrapper = (key, val) => {
    setAttributesTable((attr) => {
      if (attr.length !== 0) {
        var keyExistsInOldTable = false;
        let modifiedTable = attr.map((item) => {
          if (item.key === key) {
            keyExistsInOldTable = true;
            item.value = val;
            return item;
          } else {
            return item;
          }
        });
        if (keyExistsInOldTable) return [...modifiedTable];
        else return [...modifiedTable, { key: key, value: val }];
      } else {
        return [{ key: key, value: val }];
      }
    });
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
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
        setAttributesTableWrapper(newAttrKey, newAttrValue);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  const [rowCount, setRowCount] = useState(0);
  const handleNewProduct = () => {
    setRowCount(rowCount + 1);
  };
  const handleRemoveProduct = () => {
    setRowCount(rowCount - 1);
  };

  const handleRemoveStock = (index) => {
    const newStock = [...product.stock];
    newStock.splice(index, 1);
    setProduct({ ...product, stock: newStock });
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center m-0">
        <h1>EDIT PRODUCT</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              defaultValue={product.name}
            />
          </Form.Group>

          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: 0.5,
              borderColor: "#000000",
            }}
          />
          {product &&
            product.stock &&
            product.stock.map((item, index) => (
              <div key={item._id}>
                <>
                  <span className="stockExisting text-primary">
                    Stock : {index + 1}
                  </span>
                  <Row>
                    <React.Fragment>
                      <Form.Group
                        as={Col}
                        md="2"
                        className="mb-3"
                        controlId={`formBasicCount-${index}`}
                        hidden
                      >
                        <Form.Label>Count</Form.Label>
                        <Form.Control
                          name={`count-${index}`}
                          required
                          type="number"
                          defaultValue={item.count}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="2"
                        className="mb-3"
                        controlId={`formBasic_id-${index}`}
                        hidden
                      >
                        <Form.Label>Object ID</Form.Label>
                        <Form.Control
                          name={`_id-${index}`}
                          required
                          type="text"
                          defaultValue={item._id}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="2"
                        className="mb-3"
                        controlId={`formBasicAttrs-${index}`}
                      >
                        <Form.Label>Attrs</Form.Label>
                        <Form.Control
                          name={`attrs-${index}`}
                          required
                          type="text"
                          defaultValue={item.attrs}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicMNASKU-${index}`}
                      >
                        <Form.Label>Miina SKU</Form.Label>
                        <Form.Control
                          name={`mnasku-${index}`}
                          required
                          type="text"
                          defaultValue={item.mnasku}
                          disabled
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
                          defaultValue={item.suppliersku}
                          disabled
                        />
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
                        <Form.Label className="text-danger">
                          Product Price
                        </Form.Label>

                        <Form.Control
                          name={`price-${index}`}
                          required
                          type="number"
                          step="0.001"
                          defaultValue={item.price}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        className="mb-3"
                        controlId={`formBasicPurchasePrice-${index}`}
                      >
                        <Form.Label className="text-danger">
                          Purchase Price
                        </Form.Label>
                        <Form.Control
                          name={`purchaseprice-${index}`}
                          required
                          type="number"
                          step="0.001"
                          defaultValue={item.purchaseprice}
                        />
                      </Form.Group>

                    </React.Fragment>
                  </Row>
                  <hr></hr>
                </>
              </div>
            ))}
          <hr></hr>

          <Row>
            <Form.Group
              as={Col}
              md="3"
              className="mb-3"
              controlId="formBasicSLRBuyingPrice"
            >
              <Form.Label className="text-danger">Display Price</Form.Label>

              <Form.Control
                name="displayPrice"
                type="number"
                step="0.01"
                defaultValue={product.displayPrice}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              className="mb-3"
              controlId="formBasicSaleunit"
            >
              <Form.Label>Sale Unit</Form.Label>
              <Form.Control
                name="saleunit"
                required
                type="number"
                defaultValue={product.saleunit}
                disabled
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              className="mb-3"
              controlId="formBasicSortOrder"
            >
              <Form.Label>Sort Order</Form.Label>
              <Form.Control
                name="sortOrder"
                type="number"
                required
                defaultValue={product.sortOrder}
                disabled
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
              <Form.Control
                name="supplier"
                required
                type="text"
                defaultValue={product.supplier}
                disabled
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formBasicExpireDate"
              hidden
            >
              <Form.Label>
                Expire Date (hh:mm:ss 28/06/2023) / "remove" to delete
              </Form.Label>
              <Form.Control
                name="expireDate"
                type="string"
                defaultValue={product.expireDate}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              required
              name="category"
              aria-label="Default select example"
              onChange={changeCategory}
              disabled
            >
              <option value="Choose category">Choose category</option>
              {categories?.map((category, idx) => {
                return product.category === category.name ? (
                  <option selected key={idx} value={category.name}>
                    {category.name}
                  </option>
                ) : (
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Button className="mb-3" variant="primary" type="submit">
            UPDATE
          </Button>

          <p></p>
          {updateProductResponseState.error ?? ""}
        </Form>
      </Row>
    </Container>
  );
};

export default EditProductShortInforComponent;
