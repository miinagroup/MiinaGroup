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
import moment from "moment";
import GoBackButton from "./GoBackButton";

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};

//需要的变量，以及随后会用到的功能
const EditProductPageComponent = ({
  categories,
  clientsSkuList,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,
  uploadHandler,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
  pdfDeleteHandler,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });

  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select lists
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category"); // 输入categories
  const [newAttrKey, setNewAttrKey] = useState(false); // 输入attri新值
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false); //联动之后，remove iamge了会refreshing page
  const [pdfRemoved, setPdfRemoved] = useState(false); //联动之后，remove iamge了会refreshing page
  const [isUploading, setIsUploading] = useState(""); // showing the message and the real time done
  const [isUploadingPdf, setIsUploadingPdf] = useState(""); // showing the message and the real time done
  const [imageUploaded, setImageUploaded] = useState(false); // use to changing the state and refreshing the page
  const [pdfUploaded, setPdfUploaded] = useState(false); // use to changing the state and refreshing the page
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  //显示 atrri 对应的 vale
  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const [stockLength, setStockLength] = useState(0);
  const [clientsSkus, setClientsSku] = useState([]);
  const [newProductClientsSkus, setNewProductClientSkus] = useState([]);

  const [selectedClientSkuName, setSelectedClientSkuName] = useState({});
  const [skuClientNumebr, setSkuClientNumber ] = useState({});

  const setValuesForAttrFromDbSelectForm = (e) => {
    // 如果不等于choose attribute的话，就var 一个 selectedAttr
    if (e.target.value !== "Choose attribute") {
      var selectedAttr = attributesFromDb.find(
        (item) => item.key === e.target.value
      );
      let valuesForAttrKeys = attrVal.current;
      // 如果选择的attri有东西，就remove attrikey的value，然后添加对应的新value
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

  // [id，imageremoved] id是啥 我忘记了，imageremoved就是 如果image removed is changed，然后useEffect will ba called once again
  // the produce will be fetched once again from the dtabase but without one image.
  // 懂了，就是如果这里的state variable change了，那么useEffect 就会 called once，然后product也会fetched once again，finally HTML 也会rendered once again
  useEffect(() => {
    fetchProduct(id)
      .then((product) => {
        setProduct(product);
        const newClientsSkus = product.stock.map(item => {
          return item.clientsSku;
        });
        // setClientsSku(prevSkus => [...prevSkus, ...newClientsSkus]);
        setClientsSku([...newClientsSkus])
        setStockLength(product.stock.length);
      })
      .catch((er) => console.log(er));
  }, [id, imageRemoved, imageUploaded]);

  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((er) => console.log(er));
  }, [id, pdfRemoved, pdfUploaded]);

  const calculateNewExpireDate = () => {
    return moment().add(28, "days").format("HH:mm:ss DD/MM/YYYY");
  };

  const validateExpireDate = (dateString) => {
    const format = "HH:mm:ss DD/MM/YYYY";
    return moment(dateString, format, true).isValid();
  };

  const [dynamicPrices, setDynamicPrices] = useState({});

  const updateDynamicPrice = (index, field, value, item) => {
    const newDynamicPrices = { ...dynamicPrices };

    console.log(newDynamicPrices[index], index, value, item);

    if (!newDynamicPrices[index]) {
      newDynamicPrices[index] = {
        purchaseprice: item.purchaseprice,
        margin: 0,
        calculatedPrice: item.price,
      };
    }
    newDynamicPrices[index][field] = value;

    if (
      newDynamicPrices[index].purchaseprice &&
      newDynamicPrices[index].margin
    ) {
      newDynamicPrices[index].calculatedPrice = (
        newDynamicPrices[index].purchaseprice /
        (1 - newDynamicPrices[index].margin / 100)
      ).toFixed(2);
    }

    setDynamicPrices(newDynamicPrices);
  };

  const updateDynamicPriceNewStockItem = (index, field, value) => {
    const newDynamicPrices = { ...dynamicPrices };

    console.log(newDynamicPrices[index], index, value);

    if (!newDynamicPrices[index]) {
      newDynamicPrices[index] = {
        purchaseprice: 0,
        margin: 0,
        calculatedPrice: 0,
      };
    }
    newDynamicPrices[index][field] = value;

    newDynamicPrices[index][field] = value;

    if (
      newDynamicPrices[index].purchaseprice &&
      newDynamicPrices[index].margin
    ) {
      newDynamicPrices[index].calculatedPrice = (
        newDynamicPrices[index].purchaseprice /
        (1 - newDynamicPrices[index].margin / 100)
      ).toFixed(2);
    }

    setDynamicPrices(newDynamicPrices);
  };

  const handlePriceChange = (index, value) => {
    const newDynamicPrices = { ...dynamicPrices };

    console.log(newDynamicPrices[index], index, value);

    newDynamicPrices[index] = {
      ...newDynamicPrices[index],
      calculatedPrice: parseFloat(value),
    };
    setDynamicPrices(newDynamicPrices);
  };

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
      const replenishment = parseInt(
        document.getElementsByName(`replenishment-${i}`)[0].value
      );

      let price;

      if (dynamicPrices[i]?.calculatedPrice) {
        price = dynamicPrices[i].calculatedPrice;
      } else {
        price = document.getElementsByName(`price-${i}`)[0].value;
      }

      let purchaseprice;

      if (dynamicPrices[i]?.purchaseprice) {
        purchaseprice = dynamicPrices[i].purchaseprice;
      } else {
        purchaseprice = document.getElementsByName(`purchaseprice-${i}`)[0]
          .value;
      }

      const attrs = document.getElementsByName(`attrs-${i}`)[0].value;
      const uom = document.getElementsByName(`uom-${i}`)[0].value;
      const barcode = document.getElementsByName(`barcode-${i}`)[0].value;
      const ctlsku = document.getElementsByName(`ctlsku-${i}`)[0].value;
      const slrsku = document.getElementsByName(`slrsku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`suppliersku-${i}`)[0]
        .value;
      const clientsSku = clientsSkus[i];
      const finalCount = replenishment ? count + replenishment : count;

      stock.push({
        _id,
        count: finalCount,
        price,
        purchaseprice,
        attrs,
        uom,
        barcode,
        ctlsku,
        slrsku,
        suppliersku,
        clientsSku
      });
    }

    const stockNew = [];
    for (let i = 0; i < document.querySelectorAll(".stockNew").length; i++) {
      const count = document.getElementsByName(`newCount-${i}`)[0].value;

      let price;

      if (dynamicPrices[i + stockLength]?.calculatedPrice) {
        price = dynamicPrices[i + stockLength].calculatedPrice;
      } else {
        price = document.getElementsByName(`price-${i}`)[0].value;
      }

      /*       let purchaseprice;
      console.log(
        i + stockLength,
        dynamicPrices,
        typeof dynamicPrices,
        dynamicPrices[i + stockLength]?.purchasepric
      );
      if (dynamicPrices[i + stockLength]?.purchaseprice) {
        purchaseprice = dynamicPrices[i + stockLength].purchaseprice;
      } else {
        purchaseprice = document.getElementsByName(`newPurchaseprice-${i}`)[0]
          .value;
      } */

      const purchaseprice = dynamicPrices[i + stockLength].purchaseprice;

      const attrs = document.getElementsByName(`newAttrs-${i}`)[0].value;
      const uom = document.getElementsByName(`newUom-${i}`)[0].value;
      const barcode = document.getElementsByName(`newBarcode-${i}`)[0].value;
      const ctlsku = document.getElementsByName(`newCtlsku-${i}`)[0].value;
      const slrsku = document.getElementsByName(`newSlrsku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`newSuppliersku-${i}`)[0]
        .value;
      const clientsSku = newProductClientsSkus[i];


      stockNew.push({
        count,
        price,
        purchaseprice,
        attrs,
        uom,
        barcode,
        ctlsku,
        slrsku,
        suppliersku,
        clientsSku
      });
    }
    // check if stockNew is an array
    /* if (Array.isArray(stockNew) && stockNew.length > 0) {
      stock.push(...stockNew);
    } */
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      saleunit: form.saleunit.value,
      max: form.Max.value,
      sortOrder: form.sortOrder.value,
      displayPrice: form.displayPrice.value,
      supplier: form.supplier.value,
      category: form.category.value,
      expireDate: form.expireDate.value,
      editedBy: userInfo.name + " " + userInfo.lastName,
      attributesTable: [],
      stock: [...stock, ...stockNew],
    };

    let newExpireDate = form.expireDate.value.trim();
    const currentExpireDate = product.expireDate || "";

    if (
      (newExpireDate !== currentExpireDate &&
        validateExpireDate(newExpireDate)) ||
      !currentExpireDate
    ) {
      formInputs.expireDate = moment(
        newExpireDate,
        "HH:mm:ss DD/MM/YYYY"
      ).isValid()
        ? moment(newExpireDate, "HH:mm:ss DD/MM/YYYY").format(
          "00:00:00 DD/MM/YYYY"
        )
        : "";
    } else {
      const today = moment().startOf("day");
      const enteredDate = moment(newExpireDate, "HH:mm:ss DD/MM/YYYY");

      if (!enteredDate.isValid() || enteredDate.isBefore(today)) {
        formInputs.expireDate = today
          .add(29, "days")
          .format("00:00:00 DD/MM/YYYY");
      } else {
        formInputs.expireDate = enteredDate.format("00:00:00 DD/MM/YYYY");
      }
    }

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
          if (data.message === "product updated") navigate("/admin/products");
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

  //此处我们只是把attributes设置到main category里面
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
    // attri table 的数据读取
    setAttributesTable(product.attrs);
    //
    setCategoryChoosen(product.category);
  }, [product]);

  // 当main categories 改变的话，对应的atrributes框内的内容也会相应改变。
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

    //
    setCategoryChoosen(e.target.value);
  };

  // 选择attributes之后，显示在attri table 里
  const attributeValueSelected = (e) => {
    //如果a target value is not choose attribute value， then
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

  // setAttributesTable（这里的都是call back）， talbe.filter（这里的都是filter的call back）
  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  // 防止输入attri后，按下enter，直接跳转回product list
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  // 13 好像是enter
  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  // 好像是输入 新的attri，回车，然后会显示在列表里？？？？？？
  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        // 把新的attr写入数据库
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        // 232章
        setAttributesTableWrapper(newAttrKey, newAttrValue);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  // add new product attrs in Stock
  const [rowCount, setRowCount] = useState(0);
  const handleNewProduct = () => {
    setRowCount(rowCount + 1);
  };
  const handleRemoveProduct = () => {
    setRowCount(rowCount - 1);
  };

  /*   const [selectedStock, setSelectedStock] = useState(null);
  
    const handleDeleteStock = async (stockId) => {
      try {
        const res = await axios.delete(`/api/products/admin/${product._id}/stock/${stockId}`);
        setSelectedStock(null);
        console.log(res.data); // log the updated product to the console
        window.location.reload();
      } catch (err) {
        console.error(err.message);
      }
    };
    console.log('selectedStock',selectedStock); */

  const handleRemoveStock = (index) => {
    const newStock = [...product.stock];
    newStock.splice(index, 1);

    const newDynamicPrices = Object.keys(dynamicPrices).reduce((acc, key) => {
      const currentIndex = parseInt(key);
      if (currentIndex > index) {
        acc[currentIndex - 1] = dynamicPrices[currentIndex];
      } else if (currentIndex < index) {
        acc[currentIndex] = dynamicPrices[currentIndex];
      }
      return acc;
    }, {});

    setDynamicPrices(newDynamicPrices);
    setProduct({ ...product, stock: newStock });
    setStockLength(newStock.length);
  };

  const handleSelect = (e, index) => {
    setSelectedClientSkuName({...selectedClientSkuName, [index]: e.target.value});
  }

    const handleInputChange = (e, index) => {
    setSkuClientNumber({...skuClientNumebr, [index]: e.target.value});
  };


  const addNewClientSku = (array, setArray, index) => {
    const isSkuName = array[index]?.some(el => el.name === selectedClientSkuName[index]);
    if (selectedClientSkuName[index] && skuClientNumebr[index]) {
      if (isSkuName) {
        alert('This SKU name already exists for this item in stock.');
        return;
      }
      const updatedClientsSkus = [...array];
      if (updatedClientsSkus[index]) {
        updatedClientsSkus[index].push({ name: selectedClientSkuName[index], number: skuClientNumebr[index] });
      } else {
        updatedClientsSkus[index] = [{ name: selectedClientSkuName[index], number: skuClientNumebr[index] }];
      }
      setArray(updatedClientsSkus);
      setSelectedClientSkuName({...selectedClientSkuName, [index]: ""});
      setSkuClientNumber({...skuClientNumebr, [index]: ""});
    } else {
      alert('Please select a SKU and enter a number.');
    }
  };

  const removeClientSku = (array, setArray, index, i) => {
    const updatedClientsSkus = [...array];
    updatedClientsSkus[index] = updatedClientsSkus[index].filter((_, index) => index !== i);
    setArray(updatedClientsSkus);
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-5 content-container ">
        <Col md={1}>
          {/* <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link> */}
          <GoBackButton />
        </Col>
        <Col md={6}>
          <h1>Edit product</h1>
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
                defaultValue={product.description}
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
                      Product: {index + 1}
                    </span>
                    <Row>
                      <React.Fragment>
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
                          controlId={`formBasicReplenishment-${index}`}
                        >
                          <Form.Label>Replenishment</Form.Label>
                          <Form.Control
                            name={`replenishment-${index}`}
                            type="number"
                            placeholder="Enter Count"
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
                            defaultValue={item.uom}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="3"
                          className="mb-3"
                          controlId={`formBasicBarcde-${index}`}
                        >
                          <Form.Label>Barcode</Form.Label>
                          <Form.Control
                            name={`barcode-${index}`}
                            type="text"
                            defaultValue={item.barcode}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="1" className="mb-3">
                          <i
                            className="bi bi-trash mt-3"
                            // onClick={() => setSelectedStock(item)}
                            onClick={() => handleRemoveStock(index)}
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
                          <Form.Label className="text-danger">
                            Product Price
                          </Form.Label>
                          {/* <CurrencyInput
                            className={`form-control price-${index}`}
                            name={`price-${index}`}
                            placeholder="AUD 0.00"
                            defaultValue={item.price}
                            decimalsLimit={2}
                            required="true"
                            disableGroupSeparators="true"
                          /> */}
                          <Form.Control
                            name={`price-${index}`}
                            required
                            type="number"
                            value={
                              dynamicPrices[index]?.calculatedPrice ??
                              item.price
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
                          controlId={`formPurchasePrice-${index}`}
                        >
                          <Form.Label className="text-danger">
                            Purchase Price
                          </Form.Label>
                          <Form.Control
                            name={`purchaseprice-${index}`}
                            required
                            value={
                              dynamicPrices[index]?.purchaseprice ??
                              item.purchaseprice
                            }
                            type="number"
                            onChange={(e) =>
                              updateDynamicPrice(
                                index,
                                "purchaseprice",
                                parseFloat(e.target.value),
                                item
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
                                parseFloat(e.target.value),
                                item
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
                            defaultValue={item.ctlsku}
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
                          />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          md="3"
                          className="mb-3"
                          controlId={`formBasicSLRSKU-${index}`}
                          hidden
                        >
                          <Form.Label>SLR SKU</Form.Label>
                          <Form.Control
                            name={`slrsku-${index}`}
                            type="text"
                            defaultValue={item.slrsku}
                          />
                        </Form.Group>

                        <Form.Group>
                      <Form.Label>Client Sku</Form.Label>
                      <div style={{display: "flex", gap: "20px", marginBottom: "20px"}}>
                        <Form.Select 
                        value={selectedClientSkuName[index]} 
                        onChange={(e) => handleSelect(e, index)}
                        >
                                  <option 
                                  value={selectedClientSkuName[index] === "" && ""}
                                  >Select SKU name</option>
                                  { clientsSkuList && clientsSkuList.map(item => {
                                      return <option value={item.sku}>{item.sku}</option>
                                    })
                                  }
                      </Form.Select>


                      <Form.Control
                              type="text"
                              value={skuClientNumebr[index] || ""}
                              onChange={(e) => handleInputChange(e, index)}
                      />
                      </div>
                      
                      <Button 
                      onClick={(e) => addNewClientSku(clientsSkus, setClientsSku, index)}
                      >Save</Button>

                      <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Client SKU</th>
                          <th>Number</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientsSkus[index] && clientsSkus[index].map((skus, i) => {
                          return <tr>
                            <td>{i + 1}</td>
                            <td>{skus.name}</td>
                            <td>{skus.number}</td>
                            <td><i onClick={() => removeClientSku(clientsSkus, setClientsSku, index, i)} className="bi bi-x-circle close" style={{cursor:"pointer"}}></i></td>
                          </tr> 
                        })}
                      </tbody>
                      </Table>
                    </Form.Group>

                      </React.Fragment>
                    </Row>
                  </>
                </div>
              ))}

            {/* add new product */}
            {[...Array(rowCount)].map((_, index) => (
              <>
                <span className="stockNew text-primary">
                  New Product: {index + 1}
                </span>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="2"
                      className="mb-3"
                      controlId={`formBasicNewCount-${index}`}
                    >
                      <Form.Label>Count</Form.Label>
                      <Form.Control
                        name={`newCount-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewAttrs-${index}`}
                    >
                      <Form.Label>Attrs</Form.Label>
                      <Form.Control
                        name={`newAttrs-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="2"
                      className="mb-3"
                      controlId={`formBasicNewUom-${index}`}
                    >
                      <Form.Label>UOM</Form.Label>
                      <Form.Control
                        name={`newUom-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId={`formBasicNewBarcde-${index}`}
                    >
                      <Form.Label>Barcode</Form.Label>
                      <Form.Control name={`newBarcode-${index}`} type="text" />
                    </Form.Group>
                    <Form.Group as={Col} md="1" className="mb-3">
                      <i
                        className="bi bi-trash mt-3"
                        onClick={handleRemoveProduct}
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
                      controlId={`formBasicNewPrice-${index}`}
                    >
                      <Form.Label className="text-danger">
                        Product Price
                      </Form.Label>
                      {/* <CurrencyInput
                        className={`form-control newPrice-${index}`}
                        name={`newPrice-${index}`}
                        placeholder="AUD 0.00"
                        defaultValue={0}
                        decimalsLimit={2}
                        required="true"
                        disableGroupSeparators="true"
                      /> */}
                      <Form.Control
                        name={`price-${index}`}
                        required
                        type="number"
                        value={
                          dynamicPrices[index + product.stock.length]
                            ?.calculatedPrice ?? ""
                        }
                        onChange={(e) =>
                          handlePriceChange(
                            index + product.stock.length,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formPurchaseNewPrice-${index}`}
                    >
                      <Form.Label className="text-danger">
                        Purchase Price
                      </Form.Label>
                      <Form.Control
                        name={`newPurchasePrice-${index}`}
                        required
                        type="number"
                        onChange={(e) =>
                          updateDynamicPriceNewStockItem(
                            index + product.stock.length,
                            "purchaseprice",
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
                          updateDynamicPriceNewStockItem(
                            index + product.stock.length,
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
                      controlId={`formBasicNewCTLSKU-${index}`}
                    >
                      <Form.Label>CTL SKU</Form.Label>
                      <Form.Control
                        name={`newCtlsku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewSupplierSKU-${index}`}
                    >
                      <Form.Label>Supplier SKU</Form.Label>
                      <Form.Control
                        name={`newSuppliersku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicNewSLRSKU-${index}`}
                      hidden
                    >
                      <Form.Label>SLR SKU</Form.Label>
                      <Form.Control name={`newSlrsku-${index}`} type="text" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Client Sku</Form.Label>
                      <div style={{display: "flex", gap: "20px", marginBottom: "20px"}}>
                        <Form.Select 
                        value={selectedClientSkuName[index]} 
                        onChange={(e) => handleSelect(e, index)}
                        >
                                  <option 
                                  value={selectedClientSkuName[index] === "" && ""}
                                  >Select SKU name</option>
                                  { clientsSkuList && clientsSkuList.map(item => {
                                      return <option value={item.sku}>{item.sku}</option>
                                    })
                                  }
                    </Form.Select>


                      <Form.Control
                              type="text"
                              value={skuClientNumebr[index] || ""}
                              onChange={(e) => handleInputChange(e, index)}
                      />
                      </div>
                      
                      <Button 
                      onClick={(e) => addNewClientSku(newProductClientsSkus, setNewProductClientSkus, index)}
                      >Save</Button>

                      <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Client SKU</th>
                          <th>Number</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {newProductClientsSkus[index] && newProductClientsSkus[index].map((skus, i) => {
                          return <tr>
                            <td>{i + 1}</td>
                            <td>{skus.name}</td>
                            <td>{skus.number}</td>
                            <td><i onClick={() => removeClientSku(newProductClientsSkus, setNewProductClientSkus, index, i)} className="bi bi-x-circle close" style={{cursor:"pointer"}}></i></td>
                          </tr> 
                        })}
                      </tbody>
                      </Table>
                    </Form.Group>

                  </React.Fragment>
                </Row>
              </>
            ))}

            <hr />
            {/* <p
              onClick={handleNewProduct}
              style={{
                cursor: "pointer",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Add New Product
            </p> */}
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

            {/* {selectedStock && (
        <div>
          <p>Are you sure you want to delete this stock object?</p>
          <button onClick={() => handleDeleteStock(selectedStock._id)}>Delete</button>
          <button onClick={() => setSelectedStock(null)}>Cancel</button>
        </div>
      )} */}

            <Row>
              {/* <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicPurchasePrice"
              >
                <Form.Label>Purchase Price</Form.Label>
                {/* <CurrencyInput
                  className={`form-control PurchasePrice`}
                  name={`PurchasePrice`}
                  placeholder="AUD 0.00"
                  decimalsLimit={2}
                  required="true"
                  disableGroupSeparators="true"
                  defaultValue={Number(product.purchaseprice)}
                /> *
                <Form.Control
                  name="PurchasePrice"
                  required
                  type="number"
                  step="0.01"
                  defaultValue={product.purchaseprice}
                />
              </Form.Group> */}
              <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicSLRBuyingPrice"
              >
                <Form.Label className="text-danger">Display Price</Form.Label>
                {/* <CurrencyInput
                  className={`form-control displayPrice`}
                  name={`displayPrice`}
                  placeholder="AUD 0.00"
                  defaultValue={product.displayPrice}
                  decimalsLimit={2}
                  required="true"
                  disableGroupSeparators="true"
                /> */}
                <Form.Control
                  name="displayPrice"
                  type="number"
                  step="0.01"
                  defaultValue={product.displayPrice}
                  required
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
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                className="mb-3"
                controlId="formBasicMax"
              >
                <Form.Label>Max</Form.Label>
                <Form.Control
                  name="Max"
                  required
                  type="number"
                  defaultValue={product.max}
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
                  defaultValue={product.sortOrder}
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
                <Form.Control
                  name="supplier"
                  required
                  type="text"
                  defaultValue={product.supplier}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicExpireDate"
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
              >
                {/* 自动选择产品本身的category */}
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

            {/* attributes */}
            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={setValuesForAttrFromDbSelectForm}
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributeValueSelected}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {/* 如果attribute table有东西 */}
              {attributesTable && attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enter on one of the
              field
            </Alert>

            {/* ********* Documents upload ********* */}
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              {/* ********* images upload ********* */}
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <Image
                        crossOrigin="anonymous"
                        src={image.path ?? null}
                        fluid
                      />
                      <i
                        style={onHover}
                        onClick={() =>
                          imageDeleteHandler(image.path, id).then((data) =>
                            setImageRemoved(!imageRemoved)
                          )
                        }
                        className="bi bi-x text-danger"
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setIsUploading("upload files in progress ...");
                  if (process.env.NODE_ENV === "dev") {
                    // TODO: change to !==  ===
                    uploadImagesApiRequest(e.target.files, id)
                      .then((data) => {
                        setIsUploading("upload file completed");
                        setImageUploaded(!imageUploaded);
                      })
                      .catch((er) =>
                        setIsUploading(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      );
                  } else {
                    uploadImagesCloudinaryApiRequest(e.target.files, id);
                    setIsUploading(
                      "upload file completed. wait for the result take effect, refresh also if neccassry"
                    );
                    setTimeout(() => {
                      setImageUploaded(!imageUploaded);
                    }, 5000);
                  }
                }}
              />
              {isUploading}
            </Form.Group>
            {/* ********* Description PDF ********* */}
            <Form.Group controlId="formFileMultiplePDF" className="mb-3 mt-3">
              <Form.Label>PDF</Form.Label>
              <Row>
                {product.pdfs &&
                  product.pdfs.map((pdf, idx) => {
                    const pdfName = pdf.path && pdf.path.split("/").pop();
                    return (
                      <Col key={idx} style={{ position: "relative" }} xs={3}>
                        <i className="bi bi-file-pdf">{pdfName}</i>{" "}
                        <i
                          style={onHover}
                          onClick={() =>
                            pdfDeleteHandler(pdf.path, id).then((data) =>
                              setPdfRemoved(!pdfRemoved)
                            )
                          }
                          className="bi bi-x text-danger"
                        ></i>
                      </Col>
                    );
                  })}
              </Row>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setIsUploadingPdf("upload files in progress ...");
                  if (process.env.NODE_ENV === "dev") {
                    // TODO: change to !==
                    uploadPdfApiRequest(e.target.files, id)
                      .then((data) => {
                        setIsUploadingPdf("upload file completed");
                        setPdfUploaded(!pdfUploaded);
                      })
                      .catch((er) =>
                        setIsUploadingPdf(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      );
                  } else {
                    uploadPdfCloudinaryApiRequest(e.target.files, id);
                    setIsUploadingPdf(
                      "upload file completed. wait for the result take effect, refresh also if neccassry"
                    );
                    setTimeout(() => {
                      setPdfUploaded(!pdfUploaded);
                    }, 5000);
                  }
                }}
              />
              {isUploadingPdf}
            </Form.Group>
            <Row>
              <Form.Group
                as={Col}
                md="12"
                className="mb-3"
                controlId="formBasicStandards"
              >
                <Form.Label>Standards</Form.Label>
                <Form.Control
                  name="standards"
                  // required
                  type="text"
                  defaultValue={product?.standards}
                />
              </Form.Group>
            </Row>

            <Button className="mb-3" variant="primary" type="submit">
              UPDATE
            </Button>

            <Link to="/admin/products" className="btn btn-secondary mb-3 ms-5">
              Cancel
            </Link>
            <p></p>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductPageComponent;
