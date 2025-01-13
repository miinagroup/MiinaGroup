import { Row, Col, Modal, Tooltip, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";
import OrderItemForOrderPageComponent from "./OrderItemForOrderPageComponent";
import PaymentPageComponent from "./PaymentPageComponent";
import axios from "axios";
import "./invoicePDF.css";
import InvoicesOverDuePageComponent from "./InvoicesOverDuePageComponent";

const InvoicesPageComponent = ({ getOrders, deleteOrder }) => {
  const [orders, setOrders] = useState([]);
  const [orderDeleted, setOrderDeleted] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });

  const ITEMS_PER_PAGE = 40;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Customer Name", field: "name", sortable: true },
    { name: "Company", field: "userCompany", sortable: true },
    { name: "Total", field: "orderTotal.cartSubtotal", sortable: true },
    { name: "Items", field: "items", sortable: false },
    { name: "Shipped", field: "isDelivered", sortable: true },
    { name: "In QB", field: "quickBooksInvID", sortable: true },
    { name: "Inv Sent", field: "invSent", sortable: true },
    { name: "Paid", field: "balance", sortable: true },
    { name: "PO#", field: "purchaseNumber", sortable: true },
    { name: "Invoice#", field: "invoiceNumber", sortable: true },
    { name: "Inv Date", field: "deliveredAt", sortable: true },
  ];

  const ordersData = useMemo(() => {
    let computedOrders = orders;
    if (filterValue === "invNotSent") {
      computedOrders = computedOrders.filter(
        (order) => !order.invSent && order.isDelivered
      );
    } else if (filterValue === "unPaid") {
      computedOrders = computedOrders.filter((order) => order.balance !== 0);
    } else if (filterValue === "AmountError") {
      computedOrders = computedOrders.filter(
        (order) =>
          order.balance !== order.orderTotal.cartSubtotal && order.balance !== 0
      );
    } else if (filterValue === "overdue") {
      const today = new Date();
      computedOrders = computedOrders.filter((order) => {
        const deliveryDate = new Date(order.deliveredAt);
        const dueDate = new Date(
          deliveryDate.setDate(
            deliveryDate.getDate() + parseInt(order.dueDays, 10)
          )
        );
        return dueDate < today && order.balance !== 0;
      });
    }

    if (search) {
      computedOrders = computedOrders.filter(
        (orders) =>
          orders.createdAt.toUpperCase().includes(search.toUpperCase()) ||
          orders.purchaseNumber.toUpperCase().includes(search.toUpperCase()) ||
          orders.userCompany?.toUpperCase().includes(search.toUpperCase()) ||
          orders.deliverySite?.toUpperCase().includes(search.toUpperCase()) ||
          orders.userName?.toUpperCase().includes(search.toUpperCase()) ||
          String(orders.orderTotal.cartSubtotal)
            .toUpperCase()
            .includes(search.toUpperCase()) ||
          orders.invoiceNumber?.toUpperCase().includes(search.toUpperCase()) ||
          orders.userCompany?.toUpperCase().includes(search.toUpperCase()) ||
          orders.adminNote?.toUpperCase().includes(search.toUpperCase()) ||
          (
            orders.user?.name.toUpperCase() +
            " " +
            orders.user?.lastName.toUpperCase()
          ).includes(search.toUpperCase()) ||
          orders.cartItems.some((cartItem) =>
            cartItem.name?.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    setTotalItems(computedOrders.length);
    const getNestedProperty = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedOrders = computedOrders.sort((a, b) => {
        const fieldA = getNestedProperty(a, sorting.field);
        const fieldB = getNestedProperty(b, sorting.field);

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    return computedOrders.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, currentPage, search, sorting, filterValue]);

  // #endregion

  const refreshOrders = () => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  };

  useEffect(() => {
    refreshOrders();
  }, [orderDeleted]);


  // order items Modal and Back Order
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (orderId) => {
    setSelectedOrderId(orderId);
    setShow(true);
  };

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // console.log(selectedOrderId);

  const getOrderStyle = (order) => ({
    cursor: "pointer",
  });

  /* *********** Due Days *********** */

  const calculateDueInDays = (deliveredAt, dueDays) => {
    if (!deliveredAt || !dueDays) return "";

    const daysToAdd = parseInt(dueDays, 10);
    if (isNaN(daysToAdd)) return "Invalid dueDays";

    const deliveryDate = new Date(deliveredAt);
    if (isNaN(deliveryDate.getTime())) return "Invalid Date";

    const dueDate = new Date(deliveryDate);
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeDiff = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays === 0) {
      return "Due today";
    } else if (diffDays > 0) {
      return `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else {
      return (
        <span>
          <i
            className={`bi bi-exclamation-octagon-fill ${Math.abs(diffDays) < 30 ? "text-warning" : "text-danger"
              }`}
          ></i>{" "}
          Overdue {Math.abs(diffDays)} day{Math.abs(diffDays) > 1 ? "s" : ""}
        </span>
      );
    }
  };

  /* *********** QUICKBOOS FUNCTIONS *********** */
  const [token, setToken] = useState("");
  const [reCbtn, setReCbtn] = useState("Re-Connect to QBs");

  const controllerRefreshToken = async () => {
    try {
      setReCbtn("Connecting...");
      const responseToken = await axios.get(
        "/api/quickBooks/refreshAccessToken"
      );
      setToken(responseToken.data);
      if (responseToken.status === 200) {
        setReCbtn("Connection Success");
      }
    } catch (error) {
      console.error("Error refreshing token", error);
    }
  };

  const [proButtonMessage, setProButtonMessage] = useState("Process Products");

  const processProducts = async () => {
    try {
      setProButtonMessage("Processing");
      const responseToken = await axios.post("/api/quickBooks/processProducts");
      setToken(responseToken);
      if (responseToken.data.message === "Products have been proceessed!!!") {
        setProButtonMessage("Process Again");
      }
    } catch (error) {
      console.error("Error disconnect", error);
    }
  };

  const [invButtonMessage, setInvButtonMessage] = useState("Process Invoices");

  const processInovices = async () => {
    try {
      setInvButtonMessage("Processing");
      const responseToken = await axios.post("/api/quickBooks/processInovices");
      setToken(responseToken);
      if (responseToken.data.message === "Invoices have been proceessed!!!") {
        setInvButtonMessage("Process Again");
      }
    } catch (error) {
      console.error("Error disconnect", error);
    }
  };

  const [checkingBtn, setCheckingBtn] = useState("Process Balance Check");

  const processBalanceCheck = async () => {
    try {
      setCheckingBtn("Processing");
      const responseToken = await axios.post("/api/quickBooks/checkInvBalance");
      setToken(responseToken);
      if (
        responseToken.data.message === "Balance check have been proceessed!!!"
      ) {
        setCheckingBtn("Process Again");
      }
    } catch (error) {
      console.error("Error disconnect", error);
    }
  };

  const [paymentPage, setPaymentPage] = useState(false);
  const [unPaidInv, setUnPaidInv] = useState([]);

  useEffect(() => {
    const unPaidOrders = orders.filter(
      (order) => order.balance !== 0 && order.isDelivered === true
    );
    setUnPaidInv(unPaidOrders);
  }, [orders]);

  const closePaymentPage = () => {
    setPaymentPage(false);
  };

  const showPaymentPage = () => {
    setPaymentPage(true);
  };

  /* ******************** OVERDUE INVOICES ******************** */
  const [overDuePage, setOverDuePage] = useState(false);
  const [overDueInv, setOverDueInv] = useState([]);

  useEffect(() => {
    const today = new Date();
    const overDueInv = orders.filter((order) => {
      const deliveryDate = new Date(order.deliveredAt);
      const dueDate = new Date(
        deliveryDate.setDate(
          deliveryDate.getDate() + parseInt(order.dueDays, 10)
        )
      );
      return dueDate < today && order.balance !== 0;
    });
    setOverDueInv(overDueInv);
  }, [orders]);

  const closeOverDuePage = () => {
    setOverDuePage(false);
  };

  const showOverDuePage = () => {
    setOverDuePage(true);
  };

  const [notDueInv, setNotDueInv] = useState([]);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);

  useEffect(() => {
    const notDueInvs = orders.filter((invoice) => {
      const deliveryDate = new Date(invoice.deliveredAt);
      const dueDate = new Date(deliveryDate);
      dueDate.setDate(deliveryDate.getDate() + parseInt(invoice.dueDays, 10));
      return new Date() < dueDate;
    });

    const totalAmount = notDueInvs.reduce((sum, invoice) => {
      const amount =
        invoice.orderTotal && invoice.orderTotal.cartSubtotal
          ? parseFloat(invoice.orderTotal.cartSubtotal)
          : 0;
      return sum + amount;
    }, 0);

    setNotDueInv(notDueInvs);
    setCurrentTotalAmount(totalAmount);
  }, [orders]);

  // console.log(currentTotalAmount, notDueInv);

  return (
    <>
      <Row className="content-container m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>INVOICES</h1>
          <div>
            <Button
              className="ms-0 m-1 pt-0 pb-0"
              variant="success"
              onClick={controllerRefreshToken}
              disabled={reCbtn === "Connection Success"}
            >
              {reCbtn}
            </Button>
            <Button
              className={
                proButtonMessage === "Process Again"
                  ? "m-1 pt-0 pb-0 CTL_btn"
                  : "m-1 pt-0 pb-0"
              }
              variant="success"
              onClick={processProducts}
              disabled={proButtonMessage === "Processing"}
            >
              {proButtonMessage}
            </Button>

            <Button
              className={
                invButtonMessage === "Process Again"
                  ? "m-1 pt-0 pb-0 CTL_btn"
                  : "m-1 pt-0 pb-0"
              }
              variant="success"
              onClick={processInovices}
              disabled={invButtonMessage === "Processing"}
            >
              {invButtonMessage}
            </Button>
            <Button
              className="m-1 pt-0 pb-0"
              variant="success"
              onClick={showPaymentPage}
            >
              Make Payment
            </Button>
            <Button
              className="m-1 pt-0 pb-0 CTL_btn"
              variant="success"
              onClick={showOverDuePage}
            >
              Over Due
            </Button>
            <Button
              variant="success"
              onClick={processBalanceCheck}
              disabled={checkingBtn === "Processing"}
              className={
                checkingBtn === "Process Again"
                  ? "m-1 pt-0 pb-0 CTL_btn"
                  : "m-1 pt-0 pb-0"
              }
            >
              {checkingBtn}
            </Button>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            {/* filter and search */}
            <div className="col-md-4 d-flex justify-content-between">
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="form-select me-3"
              >
                <option value="">All Invoices</option>
                <option value="invNotSent">Inv Not Sent</option>
                <option value="unPaid">Not Paid</option>
                <option value="overdue">Overdue</option>
                <option value="AmountError">Amount Difference</option>
              </select>

              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <table className="table table-striped mt-2">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {ordersData.map((order, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    {order.user !== null ? (
                      <>
                        {order.user.name} {order.user.lastName}
                      </>
                    ) : null}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    {order.userCompany}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    $ {order.orderTotal.cartSubtotal.toLocaleString()}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    {order.cartItems.length}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.trackLink.includes("false") ? (
                        <Link
                          to={`/admin/order-details/${order._id}`}
                          style={{ color: "green" }}
                        >
                          <i className="bi bi-truck"></i>
                        </Link>
                      ) : (
                        <a
                          href={order.trackLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "green" }}
                        >
                          <i className="bi bi-truck"></i>
                        </a>
                      )
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    {order.quickBooksInvID ? (
                      <i class="bi bi-journal-arrow-up text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    {order.invSent ? (
                      order.invHasSent
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    {order.balance === 0 ? (
                      <>
                        <i className="bi bi-check-circle-fill text-success" />{" "}
                        Deposited
                      </>
                    ) : (
                      calculateDueInDays(order.deliveredAt, order.dueDays)
                    )}
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
                    <Link to={`/admin/order-details/${order._id}`}>
                      {order.invoiceNumber}
                    </Link>
                  </td>
                  <td>{order.deliveredAt?.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} className="order_preview_items">
        <OrderItemForOrderPageComponent id={selectedOrderId} />
      </Modal>

      <Modal
        show={paymentPage}
        onHide={closePaymentPage}
        className="order_preview_items"
      >
        <Modal.Header closeButton>
          <Modal.Title>UNPAID INVOICES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentPageComponent unPaidInv={unPaidInv} refreshOrders={refreshOrders} />
        </Modal.Body>
      </Modal>

      <Modal
        show={overDuePage}
        onHide={closeOverDuePage}
        className="order_preview_items"
      >
        <Modal.Header closeButton>
          <Modal.Title>OVERDUE INVOICES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoicesOverDuePageComponent
            overDueInv={overDueInv}
            calculateDueInDays={calculateDueInDays}
            notDueInv={notDueInv}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InvoicesPageComponent;
