import { Row, Col, Modal, Tooltip, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";
import CartItemForOrderComponent from "../../../components/CartItemForOrderComponent";
import OrderItemForOrderPageComponent from "./OrderItemForOrderPageComponent";
import "./invoicePDF.css";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
//import { Tooltip } from '@mui/material';
import { useTrackEvents } from "../../trackEvents/useTrackEvents";

const OrdersPageComponent = ({ getOrders, deleteOrder }) => {
  const [orders, setOrders] = useState([]);
  const [orderDeleted, setOrderDeleted] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [monthTotal, setMothTotal] = useState();

  // orders.push("cartSubtotal", orders.orderTotal.cartSubtotal);
  // orders.push("username", orders.user.name + orders.user.lastName);

  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });

  const ITEMS_PER_PAGE = 40;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Customer Name", field: "name", sortable: true },
    { name: "Company", field: "userCompany", sortable: true },
    { name: "Delivery Site", field: "deliverySite", sortable: true },
    { name: "Total Amount", field: "orderTotal.cartSubtotal", sortable: true },
    { name: "Items", field: "items", sortable: false },
    { name: "Dsp", field: "isDelivered", sortable: true },
    { name: "PO#", field: "purchaseNumber", sortable: true },
    { name: "Invoice#", field: "invoiceNumber", sortable: true },
    { name: "Admin Note", field: "adminNote", sortable: true },
    { name: "Order Date", field: "createdAt", sortable: true },
    { name: "Delete", field: "", sortable: false },
  ];

  //Tracking user Interactions
  useTrackEvents();
  // var trackData = localStorage.getItem("trackData")
  // console.log("trackData", trackData);

  const ordersData = useMemo(() => {
    let computedOrders = orders;
    //console.log("örders", computedOrders);
    if (filterValue === "undispatched") {
      computedOrders = computedOrders.filter((order) => !order.isDelivered);
    } else if (filterValue === "backOrder") {
      computedOrders = computedOrders.filter(
        (order) => order.backOrder === true
      );
    } else if (filterValue === "invNotSent") {
      computedOrders = computedOrders.filter(
        (order) => !order.invSent && order.isDelivered
      );
    } else if (filterValue === "uniforms") {
      computedOrders = computedOrders.filter(
        (order) => order.orderNote === "Uniform"
      );
    }

    if (search) {
      computedOrders = computedOrders.filter(
        (order) =>
          order.createdAt.toUpperCase().includes(search.toUpperCase()) ||
          order.purchaseNumber.toUpperCase().includes(search.toUpperCase()) ||
          order.userCompany?.toUpperCase().includes(search.toUpperCase()) ||
          order.deliverySite?.toUpperCase().includes(search.toUpperCase()) ||
          order.userName?.toUpperCase().includes(search.toUpperCase()) ||
          String(order.orderTotal.cartSubtotal)
            .toUpperCase()
            .includes(search.toUpperCase()) ||
          order.invoiceNumber?.toUpperCase().includes(search.toUpperCase()) ||
          order.userCompany?.toUpperCase().includes(search.toUpperCase()) ||
          order.adminNote?.toUpperCase().includes(search.toUpperCase()) ||
          (
            order.user?.name.toUpperCase() +
            " " +
            order.user?.lastName.toUpperCase()
          ).includes(search.toUpperCase()) ||
          order.cartItems.some((cartItem) =>
            cartItem.name?.toUpperCase().includes(search.toUpperCase())
          ) ||
          order.cartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].ctlsku &&
              cartItem.cartProducts[0].ctlsku
                .toUpperCase()
                .includes(search.toUpperCase())
          ) ||
          order.cartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].suppliersku &&
              cartItem.cartProducts[0].suppliersku
                .toUpperCase()
                .includes(search.toUpperCase())
          )
      );
    }

    setTotalItems(computedOrders.length);

    //Sorting products
    // as localeCompare only can compare String, we have to update it as below.
    // nested property 嵌套的数据，不能直接获取，容易报错。所以用下面的公式去解析 orderTotal.cartSubtotal
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
          // If field types are different, compare their string representations
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    //Current Page slice
    return computedOrders.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, currentPage, search, sorting, filterValue]);

  // console.log("ordersData", ordersData);

  // #endregion

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [orderDeleted]);

  const deleteHandler = async (orderId) => {
    if (window.confirm("Are you sure?")) {
      deleteOrder(orderId);
      setOrderDeleted(true);
      setTimeout(() => {
        setOrderDeleted(false);
      }, 500);
    }
  };

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
    color: order.backOrder ? "red" : "black",
    fontWeight: order.backOrder ? "bold" : "normal",
  });

  //Purchased products list.
  var orderProductsList = [];
  ordersData.map((order) => {
    order.cartItems.map((item) => { });
  });

  //Export to Excel
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "Order_products";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(orderProductsList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const columnWidths = [
    "3%",
    "8%",
    "19%",
    "20%",
    "5%",
    "2%",
    "2%",
    "8%",
    "8%",
    "15%",
    "8%",
    "2%",
  ];

  useEffect(() => {
    const thisMonth = new Date().getMonth();
    let totalValue = 0
    orders.map((order) => {
      const month = new Date(order.createdAt).getMonth();
      if (month === thisMonth) {
        totalValue = totalValue + order.orderTotal.cartSubtotal
      }

    })
    setMothTotal(totalValue.toFixed(2))
  }, [orders])

  return (
    <>
      <Row className="content-container m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <div className="row">
            <div className="col-md-5" style={{ width: "50%" }}>
              <h1>ORDERS </h1>
            </div>
            <div className="col-md-5" style={{ width: "50%", textAlign: "right" }}>
              This Month's Order Total =  <b>${new Intl.NumberFormat('en-US').format(monthTotal)}</b>
            </div>

          </div>

          <div className="row">
            <div className="col-md-5">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-3">
              <Button
                variant="success"
                onClick={(e) => exportToExcel(fileName)}
                style={{ cursor: "pointer", fontSize: 14 }}
              >
                Excel Export All Products
              </Button>
            </div>
            {/* filter and search */}
            <div className="col-md-4 d-flex justify-content-between">
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="form-select me-3"
              >
                <option value="">All Orders</option>
                <option value="undispatched">Undispatched</option>
                <option value="backOrder">Back Order</option>
                <option value="invNotSent">Inv Not Sent</option>
                <option value="uniforms">Uniforms</option>
              </select>
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <table className="table table-striped table-sm">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
              widths={columnWidths}
            />
            <tbody>
              {ordersData.map((order, idx) => (
                <tr key={idx}>
                  <td className="no-wrap-td">{idx + 1}</td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                    className="no-wrap-td"
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
                    className="no-wrap-td"
                  >
                    {order.userCompany}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                    className="no-wrap-td"
                  >
                    {order.deliverySite.toUpperCase()}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                    className="no-wrap-td"
                  >
                    $ {order.orderTotal.cartSubtotal.toLocaleString()}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                    className="no-wrap-td"
                  >
                    {order.cartItems.length}
                  </td>
                  <td className="no-wrap-td">
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
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                    className="no-wrap-td"
                  >
                    {order.purchaseNumber}
                  </td>
                  <td className="no-wrap-td">
                    <Link
                      to={`/admin/order-details/${order._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {order.invoiceNumber}{" "}
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
                  </td>
                  <td className="no-wrap-td">{order.adminNote}</td>
                  <td className="no-wrap-td">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="no-wrap-td">
                    <button
                      variant="danger"
                      className="btn-sm btn-light"
                      onClick={() => deleteHandler(order._id)}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-x-circle"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="col-md-5">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} className="order_preview_items">
        <OrderItemForOrderPageComponent id={selectedOrderId} />
      </Modal>
    </>
  );
};

export default OrdersPageComponent;
