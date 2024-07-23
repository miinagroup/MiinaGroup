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
  Modal,
  Dropdown,
  DropdownButton,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import ProductForListPreviewComponent from "./ProductForListPreviewComponent";
import ProductForStockPreviewComponent from "./ProductForStockPreviewComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import "../pages/general.css";
import QuotePriceComponent from "./SendEmail/QuotePriceComponent";
// import ReactGA from "react-ga";

const ProductForListComponent = ({
  productId,
  name,
  slrsku,
  price,
  purchaseprice,
  images,
  saleunit,
  stock,
  reduxDispatch,
  categories,
  sortOrder,
  createQuote,
  ctlsku,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(saleunit);
  const [selectedStock, setSelectedStock] = useState(null);
  const [buttonText, setButtonText] = useState("Add");
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userNameEmail, setUserNameEmail] = useState();
  const [quoteData, setQuoteData] = useState();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  // console.log("userInfo", userInfo.location)
  // console.log("stock", stock)

  // useEffect(() => {
  //   ReactGA.pageview(window.location)
  // }, [])

  //check for uniform content in cart
  const [isUniform, setIsUniform] = useState(false)
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    cartItems?.map((items) => {
      if (items.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) {
        setIsUniform(true)
      }
    })
  }, [cartItems])

  useEffect(() => {
    if (product?.saleunit) {
      setQty(product?.saleunit);
    }
  }, [product]);

  // useEffect(() => {
  //   categoryList.length = 0
  //   var categoryItem = categories[0];
  //   categories.map((category) => {
  //     category.name.includes(categoryItem.name) ? (
  //       categoryItem = category
  //     ) : (
  //       categoryList.push(categoryItem)
  //     )
  //     categoryItem = category
  //   })
  // });

  useEffect(() => {
    const uniqueCategories = categories?.reduce((unique, category) => {
      if (!unique.some((item) => item.name === category.name)) {
        unique.push(category);
      }
      return unique;
    }, []);

    const filteredCategories = uniqueCategories?.filter((category) => {
      return !uniqueCategories?.some(
        (otherCategory) =>
          otherCategory.name?.startsWith(category.name + "/") &&
          otherCategory.name !== category.name
      );
    });
    setCategoryList(filteredCategories);
    // console.log("filteredCategories", filteredCategories);
  }, [categories]);

  // console.log("categories", categories);
  //console.log("categoryList", categoryList);

  function handleProductChange(event) {
    const attrs = event.target.value;

    if (attrs !== "choose-product") {
      const stockItem = stock.find((item) => item.attrs === attrs);
      console.log(stockItem)

      const clientSku = stockItem.clientsSku.filter(sku => {
        const newClientSku = sku.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ").toLowerCase();
        return newClientSku === userInfo.location.toLowerCase();
      });

      if (clientSku.length > 0) {
        stockItem.currentClientSku = clientSku[0];
      } else {
        stockItem.currentClientSku = { number: '', name: '' };
      }
  
      console.log(stockItem);
      addToCartHandler(stockItem);
    } else {
      setSelectedStock(null);
    }
  }

  const addToCartHandler = async (selectedItem) => {
    setButtonText("Adding...");
    console.log("selectedItem", selectedItem)
    try {
      //console.log(productId, qty, selectedItem)
      await reduxDispatch(addToCart(productId, qty, selectedItem));
      setButtonText("Added!");
      setTimeout(() => setButtonText("Add"), 1000);
      setQty(saleunit);

      // ReactGA.event({
      //   category: selectedItem.name,
      //   action: "add to cart",
      //   label: "cart",
      //   value: selectedItem.value,
      // });
    } catch (error) {
      // handle error case
      setButtonText("Add");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal && !product) {
      axios.get(`/api/products/get-one/${productId}`).then((response) => {
        setProduct(response.data);
      });
    }
  };

  const deleteProduct = () => {
    if (window.confirm("Are you sure?")) {
      try {
        axios.delete(`/api/products/admin/${productId}`);
        window.location.reload(true);
      } catch (err) {
        window.show("Error handling this process");
      }
    }
  };

  const updateProduct = (e) => {
    const selectedCategory = e.target.value;
    if (window.confirm("Update Product?")) {
      try {
        axios.put(`/api/products/admin/updateProduct/${productId}`, {
          selectedCategory,
        });
        window.location.reload(true);
      } catch (err) {
        window.show("Error handling this process");
      }
    }
  };

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const formattedPrice = price?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleBlur = (e) => {
    const newValue = Math.round(e.target.value / saleunit) * saleunit;
    setQty(newValue);
  };
  // console.log("sortOrder", sortOrder);

  /* ***************** QUOTE PRICE *************** */
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

  const [quotePriceData, setQuotePriceData] = useState({});
  useEffect(() => {
    if (price === 0) {
      setQuoteData({
        existingProduct: true,
        product: productId,
        ctlsku: ctlsku,
        status: "Received",
      });
      setQuotePriceData({
        ...userNameEmail,
        productName: name,
        productId: productId,
      });
    }
  }, [productId, price, ctlsku, userNameEmail, name]);

  const [checkImageAvailable, setCheckImageAvailable] = useState(false)
  useEffect(() => {
    const extensions = [".jpg", ".png", ".webp", ".bmp"]
    setCheckImageAvailable(extensions.some(el => images[0].path.includes(el)))
  })
  return (
    <>
      <div className="product-block">
        <div className="mb-2">
          <div className="card mt-0">
            <div
              className="bg-image hover-zoom ripple img_hovf"
              data-mdb-ripple-color="light"
            >
              <div className="preview_button_img">
                <a href={`/product-details/${productId}`} className="w-100">
                  <div className="image-container">
                    {
                      checkImageAvailable ? (
                        <img
                          src={
                            images[0]
                              ? images[0].path.replace(
                                "/upload/",
                                "/upload/c_fill,h_232,w_232/"
                              )
                              : ""
                          }
                          alt="Image Not Found"
                          className="square-image"
                          id={name.replace(/\s/g, "") + "_IMG"}
                        />
                      ) : (
                        <img
                          src="https://ctladmin.b-cdn.net/image/Image-coming-soon_agj5fl.jpg"
                          alt="Image Not Found"
                          className="square-image"
                          id={name.replace(/\s/g, "") + "_IMG"}
                        />
                      )
                    }

                  </div>
                </a>
                <div className="Preview_Div">
                  <button className="Preview_Button" onClick={toggleModal}>
                    Preview
                  </button>
                  {userInfo.isAdmin ? (
                    <button
                      className="Preview_Delete_Button"
                      onClick={deleteProduct}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {userInfo.isAdmin ? (
                <>
                  <div className="Preview_Update_Div">
                    {/* <text className="Preview_Update_Text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></text> */}
                    <select
                      className="Preview_Update_Button"
                      onChange={updateProduct}
                    >
                      {categoryList?.map((category, idx) => {
                        return category.name !== "" ? (
                          <option selected key={idx} value={category.name}>
                            {category.name}
                          </option>
                        ) : (
                          <option key={idx} value={category.name}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* <div style={{ position:"absolute", bottom:"40%", fontWeight:"bold" }}>sort order: {sortOrder}</div> */}
                </>
              ) : (
                ""
              )}
            </div>

            <a href={`/product-details/${productId}`} className="w-100">
              <div className="card-body">
                <h6 className="card-title mb-3 text-uppercase">{name}</h6>
                <h6 className="card-price mb-0 mt-3 d-flex justify-content-center">
                  {price === 0 ? (
                    <span
                      // className="fw-bold"
                      id={name.replace(/\s/g, "") + "_PRICE"}
                    >
                      Price: N/A
                    </span>
                  ) : (
                    <span className="" id={name.replace(/\s/g, "") + "_PRICE"}>
                      Price: ${formattedPrice}
                    </span>
                  )}
                </h6>
              </div>
            </a>
            {
              isUniform ? (
                <OverlayTrigger
                  delay={{ hide: 450, show: 200 }}
                  overlay={(props) => (
                    <Tooltip {...props} >
                      To Enable Add to Cart,<br /> Please Complete Existing Cart <br />( OR )<br /> Empty Your Cart
                    </Tooltip>
                  )}
                  placement="bottom"
                ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ cursor: "pointer", color: "orange", paddingLeft: "89%", position: "absolute", bottom: "10%", zIndex: 1 }}></i>
                </OverlayTrigger>
              ) : ("")
            }

            {price === 0 ? (
              <QuotePriceComponent
                quotePriceData={quotePriceData}
                createQuote={createQuote}
                quoteData={quoteData}
                mini={true}
              />
            ) : (
              <>
                <div className="container">
                  <div className="row btn-group justify-content-center">
                    <div className="col-6 w-50">
                      <Form.Control
                        id="item_qty"
                        type="number"
                        min={saleunit}
                        className="form-control col-0"
                        value={qty}
                        onBlur={handleBlur}
                        onChange={(e) => setQty(e.target.value)}
                        step={saleunit}
                        disabled={price === 0 || isUniform}
                      />
                    </div>
                    <div className="col-6 w-50">
                      {stock && stock.length !== 1 ? (
                        <>
                          <DropdownButton
                            id="dropdown-item-button"
                            title={buttonText}
                            drop="up"
                            disabled={price === 0 || isUniform}
                          >
                            {stock && stock.length !== 1
                              ? stock.map((stk) => (
                                <Dropdown.Item
                                  className="dropdown_button"
                                  as="button"
                                  value={stk.attrs}
                                  onClick={handleProductChange}
                                >
                                  {stk.attrs}
                                </Dropdown.Item>
                              ))
                              : ""}
                          </DropdownButton>

                        </>
                      ) : (
                        <>
                          <Button
                            id="item_button"
                            className="CTL_btn"
                            value={stock[0].attrs}
                            onClick={handleProductChange}
                            disabled={price === 0 || isUniform}
                          >
                            {buttonText}
                          </Button>

                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={toggleModal}
        className="preview_product_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForListPreviewComponent
            product={product}
            getUser={getUser}
            addToCartReduxAction={addToCart}
            reduxDispatch={dispatch}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductForListComponent;
