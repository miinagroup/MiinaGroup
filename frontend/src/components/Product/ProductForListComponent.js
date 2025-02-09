import {Button,Form,Modal,Dropdown,DropdownButton} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ProductForListPreviewComponent from "./ProductForListPreviewComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import "../../pages/general.css";
import LoginRegisterPage from "../../pages/LoginRegisterPage";

const ProductForListComponent = ({
  productId,
  name,
  price,
  purchaseprice,
  images,
  saleunit,
  stock,
  reduxDispatch,
  categories,
  sortOrder,
  createQuote,
  mnasku,
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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isUserInfo, setIsUserInfo] = useState(Object.keys(userInfo).length === 0);
  const [modalType, setModalType] = useState("LoginForm")
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleClose = () => {
    setShowLoginModal(false);
  };
  const handleShow = (e, type) => {
    e.preventDefault();
    setShowLoginModal(true);
    setModalType(type);
  };

  useEffect(() => {
    if (product?.saleunit) {
      setQty(product?.saleunit);
    }
  }, [product]);


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
  }, [categories]);

  function handleProductChange(event) {
    const attrs = event.target.value;

    if (attrs !== "choose-product") {
      const stockItem = stock.find((item) => item.attrs === attrs);

      addToCartHandler(stockItem);
    } else {
      setSelectedStock(null);
    }
  }

  const addToCartHandler = async (selectedItem) => {
    setButtonText("Adding");
    try {
      await reduxDispatch(addToCart(productId, qty, selectedItem));
      setButtonText("Added");
      setTimeout(() => setButtonText("Add"), 1000);
      setQty(saleunit);

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

  const updateProductCategory = (e) => {
    const selectedCategory = e.target.value;
    if (window.confirm("Update Product?")) {
      try {
        axios.put(`/api/products/admin/updateCategory/${productId}`, {
          selectedCategory,
        });
        window.location.reload(true);
      } catch (err) {
        window.show("Error handling this process");
      }
    }
  };

  const getUser = async () => {
    if (userInfo && userInfo._id) {
      const { data } = await axios.get(`/api/users/profile/${userInfo._id}`);
      return data;
    }
    return null;
  };

  const formattedPrice = price?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleBlur = (e) => {
    const newValue = Math.round(e.target.value / saleunit) * saleunit;
    setQty(newValue);
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        if (data) {
          setUserNameEmail({
            email: data.email,
            name: data.name,
          });
        } else {
          console.log("getUser returned null or undefined.");
        }
      })
      .catch((err) => console.log("Error fetching user:", err));
  }, []);

  const [quotePriceData, setQuotePriceData] = useState({});
  useEffect(() => {
    if (price === 0) {
      setQuoteData({
        existingProduct: true,
        product: productId,
        mnasku: mnasku,
        status: "Received",
      });
      setQuotePriceData({
        ...userNameEmail,
        productName: name,
        productId: productId,
      });
    }
  }, [productId, price, mnasku, userNameEmail, name]);

  const [checkImageAvailable, setCheckImageAvailable] = useState(false)
  useEffect(() => {
    const extensions = [".jpg", ".png", ".webp", ".bmp", ".jpeg"]
    setCheckImageAvailable(extensions.some(el => images[0].path.toUpperCase().includes(el.toUpperCase())))
  })
  return (
    <>
      <div className="product-block card mt-0 mb-3 mx-2">
        <div
          className="bg-image hover-zoom ripple"
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
              <div className="Preview_Update_Div">
                <select
                  className="Preview_Update_Button"
                  onChange={updateProductCategory}
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
          ) : (
            ""
          )}
        </div>

        <a href={`/product-details/${productId}`} className="w-100">
          <div className="card-body">
            <h6 className="card-title mb-3 text-uppercase">{name}</h6>
            {!isUserInfo && <h6 className="card-price mb-0 mt-3 d-flex justify-content-center">
              {price === 0 ? (
                <span
                  id={name.replace(/\s/g, "") + "_PRICE"}
                >
                  Price: N/A
                </span>
              ) : (
                <span className="" id={name.replace(/\s/g, "") + "_PRICE"}>
                  Price: ${formattedPrice}
                </span>
              )}
            </h6>}
            {isUserInfo && <div className="btnLogin btnLoginText">
              <div className="btnsLoginRegistration">
                <button onClick={(e) => handleShow(e, "LoginForm")} className="loginBtn">LogIn</button>
              </div>
            </div>}
          </div>
        </a>

        {!isUserInfo &&
            <div className="product-for-list-component">
                <div className="">
                  <Form.Control
                    id="item_qty"
                    type="number"
                    min={saleunit}
                    className="product-for-list-component-input"
                    value={qty}
                    onBlur={handleBlur}
                    onChange={(e) => setQty(e.target.value)}
                    step={saleunit}
                    disabled={price === 0}
                  />
                </div>
                  {stock && stock.length !== 1 ? (
                      <DropdownButton
                        id="dropdown-item-button"
                        title={buttonText}
                        drop="up"
                        disabled={price === 0}
                         className="dropdown-item-button"
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
                  ) : (
                      <Button
                        id="item_button"
                        className="CTL_btn item_button"
                        value={stock[0].attrs}
                        onClick={handleProductChange}
                        disabled={price === 0}
                      >
                        {buttonText}
                      </Button>
                  )}
            </div>
        }
      </div>
      <Modal
        show={showModal}
        onHide={toggleModal}
        className="preview_product_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%", color: "#521712", fontFamily: "HelveticaNeue" }}>
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
      <Modal show={showLoginModal} onHide={handleClose} className="login_preview_items">
      <LoginRegisterPage modalType={modalType} />
      </Modal>
    </>
  );
};

export default ProductForListComponent;
