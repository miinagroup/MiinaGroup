import { Row, Col, ListGroup, Form, Button, Tooltip, OverlayTrigger, } from "react-bootstrap";
// import RemoveFromCartComponent from "./RemoveFromCartComponent";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import React from "react";

const UniformItemComponent = ({
  uniform,
  orderCreated = false,
  cartCount,
  addToCartReduxAction,
  reduxDispatch,
  selectedUserCart,
  updateUniformCart,
  sendDataToParent,
  // changeCount = false,
  // removeFromCartHandler = false,
}) => {
  const [selectedUniform, setSelectedUniform] = useState(null);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [displaySizes, setDisplaySizes] = useState([])
  const [displayColors, setDisplayColors] = useState([])
  const [selectedSize, setSelectedSize] = useState("Please-Select");
  const [selectedColor, setSelectedColor] = useState("Please-Select");
  const [purchaseCount, setPurchaseCount] = useState()
  const [purchaseLimit, setPurchaseLimit] = useState()
  const [qty, setQty] = useState(0)
  const [buttonText, setButtonText] = useState("Add To Cart");
  const [id, setId] = useState()
  const [tempUserPurchasedCount, setTempUserPurchasedCount] = useState()
  const [updatedUserPurchase, setUpdatedUserPurchase] = useState(null)
  const [userCartCount, setUserCartCount] = useState()
  const [error, setError] = useState(false);
  const reload = () => window.location.reload();
  //check for uniform content in cart
  const [isProduct, setIsProduct] = useState(false)
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const [addedToCart, setAddedToCart] = useState(false)


  useEffect(() => {
    cartItems?.map((items) => {
      if (!items.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) {
        setIsProduct(true)
      }
    })
  }, [cartItems])


  useEffect(() => {
    setSizesAndColors()
  }, [])

  useEffect(() => {
    if (selectedUserCart) {
      let category = uniform?.category?.split("/")[1]
      selectedUserCart?.stock?.map((item) => {
        if (item.itemName === category) {
          //setUserCartCount(item.cartCount)
          setUserCartCount(cartCount)
          setPurchaseCount(item.purchaseCount)
          setPurchaseLimit(item.purchaseLimit)
        }
      })
    }
  }, [selectedUserCart, cartCount]);

  const setSizesAndColors = () => {
    uniform.stock?.map((data) => {
      if (data !== null) {
        displaySizes.push(data?.size)
        displayColors.push(data?.color)
      }
      setId(uniform._id)
    })
    setDisplayColors(Array.from(new Set(displayColors)))
    setDisplaySizes(Array.from(new Set(displaySizes)))
  };
  useEffect(() => {
    displayColors.length = 0
    displaySizes.lenght = 0
    uniform.stock?.map((data) => {
      if (data !== null) {
        displaySizes.push(data?.size)
        displayColors.push(data?.color)
      }

    })
    setDisplayColors(Array.from(new Set(displayColors)))
    setDisplaySizes(Array.from(new Set(displaySizes)))
  }, [])

  const handleSizeChange = (event) => {
    const size = event.target.value;
    // setAddedToCart(false)
    if (size !== "Please-Select") {
      const selectedColors = []
      uniform.stock?.map((item) => {
        if (item !== null && item.size === size) {
          selectedColors.push(item.color)
        }
      })
      setDisplayColors(Array.from(new Set(selectedColors)))
    } else {
      setSizesAndColors()
    }
    if (size !== "Please-Select" && selectedColor !== "Please-Select") {
      let stockItem = uniform.stock.find((item) => item.size === size && item.color === selectedColor);
      let category = uniform?.category?.split("/")[1]
      stockItem = Object.assign({}, stockItem, { category: category })
      setSelectedSize(size)
      if (stockItem) {
        setSelectedStock(stockItem)
        setSelectedUniform(stockItem.attrs)
      }

    } else {
      setSelectedStock(null);
      setSelectedUniform(null)
      setSelectedSize(size)
    }
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    // setAddedToCart(false)
    if (color !== "Please-Select") {
      const selectedSizes = []
      uniform.stock?.map((item) => {
        if (item !== null && item.color === color) {
          selectedSizes.push(item.size)
        }
      })
      setDisplaySizes(Array.from(new Set(selectedSizes)))
    } else {
      setSizesAndColors()
    }
    if (color !== "Please-Select" && selectedSize !== "Please-Select") {
      let stockItem = uniform.stock.find((item) => item.color === color && item.size === selectedSize);
      let category = uniform?.category?.split("/")[1]
      stockItem = Object.assign({}, stockItem, { category: category })
      setSelectedColor(color)
      if (stockItem) {
        setSelectedStock(stockItem)
        setSelectedUniform(stockItem.attrs)
      }
    } else {
      setSelectedStock(null);
      setSelectedUniform(null)
      setSelectedColor(color)
    }
  };

  const handleBlur = (e) => {
    const newValue =
      Math.round(e.target.value / uniform.saleUnit) * uniform.saleUnit;
    if (newValue > (purchaseLimit - purchaseCount)) {
      window.alert("Your Purchase Limit Is : " + (purchaseLimit - purchaseCount))
      setQty((purchaseLimit - purchaseCount))
    } else {
      setQty(newValue);
    }

  };

  const updatePurchase = async () => {
    let category = uniform?.category?.split("/")[1]
    selectedUserCart?.stock?.map((item) => {
      if (item.itemName === category) {
        setTempUserPurchasedCount(userCartCount + qty)
        setUpdatedUserPurchase((current) =>
        ({
          ...current,
          _id: item._id,
          itemName: item.itemName,
          cartCount: (userCartCount + qty),
          purchaseCount: item.purchaseCount,
          purchaseLimit: item.purchaseLimit,
          cartProducts: [{ ...selectedStock, quantity: qty }],
        }))
      }
    })
  };

  const addToCartHandler = async () => {
    setButtonText("Adding...");
    try {
      updatePurchase()
      sendDataToParent(userCartCount + qty, uniform?.category?.split("/")[1])
      const uniformUserId = selectedUserCart.userId
      const uniformUserName = selectedUserCart.userName
      await reduxDispatch(addToCartReduxAction(id, qty, uniformUserId, uniformUserName, selectedStock));
      setShowCartMessage(true);
      setButtonText("Added!");
      setTimeout(() => setButtonText("Add To Cart"), 1000);
      // setAddedToCart(true)
    } catch (error) {
      // handle error case
      setButtonText("Add To Cart");
    }
  };

  useEffect(() => {
    if (updatedUserPurchase !== null) {
      const id = selectedUserCart._id
      updateUniformCart(id, updatedUserPurchase)
        .then((data) => {
          if (data.message === "UniformCart updated") {
            setUserCartCount(tempUserPurchasedCount)
            setQty(0)
            setSelectedSize("Please-Select")
            setSelectedColor("Please-Select")
            setSelectedUniform(null)
          }
        })
        .catch((err) => setError(
          err.response.data.message ? err.response.data.message : err.response.data
        ));
    }

  }, [updatedUserPurchase])

  return (
    <>
      <ListGroup>
        <ListGroup.Item className="mt-1">
          <Row>
            <Col md={1}>
              <div className="">
                {/* Image */}
                <img
                  crossOrigin="anonymous"
                  src={uniform.images ? uniform.images[0].path ?? null : null}
                  className="w-100 img_hovf"
                  alt="s"
                />
                {/* Image */}
              </div>
            </Col>
            <Col md={4}>
              {
                <>
                  {/* <a href={`/uniform-details/${uniform._id}`}> */}
                  <p className="" style={{ color: "#1E4881" }}>
                    <strong className="text-uppercase">{uniform?.name}</strong>
                  </p>
                  {/* </a> */}
                </>
              }

            </Col>
            <Col md={4}>
              {
                <>
                  {/* <Row className="ms-3 mb-2 mt-3"> */}
                  <div style={{ display: "flex" }}>
                    <div>
                      <div
                        hidden={selectedSize !== "Please-Select"}
                        className="mt-0 me-2"
                        style={{ width: "100%", float: "left" }}
                      >
                        <label htmlFor="size" className="me-4">
                          Size:
                        </label>
                        <select
                          id="product-select"
                          value={selectedSize}
                          onChange={handleSizeChange}
                        >
                          {uniform?.stock &&
                            (uniform?.stock.length === 1 ? (
                              <option value={uniform?.stock[0].size}>
                                {uniform?.stock[0].size}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {displaySizes?.map((size, idx) => (
                                  <option
                                    key={"productMap1" + size + idx}
                                    value={size}
                                  >
                                    {size}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>
                      <div className="mt-0 me-2"
                        style={{ width: "100%", float: "left" }}
                        hidden={selectedSize === "Please-Select"} >

                        <label htmlFor="size" className="me-4">
                          Size:
                        </label>
                        <select
                          id="product-select"
                          value={selectedSize}
                          onChange={handleSizeChange}
                        >
                          {uniform?.stock &&
                            (uniform?.stock.length === 1 ? (
                              <option value={uniform?.stock[0].size}>
                                {uniform?.stock[0].size}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {displaySizes?.map((size, idx) => (
                                  <option
                                    key={"productMap2" + size + idx}
                                    value={size}
                                  >
                                    {size}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <div
                        hidden={selectedColor !== "Please-Select"}
                        className="mt-0 me-2"
                        style={{ float: "left" }}
                      >
                        <label htmlFor="color" className="me-3">
                          Color:
                        </label>
                        <select
                          id="product-select"
                          value={selectedColor}
                          onChange={handleColorChange}
                        >
                          {uniform?.stock &&
                            (uniform?.stock.length === 1 ? (
                              <option value={uniform?.stock[0].color}>
                                {uniform?.stock[0].color}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {displayColors?.map((color, idx) => (
                                  <option
                                    key={"productMap1" + color + idx}
                                    value={color}
                                  >
                                    {color}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>
                      <div className="mt-0 me-2"
                        style={{ float: "left" }}
                        hidden={selectedColor === "Please-Select"}>

                        <label htmlFor="color" className="me-3">
                          Color:
                        </label>
                        <select
                          id="product-select"
                          value={selectedColor}
                          onChange={handleColorChange}
                        >
                          {uniform?.stock &&
                            (uniform?.stock.length === 1 ? (
                              <option value={uniform?.stock[0].color}>
                                {uniform?.stock[0].color}
                              </option>
                            ) : (
                              <>
                                <option value="Please-Select">
                                  <b>Please Select</b>
                                </option>
                                {displayColors?.map((color, idx) => (
                                  <option
                                    key={"productMap2" + color + idx}
                                    value={color}
                                  >
                                    {color}
                                  </option>
                                ))}
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>


                  {/* </Row>
                  <Row className="ms-3 mb-3">
                    
                  </Row> */}
                  {/* <p className="m-0">
                    Uniform:{" "}
                    <span className="fw-bold">{uniform.stock[0].size}</span>
                  </p>
                  <p className="m-0">
                    Variant:{" "}
                    <span className="fw-bold">{uniform.stock[0].color}</span>
                  </p> */}
                </>
              }
              {/*  */}
            </Col>
            <Col md={1}>
              <Form.Control
                type="number"
                min={0}
                max={purchaseLimit - (purchaseCount + userCartCount)}
                step={uniform.saleUnit}
                onBlur={handleBlur}
                className="form-control mt-2"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                disabled={selectedUniform === null}
              />
            </Col>
            <Col md={2}>
              <Button
                onClick={() => addToCartHandler()}
                className="CTL_btn btn-ripple mt-2"
                disabled={
                  selectedUniform === null ||
                  buttonText !== "Add To Cart" ||
                  isProduct ||
                  qty === 0
                }
              >
                {buttonText}
              </Button>&nbsp;
              {isProduct ? (
                <OverlayTrigger
                  delay={{ hide: 450, show: 200 }}
                  overlay={(props) => (
                    <Tooltip {...props} >
                      To Enable Add To Cart Button, Please Complete Your Products Order <br />( OR )<br /> Empty Your Cart
                    </Tooltip>
                  )}
                  placement="bottom"
                ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ color: "orange" }}></i>
                </OverlayTrigger>
              ) : ("")}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default UniformItemComponent;
