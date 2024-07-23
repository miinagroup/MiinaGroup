import { Row, Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import UserOrderItemForOrderPageComponent from "./UserOrderItemForOrderPageComponent";
import { TbColorPicker } from "react-icons/tb";
//import Order from "../../../../../backend/models/OrderModel";

const UserUniformsPageComponent = ({ getUniformCart, getUniformRoleByRole, getUniformCategories, getAllUniformCart, getAllUniformRole, updateUniformCart }) => {
  const [uniformCart, setUniformCart] = useState([]);
  const [uniformCategories, setUniformCategories] = useState([])
  const [uniformData, setUniformData] = useState([])
  const [uniformFilter, setUniformFilter] = useState([])
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const [allUniformCarts, setAllUniformCarts] = useState([])
  const [allUniformRoles, setAllUniformRoles] = useState([])
  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sorting, setSorting] = useState({ field: "Item", order: "desc" });

  const ITEMS_PER_PAGE = 20;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Date", field: "createdAt", sortable: true },
    { name: "Item", field: "Item", sortable: true },
    { name: "Total Allowance(Qty)", field: "total_allowance", sortable: true },
    { name: "Total Ordered(Qty)", field: "total_ordered", sortable: true },
    { name: "Total Remaining(Qty)", field: "total_remaining", sortable: true },
    { name: "", field: "goto", sortable: false },
  ];

  useEffect(() => {
    getUniformCategories()
      .then((categories) => setUniformCategories(categories))
    getUniformCart(userInfo._id)
      .then((uniforms) => setUniformCart(uniforms))
    getAllUniformCart()
      .then((data) => setAllUniformCarts(data))
    getAllUniformRole()
      .then((data) => setAllUniformRoles(data))

      .catch((er) => console.log(er));
  }, []);


  useEffect(() => {
    if (uniformCart) {
      setUniformFilter(uniformCart?.stock)
    }
  }, [uniformCart])

  // order items Modal and Back Order
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (orderId) => {
    setSelectedOrderId(orderId);
    setShow(true);
  };

  const getUniformStyle = (uniform) => ({
    cursor: "pointer",
    //color: order.user === order.storeId ? order.secondOwnerId !== " " ? "green" : "blue" : order.secondOwnerId !== " " ? "black" : "blue",
    //fontWeight: uniform.backOrder ? "bold" : "normal",

  });

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleRoleMerge = () => {
    allUniformRoles?.map((mainrole) => {
      allUniformCarts?.map((mainuniformcart) => {
        let cartRoles = []
        if (mainrole?.role?.toUpperCase() === mainuniformcart?.userRole?.toUpperCase()) {
          const roleStock = mainrole.stock;
          const cartStock = mainuniformcart.stock;
          roleStock?.map((role) => {
            cartStock?.map((stock) => {
              if (role.itemName?.toUpperCase() === stock.itemName?.toUpperCase()) {
                cartRoles.push({ "_id": stock._id, "cartCount": stock.cartCount, "itemName": stock.itemName, "purchaseCount": stock.purchaseCount, "purchaseLimit": role.itemLimit })
              }
            })
          })
          updateUniformCart(mainuniformcart._id, cartRoles)
          cartRoles = []
        }
      })
    })
  }

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <h1>MY UNIFORMS</h1>
          {userInfo.isUniformManager === true ? (
            <>
              <LinkContainer to="/manage-uniformBrands" className="me-3">
                <Button >Manage Uniform Brands</Button>
              </LinkContainer>
              {/* <LinkContainer to="/manage-uniforms">
                <Button >Manage Uniform Users</Button>
              </LinkContainer> */}
              <LinkContainer to="/manage-uniform-users">
                <Button >Manage Uniform Users</Button>
              </LinkContainer>
            </>

          ) : ""}
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-6 d-flex flex-row-reverse mb-2">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {uniformFilter?.map((uniform, idx) => (
                <tr key={idx}>
                  <td style={getUniformStyle(uniform)}>{idx + 1} </td>
                  <td
                    onClick={() => handleShow(uniformCart?._id)}
                    style={getUniformStyle(uniform)}
                  >
                    {uniform?.purchaseDate?.substring(0, 10)}
                  </td>
                  <td
                    onClick={() => handleShow(uniformCart?._id)}
                    style={getUniformStyle(uniform)}
                  >

                    {uniform.itemName === "JACKETS" ? (
                      uniform.itemName + " & VESTS"
                    ) : uniform.itemName === "PANTS" ? (
                      uniform.itemName + " & SHORTS"
                    ) : (
                      uniform.itemName
                    )}
                  </td>
                  <td
                    onClick={() => handleShow(uniformCart?._id)}
                    style={getUniformStyle(uniform)}
                  >
                    {uniform?.purchaseLimit}
                  </td>

                  <td
                    onClick={() => handleShow(uniformCart?._id)}
                    style={getUniformStyle(uniform)}
                  >
                    {uniform?.purchaseCount}
                  </td>
                  {(uniform?.purchaseLimit - uniform?.purchaseCount > 0) ? (
                    <td
                      onClick={() => handleShow(uniformCart?._id)}
                      style={getUniformStyle(uniform)}
                    >
                      {uniform?.purchaseLimit - uniform?.purchaseCount}
                    </td>
                  ) : (
                    <td
                      onClick={() => handleShow(uniformCart?._id)}
                      style={getUniformStyle(uniform)}
                      style={{ color: "red" }}
                    >
                      {uniform?.purchaseLimit - uniform?.purchaseCount}
                    </td>
                  )}
                  <td>
                    <Link
                      to={`/uniform-list/?categoryName=UNIFORM&subCategoryName=${uniform?.itemName}`}
                      rel="noreferrer"
                    >
                      Resume Purchase <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* <Modal show={show} onHide={handleClose} className="order_preview_items">
        <UserOrderItemForOrderPageComponent id={selectedOrderId} />
      </Modal> */}
    </>
  );
};

export default UserUniformsPageComponent;
