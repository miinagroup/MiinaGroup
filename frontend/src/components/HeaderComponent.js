import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { logout } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import "./page.css";

import { LinkContainer } from "react-router-bootstrap";
import { GiMineWagon } from "react-icons/gi";
import { TbNotes } from "react-icons/tb";

import {
  addToCart,
  removeFromCart,
  editQuantity,
} from "../redux/actions/cartActions";
import axios from "axios";
import { fetchCartItemsLogin } from "../redux/actions/cartActions";
import {
  getMineralPrices,
  getStockPrices,
  getWeathers,
} from "../redux/actions/mineralActions";
import { getCategories } from "../redux/actions/categoryActions";
import QuoteComponentHeader from "./SendEmail/QuoteComponentHeader";
import CartDropDown from "../pages/user/components/CartDropDown";
import ForecastChart from "./ForecastChart";
import ForecastWeathers from "./ForecastWeathers";
import QuoteSubmitComponent from "../pages/user/components/QuoteSubmitComponent";
import UserQuoteSubmitPage from "../pages/user/UserQuoteSubmitPage";
import {
  useTrackEvents,
  clearTrackEvents,
  saveTrackEvents,
} from "../pages/trackEvents/useTrackEvents";
import HeaderComponentForVisitors from "../pages/user/components/HomePageForVisitors/HeaderComponentForVisitors";
import FetchAuthFromServer from "./FetchAuthFromServer";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  // const weathers = useSelector((state) => state.weathers[0]);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const [productItem, setProductItem] = useState(null);
  // console.log("userInfouserInfo",userInfo);
  // const { categories } = useSelector((state) => state.getCategories);

  // const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-list?searchQuery=${searchQuery}`);
    }
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const reduxDispatch = useDispatch();

  //console.log("cartItems", cartItems);
  /* 获取用户购物车信息 */
  const getCart = async () => {
    const { data } = await axios.get("/api/cart");
    return data;
  };

  // const getUniformRole = async () => {
  //   const { data } = await axios.get("/api/uniformRoles");
  //   return data;
  // };
  // const [userUniformRole, setUserUniformRole] = useState({})
  // useEffect(() => {
  //   getUniformRole().then((data) => {
  //     // console.log("data", data);
  //     // console.log("userInfo", userInfo);
  //     data.map((role) => {
  //       if (role.role === userInfo.role) {
  //         setUserUniformRole(role)
  //       }
  //     })
  //   })
  // }, [])

  const [userCart, setUserCart] = useState([]);
  const [useIsAdmin, setUseIsAdmin] = useState(false);

  useEffect(() => {
    reduxDispatch(getMineralPrices());
    reduxDispatch(getCategories());
    reduxDispatch(getStockPrices());
    reduxDispatch(fetchCartItemsLogin());
    reduxDispatch(getWeathers(userInfo?.location?.toUpperCase()));
    setUseIsAdmin(userInfo.isAdmin);
    getCart()
      .then((cart) => setUserCart(cart.data.cart))
      .catch((er) => console.log(er));
  }, [userInfo]);

  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  /* ********* Weather ******** */
  const [forecastData, setForecastData] = useState([]);
  const [iconPath, setIconPath] = useState();

  const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    const storedWeathers = localStorage.getItem("weathers");
    if (storedWeathers) {
      setWeathers(JSON.parse(storedWeathers));
    }
  }, [userCart]);

  useEffect(() => {
    if (weathers) {
      setForecastData(weathers[0]?.forecast);
      setIconPath(weathers[0]?.forecast[0].condition[0].icon);
    }
  }, [weathers]);

  // console.log("weathers", weathers);
  // console.log("iconPath", iconPath);
  // console.log("user cart", userCart);

  const [highestTem, setHighestTem] = useState(50);
  const [lowestTem, setLowestTem] = useState(0);

  useEffect(() => {
    if (forecastData) {
      const maxTemps = forecastData.map((item) => item.maxtemp_c);
      setHighestTem(Math.max(...maxTemps));
      const minTemps = forecastData.map((temp) => temp.mintemp_c);
      setLowestTem(Math.min(...minTemps));
    }
  }, [forecastData]);

  const [wantWeather, setWantWeather] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.wantWeather !== undefined) {
      setWantWeather(userInfo.wantWeather);
    }
  }, [userInfo]);

  const handleToggle = async (event) => {
    const newWantWeather = event.target.checked;
    setWantWeather(newWantWeather);

    try {
      const response = await axios.put("/api/users/wantWeather", {
        wantWeather: newWantWeather,
      });

      if (response.data.success === "wantWeather updated") {
        userInfo.wantWeather = newWantWeather;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.location.reload();
      } else {
        console.error("Unexpected response from the backend:", response.data);
      }
    } catch (error) {
      setWantWeather(!newWantWeather);
      console.error("Error updating weather preference:", error);
    }
  };

  /* ********* User Logout ******** */
  const logOutUser = () => {
    saveTrackEvents();
    dispatch(logout());
  };

  /* ********* User Quotes ******** */
  const adminGetQuotes = async () => {
    const { data } = await axios.get("/api/quotes/admin");
    return data;
  };

  const userGetQuotes = async () => {
    const { data } = await axios.get("/api/quotes/user/");
    return data;
  };

  const startOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const [adminProcessingQuotes, setAdminProcessingQuotes] = useState([]);
  const [userCompletedQuotes, setUserCompletedQuotes] = useState([]);

  useEffect(() => {
    if (userInfo.isAdmin) {
      adminGetQuotes().then((quotes) => {
        setAdminProcessingQuotes(
          quotes.filter((quote) => quote.status !== "Completed")
        );
      });
    } else if (!userInfo.isAdmin) {
      userGetQuotes().then((quotes) => {
        const currentDateTime = startOfDay(new Date());

        const filteredQuotes = quotes.filter(
          (quote) =>
            quote.expireDate &&
            startOfDay(new Date(quote.expireDate)) >= currentDateTime
        );

        setUserCompletedQuotes(
          filteredQuotes.filter(
            (quote) => quote.status === "Completed" && !("accepted" in quote)
          )
        );
      });
    }
  }, [userInfo]);

  // console.log("adminProcessingQuotes", adminProcessingQuotes);
  // console.log("userCompletedQuotes", userCompletedQuotes);

  const isAuth = FetchAuthFromServer();

  const adminLinks = [
    {
      title: "Orders",
      link: "/admin/orders",
      access: "isSuperAdmin, accounts, isSales",
    },
    {
      title: "Invoices",
      link: "/admin/invoices",
      access: "isSuperAdmin, accounts",
    },
  ];

  const hasAccess = (access) => {
    if (access === "all") return true;
    const roles = access.split(",");
    return roles.some((role) => isAuth[role.trim()]);
  };

  /* ****** UPDATE_ITEM_FROM_UNIFORM PURCHASE ****** */
  const userId = userInfo._id
  const updateUniformCart = async (id, purchaseData) => {
    const { data } = await axios.put(`/api/uniformCarts/updateOnCartItemDelete/${id}`, { purchaseData });
    return data;
  };
  const updateUniformCartOnEmptyCart = async (id, purchaseData) => {
    const { data } = await axios.put(`/api/uniformCarts/updateOnEmptyCart/${id}`, { purchaseData });
    return data;
  };

  // const handleUpdateUniformCart = async (id, qty, price, item) => {
  //   setProductItem(item);
  //   console.log("item", item);
  // }

  // useEffect(() => {
  //   if (productItem !== null) {
  //     updateUniformCart().then((data) => {
  //       console.log("UniformCart", data);
  //     })
  //   }
  // }, [productItem])

  return (
    <>
      {/* ************   Login/register, will move down to replace carts  ***************  */}
      {userInfo && Object.keys(userInfo).length > 0 ? (
        <Navbar className="hd_bgc w-100" expand="lg">
          <Container className="header_con" fluid>
            {/* ************   LOGO  ***************  */}
            <LinkContainer to="/home">
              <Nav.Link className="hd_c logo_con w-25" href="/home">
                <img
                  id="home_logo"
                  src="/images/CTL-hex.png"
                  alt=""
                  className="rotate linear infinite"
                ></img>
                <img
                  id="home_name"
                  src="/images/CTL_HEADING_3.png"
                  alt=""
                  className="hexagontext"
                ></img>
              </Nav.Link>
            </LinkContainer>

            {/* ************   Search Bar  ***************  */}
            <Nav className="me-auto input_search">
              <InputGroup className="mb-3 ">
                <Form.Control
                  id="search_input"
                  onKeyUp={submitHandler}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter description, product code or brand"
                  aria-label="search bar"
                  aria-describedby="basic-addon2"
                  bg="white"
                  className="mt-3"
                />
                <Button
                  /* variant="outline-secondary" */
                  id="search_button"
                  className="mt-3 CTL_btn"
                  onClick={submitHandler}
                >
                  <i className="search-icon bi bi-search "></i>
                </Button>
              </InputGroup>
              <img
                id="rfq_button"
                src="https://ctladmin.b-cdn.net/CTL%20Brand%20Images/red-search.png"
                alt=""
                className="red_search_img"
                style={{ cursor: "pointer" }}
                onClick={toggleModal}
              ></img>
            </Nav>

            <Modal
              show={showModal}
              onHide={toggleModal}
              className="quote_product_modal"
            >
              <Modal.Header className="m-0 p-2" closeButton>
                <Modal.Title
                  style={{ textAlign: "center", width: "100%" }}
                  className="m-0 p-0"
                >
                  REQUEST FOR QUOTE
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <UserQuoteSubmitPage userInfo={userInfo} />
              </Modal.Body>
            </Modal>

            {/* ************   User and Carts  ***************  */}
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav"> */}
            {/* 折叠区间 */}

            <Nav className="user_cart">
              {/* *********** Weathers *********** */}
              {userInfo?.wantWeather ? (
                <div className="weather_dropdown p-0 m-0">
                  <div
                    className="miningCart"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={iconPath}
                      alt=""
                      className="p-0 m-0"
                      style={{ width: "65%" }}
                    />
                  </div>
                  <div className="weather_dropdown_box">
                    <div
                      style={{ display: "flex", flexDirection: "row" }}
                      className="ps-2"
                    >
                      {forecastData &&
                        forecastData.map((item, index) => (
                          <div key={index} style={{ flex: 1 }}>
                            <ForecastChart
                              maxTemp={item.maxtemp_c}
                              minTemp={item.mintemp_c}
                              date={item.date}
                              icon={item.condition[0].icon}
                              highestTem={highestTem}
                              lowestTem={lowestTem}
                              isAdmin={userInfo.isAdmin}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* *********** User Icon *********** */}
              {userInfo.isAdmin ? (
                <>
                  <div className="users_initial_dropdown mt-2">
                    <div className="Avtbox_admin">
                      <a href="/admin/orders" className="Avtbox_users_initial">
                        {`${userInfo.name?.charAt(
                          0
                        )}${userInfo.lastName?.charAt(0)}`}
                      </a>
                    </div>
                    <div className="users_dropdown">
                      <div className="users_row">
                        <div className="users_column">
                          {adminLinks.map((link) => {
                            if (hasAccess(link.access)) {
                              return (
                                <li key={link.title} to={link.link}>
                                  <a href={link.link} className="hd_c">
                                    {link.title}
                                  </a>
                                </li>
                              );
                            }
                          })}
                          <li>
                            <a href="/admin/products" className="hd_c">
                              Products
                            </a>
                          </li>
                          <li>
                            <a href="/admin/users" className="hd_c">
                              Users
                            </a>
                          </li>
                          <li style={{ display: "flex", alignItems: "center" }}>
                            <span
                              className="hd_c"
                              style={{ marginRight: "10px" }}
                            >
                              Weather
                            </span>
                            <Form inline>
                              <Form.Check
                                type="switch"
                                id="weatherSwitch"
                                checked={wantWeather}
                                onChange={handleToggle}
                              />
                            </Form>
                          </li>
                          <li
                            className="hd_c"
                            onClick={() => dispatch(logout())}
                            //onClick={() => logOutUser()}
                            style={{ cursor: "pointer" }}
                          >
                            Log out
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="users_initial_dropdown mt-2">
                    <div className="Avtbox">
                      <a
                        href="/user/my-orders"
                        className="Avtbox_users_initial"
                      >
                        {`${userInfo.name?.charAt(
                          0
                        )}${userInfo.lastName?.charAt(0)}`}
                      </a>
                    </div>
                    <div className="users_dropdown">
                      <div className="users_row">
                        <div className="users_column">
                          <li>
                            <a href="/user" className="hd_c">
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a href="/user/my-orders" className="hd_c">
                              Orders
                            </a>
                          </li>
                          {/* {
                            userInfo.isUniformManager ? (
                              <>
                                <li>
                                  <a href="/user/my-uniforms" className="hd_c">
                                    Uniform
                                  </a>
                                </li>
                              </>
                            ) : ("")
                          } */}
                          <li>
                            <a href="/user/my-uniforms" className="hd_c">
                              Uniform
                            </a>
                          </li>
                          <li style={{ display: "flex", alignItems: "center" }}>
                            <span
                              className="hd_c"
                              style={{ marginRight: "10px" }}
                            >
                              Weather
                            </span>
                            <Form inline>
                              <Form.Check
                                type="switch"
                                id="weatherSwitch"
                                checked={wantWeather}
                                onChange={handleToggle}
                              />
                            </Form>
                          </li>

                          <li
                            className="hd_c"
                            //onClick={() => dispatch(logout())}
                            onClick={() => logOutUser()}
                            style={{ cursor: "pointer" }}
                          >
                            Log out
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* *********** Quote *********** */}
              <div className="quote_dropdown">
                <div className="miningCart">
                  <a
                    className="hd_c mining_cart"
                    href={
                      useIsAdmin === true
                        ? "/admin/quotes?tab=processingQuotes&pageNum=1"
                        : "/user/my-quotes?tab=completedQuotes&pageNum=1"
                    }
                  >
                    <TbNotes
                      className="mt-1"
                      style={{ fontSize: "2rem", color: "#1e4881" }}
                    />
                    <Badge
                      className="badge_quote pill bg-danger"
                      pill
                      bg="danger"
                    >
                      {useIsAdmin
                        ? adminProcessingQuotes?.length
                        : userCompletedQuotes.length === 0
                          ? ""
                          : userCompletedQuotes?.length}
                    </Badge>
                  </a>
                </div>
              </div>

              {/* *********** Cart and Dropdown *********** */}
              <div className="cart_dropdown">
                <div className="miningCart">
                  <a
                    className="hd_c mining_cart"
                    href={
                      itemsCount === 0
                        ? ""
                        : useIsAdmin === true
                          ? "/admin/cart-details"
                          : "/user/cart-details"
                    }
                  >
                    {/* GiGoldMine, GiMineWagon */}
                    <GiMineWagon
                      className="mt-1"
                      style={{ fontSize: "2rem" }}
                    />
                    <Badge
                      className="badge_quote pill bg-danger"
                      pill
                      bg="danger"
                    >
                      {itemsCount === 0 ? "" : cartItems?.length}
                    </Badge>
                  </a>
                </div>
                {itemsCount === 0 ? null : (
                  <div className="cart_dropdown_box">
                    <CartDropDown
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      updateUniformCart={updateUniformCart}
                      updateUniformCartOnEmptyCart={updateUniformCartOnEmptyCart}
                      editQuantity={editQuantity}
                      cartItems={cartItems}
                      cartSubtotal={cartSubtotal}
                      reduxDispatch={reduxDispatch}
                      useIsAdmin={useIsAdmin}
                    // userUniformRole={userUniformRole}
                    />
                  </div>
                )}
              </div>
            </Nav>

            {/* </Navbar.Collapse> */}
          </Container>
        </Navbar>
      ) : (
        <HeaderComponentForVisitors />
      )}
    </>
  );
};

export default HeaderComponent;
