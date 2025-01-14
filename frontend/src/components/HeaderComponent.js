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
import { getCategories, getSubcategories } from "../redux/actions/categoryActions";
import CartDropDown from "../pages/user/components/CartDropDown";
import HeaderComponentForVisitors from "../pages/user/components/HomePageForVisitors/HeaderComponentForVisitors";
import FetchAuthFromServer from "./FetchAuthFromServer";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const [productItem, setProductItem] = useState(null);
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
  const getCart = async () => {
    const { data } = await axios.get("/api/cart");
    return data;
  };

  const [userCart, setUserCart] = useState([]);
  const [useIsAdmin, setUseIsAdmin] = useState(false);

  useEffect(() => {
    reduxDispatch(getCategories());
    reduxDispatch(getSubcategories());
    reduxDispatch(fetchCartItemsLogin());
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
            </Modal>

            {/* ************   User and Carts  ***************  */}
            <Nav className="user_cart">
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
                    />
                  </div>
                )}
              </div>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <HeaderComponentForVisitors />
      )}
    </>
  );
};

export default HeaderComponent;
