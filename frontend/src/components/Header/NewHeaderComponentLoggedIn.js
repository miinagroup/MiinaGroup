import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Badge, } from "react-bootstrap";
import axios from "axios";
import { logout } from "../../redux/actions/userActions";
import { fetchCartItemsLogin } from "../../redux/actions/cartActions";
import {
  addToCart,
  removeFromCart,
  editQuantity,
} from "../../redux/actions/cartActions";
import CartDropDown from "../../pages/user/components/CartDropDown";
import FetchAuthFromServer from "../FetchAuthFromServer";
// import HamburgerMenu from "../../pages/mobile/components/HeaderComponent/HamburgerMenu";
import styles from "./Header.module.css";

const mainCategories = [
  {
    label: "PPE",
    link: "PPE",
    image: "/images/categoriesIcons/PPE.png",
    disabled: false
  },
  {
    label: "SITE SAFETY",
    link: "SITE-SAFETY",
    image: "/images/categoriesIcons/SITE_SAFETY.png",
    disabled: false

  },
  {
    label: "MERCHANDISING",
    link: "MERCHANDISING",
    image: "/images/categoriesIcons/POWER.png",
    disabled: false

  },
  {
    label: "TRAVEL",
    link: "TRAVEL",
    image: "/images/categoriesIcons/HAND_TOOLS.png",
    disabled: false
  }
];

const NewHeaderComponentLoggedIn = ({ setIsOpenModal, goToAboutSection, goToTeamSection, goToContactSection, showSidebar, toggleShowSidebar, onClickBtn }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const [userCart, setUserCart] = useState([]);
  const [useIsAdmin, setUseIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const navigate = useNavigate();
  const subcategories = useSelector((state) => state.getCategories.subcategories);

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
    setUseIsAdmin(userInfo.isAdmin);
    getCart()
      .then((cart) => setUserCart(cart.data.cart))
      .catch((er) => console.log(er));
  }, [userInfo]);


  /* ********* User Logout ******** */
  const logOutUser = () => {
    dispatch(logout());
  };

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

  return <div className={styles.header}>
    <div className={styles.headerWrapper}>
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <span className={styles.catalogueMenuItem}>CATALOGUE</span>
          <div className={styles.catalogueDropdown}>
            {mainCategories.map((category) => {
              const hasSubcategories = subcategories[category.link]?.length > 0;
              return (
                <div className={styles.category} key={category.link}>
                  <a href={`/product-list?categoryPath=${category.link}`} className={styles.categoryPath}>
                    <img src="/images/SubmarkGreen.png" alt="Miina Group Logo" className={styles.logoTag} />
                    <div>{category.label}</div>
                  </a>
                  {hasSubcategories && (
                    <>
                      <div className={styles.arrow}>
                        <svg width="27" height="16" viewBox="0 0 27 16" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M0.991804 7.20499C0.439537 7.20952 -0.00449316 7.66089 3.3617e-05 8.21315C0.00456039 8.76542 0.45593 9.20945 1.0082 9.20492L0.991804 7.20499ZM26.712 8.70133C27.0993 8.30762 27.0942 7.67448 26.7004 7.28717L20.2845 0.975581C19.8908 0.588271 19.2577 0.59346 18.8704 0.987172C18.4831 1.38088 18.4883 2.01403 18.882 2.40134L24.585 8.01164L18.9747 13.7147C18.5874 14.1084 18.5926 14.7415 18.9863 15.1288C19.38 15.5161 20.0131 15.511 20.4005 15.1172L26.712 8.70133ZM1.0082 9.20492L26.0074 9.00001L25.991 7.00008L0.991804 7.20499L1.0082 9.20492Z" />
                        </svg>
                      </div>
                        <div className={styles.subcategories}>
                          {subcategories[category.link]?.sort().map((subcategory, index) => (
                            <a
                              href={`/product-list?categoryPath=${category.link}/${subcategory}`}
                              key={index}
                              className={styles.subcategoryItem}
                            >
                              {/* <img src="/images/SubmarkPurple.png" alt="Miina Group Logo" className={styles.logoTag} /> */}
                              {/* <div className={styles.logoTag}>
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 637.2 528.26">
                                            <path fill="currentColor" d="M221.88,488.64c-.35-.26-.69-.56-1.06-.77-15.37-8.86-31.47-16.01-48.73-20.31-13.36-3.33-26.98-4.19-40.71-3.34-11.34.71-22.61,2.01-33.85,3.61-2.29.33-4.56.82-6.84,1.22-2.14.38-3.5-.1-3.93-1.35-.41-1.17.39-2.88,2.19-3.56,2.68-1.01,5.45-1.89,8.26-2.38,15.92-2.78,31.92-4.93,48.15-4.54,10.19.25,20.22,1.63,30.11,4.06.39.1.77.2,1.16.27.14.02.3-.05.75-.14-.72-.33-1.21-.6-1.74-.78-14.45-5-29.22-8.84-44.35-11.04-15.49-2.25-31.04-4.12-46.57-6.12-3.17-.41-6.36-.65-9.54-.99-.71-.08-1.42-.22-2.11-.4-.91-.23-1.81-.77-1.68-1.74.11-.75.7-1.71,1.35-2.05.94-.49,2.14-.71,3.22-.68,4.07.12,8.15.28,12.21.61,6.29.51,12.57,1.16,18.85,1.75,21.51,2.03,42.84,5.04,63.56,11.5,21.34,6.65,41.11,16.31,58.77,30.11,2.95,2.3,5.78,4.75,8.87,6.97-.7-.81-1.39-1.62-2.1-2.42-22.6-25.63-49.54-45.38-80.58-59.6-13.65-6.25-27.33-12.45-40.99-18.69-1.23-.56-2.47-1.15-3.58-1.92-1.27-.88-1.59-2.1-1.09-3.1.51-1.04,1.54-1.44,3.11-.88,3.46,1.23,6.94,2.44,10.29,3.93,13.96,6.16,27.96,12.22,41.77,18.71,15.38,7.23,29.69,16.31,43.19,26.64.5.38,1.02.75,1.86.86-.52-.59-1.02-1.18-1.55-1.75-9.07-9.72-18.93-18.6-29.25-26.98-9.25-7.51-18.4-15.14-27.59-22.72-.99-.81-1.97-1.64-2.86-2.56-.55-.56-1.03-1.24-1.33-1.96-.38-.91-.36-1.92.41-2.68.8-.79,1.8-1.12,2.85-.6,1.07.52,2.15,1.08,3.09,1.8,6.7,5.19,13.39,10.39,20.02,15.67,12.58,10.02,24.85,20.39,35.98,32.04,12.8,13.39,24.13,27.95,34.56,43.23.48.71.98,1.41,1.76,1.97-.12-.35-.21-.71-.36-1.04-7.51-16.61-16.42-32.36-28.38-46.23-21.27-24.68-46.79-43.66-76.59-56.83-9.93-4.39-20.03-8.42-30.04-12.64-1.1-.46-2.21-.95-3.22-1.58-.91-.58-1.52-1.48-1.12-2.65.4-1.14,1.38-1.59,2.48-1.48,1.18.12,2.39.32,3.49.73,8.74,3.3,17.48,6.59,26.17,10.03,19.16,7.58,36.76,17.92,52.98,30.59,17.84,13.95,33.33,30.09,45.41,49.35,1.01,1.61,1.99,3.23,3.29,4.69-.34-.77-.68-1.54-1.04-2.3-12.92-28.02-30.86-52.41-53.38-73.46z" />
                                          </svg>
                                          </div> */}
                              <div className={styles.logoTagSubcategory}>
                              <img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} />

                              </div>
                              {subcategory}
                            </a>
                          ))}
                        </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

        </div>
        <div className={styles.menuItem}>
          <span className={styles.aboutMenuItem}>ABOUT US</span>
          <div className={styles.dropdown}>
            <button onClick={goToAboutSection}>
              <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} /><span>Who Miina Group is</span></div>
            </button>
            <button onClick={goToTeamSection}>
              <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} /><span>Miina Group Team</span></div>
            </button>
          </div>
        </div>
        <button onClick={goToContactSection}><div className={styles.menuItem}><span>CONTACT</span></div></button>
      </div>
      <div className={styles.logoTaglineWrapper} onClick={() => { navigate("/") }}>
        <img src="/svg/PrimaryLogoColour.svg" alt="Miina Group Logo" className={styles.logo} />
        <div className={styles.tagline}>
          Walking and Working on Country, safely
        </div>
      </div>

      <div className={styles.logRegNew}>
        <div className={`${styles.search}`}>
          <input
            placeholder="Search 1000+ products"
            className={styles.inputSearch}
            onKeyUp={submitHandler}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.iconNew}
            onClick={submitHandler}
          >
            <i class="bi bi-search fs-4"></i></button>
        </div>

        <div className={`${styles.headerNewBtns} ${styles.headerNewBtnsLoggedIn}`}>
          <Nav className={styles.user_cart}>
            {/* *********** User Icon *********** */}
            {userInfo.isAdmin ? (
              <>
                <div className="users_initial_dropdown">
                  <div className={`Avtbox_admin`}>
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
                          <a href="/admin/orders" className="hd_c">
                            Orders
                          </a>
                        </li>
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
                        <li
                          className="hd_c"
                          onClick={() => dispatch(logout())}
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
                      {`${userInfo.name?.charAt(0)}${userInfo.lastName?.charAt(0)}`}
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
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7917 41.1458C20.4823 41.1458 21.1447 40.8714 21.6331 40.3831C22.1215 39.8947 22.3958 39.2323 22.3958 38.5416C22.3958 37.851 22.1215 37.1886 21.6331 36.7002C21.1447 36.2118 20.4823 35.9375 19.7917 35.9375C19.101 35.9375 18.4386 36.2118 17.9502 36.7002C17.4619 37.1886 17.1875 37.851 17.1875 38.5416C17.1875 39.2323 17.4619 39.8947 17.9502 40.3831C18.4386 40.8714 19.101 41.1458 19.7917 41.1458ZM36.4583 41.1458C37.149 41.1458 37.8114 40.8714 38.2998 40.3831C38.7881 39.8947 39.0625 39.2323 39.0625 38.5416C39.0625 37.851 38.7881 37.1886 38.2998 36.7002C37.8114 36.2118 37.149 35.9375 36.4583 35.9375C35.7677 35.9375 35.1053 36.2118 34.6169 36.7002C34.1285 37.1886 33.8542 37.851 33.8542 38.5416C33.8542 39.2323 34.1285 39.8947 34.6169 40.3831C35.1053 40.8714 35.7677 41.1458 36.4583 41.1458ZM42.9333 15.7541C42.7889 15.5531 42.5987 15.3893 42.3785 15.2762C42.1582 15.1632 41.9142 15.1042 41.6667 15.1041H15.7083L13.9813 9.92288C13.8777 9.61187 13.6789 9.34132 13.4131 9.14952C13.1472 8.95771 12.8278 8.85437 12.5 8.85413H6.25C5.8356 8.85413 5.43817 9.01875 5.14515 9.31177C4.85212 9.6048 4.6875 10.0022 4.6875 10.4166C4.6875 10.831 4.85212 11.2285 5.14515 11.5215C5.43817 11.8145 5.8356 11.9791 6.25 11.9791H11.375L13.0896 17.125L13.1104 17.1958L17.2688 29.6604C17.3726 29.9712 17.5715 30.2416 17.8372 30.4333C18.103 30.6251 18.4223 30.7286 18.75 30.7291H37.5C37.8281 30.729 38.1478 30.6257 38.414 30.434C38.6802 30.2422 38.8794 29.9715 38.9833 29.6604L43.15 17.1604C43.2274 16.9255 43.2482 16.6757 43.2105 16.4312C43.1729 16.1868 43.0779 15.9548 42.9333 15.7541ZM36.375 27.6041H19.8771L16.7521 18.2291H39.4979L36.375 27.6041Z" fill="#999A47" />
                  </svg>
                  <Badge
                    className="badge_quote pill"
                    pill
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
                    editQuantity={editQuantity}
                    cartItems={cartItems}
                    cartSubtotal={cartSubtotal}
                    reduxDispatch={reduxDispatch}
                    useIsAdmin={useIsAdmin}
                  />
                </div>
              )}
            </div>
          </Nav>
        </div>
      </div>
    </div>


  </div>





}

export default NewHeaderComponentLoggedIn;
