import {
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { unmountComponentAtNode } from "react-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { pdf } from "@react-pdf/renderer";
import PurchaseOrderPdf from "../../../components/Pdfs/PurchaseOrder";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
import POItemForOrderPageComponent from "./POItemForOrderPageComponent";

const AdminPurchaseOrdersComponent = ({
  getPruchasedItemSupplier,
  getOrders,
  updatePO,
  deletePurchaseOrder,
  updatePOStatus
}) => {
  const [eptBtnText, setEptBtnText] = useState("Export Supplier Excel");
  const [orderDeleted, setOrderDeleted] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [po, setPo] = useState("Check PO's Status")

  const exportSupplierExcel = () => {
    setEptBtnText("Exporting...");
    getPruchasedItemSupplier()
      .then((data) => {
        exportToExcel(data);
        setEptBtnText("Done!");
        setTimeout(() => setEptBtnText("Export Supplier Excel"), 1000);
      })
      .catch((error) => {
        console.error(error);
        setEptBtnText("Export Supplier Excel");
      });
  };

  const exportToExcel = (suppliers) => {
    const ws = XLSX.utils.json_to_sheet(suppliers);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, "Purchased Supplier List" + ".xlsx");
  };

  const [orders, setOrders] = useState([]);
  const [ordersByCompany, setOrdersByCompany] = useState([]);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });

  const ITEMS_PER_PAGE = 20;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Date", field: "createdAt", sortable: true },
    { name: "Total", field: "cartSubtotal", sortable: false },
    { name: "Supplier", field: "supplierName", sortable: true },
    { name: "Email", field: "supplierSalesEmail", sortable: true },
    { name: "Phone", field: "supplierSalesPhone", sortable: true },
    { name: "Address", field: "supplierAddress", sortable: true },
    { name: "PO#", field: "poNumber", sortable: true },
    { name: "Order details", field: "_id", sortable: false },
    { name: "Delete", field: "", sortable: false },
  ];

  const refreshOrders = () => {
    getOrders()
      .then((data) => setOrders(data.data.purchaseOrders))
      .catch((er) => console.log(er));
  };

  const handlePOs = () => {
    setPo("Checking.. PO's Status")
    if (orders) {
      orders?.map((order) => {
        let counter = 0
        order?.poCartItems?.map((poCartItem) => {
          if (poCartItem.poCartProducts[0].quantity === poCartItem.poCartProducts[0].receivedQty)
            counter++
        })
        if (order?.poCartItems.length === counter) {
          const id = order._id
          updatePOStatus(order)
        }
        setTimeout(() => setPo("Checked PO Status"), 1000);
      })
      setPo("Check PO's Status")
    }
    refreshOrders();
  }

  useEffect(() => {
    refreshOrders();
  }, [orderDeleted]);

  const ordersData = useMemo(() => {
    let computedOrders = [];

    computedOrders = orders;
    if (filterValue === "completed") {
      computedOrders = computedOrders.filter(
        (order) => order.poCompleted === true);
    } else if (filterValue === "incompleted") {
      computedOrders = computedOrders.filter(
        (order) => order.poCompleted === false || order.poCompleted === null || order.poCompleted === undefined
      );
    }
    console.log(computedOrders);
    if (search) {
      computedOrders = computedOrders.filter(
        (orders) =>
          orders.createdAt.toUpperCase().includes(search.toUpperCase()) ||
          orders.poNumber.toUpperCase().includes(search.toUpperCase()) ||
          String(orders.orderTotal.cartSubtotal)
            .toUpperCase()
            .includes(search.toUpperCase()) ||
          orders.supplierSalesEmail
            ?.toUpperCase()
            .includes(search.toUpperCase()) ||
          orders.supplierName?.toUpperCase().includes(search.toUpperCase()) ||
          orders.poCartItems.some((cartItem) =>
            cartItem.name?.toUpperCase().includes(search.toUpperCase())
          ) ||
          orders.poCartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].ctlsku &&
              cartItem.cartProducts[0].ctlsku
                .toUpperCase()
                .includes(search.toUpperCase())
          ) ||
          orders.poCartItems.some(
            (cartItem) =>
              cartItem.cartProducts &&
              cartItem.cartProducts.length > 0 &&
              cartItem.cartProducts[0].slrsku &&
              cartItem.cartProducts[0].slrsku
                .toUpperCase()
                .includes(search.toUpperCase())
          )
      );
    }

    setTotalItems(computedOrders.length);

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
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    //Current Page slice
    return computedOrders.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, ordersByCompany, currentPage, search, sorting, filterValue]);
  // #endregion

  //console.log(ordersData);

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
    color: order.backOrderStatus ? "red" : "black",
    fontWeight: order.backOrder ? "bold" : "normal",
  });

  const deleteHandler = async (orderId) => {
    if (window.confirm("Are you sure?")) {
      deletePurchaseOrder(orderId);
      setOrderDeleted(true);
      setTimeout(() => {
        setOrderDeleted(false);
      }, 500);
    }
  };

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <>
      <Row className="content-container  m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>PURCHASE ORDERS</h1>
          {/* <Button
            onClick={handlePOs}>{po}</Button> */}
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-4 d-flex justify-content-between">
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="form-select me-3"
              >
                <option value="">All PO's</option>
                <option value="completed">Completed PO's</option>
                <option value="incompleted">Incompleted PO's</option>
              </select>
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
            {/* <div className="col-md-6 d-flex flex-row-reverse mb-2">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div> */}
          </div>
          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {ordersData.map((order, idx) => (
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
                    {order.supplierName}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    {order.supplierSalesEmail}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    {order.supplierSalesPhone}
                  </td>
                  <td
                    onClick={() => handleShow(order._id)}
                    style={getOrderStyle(order)}
                  >
                    {order.userName?.split("(")[0]}
                    {order.supplierAddress.toUpperCase()}
                  </td>
                  <td
                  // onClick={() => handleShow(order._id)}
                  // style={getOrderStyle(order)}
                  >
                    {order.poNumber}
                  </td>
                  <td>
                    <Link
                      to={`/admin/po-details/${order._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Go to Order <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
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

      <Modal show={show} onHide={handleClose} className="PO_preview_items">
        <POItemForOrderPageComponent
          id={selectedOrderId}
          updatePO={updatePO}
          handleClose={handleClose}
          refreshOrders={refreshOrders}
        />
      </Modal>
    </>
  );
};

export default AdminPurchaseOrdersComponent;
