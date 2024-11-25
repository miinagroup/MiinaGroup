import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiMineWagon } from "react-icons/gi";
import { TbNotes } from "react-icons/tb";
import {
  Nav,
  Badge,
  Form,
  Modal
} from "react-bootstrap";
import axios from "axios";

import { logout } from "../../../../redux/actions/userActions";
import { fetchCartItemsLogin } from "../../../../redux/actions/cartActions";
import {
  getWeathers,
} from "../../../../redux/actions/mineralActions";
import {
  addToCart,
  removeFromCart,
  editQuantity,
} from "../../../../redux/actions/cartActions";

import {
  saveTrackEvents,
} from "../../../../pages/trackEvents/useTrackEvents";
import CartDropDown from "../../../../pages/user/components/CartDropDown";
import UserQuoteSubmitPage from "../../../../pages/user/UserQuoteSubmitPage";

import ForecastChart from "../../../../components/ForecastChart";
import FetchAuthFromServer from "../../../../components/FetchAuthFromServer";
import HamburgerMenu from "../../../mobile/components/HeaderComponent/HamburgerMenu";

import styles from "./NewHeaderComponent.module.css";
import "../../../../components/page.css";

const NewHeaderComponentLoggedIn = ({ setIsOpenModal, goToAboutSection, goToPromotionSection, goToContactSection, showSidebar, toggleShowSidebar, onClickBtn }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const [userCart, setUserCart] = useState([]);
  const [useIsAdmin, setUseIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const [showModal, setShowModal] = useState(false);
  const mineralPrice = useSelector((state) => state.minerals.minerals);
  const [isShownQuoteBtn, setIsShownQuoteBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const email = userInfo.email;
    if (email.endsWith("@slrltd.com") ||
      email.endsWith("@silverlakeresources.com.au") ||
      email.endsWith("@red5limited.com.au") ||
      email.endsWith("@ctlservices.com.au") ||
      email.endsWith("@ctlaus.com") ||
      email.endsWith("@focusminerals.com.au") ||
      email.endsWith("@evolutionmining.com")) {
      setIsShownQuoteBtn(true)
    } else {
      setIsShownQuoteBtn(false)
    }
  }, [userInfo])

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-list?searchQuery=${searchQuery}`);
    }
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const reduxDispatch = useDispatch();

  const getCart = async () => {
    const { data } = await axios.get("/api/cart");
    return data;
  };

  useEffect(() => {
    reduxDispatch(fetchCartItemsLogin());
    reduxDispatch(getWeathers(userInfo?.location?.toUpperCase()));
    setUseIsAdmin(userInfo.isAdmin);
    getCart()
      .then((cart) => setUserCart(cart.data.cart))
      .catch((er) => console.log(er));
  }, [userInfo]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  let sortedMineralPrice = [];
  let updateDate;

  if (mineralPrice && Array.isArray(mineralPrice) && mineralPrice.length > 0) {
    sortedMineralPrice = [...mineralPrice].sort((a, b) => b.latestPrice - a.latestPrice);
    updateDate = sortedMineralPrice[0].updateDate;
  }

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

  const getdeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
    return data;
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
  const [deliveryBook, setDeliveryBook] = useState()

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
      if (userInfo.email) {
        getdeliveryBooks(userInfo.email).then((books) => {
          setDeliveryBook(books[0])
        })
      }
    }
  }, [userInfo]);

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

  return <div className={styles.headerNewWrapper}>
    <div className={`${styles.headerNew} ${styles.headerNewLoggedIn}`}>
      <div class={styles.headerNewLogo} >
        <a href="/" className={styles.logoContainer}>
          <img
            src="/images/CTL-hex.png"
            alt="CTL Australia Mining Supplier"
            className={`rotate linear infinite ${styles.hexagonlogo}`}
          ></img>
          <img
            src="/images/CTL_HEADING_3.png"
            alt="CTL Australia Mining Supplier"
            className={styles.hexagontext}
          ></img>
        </a>
      </div>
      {/* <div> */}
      <div className={styles.headerNewMenu}>
        <div className={`${styles.navMenu} ${styles.desktop} ${styles.tablet}`}>
          {location.pathname === "/" && <button onClick={goToAboutSection}>About</button>}
          <div className={location.pathname === "/" ? "" : styles.headerBtn}><button onClick={() => setIsOpenModal(true)}>Categories</button></div>
          {location.pathname === "/" && <button onClick={goToPromotionSection}>Promotion</button>}
          {location.pathname === "/" && <button onClick={goToContactSection}>Request</button>}
        </div>
        <div className={`${styles.navMenu} ${styles.tabletBtn}`}>
          <div className={styles.headerBtn}><button onClick={() => setIsOpenModal(true)}>Categories</button></div>
        </div>


        {/* </div> */}
        <div className={`${styles.headerNewBtns} ${styles.headerNewBtnsLoggedIn}`}>
          <div className={`${styles.searchFieldNew} ${styles.desktop}`}>
            <input
              placeholder="What are you looking for today?"
              className={styles.inputFeild}
              onKeyUp={submitHandler}
              onChange={(e) => setSearchQuery(e.target.value)} />
            <button className={styles.iconNew} onClick={submitHandler}><i class="bi bi-search fs-4"></i></button>
          </div>
          {isShownQuoteBtn && <button className={styles.btnQuote} onClick={toggleModal} >GET A QUOTE</button>}

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
          <Nav className={styles.user_cart}>
            {/* *********** Weathers *********** */}
            {userInfo?.wantWeather ? (
              <div className="weather_dropdown p-0 m-0">
                <div
                  className={`${styles.miningCart} miningCart`}
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
                <div className="users_initial_dropdown">
                  <div className={`Avtbox_admin ${styles.Avtbox}`}>
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
                          <a href="/product-list?categoryName=QUOTE" className="hd_c">
                            Quote
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
                <div className={`users_initial_dropdown ${styles.newHeaderLogInIcon}`}>
                  <div className={`Avtbox ${styles.Avtbox}`}>
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
                        {deliveryBook && deliveryBook.hasUniform === true ? (
                          <li>
                            <a href="/user/my-uniforms" className="hd_c">
                              Uniform
                            </a>
                          </li>
                        ) : ("")}
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
            <div>
              <div className={`miningCart ${styles.miningCart}`}>
                <a
                  className="hd_c"
                  href={
                    useIsAdmin === true
                      ? "/admin/quotes?tab=processingQuotes&pageNum=1"
                      : "/user/my-quotes?tab=completedQuotes&pageNum=1"
                  }
                >
                  <TbNotes
                    //   className="mt-1"
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
              <div className={`miningCart ${styles.miningCart}`}>
                <a
                  className="hd_c"
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
                    //   className="mt-1"
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
        </div>
      </div>

    </div>
    <div className={`${styles.searchFieldNew} ${styles.mobile} ${styles.searchFieldNewWrapper}`}>
      <div className={styles.searchFieldNewInputBlock}>
        <input
          placeholder="What are you looking for today?"
          className={styles.inputFeild}
          onKeyUp={submitHandler}
          onChange={(e) => setSearchQuery(e.target.value)} />
        <button className={styles.iconNew} onClick={submitHandler}><i class="bi bi-search fs-4"></i></button>
      </div>
      {location.pathname === "/" ? <HamburgerMenu toggleShowSidebar={toggleShowSidebar} showSidebar={showSidebar} /> : <div className={styles.headerBtn}><button onClick={() => setIsOpenModal(true)}>Categories</button></div>}
    </div>


    {showSidebar && <div className={styles.sidebarMobileMenu}>
      <div className={styles.sidebarMobileMenuWrapper}>
        <button onClick={goToAboutSection}>About</button>
        <button onClick={onClickBtn}>Categories</button>
        <button onClick={goToPromotionSection}>Promotion</button>
        <button onClick={goToContactSection}>Request</button>
      </div>
    </div>
    }
  </div>
}

export default NewHeaderComponentLoggedIn;
