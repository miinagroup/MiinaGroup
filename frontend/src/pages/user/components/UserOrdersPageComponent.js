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
  const [totalUniforms, setTotalUniforms] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState("")
  const [uniformSearch, setUniformSearch] = useState("")
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
    // { name: "Paid", field: "isPaid", sortable: true },
    { name: "PO#", field: "purchaseNumber", sortable: true },
    { name: "Invoice#", field: "invoiceNumber", sortable: true },
    { name: "Order Note", field: "orderNote", sortable: true },
    { name: "Created By", field: "userName", sortable: true },
    { name: "Shipped", field: "isDelivered", sortable: true },
    { name: "Order details", field: "_id", sortable: false },
  ];
  const uniformHeaders = [
    { name: "", field: "checkBox", sortable: false },
    { name: "No#", field: "index", sortable: false },
    { name: "Created Date", field: "createdAt", sortable: true },
    { name: "Approved Date", field: "approvedDate", sortable: true },
    // { name: "Paid", field: "isPaid", sortable: true },
    { name: "PO#", field: "updatedAt", sortable: true },
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
      if (!order.orderNote?.includes("Uniform")) {
        productArray.push(order)
      }
    })
    setTotalProducts(productArray.length)
    //Current Page slice
    return productArray.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, ordersByCompany, currentPage, search, sorting, productSearch]);

  const uniformData = useMemo(() => {
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
    } else if (userInfo.isUniformManager) {
      computedOrders = ordersByCompany.filter(
        (order) =>
          order.orderNote?.includes("Uniform")
      );
    } else {
      computedOrders = orders;
    }

    if (uniformSearch) {
      computedOrders = computedOrders.filter(
        (orders) =>
          orders.createdAt.toUpperCase().includes(uniformSearch.toUpperCase()) ||
          orders.purchaseNumber.toUpperCase().includes(uniformSearch.toUpperCase()) ||
          String(orders.orderTotal.cartSubtotal)
            .toUpperCase()
            .includes(uniformSearch.toUpperCase()) ||
          orders.orderNote?.toUpperCase().includes(uniformSearch.toUpperCase()) ||
          orders.userName?.toUpperCase().includes(uniformSearch.toUpperCase()) ||
          orders.cartItems.some((cartItem) =>
            cartItem.name?.toUpperCase().includes(uniformSearch.toUpperCase())
          ) ||
          orders.cartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].ctlsku &&
              cartItem.cartProducts[0].ctlsku
                .toUpperCase()
                .includes(uniformSearch.toUpperCase())
          ) ||
          orders.cartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].slrsku &&
              cartItem.cartProducts[0].slrsku
                .toUpperCase()
                .includes(uniformSearch.toUpperCase())
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

    var uniformArray = []
    computedOrders?.map((order) => {
      if (order.orderNote?.includes("Uniform")) {
        uniformArray.push(order)
      }
    })
    setTotalUniforms(uniformArray.length)

    if (filterValue === "approved") {
      uniformArray = uniformArray.filter(
        (order) => typeof (order.approvedPONumber) !== "undefined"
      )
    } else if (filterValue === "nonApproved") {
      uniformArray = uniformArray.filter(
        (order) => typeof (order.approvedPONumber) === "undefined"
      )
    }

    //Current Page slice
    return uniformArray.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, ordersByCompany, currentPage, search, sorting, filterValue, selectedIds]);

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
    //color: order.user === order.storeId ? order.secondOwnerId !== " " ? "green" : "blue" : order.secondOwnerId !== " " ? "black" : "blue",
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
    //console.log(date.toISOString());
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

  // const selectAll = document.getElementById('selectAllCheckbox')
  // selectAll?.addEventListener('change', function () {
  //   var checkBoxArray = []
  //   let checkboxes =
  //     document.querySelectorAll('.checkboxes');
  //   checkboxes.forEach(function (checkbox) {
  //     checkbox.checked = this.checked;
  //     if (this.checked) {
  //       checkBoxArray.push(checkbox.value)
  //     }
  //   }, this);
  //   setSelectedIds(checkBoxArray)
  // });


  return (
    <>
      <Row className="m-5 desktop">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <h1>MY ORDERS</h1>
          <Tabs
            defaultActiveKey="PRODUCTS"
            transition={false}
            id="noanim-tab-example"
            className="mb-3">
            <Tab eventKey="PRODUCTS" title="PRODUCTS ORDERS">
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
            </Tab>
            <Tab eventKey="UNIFORMS" title="UNIFORMS ORDERS">
              <div className="row mb-2">
                {
                  selectedIds.length > 0 && userInfo.isUniformManager ? (
                    <>
                      <div className="col-md-2">
                        <Form.Control
                          type="text"
                          placeholder="Enter PO Number"
                          onChange={handleTextChange}
                          disabled={filterValue === "approved"}
                        />
                      </div>
                      <div className="col-md-1">
                        <Button
                          onClick={handleSubmit}
                          disabled={poNumber.length === 0 || filterValue === "approved"}
                        >{approve}</Button>
                      </div>
                      <div className="col-md-2"></div>
                    </>
                  ) : (
                    userInfo.isUniformManager ? (
                      <>
                        <div className="col-md-2">
                          <Form.Control
                            type="text"
                            placeholder="Select Orders"
                            onChange={handleTextChange}
                            disabled
                          />
                        </div>
                        <div className="col-md-1">
                          <Button
                            onClick={handleSubmit}
                            disabled
                          >Approve</Button>
                        </div>
                        <div className="col-md-2"></div>
                      </>

                    ) : (
                      <>
                        <div className="col-md-5"></div>
                      </>
                    )
                  )
                }
                {
                  userInfo.isUniformManager ? (
                    <>
                      <div className="col-md-2 ">
                        <select
                          value={filterValue}
                          onChange={(e) => setFilterValue(e.target.value)}
                          className="form-select me-3"
                        >
                          <option value="">All Uniform Orders</option>
                          <option value="approved">Approved Orders</option>
                          <option value="nonApproved">Non-Approved</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="col-md-2 "></div>
                  )
                }
                <div className="col-md-2 "></div>
                <div className="col-md-2 ms-5">
                  <Search
                    onSearch={(value) => {
                      setUniformSearch(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              {/* {
                userInfo.isUniformManager ? (
                  <Button
                    id="selectAllCheckbox"
                    size="sm"
                    variant="outline-primary"
                    style={{ position: "absolute", marginTop: "4px" }}>
                    <i class="bi bi-check-all fa-lg"></i>
                  </Button>
                ) : ("")
              } */}

              <table className="table table-striped">
                <TableHeader
                  headers={uniformHeaders}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {uniformData ? (
                    uniformData?.map((order, idx) => (
                      <tr key={idx}>
                        {
                          userInfo.isUniformManager ? (
                            <>
                              <td>
                                <input
                                  type="checkbox"
                                  value={order._id}
                                  class="checkboxes"
                                  checked={selectedIds.includes(order._id)}
                                  onChange={handleCheckboxChange}
                                  disabled={order.approvedPONumber}
                                />
                              </td>
                            </>
                          ) : (
                            <td></td>
                          )
                        }
                        <td style={getOrderStyle(order)}>{idx + 1} </td>
                        <td
                          onClick={() => handleShow(order._id)}
                          style={getOrderStyle(order)}
                        >
                          {order.createdAt?.substring(0, 10)}
                        </td>
                        {
                          order.approvedDate ? (
                            <>
                              <td
                                onClick={() => handleShow(order._id)}
                                style={getOrderStyle(order)}
                              >
                                {order.approvedDate?.substring(0, 10)}
                              </td>
                            </>
                          ) : (
                            <>
                              <td
                                onClick={() => handleShow(order._id)}
                                style={getOrderStyle(order)}
                              >
                                Waiting for Approval
                              </td>
                            </>
                          )
                        }

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
                    total={totalUniforms}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
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
                  setUniformSearch(value);
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
          <Tab eventKey="UNIFORMS" title="UNIFORMS">
            <div className={styles.userOrdersMobileSearch}>
              <Search
                onSearch={(value) => {
                  setProductSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {uniformData && uniformData?.map((order, idx) => {
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
                      <div className={styles.userOrdersMobilePoStatus}>
                        {
                          order.approvedDate ? (
                            <>
                              <div
                                onClick={() => handleShow(order._id)}
                                style={getOrderStyle(order)}
                                className={styles.userOrdersMobileStatus}
                              >
                                {order.approvedDate?.substring(0, 10)}
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                onClick={() => handleShow(order._id)}
                                style={getOrderStyle(order)}
                                className={styles.userOrdersMobileStatus}
                              >
                                Waiting for Approval
                              </div>
                            </>
                          )
                        }
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
                  </div>
                  <hr />
                  <div className={styles.userOrdersMobilePagination}>
                    <Pagination
                      total={totalUniforms}
                      itemsPerPage={ITEMS_PER_PAGE}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </>
              )
            })}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UserOrdersPageComponent;
