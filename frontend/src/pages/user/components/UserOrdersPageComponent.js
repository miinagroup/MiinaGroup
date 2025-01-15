import { Row, Col, Modal, Tab, Tabs, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import UserOrderItemForOrderPageComponent from "./UserOrderItemForOrderPageComponent";
//import Order from "../../../../../backend/models/OrderModel";
import styles from "./UserOrdersPageComponent.module.css"

const UserOrdersPageComponent = ({ getOrders, getOrdersByCompany, updateApprovedPOnumber }) => {
  const [orders, setOrders] = useState([]);
  const [ordersByCompany, setOrdersByCompany] = useState([]);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const [totalItems, setTotalItems] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState("")
  const [filterValue, setFilterValue] = useState("");
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [poNumber, setPOnumber] = useState("")
  const [approve, setApprove] = useState("Approve")
  const ITEMS_PER_PAGE = 20;

  const productHeaders = [
    { name: "No#", field: "index", sortable: false },
    { name: "Date", field: "createdAt", sortable: true },
    { name: "Total", field: "cartSubtotal", sortable: false },
    { name: "PO#", field: "purchaseNumber", sortable: true },
    { name: "Invoice#", field: "invoiceNumber", sortable: true },
    { name: "Order Note", field: "orderNote", sortable: true },
    { name: "Created By", field: "userName", sortable: true },
    { name: "Shipped", field: "isDelivered", sortable: true },
    { name: "Order details", field: "_id", sortable: false },
  ];

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((er) => console.log(er));
  }, [filterValue]);

  useEffect(() => {
    getOrdersByCompany(userInfo.company)
      .then((orders) => setOrdersByCompany(orders))
      .catch((er) => console.log(er));
  }, [filterValue]);

  const productData = useMemo(() => {
    let computedOrders = [];
    if (userInfo.isSiteManager || userInfo.isPD) {
      computedOrders = ordersByCompany;
    } else if (userInfo.isSitePerson) {
      computedOrders = ordersByCompany.filter(
        (order) =>
          order.deliverySite?.toUpperCase() ===
          userInfo.location?.toUpperCase() ||
          (order.secondOwnerId && order.secondOwnerId === userInfo._id) ||
          order.secondOwnerSite?.toUpperCase() ===
          userInfo.location?.toUpperCase()
      );
    } else {
      computedOrders = orders;
    }

    if (productSearch) {
      computedOrders = computedOrders.filter(
        (orders) =>
          orders.createdAt?.toUpperCase().includes(productSearch.toUpperCase()) ||
          orders.purchaseNumber?.toUpperCase().includes(productSearch.toUpperCase()) ||
          orders.invoiceNumber?.toUpperCase().includes(productSearch.toUpperCase()) ||
          String(orders.orderTotal.cartSubtotal)
            .toUpperCase()
            .includes(productSearch.toUpperCase()) ||
          orders.orderNote?.toUpperCase().includes(productSearch.toUpperCase()) ||
          orders.userName?.toUpperCase().includes(productSearch.toUpperCase()) ||
          orders.cartItems.some((cartItem) =>
            cartItem.name?.toUpperCase().includes(productSearch.toUpperCase())
          ) ||
          orders.cartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].ctlsku &&
              cartItem.cartProducts[0].ctlsku
                .toUpperCase()
                .includes(productSearch.toUpperCase())
          ) ||
          orders.cartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].slrsku &&
              cartItem.cartProducts[0].slrsku
                .toUpperCase()
                .includes(productSearch.toUpperCase())
          )
      );
    }
    //Sorting products
    // as localeCompare only can compare String, we have to update it as below.
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedOrders = computedOrders.sort((a, b) => {
        const fieldA = a[sorting.field];
        const fieldB = b[sorting.field];

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          // If field types are different, compare their string representations
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    //console.log(computedOrders);
    var productArray = []
    computedOrders?.map((order) => {
      productArray.push(order)
    })
    setTotalProducts(productArray.length)
    //Current Page slice
    return productArray.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, ordersByCompany, currentPage, search, sorting, productSearch]);

  // order items Modal and Back Order
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (orderId) => {
    setSelectedOrderId(orderId);
    setShow(true);
  };

  const getOrderStyle = (order) => ({
    cursor: "pointer",
    fontWeight: order.backOrder ? "bold" : "normal",
  });

  const handleCheckboxChange = (event) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectedIds([...selectedIds, checkedId])
    } else {
      setSelectedIds(selectedIds.filter(id => id !== checkedId))
    }
  }

  const handleSubmit = (event) => {
    setApprove("Approving...")
    const date = new Date().toISOString()
    if ((selectedIds.length > 0) && (poNumber !== "")) {
      selectedIds?.map((id) => {
        updateApprovedPOnumber(id, poNumber, date)
      })
      setSorting({ field: "updatedAt", order: "desc" });
      setApprove("Approved!")
      setFilterValue("approved")

    }
    setTimeout(() => setApprove("Approve"), 500);
    setSelectedIds([])
  }

  const handleTextChange = (event) => {
    setPOnumber(event.target.value)
  }
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <>
      <Row className="m-5 desktop">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <h1>MY ORDERS</h1>
          <div className="row ">
            <div className="col-md-9">
              <Pagination
                total={totalProducts}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-2 ms-5">
              <Search
                onSearch={(value) => {
                  setProductSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <table className="table table-striped">
            <TableHeader
              headers={productHeaders}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {productData ? (
                productData?.map((order, idx) => (
                  <tr key={idx}>
                    <td style={getOrderStyle(order)}>{idx + 1} </td>
                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      {order.createdAt?.substring(0, 10)}
                    </td>
                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      ${order.orderTotal?.cartSubtotal}
                    </td>
                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      {order.purchaseNumber}
                    </td>
                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      {order.invoiceNumber}
                    </td>
                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      {order.orderNote}
                    </td>
                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      {order.userName?.split("(")[0]}
                      {" ( " + order.deliverySite.toUpperCase() + " ) "}
                    </td>

                    <td
                      onClick={() => handleShow(order._id)}
                      style={getOrderStyle(order)}
                    >
                      {order.isDelivered ? (
                        <i className="bi bi-truck text-success"></i>
                      ) : (
                        <i className="bi bi-x-lg text-danger"></i>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/user/order-details/${order._id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Go to Order <i className="bi bi-box-arrow-in-right"></i>
                      </Link>
                    </td>
                  </tr>
                ))) : ""}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalProducts}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} className="order_preview_items">
        <UserOrderItemForOrderPageComponent id={selectedOrderId} />
      </Modal>

      <div className={`${styles.userOrdersMobileWrapper} mobile`}>
        <Col md={2} className={styles.userOrdersMobileMenu}>
          <UserLinksComponent />
        </Col>
        <h5>MY ORDERS</h5>
        <Tabs defaultActiveKey="PRODUCTS"
          transition={false}
          id="noanim-tab-example"
          className={styles.userOrdersMobileTabs}
        >
          <Tab eventKey="PRODUCTS" title="PRODUCT ORDERS">
            <div className={styles.userOrdersMobileSearch}>
              <Search
                onSearch={(value) => {
                  setCurrentPage(1);
                }}
              />
            </div>
            {productData && productData?.map((order, idx) => {
              return (
                <>
                  <div className={styles.userOrdersMobile}>
                    <div className={styles.userOrdersMobileData}>{order.createdAt?.substring(0, 10).replaceAll("-", "/")} - AU$ {order.orderTotal?.cartSubtotal} - Invoice# {order.invoiceNumber}</div>
                    <div className={styles.userOrdersMobileInfo}>
                      <div>
                        <div className={styles.userOrdersMobilePO}>PO# {order.purchaseNumber} </div>
                        <div className={styles.userOrdersMobileStatus}>
                          {order.isDelivered ? (
                            <div className={styles.userOrdersMobileStatusShipped}>Shipped <i className="bi bi-truck text-success"></i></div>
                          ) : (
                            <div className={styles.userOrdersMobileStatusNonShipped}>Not Shipped <i className="bi bi-x-lg text-danger"></i></div>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/user/order-details/${order._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.userOrdersMobileStatusViewDetails}
                      >
                        VIEW DETAILS <i className="bi bi-box-arrow-in-right"></i>
                      </Link>
                    </div>
                  </div>
                  <hr />
                </>
              )
            })}
            <div className={styles.userOrdersMobilePagination}>
              <Pagination
                total={totalProducts}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UserOrdersPageComponent;
